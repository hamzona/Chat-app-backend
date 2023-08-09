require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", require("./socket/manageSocket"));

app.use("/singup", require("./routes/singupRoute"));
app.use("/login", require("./routes/authRoute"));
app.use("/refresh", require("./routes/refreshRoute"));

app.use(require("./middleware/vrifyAccessToken"));

app.use("/api/getUsers", require("./routes/api/userRoute"));
app.use("/chats", require("./routes/api/chatRoute"));

server.listen(process.env.PORT, () => {
  console.log("server is runing");
});
