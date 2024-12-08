const contactList = document.getElementById("contact-list");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addContactButton = document.getElementById("add-contact");

function loadContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  renderContacts(contacts);
}

function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts(contacts) {
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const contactElement = document.createElement("div");
    contactElement.className = "contact";

    const contactInfo = document.createElement("p");
    contactInfo.textContent = `${contact.firstName} ${contact.lastName}, Телефон: ${contact.phone}, Email: ${contact.email}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Редагувати";
    editButton.onclick = () => editContact(index, contacts);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Видалити";
    deleteButton.onclick = () => {
      contacts.splice(index, 1);
      saveContacts(contacts);
      renderContacts(contacts);
    };

    contactElement.appendChild(contactInfo);
    contactElement.appendChild(editButton);
    contactElement.appendChild(deleteButton);
    contactList.appendChild(contactElement);
  });
}

addContactButton.addEventListener("click", () => {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (!firstName || !lastName || !phone || !email) {
    alert("Будь ласка, заповніть всі поля!");
    return;
  }

  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push({ firstName, lastName, phone, email });
  saveContacts(contacts);
  renderContacts(contacts);

  firstNameInput.value = "";
  lastNameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
});

function editContact(index, contacts) {
  const contact = contacts[index];

  const newFirstName =
    prompt("Нове ім'я:", contact.firstName) || contact.firstName;
  const newLastName =
    prompt("Нове прізвище:", contact.lastName) || contact.lastName;
  const newPhone = prompt("Новий телефон:", contact.phone) || contact.phone;
  const newEmail =
    prompt("Нова електронна адреса:", contact.email) || contact.email;

  contacts[index] = {
    firstName: newFirstName,
    lastName: newLastName,
    phone: newPhone,
    email: newEmail,
  };

  saveContacts(contacts);
  renderContacts(contacts);
}

document.addEventListener("DOMContentLoaded", loadContacts);
