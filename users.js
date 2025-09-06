  const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const role = document.getElementById("role").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (role === "manager") {
        alert("Welcome Manager " + username + "! Redirecting to Manager Dashboard...");
        // redirect to manager page
        window.location.href = "dashboard.html";
      } else if (role === "employee") {
        alert("Welcome Employee " + username + "! Redirecting to Employee Dashboard...");
        // redirect to employees page
        window.location.href = "employee-db.html";
      } else {
        alert("Please select a role!");
      }
    });
