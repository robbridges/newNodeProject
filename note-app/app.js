// const validator = require('validator');
//const getNotes = require('./notes);

import chalk from 'chalk'
import { argv } from 'process';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import message from './notes.js'

const yargsObject = yargs(hideBin(process.argv));
const userInput= yargs(hideBin(process.argv)).argv

// yargs add command
yargsObject.command(
  'add', 
  'add a note', 
  () => {}, 
  () => {
    console.log('adding new note!');
  }
)
.argv


// yargs remove command
yargsObject.command(
  'remove', 
  'remove a note', 
  () => {}, 
  () => {
    console.log('Removing old note!');
  }
)
.demandCommand(1)
.argv


yargsObject.command(
  'list',
  'list notes',
  () => {},
  () => {
    console.log('Listing your notes');
  }
)
.argv


//yargs read command
yargsObject.command(
  'read', 
  'read note', 
  () => {
    console.log('reading note context');
  }, 
  () => {
    
  }
)
.argv


// console.log(userInput);





