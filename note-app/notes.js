import chalk from 'chalk';
import fs from 'fs';


const getNotes = () => {
  return "Your notes";
}

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter( (note) => {
    return note.title === title;
  })

  if (!duplicateNotes.length) {
    notes.push({
      title,
      body,
    })
    saveNotes(notes);
    console.log(chalk.green(' New note added'));
  } else {
    console.log(chalk.red("You've already added a note of this title"));
  }

  

  
}

const saveNotes = (notes) => {
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

// non es6 syntax
// module.exports = getNotes;

export {
  getNotes,
  addNote,
  loadNotes,
}