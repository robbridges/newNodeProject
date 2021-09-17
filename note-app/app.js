// const validator = require('validator');
//const getNotes = require('./notes);

import chalk from 'chalk'

import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {getNotes, addNote, loadNotes} from './notes.js';

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
   
  handler: () => {
    console.log('Removing old note!');
  }
});




yargsObject.command({
  command: 'list',
  describe: 'list notes',
  
  handler: () => {
    console.log('Listing your notes');
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








