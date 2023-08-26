const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoute");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth/",userRoute)

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