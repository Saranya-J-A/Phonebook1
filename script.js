const apiURL = "https://6874ce87dd06792b9c954ff9.mockapi.io/api/phonebook/phonebook";

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const contactIdInput = document.getElementById("contactId");
const contactList = document.getElementById("contactList");

async function loadContacts() {
  const res = await fetch(apiURL);
  const contacts = await res.json();

  contactList.innerHTML = '';
  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${contact.name}</strong>: ${contact.phone}
      <button onclick="editContact('${contact.id}', '${contact.name}', '${contact.phone}')">✏️ Edit</button>
      <button onclick="deleteContact('${contact.id}')">🗑️ Delete</button>
    `;
    contactList.appendChild(li);
  });
}

// Add or update contact
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const id = contactIdInput.value;

  if (!name || !phone) return;

  const contact = { name, phone };

  if (id) {
    // Update
    await fetch(`${apiURL}/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
  } else {
    // Add
    await fetch(apiURL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
  }

  form.reset();
  loadContacts();
});

// Delete contact
async function deleteContact(id) {
  await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
  loadContacts();
}

// Edit contact
function editContact(id, name, phone) {
  contactIdInput.value = id;
  nameInput.value = name;
  phoneInput.value = phone;
}

// Initial load
loadContacts();
