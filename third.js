const bookmarkContainer = document.getElementById("bookmark-container");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const addBookmarkButton = document.getElementById("add-bookmark");

function loadBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  renderBookmarks(bookmarks);
}

function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function renderBookmarks(bookmarks) {
  bookmarkContainer.innerHTML = "";
  bookmarks.forEach((bookmark, index) => {
    const bookmarkElement = document.createElement("div");
    bookmarkElement.className = "bookmark";

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.name;
    link.target = "_blank";

    const editButton = document.createElement("button");
    editButton.textContent = "Редагувати";
    editButton.onclick = () => editBookmark(index, bookmarks);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Видалити";
    deleteButton.onclick = () => {
      bookmarks.splice(index, 1);
      saveBookmarks(bookmarks);
      renderBookmarks(bookmarks);
    };

    bookmarkElement.appendChild(link);
    bookmarkElement.appendChild(editButton);
    bookmarkElement.appendChild(deleteButton);
    bookmarkContainer.appendChild(bookmarkElement);
  });
}

addBookmarkButton.addEventListener("click", () => {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Будь ласка, введіть назву та URL!");
    return;
  }

  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push({ name, url });
  saveBookmarks(bookmarks);
  renderBookmarks(bookmarks);

  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
});

function editBookmark(index, bookmarks) {
  const newName = prompt("Введіть нову назву:", bookmarks[index].name);
  const newUrl = prompt("Введіть новий URL:", bookmarks[index].url);

  if (newName && newUrl) {
    bookmarks[index] = { name: newName, url: newUrl };
    saveBookmarks(bookmarks);
    renderBookmarks(bookmarks);
  }
}

document.addEventListener("DOMContentLoaded", loadBookmarks);
