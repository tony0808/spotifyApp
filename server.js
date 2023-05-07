const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config({ path: './config/env' });
const express = require('express');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/indexRoutes');
const appRouter = require('./routes/appRoutes');

const server = express();
const PORT = 3000;
server.listen(PORT, console.log(`Server running on port ${PORT}`));

// register view engine
server.set('view engine', 'ejs');

// middleware
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.json());
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

server.use('/', indexRouter);
server.use('/app', appRouter);

