import chalk = require('chalk');
import fs = require('fs');

type note = {
  title: string,
  body: string
}



// add a note
const addNote = (title : string, body: string) => {
  const notes = loadNotes();
  
  const duplicateNoteSingular = notes.find((note : note) => note.title === title);

  if (!duplicateNoteSingular) {
    notes.push({
      title,
      body,
    })
    saveNotes(notes);
    console.log(chalk.green('New note added'));
  } else {
    console.log(chalk.red("You've already added a note of this title"));
  }
}

//remove notes

const removeNote = (title: string) => {
  const notes = loadNotes();

  const newNotes = notes.filter((note : note) => {
    return note.title !== title;
  });


  if (newNotes.length < notes.length) {
    console.log(chalk.bgGreen.black('Note removed'));
    saveNotes(newNotes);
  } else {
    console.log(chalk.bgRed('Note not found'));
  }
}

// list all notes

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('Your notes'));
  notes.forEach((note : note) => {
    console.log(note.title);
  })
}

// read specific note

const readNote = (title: string) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note : note) => note.title === title);
  if (noteToRead) {
    console.log(chalk.bold.underline('Title: %s'), noteToRead.title);
    console.log('Body: ' + noteToRead.body);
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
}


 

const saveNotes = (notes: note[]) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
  
}



export {
  
  addNote,
  removeNote,
  listNotes,
  readNote,
}