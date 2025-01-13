const http = require('http');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');
require('./utils/loggerChronJobs')

const PORT = 5001;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT, () =>  console.log(`Example app listening on port ${PORT}!`));
controller.createConnection(server);
const findTextCount = require('./utils/findTextCount')
findTextCount('паровоз')
  .then(count => console.log(count))
  .catch(error => console.error(error));