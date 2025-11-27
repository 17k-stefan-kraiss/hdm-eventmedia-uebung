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

// HTTP SERVER FÜR SOCKET UND HTTP --> STARTMESSAGE
server.listen(SERVER_PORT, () => {
  console.log("Server started at http://localhost:" + SERVER_PORT);
});

// SOCKET IO
const { Server } = require("socket.io");

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // EMIT MESSAGE TO EVERYONE CONNECTED:
  // io.emit("message", {
  //   msg: "New User Connected!",
  //   id: socket.id,
  // });

  // // ADD LISTENERS HERE:
  // socket.on("test", (msg) => {
  //   console.log("test message: " + msg);

  //   // EMIT MESSAGE TO THE SPECIFIC CLIENT:
  //   socket.emit("message", {
  //     msg: "Hello Client!",
  //     value: 1234,
  //     online: true,
  //   });
  // });

  // socket.on("mouse", (msg) => {
  //   console.log("message: " + msg);

  //   // EMIT MESSAGE TO THE ALL OTHER CLIENTS:
  //   socket.broadcast.emit("mouse", msg);
  // });
});
