document.getElementById("logoutBtn").addEventListener("click",function (e) {
    e.preventDefault(); //stop default button behavior

    let confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        //redirect to login page or clear session
        window.location.href = "login.html";

    }
})

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August'],
      datasets: [{
        label: 'MONTHLY SALES (%)',
        data: [12, 19, 7, 5, 11, 3,8,18],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

