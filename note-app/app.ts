// const validator = require('validator');
//const getNotes = require('./notes);



import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {addNote,  removeNote, listNotes, readNote} from './notes.js';

const yargsObject = yargs(hideBin(process.argv));

type argv = {
  title: string,
  body: string,
}


yargsObject.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      description: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv : argv) => {
    addNote(argv.title, argv.body)
  }
});



// yargs remove command
yargsObject.command({
  command: 'remove', 
  describe: 'remove a note', 
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    }
  }, 
  handler: (argv : argv) => {
    
    removeNote(argv.title);
  }
});




yargsObject.command({
  command: 'list',
  describe: 'list notes',
  handler: () => {
    listNotes();
  }
});



//yargs read command
yargsObject.command({
  command: 'read', 
  describe: 'read note', 
  builder: {
    title: {
      describe: 'Note title to be read',
      demandOption: true,
      type: 'string',
    }
  },    
  handler: (argv : argv) => {
    readNote(argv.title);
  }
});

yargsObject.parse();








