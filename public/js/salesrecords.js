// Select elements
const saleForm = document.getElementById("saleForm");
const mySalesTable = document.getElementById("mySales");
const transportCheckbox = document.getElementById("transport");

// Load saved sales on page load
document.addEventListener("DOMContentLoaded", loadSales);

saleForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const date = document.getElementById("saleDate").value;
  const customer = document.getElementById("customerName").value.trim();
  const product = document.getElementById("productName").value.trim();
  const quantity = parseInt(document.getElementById("saleQty").value);
  const payment = document.getElementById("paymentMethod").value;
  const transport = transportCheckbox.checked;

  // Simple price assumption for demo (replace with your logic or DB)
  const pricePerItem = 10000; // Example price per item
  let total = quantity * pricePerItem;
  if (transport) total *= 1.05; // Add 5% transport fee

  // Create sale object
  const sale = {
    date,
    customer,
    product,
    quantity,
    payment,
    transport,
    total: total.toFixed(2),
  };

  // Save to table
  addSaleToTable(sale);

  // Save to localStorage
  saveSale(sale);

  // Reset form & close modal
  saleForm.reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById("saleModal"));
  modal.hide();
});

// Add sale to table
function addSaleToTable(sale) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${sale.date}</td>
    <td>${sale.product}</td>
    <td>${sale.quantity}</td>
    <td>$${sale.total}</td>
  `;
  mySalesTable.appendChild(row);
}

// Save sale to localStorage
function saveSale(sale) {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push(sale);
  localStorage.setItem("sales", JSON.stringify(sales));
}

// Load saved sales
function loadSales() {
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.forEach(addSaleToTable);
}
