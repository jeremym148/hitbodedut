// const nr = require('newrelic');
const express = require('express');
const mountRoutes = require('./routes');
const path = require('path');
const keys = require('./config/keys');


const app = express();

app
.use(function(req, res, next) {
    next();
  })
.use(express.json());


//Set Router
mountRoutes(app);

// if(process.env.NODE_ENV === 'production'){
  app
  .set('trust proxy', 1) // trust first proxy
  .use(express.static(path.join (__dirname, '/client/dist')))
  .get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
  });
// }


const PORT = process.env.PORT || 5000;
app.listen(PORT,onListen);

function onListen() {
  console.log('Listening on', PORT)
}
