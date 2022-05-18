const noteContainer = document.getElementById("app");
const addBtn = document.getElementById("add_button");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  noteContainer.insertBefore(noteElement, addBtn);
});

addBtn.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = content;
  element.placeholder = "write a things you want.";

  element.addEventListener("change", () => {
    updateNotes(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const deleteConfirm = confirm("Are you sure to delete this note?");
    if (deleteConfirm) {
      deleteNotes(id, element);
    }
  });
  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Date.now(),
    content: "",
  };
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  noteContainer.insertBefore(noteElement, addBtn);
  notes.push(noteObject);
  saveNotes(notes);
}

function updateNotes(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];
  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNotes(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  noteContainer.removeChild(element);
}
