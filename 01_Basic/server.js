const path = require("path");

const express = require("express");
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

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, "www")));

app.listen(port);
console.log("Server started at http://localhost:" + port);
