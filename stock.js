// Load stock data from local storage
function loadStock() {
  const stockData = JSON.parse(localStorage.getItem("stockData")) || [];
  const tbody = document.getElementById("stockTableBody");
  tbody.innerHTML = ""; // Clear current rows

  stockData.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>${item.category}</td>
      <td class="qty">${item.qty}</td>
      <td>${item.cost}</td>
      <td>${item.sell}</td>
      <td>${item.supplier}</td>
      <td class="status"></td>
      <td>
        <button class="btn btn-sm btn-warning editBtn" data-index="${index}">Edit</button>
        <button class="btn btn-sm btn-danger deleteBtn" data-index="${index}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  checkStock();
  addDeleteListeners();
  addEditListeners();
}

// Save stock to local storage
function saveStockToLocalStorage() {
  const rows = document.querySelectorAll("#stockTableBody tr");
  const stockData = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    stockData.push({
      date: cells[0].textContent,
      name: cells[1].textContent,
      type: cells[2].textContent,
      category: cells[3].textContent,
      qty: cells[4].textContent,
      cost: cells[5].textContent,
      sell: cells[6].textContent,
      supplier: cells[7].textContent
    });
  });
  localStorage.setItem("stockData", JSON.stringify(stockData));
}

// Check stock status
function checkStock() {
  const rows = document.querySelectorAll("#stockTableBody tr");
  rows.forEach(row => {
    const qtyCell = row.querySelector(".qty");
    const statusCell = row.querySelector(".status");
    const quantity = parseInt(qtyCell.textContent.replace(/[^0-9]/g, '')) || 0;

    if (quantity === 0) {
      statusCell.textContent = "Out of Stock ⚠️";
      statusCell.className = "status out-of-stock";
    } else if (quantity <= 10) {
      statusCell.textContent = "Low Stock ⚠️";
      statusCell.className = "status low-stock";
    } else {
      statusCell.textContent = "In Stock ✅";
      statusCell.className = "status in-stock";
    }
  });
}

// Delete functionality
function addDeleteListeners() {
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const stockData = JSON.parse(localStorage.getItem("stockData")) || [];
      stockData.splice(index, 1); // remove item
      localStorage.setItem("stockData", JSON.stringify(stockData));
      loadStock();
    });
  });
}

// Edit functionality
function addEditListeners() {
  const editBtns = document.querySelectorAll(".editBtn");
  editBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const stockData = JSON.parse(localStorage.getItem("stockData")) || [];
      const item = stockData[index];

      // Fill form with selected item
      document.getElementById("date").value = item.date;
      document.getElementById("productName").value = item.name;
      document.getElementById("productType").value = item.type;
      document.getElementById("productCategory").value = item.category;
      document.getElementById("productQty").value = item.qty;
      document.getElementById("costPrice").value = item.cost;
      document.getElementById("sellingPrice").value = item.sell;
      document.getElementById("supplier").value = item.supplier;

      // Open modal
      const modal = new bootstrap.Modal(document.getElementById("addStockModal"));
      modal.show();

      // When form is submitted, update existing item
      document.getElementById("stockForm").onsubmit = function(e) {
        e.preventDefault();
        stockData[index] = {
          date: document.getElementById("date").value,
          name: document.getElementById("productName").value,
          type: document.getElementById("productType").value,
          category: document.getElementById("productCategory").value,
          qty: document.getElementById("productQty").value,
          cost: document.getElementById("costPrice").value,
          sell: document.getElementById("sellingPrice").value,
          supplier: document.getElementById("supplier").value
        };
        localStorage.setItem("stockData", JSON.stringify(stockData));
        loadStock();
        document.getElementById("stockForm").reset();
        modal.hide();

        // Reset form submit to default behavior for next add
        document.getElementById("stockForm").onsubmit = handleFormSubmit;
      };
    });
  });
}

// Default form submit for adding new stock
function handleFormSubmit(e) {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const name = document.getElementById("productName").value;
  const type = document.getElementById("productType").value;
  const category = document.getElementById("productCategory").value;
  const qty = document.getElementById("productQty").value;
  const cost = document.getElementById("costPrice").value;
  const sell = document.getElementById("sellingPrice").value;
  const supplier = document.getElementById("supplier").value;

  const stockData = JSON.parse(localStorage.getItem("stockData")) || [];
  stockData.push({ date, name, type, category, qty, cost, sell, supplier });
  localStorage.setItem("stockData", JSON.stringify(stockData));

  loadStock();
  document.getElementById("stockForm").reset();
  const modal = bootstrap.Modal.getInstance(document.getElementById("addStockModal"));
  modal.hide();
}


// Initialize
document.getElementById("stockForm").addEventListener("submit", handleFormSubmit);
loadStock();
