let products = JSON.parse(localStorage.getItem("products")) || [];

// Elements
const tableBody = document.getElementById("productTableBody");

// Save to localStorage
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Get stock status
function getStatus(qty) {
  if (qty == 0) return { text: "Out of Stock ❌", class: "text-danger" };
  if (qty <= 10) return { text: "Low Stock ⚠️", class: "text-warning" };
  return { text: "In Stock ✅", class: "text-success" };
}

// Render products table
function renderTable() {
  tableBody.innerHTML = "";
  products.forEach((p, index) => {
    const status = getStatus(p.qty);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${p.date}</td>
      <td>${p.name}</td>
      <td>${p.type}</td>
      <td>${p.category}</td>
      <td>${p.qty}</td>
      <td>${p.cost.toLocaleString()}</td>
      <td>${p.price.toLocaleString()}</td>
      <td>${p.supplier}</td>
      <td class="${status.class}">${status.text}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editProduct(${index})"> Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})"> Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add product
function addProduct(product) {
  products.push(product);
  saveProducts();
  renderTable();
}

// Edit product
function editProduct(index) {
  const p = products[index];

  const newName = prompt("Edit product name:", p.name);
  if (newName === null) return;

  const newQty = parseInt(prompt("Edit quantity:", p.qty));
  if (isNaN(newQty)) return;

  products[index] = { ...p, name: newName, qty: newQty };
  saveProducts();
  renderTable();
}

// Delete product
function deleteProduct(index) {
  if (!confirm("Delete this product?")) return;
  products.splice(index, 1);
  saveProducts();
  renderTable();
}

// Example default products (if empty)
if (products.length === 0) {
  products = [
    { date: "2025-07-12", name: "Mahogany Timber", type: "Wood", category: "Hardwood", qty: 100, cost: 20000, price: 25000, supplier: "Gulu Timber Ltd" },
    { date: "2025-07-22", name: "3-Seater Sofa", type: "Furniture", category: "Sofa", qty: 15, cost: 350000, price: 500000, supplier: "Kampala Interiors" },
    { date: "2025-07-25", name: "Office Desk", type: "Furniture", category: "Office", qty: 0, cost: 250000, price: 400000, supplier: "Nairobi Imports" }
  ];
  saveProducts();
}

renderTable();

// Handle Add Product form
document.getElementById("addProductForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const newProduct = {
    date: document.getElementById("date").value,
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    qty: parseInt(document.getElementById("qty").value),
    cost: parseInt(document.getElementById("cost").value),
    price: parseInt(document.getElementById("price").value),
    supplier: document.getElementById("supplier").value
  };

  addProduct(newProduct);

  // Reset + close modal
  this.reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
  modal.hide();
});


