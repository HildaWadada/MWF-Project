document.addEventListener("DOMContentLoaded", () => {
  const stockForm = document.getElementById("stockForm");
  const stockTable = document.getElementById("stockTable").getElementsByTagName("tbody")[0];
  const searchInput = document.getElementById("searchInput");

  // Handle form submit
  stockForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: stockForm.name.value,
      type: stockForm.type.value,
      category: stockForm.category.value,
      quantity: Number(stockForm.quantity.value),
      cost: Number(stockForm.cost.value),
      price: Number(stockForm.price.value),
      supplier: stockForm.supplier.value,
      status: stockForm.status.value,
      lastUpdate: new Date().toISOString()
    };

    try {
      // Send POST request to server
      const res = await fetch("/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const newStock = await res.json();

      // Add new row to table
      const row = stockTable.insertRow();
      row.innerHTML = `
        <td>${new Date(newStock.lastUpdate).toLocaleDateString()}</td>
        <td>${newStock.name}</td>
        <td>${newStock.type}</td>
        <td>${newStock.category}</td>
        <td>${newStock.quantity}</td>
        <td>${newStock.cost.toLocaleString()}</td>
        <td>${newStock.price.toLocaleString()}</td>
        <td>${newStock.supplier}</td>
        <td>${newStock.status}</td>
      `;

      // Reset form and close modal
      stockForm.reset();
      const modalEl = document.getElementById('addStockModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

    } catch (err) {
      console.error("Error adding stock:", err);
      alert("Unable to add stock.");
    }
  });

  // Optional: filter table by search
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    Array.from(stockTable.rows).forEach(row => {
      row.style.display = row.cells[1].textContent.toLowerCase().includes(filter) ? "" : "none";
    });
  });
});
