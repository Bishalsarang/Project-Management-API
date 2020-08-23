const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');



// require('./config');

app.set('host', process.env.APP_HOST || 'localhost');
app.set('port', process.env.APP_PORT || 3001);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ success: true, msg: 'Hello API' });
});


app.listen(app.get('port'), app.get('host'), (err) => {
  if (err) {
    console.error('Unable to start server', err.trace);
  } else {
    console.log(`Server running on http://${app.get('host')}:${app.get('port')}`);
  }
});

module.exports = app;