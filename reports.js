// SAMPLE REPORT DATA
const salesData = [
  { id: 1, product: "Sofa Set", customer: "John Doe", date: "2025-08-28", payment: "Cash", amount: 1200000 },
  { id: 2, product: "Dining Table", customer: "Mary Jane", date: "2025-08-27", payment: "Cheque", amount: 800000 },
  { id: 3, product: "Office Chair", customer: "Paul Smith", date: "2025-08-26", payment: "Bank Transfer", amount: 450000 }
];

// Populate table
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#report-table tbody");
  tbody.innerHTML = "";
  salesData.forEach(sale => {
    tbody.innerHTML += `
      <tr>
        <td>${sale.id}</td>
        <td>${sale.product}</td>
        <td>${sale.customer}</td>
        <td>${sale.date}</td>
        <td>${sale.payment}</td>
        <td>${sale.amount.toLocaleString()}</td>
      </tr>
    `;
  });
});

// =============================
// DOWNLOAD PDF
// =============================
document.getElementById("download-pdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Manager Sales Report", 14, 10);
  doc.autoTable({ html: "#report-table", startY: 20 });
  doc.save("sales_report.pdf");
});

// =============================
// DOWNLOAD EXCEL
// =============================
document.getElementById("download-excel").addEventListener("click", () => {
  const table = document.getElementById("report-table");
  const workbook = XLSX.utils.table_to_book(table, { sheet: "SalesReport" });
  XLSX.writeFile(workbook, "sales_report.xlsx");
});
