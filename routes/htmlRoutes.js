var path= require("path");
var fs = require("fs");



module.exports = function(app) {

    app.get(
        "/",
        function(req, res) {
            console.log(`Received a ${req.method} from URL ${req.url}`)
            res.sendFile(path.join(__dirname, "../public/index.html"));
        }
    )

    app.get(
        "/notes",
        function(req, res) {
            console.log(`Received a ${req.method} from URL ${req.url}`)
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        }
    )

    app.post(
        "*",
        function(req, res) {
            console.log(`Received a ${req.method} from URL ${req.url}`)
            res.sendFile(path.join(__dirname, "../public/index.html"));
        }
    )


};