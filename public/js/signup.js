document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Save data temporarily (for demo)
  localStorage.setItem("user", JSON.stringify({ username, email, password }));

  alert(`Welcome, ${username}! Your account has been created.`);

  // Redirect to users page
  window.location.href = "users.html";
});
