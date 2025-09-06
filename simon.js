document.addEventListener("DOMContentLoaded", () => {
  const saleForm = document.getElementById("saleForm");
  const stockTable = document.getElementById("stockTable");
  const productName = document.getElementById("productName");
  const mySales = document.getElementById("mySales");

  // Load stock from localStorage
  let stock = JSON.parse(localStorage.getItem("stock")) || [
    {name: "Sofa Set", type: "Furniture", qty: 10, price: 800000},
    {name: "Hardwood Planks", type: "Wood", qty: 50, price: 2500000}
  ];
  let sales = JSON.parse(localStorage.getItem("sales")) || [];

  function updateStockTable() {
    stockTable.innerHTML = "";
    productName.innerHTML = "<option>Select Product</option>";
    stock.forEach(item => {
      stockTable.innerHTML += `
        <tr>
          <td>${item.name}</td><td>${item.type}</td>
          <td>${item.qty}</td><td>${item.price}</td>
        </tr>`;
      productName.innerHTML += `<option>${item.name}</option>`;
    });
  }

  function updateSalesTable() {
    mySales.innerHTML = "";
    sales.forEach(s => {
      mySales.innerHTML += `
        <tr>
          <td>${s.date}</td><td>${s.product}</td>
          <td>${s.qty}</td><td>${s.total}</td>
        </tr>`;
    });
  }

  saleForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("saleDate").value;
    const customer = document.getElementById("customerName").value;
    const product = productName.value;
    const qty = parseInt(document.getElementById("saleQty").value);
    const payment = document.getElementById("paymentMethod").value;
    const transport = document.getElementById("transport").checked;

    const item = stock.find(p => p.name === product);
    if (!item || qty > item.qty) {
      alert("Not enough stock!");
      return;
    }

    let total = item.price * qty;
    if (transport) total *= 1.05; // Add 5% transport fee

    // Update stock
    item.qty -= qty;

    // Save sale
    const sale = {date, customer, product, qty, total, payment};
    sales.push(sale);
    localStorage.setItem("stock", JSON.stringify(stock));
    localStorage.setItem("sales", JSON.stringify(sales));

    updateStockTable();
    updateSalesTable();
    saleForm.reset();
    alert("Sale recorded successfully!");
  });

  updateStockTable();
  updateSalesTable();
});


function printReceipt(sale) {
  const receiptWindow = window.open("", "_blank");
  receiptWindow.document.write(`
    <h2>MWF Receipt</h2>
    <p>Date: ${sale.date}</p>
    <p>Customer: ${sale.customer}</p>
    <p>Product: ${sale.product}</p>
    <p>Quantity: ${sale.qty}</p>
    <p>Total: UGX ${sale.total}</p>
    <p>Payment: ${sale.payment}</p>
    <p>Thank you for your purchase!</p>
  `);
  receiptWindow.print();
}

let sales = JSON.parse(localStorage.getItem("sales")) || [];
let totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
document.getElementById("grandTotal").innerText = `Total Revenue: UGX ${totalRevenue}`;
