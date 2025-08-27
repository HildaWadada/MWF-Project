// 🔍 Search filter
document.getElementById("searchBox").addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();
  let rows = document.querySelectorAll("#attendantsTable tbody tr");

  rows.forEach(row => {
    let name = row.cells[0].textContent.toLowerCase();
    row.style.display = name.includes(filter) ? "" : "none";
  });
});

// 📊 Sort function
function sortTable(colIndex) {
  let table = document.getElementById("attendantsTable");
  let rows = Array.from(table.rows).slice(1); // exclude header
  let asc = table.getAttribute("data-sort") !== "asc";

  rows.sort((a, b) => {
    let valA = a.cells[colIndex].innerText.trim();
    let valB = b.cells[colIndex].innerText.trim();

    if (!isNaN(valA) && !isNaN(valB)) {
      return asc ? valA - valB : valB - valA;
    } else {
      return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
  });

  rows.forEach(row => table.tBodies[0].appendChild(row));
  table.setAttribute("data-sort", asc ? "asc" : "desc");

  // 🔄 Reset all arrows
  document.querySelectorAll("th .arrow").forEach(el => el.textContent = "");

  // 🔼 Add correct arrow to clicked column
  let arrow = table.rows[0].cells[colIndex].querySelector(".arrow");
  arrow.textContent = asc ? " ▲" : " ▼";
}


// 💡 Highlight top performer & calculate total
window.onload = function () {
  let rows = document.querySelectorAll("#attendantsTable tbody tr");
  let maxSale = 0;
  let total = 0;
  let bestRow = null;

  rows.forEach(row => {
    let sale = parseInt(row.cells[2].innerText.replace(/,/g, "")) || 0;
    total += sale;
    if (sale > maxSale) {
      maxSale = sale;
      bestRow = row;
    }
  });

  // Highlight best performer
  if (bestRow) bestRow.style.backgroundColor = "#d4edda"; // light green

  // Show total sales
  document.getElementById("totalSales").innerText = "Total Sales: UGX " + total.toLocaleString();
};
