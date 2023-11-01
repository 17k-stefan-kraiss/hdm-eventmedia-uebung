const express = require("express");
const path = require("path");

const app = express();
const port = 8080;

// Hauptseite
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/www/index.html"));
});

// Weitere Route
app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/www/about.html"));
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
