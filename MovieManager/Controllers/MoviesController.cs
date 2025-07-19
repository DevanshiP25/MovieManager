using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MovieManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MoviesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetMovie")]
        public async Task<IActionResult> GetMovies()
        {
            return Ok(await _context.Movies.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddMovie(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
            return Ok(movie);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMovie(int id, Movie movie)
        {
            var existing = await _context.Movies.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Title = movie.Title;
            existing.Genre = movie.Genre;
            existing.ReleaseDate = movie.ReleaseDate;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return NotFound();

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
        }

        [HttpPost("delete-multiple")]
        public async Task<IActionResult> DeleteMultiple([FromBody] List<int> ids)
        {
            var movies = _context.Movies.Where(m => ids.Contains(m.Id));
            _context.Movies.RemoveRange(movies);
            await _context.SaveChangesAsync();
            return Ok("Deleted selected movies");
        }
    }

}
