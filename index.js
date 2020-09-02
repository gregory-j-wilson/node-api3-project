const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const server = express();

const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')


server.use(express.json()); // built-in middleware
server.use(helmet()); // 3rd party middleware
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)



module.exports = server;

const port = 8000;

server.listen(port, () => console.log('server up...'));
