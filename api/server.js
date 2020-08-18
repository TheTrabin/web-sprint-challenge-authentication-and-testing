const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const restricted = require("../auth/restricted-middleware.js");
const checkRole = require("../auth/check-role-middleware.js");

const authenticate = require('../auth/authenticate-middleware.js');
// const authenticateWToken = require('../auth/authenticateWToken.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const usersRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(cors());

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restricted, checkRole(1), jokesRouter);
server.use('/api/users',  usersRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
  });

module.exports = server;
