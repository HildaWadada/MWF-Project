document.addEventListener("DOMContentLoaded", () => {
  const stockForm = document.getElementById("stockForm");

  if (stockForm) {
    stockForm.addEventListener("submit", function (e) {
      e.preventDefault(); // stop form from refreshing instantly

      // Collect form data
      const formData = new FormData(stockForm);
      const data = Object.fromEntries(formData.entries());

      console.log("Submitting stock data:", data);

      // Send data via fetch
      fetch("/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to save stock");
          return res.text();
        })
        .then((msg) => {
          alert("✅ Stock saved successfully!");
          stockForm.reset();
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("❌ Failed to save stock.");
        });
    });
  }
});
