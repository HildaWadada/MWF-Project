    const form = document.getElementById("attendantForm");
    const tableBody = document.getElementById("attendantTableBody");
    let editRow = null;

    // Add or Edit Attendant
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("attendantName").value;
      const role = document.getElementById("attendantRole").value;
      const phone = document.getElementById("attendantPhone").value;
      const email = document.getElementById("attendantEmail").value;
      const status = document.getElementById("attendantStatus").value;

      const statusClass = status === "Active" ? "text-success" : "text-danger";
      const statusText = status === "Active" ? "Active ✅" : "Inactive ❌";

      if (editRow) {
        // Update existing row
        editRow.innerHTML = `
          <td>${name}</td>
          <td>${role}</td>
          <td>${phone}</td>
          <td>${email}</td>
          <td class="${statusClass}">${statusText}</td>
          <td>
            <button class="btn btn-sm btn-warning edit-btn">✏️ Edit</button>
            <button class="btn btn-sm btn-danger delete-btn">🗑 Delete</button>
          </td>`;
        editRow = null;
      } else {
        // Add new row
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${name}</td>
          <td>${role}</td>
          <td>${phone}</td>
          <td>${email}</td>
          <td class="${statusClass}">${statusText}</td>
          <td>
            <button class="btn btn-sm btn-warning edit-btn">✏️ Edit</button>
            <button class="btn btn-sm btn-danger delete-btn">🗑 Delete</button>
          </td>`;
        tableBody.appendChild(row);
      }

      form.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById("addAttendantModal"));
      modal.hide();
    });

    // Edit & Delete Buttons
    tableBody.addEventListener("click", function(e) {
      if (e.target.classList.contains("edit-btn")) {
        editRow = e.target.closest("tr");
        document.getElementById("attendantName").value = editRow.children[0].textContent;
        document.getElementById("attendantRole").value = editRow.children[1].textContent;
        document.getElementById("attendantPhone").value = editRow.children[2].textContent;
        document.getElementById("attendantEmail").value = editRow.children[3].textContent;
        document.getElementById("attendantStatus").value = editRow.children[4].textContent.includes("Active") ? "Active" : "Inactive";
        new bootstrap.Modal(document.getElementById("addAttendantModal")).show();
      }

      if (e.target.classList.contains("delete-btn")) {
        e.target.closest("tr").remove();
      }
    });

    // Search Function
    document.getElementById("searchAttendant").addEventListener("input", function() {
      const search = this.value.toLowerCase();
      Array.from(tableBody.rows).forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(search) ? "" : "none";
      });
    });

    // Array to store attendants
let attendants = [];

// Function to render table
function renderTable() {
  const tbody = document.getElementById("attendantTableBody");
  tbody.innerHTML = ""; // Clear current rows
  attendants.forEach((attendant, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${attendant.date}</td>
      <td>${attendant.name}</td>
      <td>${attendant.email}</td>
      <td>${attendant.phone}</td>
      <td class="${attendant.status === 'Active' ? 'text-success' : 'text-danger'}">${attendant.status}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editAttendant(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteAttendant(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Add attendant form submission
document.getElementById("addAttendantForm").addEventListener("submit", function(e){
  e.preventDefault(); // prevent page reload

  const date = document.getElementById("attendantDate").value;
  const name = document.getElementById("attendantName").value;
  const email = document.getElementById("attendantEmail").value;
  const phone = document.getElementById("attendantPhone").value;
  const status = document.getElementById("attendantStatus").value;

  attendants.push({ date, name, email, phone, status }); // Save to array
  renderTable(); // Update table

  // Close modal & reset form
  bootstrap.Modal.getInstance(document.getElementById("addAttendantModal")).hide();
  document.getElementById("addAttendantForm").reset();
});

// Delete attendant
function deleteAttendant(index) {
  if(confirm("Are you sure you want to delete this attendant?")) {
    attendants.splice(index, 1);
    renderTable();
  }
}

// Edit attendant
function editAttendant(index) {
  const attendant = attendants[index];
  document.getElementById("attendantDate").value = attendant.date;
  document.getElementById("attendantName").value = attendant.name;
  document.getElementById("attendantEmail").value = attendant.email;
  document.getElementById("attendantPhone").value = attendant.phone;
  document.getElementById("attendantStatus").value = attendant.status;

  attendants.splice(index, 1); // Remove old entry
  renderTable();

  // Open modal
  new bootstrap.Modal(document.getElementById("addAttendantModal")).show();
}
