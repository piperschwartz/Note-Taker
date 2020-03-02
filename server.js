const path = require("path");
var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public',express.static(__dirname + "/public"));
app.use(express.static('/'));



require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on localhost: " + PORT);
});