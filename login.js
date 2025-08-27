// Select form elements
  const loginForm = document.querySelector("form");
  const emailInput = document.getElementById("form2Example17");
  const passwordInput = document.getElementById("form2Example27");
  const loginButton = loginForm.querySelector("button");

  // Add a password toggle
  const toggle = document.createElement("span");
  toggle.textContent = "👁️";
  toggle.style.cursor = "pointer";
  toggle.style.marginLeft = "10px";
  passwordInput.parentNode.appendChild(toggle);

  toggle.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggle.textContent = "🙈";
    } else {
      passwordInput.type = "password";
      toggle.textContent = "👁️";
    }
  });

  // Handle login submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop normal form submission

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (!email || !password) {
      alert("⚠️ Please fill in both email and password.");
      return;
    }

    if (!email.includes("@")) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    // Show loading state
    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    // Fake "login" delay
    setTimeout(() => {
      if (email === "wadadahilda@gmail.com" && password === "1234") {
        alert("✅ Login successful!");
        window.location.href = "DB.html"; // redirect
      } else {
        alert("❌ Invalid credentials. Try again.");
        loginButton.disabled = false;
        loginButton.textContent = "LOGIN";
      }
    }, 1500);
  });

