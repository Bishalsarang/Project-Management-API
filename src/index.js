const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('./config');
const logger = require('./utils/logger');
const models = require('./models');

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
    logger.error('Unable to start server' + err.trace);
  } else {
    logger.info(`Server running on http://${app.get('host')}:${app.get('port')}`);
  }
});

module.exports = app;
