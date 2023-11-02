/* ------ SOCKET.IO Stuff ------ */
var socket = io();

// RECEIVE MESSAGE FROM SERVER
socket.on("message", function (data) {
  console.log(data, socket);

  var h1 = document.getElementById("code");
  h1.innerHTML = data;

  if (data.id === socket.id) console.log("THAT'S ME!");
  else console.log("THAT'S SOMEONE ELSE");
});
