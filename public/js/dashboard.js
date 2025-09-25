    // Dummy Sales Data
    const monthlySales = [5500000, 7200000, 6000000, 8000000, 9000000, 6500000, 7000000, 8500000, 7800000, 9200000, 10000000, 9500000];
    
    const ctx1 = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Sales (UGX)',
          data: monthlySales,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });

    // Dummy Stock Data
    let stockItems = [
      { name: "Mahogany Timber", qty: 100 },
      { name: "3-Seater Sofa", qty: 15 },
      { name: "Office Desk", qty: 0 },
      { name: "Double Decker Bed", qty: 300 }
    ];

    // Stock Chart
    const ctx2 = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: stockItems.map(item => item.name),
        datasets: [{
          data: stockItems.map(item => item.qty),
          backgroundColor: ['#4CAF50','#FF9800','#F44336','#2196F3']
        }]
      }
    });

    // Auto-fill Cards
    function updateDashboard() {
      // Total stock
      document.getElementById("stockCount").textContent = stockItems.reduce((sum, item) => sum + item.qty, 0);

      // Low stock
      document.getElementById("lowStockCount").textContent = stockItems.filter(item => item.qty > 0 && item.qty <= 10).length;

      // Top product
      const topProduct = stockItems.reduce((prev, curr) => (curr.qty > prev.qty ? curr : prev));
      document.getElementById("topProduct").textContent = topProduct.name;

      // Sales (just dummy value)
      document.getElementById("totalSales").textContent = "UGX " + monthlySales[new Date().getMonth()].toLocaleString();
    }

    updateDashboard();