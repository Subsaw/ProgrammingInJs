function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  return notes;
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes() {
  const notes = loadNotes();
  const notesContainer = document.getElementById("notesContainer");
  notesContainer.innerHTML = "";

  notes.sort((a, b) => b.pin - a.pin);

  notes.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    if (note.pin) noteDiv.classList.add("pinned");
    noteDiv.style.backgroundColor = note.color;
    noteDiv.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <small>${new Date(note.date).toLocaleString()}</small>
            <button onclick="deleteNote('${note.date}')">Usuń</button>
        `;
    notesContainer.appendChild(noteDiv);
  });
}

function saveNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const color = document.getElementById("color").value;
  const pin = document.getElementById("pin").checked;
  const date = new Date().toISOString();

  if (title && content) {
    const note = { title, content, color, pin, date };
    const notes = loadNotes();
    notes.push(note);
    saveNotes(notes);
    displayNotes();
    clearForm();
  } else {
    alert("Tytuł i treść są wymagane");
  }
}

function deleteNote(date) {
  const notes = loadNotes();
  const updatedNotes = notes.filter((note) => note.date !== date);
  saveNotes(updatedNotes);
  displayNotes();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("color").value = "#ffffff";
  document.getElementById("pin").checked = false;
}

document.addEventListener("DOMContentLoaded", displayNotes);

// daty
// const terazTimestamp = Date.now();
// const teraz = new Date(terazTimestamp);
// console.log(teraz.toLocaleString());

// localStorage
// zapisywanie
// localStorage.setItem(key, value)
// pobieranie
// localStorage.getItem(key)
