const express = require("express");
const app = express();
const connectDB = require("./database/Database"); //database connection
const router = require("./routes/routes");
const cors = require("cors");
// const bodyParser = require("body-parser");
// const { Server } = require("socket.io");
// const http = require("http");

// const server = http.createServer(app);

// let corsOptions = {
//   // origin: ["http://localhost:3000"], //development
//   origin: ["https://booksmartnepal.netlify.app"], //production
//   methods: ["PUT", "GET", "POST", "DELETE"],
//   credentials: true,
//   origin: true,
// };

// const io = new Server(server, {
//   cors: {
//     // origin: ["http://localhost:3000"],                         //development
//     origin: ["https://booksmartnepal.netlify.app"],          //production
//     methods: ["PUT","GET", "POST", "DELETE"],
//     credentials: true,
//     origin: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log(socket.id);

//   socket.on("join_room", (chatid) => {
//     socket.join(chatid);
//     // console.log(`socketid: ${socket.id} and chat id: ${chatid}`);
//   });

//   socket.on("send_message", (message) => {
//     socket.to(message.chatId).emit("receive_message", message);
//     // console.log(message);
//   })

//   socket.on("disconnect", () => {
//     // console.log("User Disconnected: ", socket.id);
//   });
// });

//connecting to database

//middlewares
const corsOptions = {
  origin: [
    "https://booksmartnepal.netlify.app/",
    "http://localhost:3000/",
  ],
  method: ["GET", "POST", "DELETE", "PUT"],
  origin: true,
  credentials: true,
};

app.use(express.json());
// app.use("/", router);
// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads")); //to use the images url from upload folder
app.use("/", cors(corsOptions), router);

//listening port
// app.listen(process.env.PORT || 5000);        //production
connectDB();

// server.listen(process.env.PORT || 5000);                            //development
app.listen(process.env.PORT || 5000); //development
