/* ------ SOCKET.IO Stuff ------ */
var socket = io();

// RECEIVE MESSAGE FROM SERVER
socket.on("message", function (data) {
  console.log(data, socket);

  // DATEN ANZEIGEN
  var h1 = document.getElementById("code");
  h1.innerHTML = data;

  // BLOCK GRÖSSE ÄNDERN
  var block = document.getElementById("block");
  block.style.width = 400 - data + "px";
  block.style.height = 400 - data + "px";

  if (data.id === socket.id) console.log("THAT'S ME!");
  else console.log("THAT'S SOMEONE ELSE");
});
