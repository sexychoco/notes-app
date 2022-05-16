const noteContainer = document.getElementById("note_container");
const addButton = document.getElementById("add_button");

function getNotes() {
  return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem(JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.placeholder = "write a thing to do.";
  element.classList.add("notes");
  element.value = content;
  element.addEventListener("change", () => {
    updateNotes(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure to delete?");
    if (doDelete) {
      deleteNote(id, element);
    }
  });
  return element;
}

function addNotes() {
  const notes = getNotes();
  const noteObject = {
    id: Date.now(),
    content: "",
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  noteContainer.insertBefore(noteElement, addButton);

  notes.puah(noteObject);
  saveNotes(notes);
}

function updateNotes(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];
  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  noteContainer.removeChild(element);
}

addButton.addEventListener("click", () => addNotes());
