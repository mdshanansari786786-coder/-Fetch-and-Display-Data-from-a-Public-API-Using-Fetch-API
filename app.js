const usersContainer = document.getElementById("users");
const errorDiv = document.getElementById("error");
const reloadButton = document.getElementById("reload-btn");

async function fetchUsers() {
  usersContainer.innerHTML = "";         // Clear old content
  errorDiv.textContent = "";             // Clear errors

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const users = await response.json();

    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong><br>
           ${user.address.street}, ${user.address.city}
        </p>
      `;
      usersContainer.appendChild(card);
    });

  } catch (err) {
    errorDiv.textContent = "Error fetching data: " + err.message;
  }
}

// Load users on page load
fetchUsers();

// Reload button
reloadButton.addEventListener("click", fetchUsers);
