var fs = require("fs");
var path = require("path");

var notes = require("../db");


module.exports = function(app) {
    fs.readFile("db.json", "utf8", function(err,data) {
        if (err) throw err;
        notes = JSON.parse(data);
    })
        app.get(
        "/api/notes",
        function(req, res) {
            console.log(`Received a ${req.method} request from ${req.url}`)
            res.json(notes);
        }
    )

    app.post(
        "/api/notes",
        function(res, req) {
            console.log(`Received a ${req.method} request from ${req.url}`)
            console.log(req.body)
            var newNote = req.body;
            notes.push(newNote);
            res.json({ok: true})
            let data = JSON.stringify(notes);
            fs.writeFile(path.join('db.json'),data, function(err) {
                if (err) throw err;
                console.log("It worked");
            });
        
        }
    )

    app.delete(
        "/api/notes/:id",
        function(req, res) {
            var deleteNote = req.params.id;
            for (i = 0; i < notes.length; i++) {
                if (deleteNote === notes[i].title) {
                    notes.splice(i,1)
                };
            };
            let data = JSON.stringify(notes);
            fs.writeFile(path.join("db.json"), data, function(err) {
                if (err) throw err;
                

            })
            console.log(notes);
            res.json(notes);

        })};