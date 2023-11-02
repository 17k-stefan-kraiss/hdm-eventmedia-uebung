// Serialport

const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const port = new SerialPort({
  path: "/dev/tty.usbmodem141201",
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
parser.on("data", (data) => {
  console.log("data:", data);
});

/* Serial Ports ausgeben am Mac #

ls /dev/tty.*
ls /dev/cu.*

*/

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


// SOCKET IO
const { Server } = require("socket.io");
const io = new Server(server);


io.on("connection", (socket) => {
  console.log("a user connected");
  //console.log(socket);

  // EMIT MESSAGE TO EVERYONE CONNECTED:
  io.emit("message", {
    msg: "New User Connected!",
    id: socket.id,
  });

  // ADD LISTENERS HERE:
  socket.on("test", (msg) => {
    console.log("message: " + msg);

    // EMIT MESSAGE TO THE SPECIFIC CLIENT:
    socket.emit("message", {
      msg: "Hello Clients!",
      value: 1234,
      online: true,
    });
  });
}); */
