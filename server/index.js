const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
const app = express();
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");

app.use(cors());
app.use(express.json());
app.use("/api/auth/",userRoute);
app.use("/api/message/", messageRoute);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(error => {
  console.log("Error to connect to MongoDB, error:", error.message);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin : "http://localhost:3000",
    credentials : true
  }
});

global.onlineUsers = new Map();

io.on("connection", socket => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-message", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if(sendUserSocket) {
      socket.to(sendUserSocket).emit("message-received", data.message);
    }
  });
});