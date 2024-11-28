/* ------ SOCKET.IO Stuff ------ */
var socket = io();

// SIMPLE BUTTON THAT EMITS MESSAGE
var testButton = document.getElementById("test");
testButton.addEventListener("click", function (e) {
  console.log("Test button pressed");
  socket.emit("test", "Hello World!"); // SEND VALUE TO SERVER
});

// // RECEIVE MESSAGE FROM SERVER
socket.on("message", function (data) {
  console.log(data, socket);

  if (data.id === socket.id) console.log("THAT'S ME!");
  else console.log("THAT'S SOMEONE ELSE");
});

// MOUSE MOVEMENT EMIT
window.addEventListener("mousemove", function (e) {
  socket.emit("mouse", { x: e.clientX, y: e.clientY, id: socket.id });

  // SHOW OWN MOUSE
  var myMouse = document.getElementById("myMouse");
  myMouse.style.left = e.clientX + "px";
  myMouse.style.top = e.clientY + "px";
});

// RECEIVE MOUSE MOVEMENT FROM SERVER
socket.on("mouse", function (data) {
  if (data.id === socket.id) console.log("THAT'S ME!");
  else {
    // IF ELEMEMT DOES NOT EXIST, CREATE NEW MOUSE
    if (!document.getElementById(data.id)) {
      // CREATE NEW MOUSE DIV
      var div = document.createElement("div");
      div.classList.add("mouse");
      div.id = data.id;
      // SET POSITION AND RANDOM COLOR
      div.style.left = data.x + "px";
      div.style.top = data.y + "px";
      div.style.backgroundColor = `rgba(${Math.random() * 255}, ${
        Math.random() * 255
      }, ${Math.random() * 255}, 1)`;
      document.body.appendChild(div);
    } else {
      // IF ELEMENT EXISTS, UPDATE POSITION
      var div = document.getElementById(data.id);
      if (div) {
        div.style.left = data.x + "px";
        div.style.top = data.y + "px";
      }
    }
  }
});
