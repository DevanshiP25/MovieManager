const apiBaseUrl = "https://localhost:7009/api/User";

// Handle Login
document
  .getElementById("loginForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = this.email?.value?.trim();
    const password = this.password?.value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "userName",
          result.userName || result.fullName || email
        );
        window.location.href = "movies.html"; // Redirect to movies page
      } else {
        alert(result.message || "Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Failed to connect to server. Please try again later.");
    }
  });

// Handle Registration
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = this.fullName?.value?.trim();
    const email = this.email?.value?.trim();
    const mobile = this.mobile?.value?.trim();
    const password = this.password?.value?.trim();
    const confirmPassword = this.confirmPassword?.value?.trim();

    if (!fullName || !email || !mobile || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = { fullName, email, mobile, password };

    try {
      const response = await fetch(`${apiBaseUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        window.location.href = "index.html";
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Failed to register. Please try again later.");
    }
  });
