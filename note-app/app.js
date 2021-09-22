"use strict";
// const validator = require('validator');
//const getNotes = require('./notes);
exports.__esModule = true;
var yargs_1 = require("yargs");
var helpers_1 = require("yargs/helpers");
var notes_js_1 = require("./notes.js");
var yargsObject = (0, yargs_1["default"])((0, helpers_1.hideBin)(process.argv));
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
    handler: function (argv) {
        (0, notes_js_1.addNote)(argv.title, argv.body);
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
            type: 'string'
        }
    },
    handler: function (argv) {
        (0, notes_js_1.removeNote)(argv.title);
    }
});
yargsObject.command({
    command: 'list',
    describe: 'list notes',
    handler: function () {
        (0, notes_js_1.listNotes)();
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
            type: 'string'
        }
    },
    handler: function (argv) {
        (0, notes_js_1.readNote)(argv.title);
    }
});
yargsObject.parse();
