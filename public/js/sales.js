  const saleForm = document.getElementById('saleForm');
      const salesTable = document.getElementById('salesTable').querySelector('tbody');
      const grandTotal = document.getElementById('grandTotal');
      let totalSum = 0;
  
      saleForm.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const date = document.getElementById('saleDate').value;
        const product = document.getElementById('productName').value;
        const type = document.getElementById('productType').value;
        const qty = parseFloat(document.getElementById('quantity').value);
        const unitCost = parseFloat(document.getElementById('unitCost').value);
        const total = qty * unitCost;
        const payment = document.getElementById('paymentMethod').value;
        const agent = document.getElementById('salesAgent').value;
        const customer = document.getElementById('customerName').value;
  
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${date}</td>
          <td>${product}</td>
          <td>${type}</td>
          <td>${qty}</td>
          <td>${unitCost.toLocaleString()}</td>
          <td>${total.toLocaleString()}</td>
          <td>${payment}</td>
          <td>${agent}</td>
          <td>${customer}</td>
        `;
  
        salesTable.appendChild(newRow);
  
        totalSum += total;
        grandTotal.textContent = 'Grand Total: UGX ' + totalSum.toLocaleString();
  
        saleForm.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addSaleModal'));
        modal.hide();
      });

      document.getElementById("downloadBtn").addEventListener("click", function () {
  const table = document.getElementById("salesTable");
  let csv = [];
  
  // Loop table rows
  for (let row of table.rows) {
    let cols = [];
    for (let cell of row.cells) {
      cols.push(cell.innerText.replace(/,/g, "")); // remove commas to avoid breaking CSV
    }
    csv.push(cols.join(","));
  }

  // Add Grand Total row
  const grandTotal = document.getElementById("grandTotal").innerText;
  csv.push(["", "", "", "", "", grandTotal, "", "", ""]);

  // Download as CSV
  const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
  const downloadLink = document.createElement("a");
  downloadLink.download = "sales-report.csv";
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
});
