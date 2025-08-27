document.getElementById("searchBox").addEventListener("keyup", function() {
  let filter = this.value.toLowerCase();
  let rows = document.querySelectorAll("table tbody tr");
  
  rows.forEach(row => {
    let text = row.innerText.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
});

document.querySelectorAll("th").forEach((header, index) => {
  header.addEventListener("click", () => {
    let rows = Array.from(document.querySelectorAll("table tbody tr"));
    let sorted = rows.sort((a, b) => {
      let A = a.cells[index].innerText.trim();
      let B = b.cells[index].innerText.trim();
      return A.localeCompare(B, undefined, {numeric:true});
    });
    let tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";
    sorted.forEach(r => tbody.appendChild(r));
  });
});

document.querySelectorAll("table tbody tr").forEach(row => {
  let total = row.cells[5].innerText.replace(/,/g, "");
  if (parseInt(total) > 10000000) {
    row.style.backgroundColor = "#ffef96"; // light yellow
  }
});

function calculateTotal() {
  let sum = 0;
  document.querySelectorAll("table tbody tr").forEach(row => {
    let total = row.cells[5].innerText.replace(/,/g, "");
    sum += parseInt(total) || 0;
  });
  document.getElementById("grandTotal").innerText = "Grand Total: UGX " + sum.toLocaleString();
}

calculateTotal();
