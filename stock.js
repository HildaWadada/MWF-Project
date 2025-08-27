function checkStock() {
  const rows = document.querySelectorAll("#stockTableBody tr");

  rows.forEach(row => {
    const qtyCell = row.querySelector(".qty");
    const statusCell = row.querySelector(".status");
    const quantity = parseInt(qtyCell.textContent);

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

document.getElementById("stockForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const type = document.getElementById("productType").value;
  const category = document.getElementById("productCategory").value;
  const qty = document.getElementById("productQty").value;
  const cost = document.getElementById("costPrice").value;
  const sell = document.getElementById("sellingPrice").value;
  const supplier = document.getElementById("supplier").value;

  const tbody = document.querySelector("table tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${new Date().toISOString().split('T')[0]}</td>
    <td>${name}</td>
    <td>${type}</td>
    <td>${category}</td>
    <td class="qty">${qty}</td>
    <td>${cost}</td>
    <td>${sell}</td>
    <td>${supplier}</td>
    <td class="status"></td>
  `;
  tbody.appendChild(row);

  checkStock(); // update stock status

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("addStockModal"));
  modal.hide();

  // Reset form
  document.getElementById("stockForm").reset();
});


// // Handle Add Stock Form Submit
// document.getElementById("stockForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const name = document.getElementById("productName").value;
//   const type = document.getElementById("productType").value;
//   const category = document.getElementById("productCategory").value;
//   const qty = document.getElementById("productQty").value;
//   const cost = document.getElementById("costPrice").value;
//   const sell = document.getElementById("sellingPrice").value;
//   const supplier = document.getElementById("supplier").value;

//   // Add new row to table
//   const tbody = document.getElementById("stockTableBody");
//   const row = document.createElement("tr");
//   row.innerHTML = `
//     <td>${new Date().toISOString().split('T')[0]}</td>
//     <td>${name}</td>
//     <td>${type}</td>
//     <td>${category}</td>
//     <td class="qty">${qty}</td>
//     <td>${cost}</td>
//     <td>${sell}</td>
//     <td>${supplier}</td>
//     <td class="status"></td>
//   `;
//   tbody.appendChild(row);

//   // Re-check stock status
//   checkStock();

//   // Reset form
//  document.getElementById("stockForm").reset();

//   // Close modal
//   const modal = bootstrap.Modal.getInstance(document.getElementById("addStockModal")).hide();
//   modal.hide();

//   // Update delete options
//   updateDeleteOptions();
// });

// // Handle Delete Stock Form Submit
// document.getElementById("deleteStockForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const productToDelete = document.getElementById("deleteProduct").value;
//   const rows = document.querySelectorAll("#stockTableBody tr");
//   rows.forEach(row => {
//     if (row.children[1].textContent === productToDelete) {
//       row.remove();
//     }
//   });
//   updateDeleteOptions();
//   bootstrap.Modal.getInstance(document.getElementById("deleteStockModal")).hide();
// });

// // Update product options in delete modal
// function updateDeleteOptions() {
//   const products = document.querySelectorAll("#stockTableBody tr td:nth-child(2)");
//   const select = document.getElementById("deleteProduct");
//   select.innerHTML = "";
//   products.forEach(p => {
//     const option = document.createElement("option");
//     option.value = p.textContent;
//     option.textContent = p.textContent;
//     select.appendChild(option);
//   });
// }

// // Init on page load
// checkStock();
// updateDeleteOptions();
