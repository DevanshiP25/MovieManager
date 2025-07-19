document.getElementById("userName").innerText =
  localStorage.getItem("userName");

// Handle movie form submission
document
  .getElementById("movieForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const movie = {
      title: this.title.value,
      genre: this.genre.value,
      releaseDate: this.releaseDate.value,
    };

    try {
      await fetch("https://localhost:7009/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
        mode: "cors", // Optional
      });

      this.reset();
      loadMovies();
    } catch (err) {
      alert("Failed to add movie: " + err.message);
    }
  });

// Load movies on page load
async function loadMovies() {
  try {
    const res = await fetch("https://localhost:7009/api/Movies/GetMovie", {
      mode: "cors", // Optional
    });
    const movies = await res.json();

    const list = document.getElementById("movieList");
    list.innerHTML = "";

    movies.forEach((m) => {
      const item = document.createElement("li");
      item.className =
        "list-group-item d-flex justify-content-between align-items-center";
      item.innerHTML = `
        <div>
          <strong>${m.title}</strong> <small class="text-muted">(${m.genre})</small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="deleteMovie(${m.id})">Delete</button>
      `;
      list.appendChild(item);
    });
  } catch (err) {
    alert("Failed to load movies: " + err.message);
  }
}

// Delete a movie
async function deleteMovie(id) {
  try {
    await fetch(`https://localhost:7009/api/movies/${id}`, {
      method: "DELETE",
      mode: "cors", // Optional
    });
    loadMovies();
  } catch (err) {
    alert("Failed to delete movie: " + err.message);
  }
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// Initial load
loadMovies();
