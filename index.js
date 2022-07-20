const express = require("express");
const app = express();
const connectDB = require("./database/Database");           //database connection
const router = require("./routes/routes");
const cors = require('cors');
const bodyParser = require("body-parser");

//connecting to database
let db = connectDB();

//middlewares
app.use(
  cors({
    origin: ["https://booksmartnepal.netlify.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    origin: true,
  })
);

app.use(express.json());
app.use("/", router);
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static('./uploads')); //to use the images url from upload folder

//listening port
app.listen(process.env.PORT || 5000);