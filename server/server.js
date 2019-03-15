const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3333;

const config = require('./config');
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.static(__dirname+'/dist/client'));

app.use('/api/v1', routes);

//  catch all 500 error
app.use((err, req, res, next) => {
  return res.status(500)
    .send({ message: 'An error occured' })
});

// app.get('/*', function(req,res) {
//   res.sendFile(path.join(__dirname+'/dist/client/index.html'))
// })

// start the server in the port || 3333 !
app.listen(port, () => {
  console.log('server listening on port '+port);
});

module.exports = app;
