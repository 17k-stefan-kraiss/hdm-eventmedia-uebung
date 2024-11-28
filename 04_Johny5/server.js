// JOHNE FIVE - ARDUINO

const five = require("johnny-five");
let button;
let led;
let sensor;

five.Board().on("ready", function () {
  // Button definieren
  button = new five.Button({
    pin: 2,
    isPullup: true,
  });

  // LED Pin definieren
  led = new five.Led(13);

  // Event um Werteänderung des Buttons zu empfangen
  button.on("down", function (value) {
    led.on();
  });

  button.on("up", function () {
    led.off();
  });

  /*
  // Helligkeitssensor initialisieren
  sensor = new five.Light("A0");
  // Event um Werteänderung des Sensors zu empfangen
  sensor.on("change", function () {
    console.log(this.level);
  }); */
});

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
