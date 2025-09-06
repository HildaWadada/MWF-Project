document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const table = document.querySelector("table");
  const rows = table.querySelectorAll("tbody tr");
  const grandTotalElement = document.getElementById("grandTotal");

  // 🔍 Search Filter
  searchBox.addEventListener("keyup", () => {
    const searchValue = searchBox.value.toLowerCase();
    let total = 0;

    rows.forEach(row => {
      const rowText = row.textContent.toLowerCase();
      if (rowText.includes(searchValue)) {
        row.style.display = "";
        const totalCell = row.querySelector("td:nth-child(6)");
        total += parseInt(totalCell.textContent.replace(/,/g, "")) || 0;
      } else {
        row.style.display = "none";
      }
    });

    grandTotalElement.textContent = `Grand Total (Filtered): UGX ${total.toLocaleString()}`;
  });

  // 💰 Initial Grand Total Calculation
  function calculateTotal() {
    let total = 0;
    rows.forEach(row => {
      const totalCell = row.querySelector("td:nth-child(6)");
      total += parseInt(totalCell.textContent.replace(/,/g, "")) || 0;
    });
    grandTotalElement.textContent = `Grand Total: UGX ${total.toLocaleString()}`;
  }
  calculateTotal();

  // 🔽 Sort Table by Column
  const headers = table.querySelectorAll("thead th");
  headers.forEach((header, index) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => sortTable(index));
  });

  function sortTable(columnIndex) {
    const tbody = table.querySelector("tbody");
    const rowsArray = Array.from(tbody.querySelectorAll("tr"));

    const sortedRows = rowsArray.sort((a, b) => {
      const aText = a.children[columnIndex].textContent.trim();
      const bText = b.children[columnIndex].textContent.trim();

      return isNaN(aText) || isNaN(bText)
        ? aText.localeCompare(bText)
        : parseFloat(aText.replace(/,/g, "")) - parseFloat(bText.replace(/,/g, ""));
    });

    tbody.innerHTML = "";
    sortedRows.forEach(row => tbody.appendChild(row));
  }

  // 📥 Download Buttons
  const btnContainer = document.createElement("div");
  btnContainer.className = "mb-3";

  const pdfBtn = document.createElement("button");
  pdfBtn.textContent = "Download PDF";
  pdfBtn.className = "btn btn-danger me-2";

  const excelBtn = document.createElement("button");
  excelBtn.textContent = "Download Excel";
  excelBtn.className = "btn btn-success";

  btnContainer.appendChild(pdfBtn);
  btnContainer.appendChild(excelBtn);
  document.body.insertBefore(btnContainer, table);

  pdfBtn.addEventListener("click", () => alert("PDF download coming soon!"));
  excelBtn.addEventListener("click", () => alert("Excel download coming soon!"));
});
