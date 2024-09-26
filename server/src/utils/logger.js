const { createLogger, format: {combine, timestamp, errors, printf}, transports } = require('winston');

const logFormat = printf(({ message, timestamp, stack, code }) => {
  return JSON.stringify({
    message: message,
    time: new Date(timestamp).getTime(),  
    code: code || 'No code',  
    stackTrace: stack ? stack : {}  
  });
});

const logger = createLogger({
  level: 'error',
  format: combine(
    timestamp(),  
    errors({ stack: true }),  
    logFormat  
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' })  
  ]
});

module.exports = logger;