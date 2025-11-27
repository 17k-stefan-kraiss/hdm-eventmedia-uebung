// Serialport

const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const port = new SerialPort({
  path: "/dev/tty.usbserial-0001", // COM3, COM4, COM5, COM6 etc. auf Windows
  baudRate: 115200,
});

/* 
Serial Ports ausgeben am Mac #

ls /dev/tty.*
ls /dev/cu.*

Windows: 
Gerätemanager > Anschlüsse (COM & LPT) > Arduino Port suchen

*/
let sensorData = 0;
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// RECEIVE MESSAGE FROM SERIALPORT / ARDUINO

// Event wenn Parser neue Zeile empfängt

parser.on("data", (data) => {
  console.log("data:", data);
  sensorData = data;
});

// ---  ab hier Server Code um Daten weiterzuleiten
/*
const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const SERVER_PORT = 8080;

// ROUTE FÜR HAUPTSEITE > SERVED index.html file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/www/index.html"));
});

app.use(express.static("www")); // ALLE FILES IM ORDNER STATISCH ZUR VERFÜGUNG STELLEN, DAMIT AUCH ASSETS UND SCRIPTE GESERVED WERDEN

// HTTP SERVER FÜR SOCKT UND HTTP --> STARTMESSAGE
server.listen(SERVER_PORT, () => {
  console.log("Server started at http://localhost:" + SERVER_PORT);
});

// SOCKET IO UM DATEN AN BROWSER ZU SENDEN
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  //console.log(socket);

  socket.on("button", (msg) => {
    console.log("message: " + msg);

    // EMIT MESSAGE TO THE ALL OTHER CLIENTS:
    //socket.broadcast.emit("mouse", msg);
  });

  // RECEIVE MESSAGE FROM SERIALPORT / ARDUINO
});

parser.on("data", (data) => {
  //console.log("data:", data);
  io.emit("message", data); // Daten an Frontend weiter senden
}); */
