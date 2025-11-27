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

// Store client data: { socketId: { value: 0, color: string } }
const clients = new Map();

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// --- Express and Socket.io Server Setup
const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const SERVER_PORT = 8080;

// ROUTE FÜR HAUPTSEITE > SERVED index.html file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/www/multiplayer.html"));
});

app.use(express.static("www")); // ALLE FILES IM ORDNER STATISCH ZUR VERFÜGUNG STELLEN

// HTTP SERVER FÜR SOCKET UND HTTP --> STARTMESSAGE
server.listen(SERVER_PORT, () => {
  console.log("Multiplayer Server started at http://localhost:" + SERVER_PORT);
});

// SOCKET IO UM DATEN AN BROWSER ZU SENDEN
const { Server } = require("socket.io");
const io = new Server(server);

// Generate random color for client
function getRandomColor() {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Check if all clients have value > 0
function checkAllClientsActive() {
  if (clients.size === 0) return false;

  for (let [socketId, clientData] of clients) {
    if (clientData.value <= 0) {
      return false;
    }
  }
  return true;
}

// Broadcast current state to all clients
function broadcastState() {
  const clientsArray = Array.from(clients.entries()).map(([id, data]) => ({
    id,
    value: data.value,
    color: data.color,
  }));

  const allActive = checkAllClientsActive();

  io.emit("state", {
    clients: clientsArray,
    success: allActive,
  });
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Add new client with default value 0 and random color
  clients.set(socket.id, {
    value: 0,
    color: getRandomColor(),
  });

  // Broadcast updated state
  broadcastState();

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    clients.delete(socket.id);
    broadcastState();
  });
});

// RECEIVE MESSAGE FROM SERIALPORT / ARDUINO
parser.on("data", (data) => {
  console.log("Serial data:", data);

  // Update all connected clients with the same serial value
  // In a real multiplayer scenario, each client would have their own Arduino
  // For demo purposes, we'll update all clients
  for (let [socketId, clientData] of clients) {
    clientData.value = parseInt(data) || 0;
  }

  broadcastState();
});
