require('custom-env').env(true);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const log = require('./utils/loggerUtil');
const morgan = require('morgan');
var fs = require('fs');
var path = require('path');

// to log unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

const port = process.env.PORT || 5002;
const dbUrl = process.env.DATABASE_URL;

let dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(dbUrl, dbOptions);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));

//routes
const employeeRouter = require('./routes/employees');
const projectRouter = require('./routes/projects');

// middleware
app.use(express.json());
app.use(
  morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {
      flags: 'a',
    }),
  })
);
app.use(cors());

// resources routes
app.use('/employee', employeeRouter);
app.use('/project', projectRouter);

// health check
app.get('/', (req, res) => {
  log.infoLogger('request for health check');
  res.status(200).json({
    state: 'healthy',
  });
});

// start server
db.once('open', () => {
  console.log('********** Successfully connected to database @ ', dbUrl);
  app.listen(port, () => {
    console.log('********** Resource matching express server started');
  });
});
