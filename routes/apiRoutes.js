var fs = require("fs");
var path = require("path");
var notes = require("../db/db.json");
const express = require("express");
const app = express();
require("./htmlRoutes")(app);

module.exports = function(app) {
        app.get(
        "/api/notes",
        function(req, res) {
            console.log(`Received a ${req.method} request from ${req.url}`)
            res.json(notes)
        }
    );

    app.post(
        "/api/notes",
        function(req, res) {
            console.log(`Received a ${req.method} request from ${req.url}`)
            console.log(req.body)
            var notePost = req.body;
            notes.push(notePost);
            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) throw err;
                console.log("It worked");
                res.sendFile(path.join(__dirname, "../public/notes.html"));
            });
        })

    app.delete(
        "/api/notes/:id",
        function(req, res) {

            let deleteNote = req.params.id;
            const updateNote = notes.filter(note => note.id !== deleteNote)
            notes.splice(updateNote, 1);
            fs.writeFile("./db/db.json", JSON.stringify(notes),  (err) => {
                if (err) throw err;
                console.log(`${deleteNote} was deleted`);
                return res.json({ ok: true })

            });
            
        })};