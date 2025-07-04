/* ------ SOCKET.IO Stuff ------ */
var socket = io();

// RECEIVE MESSAGE FROM SERVER

// ---- Vanilla Javascript Beispiel ----
let count = 0;
socket.on("message", function (data) {
  // console.log(data, socket);

  // DATEN ANZEIGEN
  var h1 = document.getElementById("code");
  h1.innerHTML = data;

  // BLOCK GRÖSSE ÄNDERN
  var block = document.getElementById("block");
  block.style.width = data + "px";
  block.style.height = data + "px";

  if (data > 0) {
    count++;
    var counter = document.getElementById("counter");
    counter.innerHTML = count;
  }

  if (data.id === socket.id) console.log("THAT'S ME!");
  else console.log("THAT'S SOMEONE ELSE");
});

// ---- Vanilla Javascript Beispiel ENDE ----

// SEND MESSAGE TO SERVER
document.getElementById("button").addEventListener("click", function () {
  socket.emit("button", "pressed");
});

/*// ––– P5.js Beispiel –––
let ellipseSize = 0;

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(220);

  ellipse(width / 2, height / 2, ellipseSize, ellipseSize);
}

socket.on("message", function (data) {
  // Update ellipse size based on data

  ellipseSize = data * 200;
});

// ––– P5.js Beispiel ENDE ––– */
