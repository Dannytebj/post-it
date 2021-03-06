const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const socketio = require('socket.io');
const { socketInstance } = require('./server/utils/socketConfig');

dotenv.config();

const app = express();
const routes = require('./server/routes');
const port = process.env.PORT || 3333;

const config = require('./server/config');
// allow promises with mongoose.
mongoose.Promise = global.Promise;

// setup up database connection
if (process.env.NODE_ENV === 'test') {
    mongoose.connect(config.url_test);
} else {
    mongoose.connect(config.url);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers","Content-Type,X-Amz-Date,Authorization,X-Api-Key,Origin,Accept,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin");
  next();
});

app.use(express.static(__dirname+'/dist/post-it-v2'));

app.use('/api/v1', routes);

//  catch all 500 error
app.use((err, req, res, next) => {
  return res.status(500)
    .send({ message: 'An error occured' })
});

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/post-it-v2/index.html'))
})

// start the server in the port || 3333 !
const server = app.listen(port, () => {
  console.log('server listening on port '+port);
});

const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Socket io connected');
  socket.on('disconnect', ()=> {
    console.log('Socket io disconnected!')
  })
});
socketInstance(io);

module.exports = app;
