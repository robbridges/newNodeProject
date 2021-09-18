// const validator = require('validator');
//const getNotes = require('./notes);

import chalk from 'chalk'

import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {addNote,  removeNote, listNotes} from './notes.js';

const yargsObject = yargs(hideBin(process.argv));
const userInput= yargs(hideBin(process.argv)).argv



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
  handler: (argv) => {
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
  handler: (argv) => {
    
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
  
  handler: () => {
    console.log('reading note context');
  }
});

yargsObject.parse();








