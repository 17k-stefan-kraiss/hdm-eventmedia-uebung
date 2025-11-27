/* ------ SOCKET.IO Multiplayer ------ */
var socket = io();

// Store clients data
let clientsData = [];
let successState = false;

// RECEIVE STATE FROM SERVER
socket.on("state", function (data) {
  clientsData = data.clients;
  successState = data.success;
});

// ––– P5.js Multiplayer Visualization –––
function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  background(30);

  // Draw circles for each connected client
  if (clientsData.length > 0) {
    const spacing = width / (clientsData.length + 1);

    for (let i = 0; i < clientsData.length; i++) {
      const client = clientsData[i];
      const x = spacing * (i + 1);
      const y = height / 2;

      // Circle size based on value (active if > 0)
      const baseSize = 100;
      const maxSize = 200;
      const size = client.value > 0 ? maxSize : baseSize;

      // Draw circle with client's color
      fill(client.color);
      if (client.value > 0) {
        stroke(255);
        strokeWeight(4);
      } else {
        stroke(100);
        strokeWeight(2);
      }

      ellipse(x, y, size, size);

      // Draw client ID below circle
      noStroke();
      fill(200);
      textSize(12);
      text(client.id.substring(0, 8), x, y + size / 2 + 20);

      // Draw value inside circle
      fill(255);
      textSize(24);
      text(client.value, x, y);
    }
  } else {
    // No clients connected
    fill(150);
    textSize(24);
    text("Waiting for clients to connect...", width / 2, height / 2);
  }

  // Display success message when all clients are active
  if (successState && clientsData.length > 0) {
    fill(0, 255, 0);
    textSize(64);
    text("SUCCESS!", width / 2, 100);

    // Add some visual flair
    noFill();
    stroke(0, 255, 0);
    strokeWeight(8);
    const pulseSize = 300 + sin(frameCount * 0.1) * 50;
    ellipse(width / 2, 100, pulseSize, pulseSize);
  }

  // Display client count
  fill(200);
  textSize(16);
  noStroke();
  text(`Connected Clients: ${clientsData.length}`, width / 2, height - 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
