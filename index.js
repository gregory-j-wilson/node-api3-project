const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const cors = require('cors')


require('dotenv').config();

const server = express();

const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')


server.use(express.json()); // built-in middleware
server.use(cors())
server.use(helmet()); // 3rd party middleware
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)



// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }


module.exports = server;

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
