document.addEventListener("DOMContentLoaded", loadFormData);

const form = document.getElementById("data-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", saveFormData);

function saveFormData(event) {
  event.preventDefault();
  const formData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  localStorage.setItem("formData", JSON.stringify(formData));
}

function loadFormData() {
  const formData = JSON.parse(localStorage.getItem("formData"));
  if (formData) {
    usernameInput.value = formData.username;
    passwordInput.value = formData.password;
  }
}
