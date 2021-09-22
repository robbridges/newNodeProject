"use strict";
exports.__esModule = true;
exports.readNote = exports.listNotes = exports.removeNote = exports.addNote = void 0;
var chalk = require("chalk");
var fs = require("fs");
// add a note
var addNote = function (title, body) {
    var notes = loadNotes();
    var duplicateNoteSingular = notes.find(function (note) { return note.title === title; });
    if (!duplicateNoteSingular) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green('New note added'));
    }
    else {
        console.log(chalk.red("You've already added a note of this title"));
    }
};
exports.addNote = addNote;
//remove notes
var removeNote = function (title) {
    var notes = loadNotes();
    var newNotes = notes.filter(function (note) {
        return note.title !== title;
    });
    if (newNotes.length < notes.length) {
        console.log(chalk.bgGreen.black('Note removed'));
        saveNotes(newNotes);
    }
    else {
        console.log(chalk.bgRed('Note not found'));
    }
};
exports.removeNote = removeNote;
// list all notes
var listNotes = function () {
    var notes = loadNotes();
    console.log(chalk.blue.inverse('Your notes'));
    notes.forEach(function (note) {
        console.log(note.title);
    });
};
exports.listNotes = listNotes;
// read specific note
var readNote = function (title) {
    var notes = loadNotes();
    var noteToRead = notes.find(function (note) { return note.title === title; });
    if (noteToRead) {
        console.log(chalk.bold.underline('Title: %s'), noteToRead.title);
        console.log('Body: ' + noteToRead.body);
    }
    else {
        console.log(chalk.red.inverse('No note found!'));
    }
};
exports.readNote = readNote;
var saveNotes = function (notes) {
    var dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};
var loadNotes = function () {
    try {
        var dataBuffer = fs.readFileSync('notes.json');
        var dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
};
