function setupTable(tableId, searchId, totalId) {
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll("tbody tr");

  // 🔍 Search filter
  document.getElementById(searchId).addEventListener("keyup", function() {
    let filter = this.value.toLowerCase();
    rows.forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(filter) ? "" : "none";
    });
  });

  // 📊 Calculate total value (Quantity × Selling Price)
  function calculateTotal() {
    let total = 0;
    rows.forEach(row => {
      let qty = parseInt(row.cells[2].innerText.replace(/,/g, "")) || 0;
      let price = parseInt(row.cells[4].innerText.replace(/,/g, "")) || 0;
      total += qty * price;

      // ⚠️ Highlight low stock
      if (qty < 20) {
        row.style.backgroundColor = "#ffe5e5"; // light red
      }
    });
    document.getElementById(totalId).innerText = "Total Value: UGX " + total.toLocaleString();
  }

  calculateTotal();
}

// ✅ Apply to both tables
setupTable("rawTable", "rawSearch", "rawTotal");
setupTable("finishedTable", "finishedSearch", "finishedTotal");