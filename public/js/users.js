const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!role) {
    alert("Please select a role!");
    return;
  }

  if (!email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  if (role === "manager") {
    alert("Welcome Manager (" + email + ")! Redirecting to Manager Dashboard...");
    window.location.href = "/dashboard";
  } else if (role === "employee") {
    alert("Welcome Employee (" + email + ")! Redirecting to Employee Dashboard...");
    window.location.href = "/employees";
  }
});

