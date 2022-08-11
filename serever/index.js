const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const router = require("./router/router");

const { addUser, removeUser, getUser, getUserInRoom } = require("./users");

// ==================== Server ==============================
const app = express();
const server = http.createServer(app);

// =================== Rout =================================
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(router);
app.use(cors());

// ===================== socket. io ===========================
io.on("connection", (socket) => {
  console.log("a user connected");

  // ============== Join User ================================
  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);

    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room),
    });

    callback();
  });

  // ============= Send Message ==============================
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnected", () => {
    const user = removeUser(socket.id);
    console.log("user disconnected");

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUserInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

/*
=======================================================================================
In many environments (e.g. Heroku), and as a convention, you can set the environment variable 
PORT to tell your web server what port to listen on.

So process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.

So you pass that to app.listen, or to app.set('port', ...),
 and that makes your server able to accept a "what port to listen on" parameter from the environment.

If you pass 3000 hard-coded to app.listen(), 
you're always listening on port 3000, which might be just for you, or not, 
depending on your requirements and the requirements of the environment in which you're running your server.
 */
