const express = require("express");
const app = express();
const connectDB = require("./database/Database");           //database connection
const router = require("./routes/routes");
const cors = require('cors');
const bodyParser = require("body-parser");

//middlewares

// const whitelist = ["http://localhost:3000", "https://booksmartnepal.netlify.app"]
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }

var corsOptions = {
  origin: 'https://booksmartnepal.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  Headers: 'X-Requested-With,content-type',
  Credential: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router);
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static('./uploads')); //to use the images url from upload folder

let db = connectDB();

//test apis


//listening port
app.listen(process.env.PORT || 5000);