function fetchUsers() {
  return new Promise((resolve, reject) => {
    const success = true; // toggle to false to test rejection

    setTimeout(() => {
      if (success) {
        resolve([
          { id: 1, name: "Urwa" },
          { id: 2, name: "Umer" },
          { id: 3, name: "Shahwaiz" }
        ]);
      } else {
        reject("Failed to load users.");
      }
    }, 3000);
  });
}

const tbody = document.getElementById("user-body");

fetchUsers()
  .then(users => {
    tbody.innerHTML = users.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
      </tr>
    `).join("");
  })
  .catch(error => {
    tbody.innerHTML = `
      <tr>
        <td colspan="2" class="error">${error}</td>
      </tr>
    `;
  });