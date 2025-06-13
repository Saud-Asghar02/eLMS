const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
const db = require('./config/mongooseConnection');

require('dotenv').config();


const { exec } = require("child_process");

// Start Python chatbot
const pythonProcess = exec(
  `"${path.join(__dirname, "chatbot", "chatbotenv", "Scripts", "python.exe")}" app.py`,
  { cwd: path.join(__dirname, "chatbot") }
);

// * Router
const indexRoute = require('./routes/indexRoute');
const ownerRoute = require('./routes/ownerRoute');
const courseRoute = require('./routes/courseRoute');
const userRoute = require('./routes/userRoute');
const chatbotRoute = require("./routes/chatbotRoute");

// * Middleware
app.use(express.json());
app.use(express.urlencoded ({ extended : true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret : 'node.js',
    resave : false,
    saveUninitialized : false,
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', indexRoute);
app.use('/owner', ownerRoute);
app.use('/courses', courseRoute);
app.use('/user', userRoute);
app.use("/api/chatbot", chatbotRoute);

app.listen(3000);