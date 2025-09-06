// ================================
// SAMPLE EMPLOYEE DATA
// ================================
const employee = {
  name: "Jane Doe",
  role: "Sales Agent",
  email: "jane@example.com",
  contact: "+256 700 000 000",
  stats: {
    totalSales: 5000000,
    productsSold: 120,
    pendingDeliveries: 8
  }
};

// SAMPLE SALES DATA
const sales = [
  { id: 1, product: "Sofa Set", customer: "John Doe", date: "2025-08-28", amount: 1200000 },
  { id: 2, product: "Dining Table", customer: "Mary Jane", date: "2025-08-27", amount: 800000 },
  { id: 3, product: "Office Chair", customer: "Paul Smith", date: "2025-08-26", amount: 450000 }
];

// ================================
// LOAD DASHBOARD DATA
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // Fill in Stats
  document.getElementById("total-sales").textContent = `UGX ${employee.stats.totalSales.toLocaleString()}`;
  document.getElementById("products-sold").textContent = employee.stats.productsSold;
  document.getElementById("pending-deliveries").textContent = employee.stats.pendingDeliveries;

  // Fill Profile
  document.getElementById("emp-name").textContent = employee.name;
  document.getElementById("emp-role").textContent = employee.role;
  document.getElementById("emp-email").textContent = employee.email;
  document.getElementById("emp-contact").textContent = employee.contact;

  // Fill Sales Table
  const tableBody = document.getElementById("sales-table-body");
  tableBody.innerHTML = ""; // Clear existing rows
  sales.forEach(sale => {
    const row = `
      <tr>
        <td>${sale.id}</td>
        <td>${sale.product}</td>
        <td>${sale.customer}</td>
        <td>${sale.date}</td>
        <td>UGX ${sale.amount.toLocaleString()}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
});
