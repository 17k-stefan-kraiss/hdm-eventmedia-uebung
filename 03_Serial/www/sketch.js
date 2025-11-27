/* ------ SOCKET.IO Stuff ------ */
var socket = io();

// RECEIVE MESSAGE FROM SERVER

/*// ---- Vanilla Javascript Beispiel ----
let count = 0;
socket.on("message", function (data) {
  // console.log(data, socket);

  // DATEN ANZEIGEN
  var h1 = document.getElementById("code");
  h1.innerHTML = data;

  // BLOCK GRÖSSE ÄNDERN
  var block = document.getElementById("block");
  block.style.width = data * 100 + "px";
  block.style.height = data * 100 + "px";

  if (data > 0) {
    count++;
    var counter = document.getElementById("counter");
    counter.innerHTML = count;
  }

  if (data.id === socket.id) console.log("THAT'S ME!");
  else console.log("THAT'S SOMEONE ELSE");
}); */

// ---- Vanilla Javascript Beispiel ENDE ----

// SEND MESSAGE TO SERVER
document.getElementById("button").addEventListener("click", function () {
  socket.emit("button", "pressed");
});

// ––– P5.js Beispiel –––
let ellipseSize = 0;

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(220);

  ellipse(width / 2, height / 2, ellipseSize, ellipseSize);

  // for (let x = 0; x < 20; x++) {
  //   for (let y = 0; y < 20; y++) {
  //     let size = sin(frameCount * 0.05 + x * 0.5 + y * 0.5) * 50;

  //     if (ellipseSize > 0) {
  //       fill("black");
  //     } else {
  //       fill("white");
  //     }
  //     ellipse(x * 50, y * 50, size, size);
  //   }
  // }
}

socket.on("message", function (data) {
  // Update ellipse size based on data

  ellipseSize = data * 200;
});

// ––– P5.js Beispiel ENDE ––– */
