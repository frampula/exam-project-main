const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const logFilePath = path.join('error.log');

function copyAndTransformLogFile() {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err);
      return;
    }
    
    const transformedData = data.split('\n').map(line => {
      if (!line.trim()) return null;
      try {
        const log = JSON.parse(line);
        return JSON.stringify({
          message: log.message,
          code: log.code,
          time: log.time
        });
      } catch (e) {
        return null;
      }
    }).filter(Boolean).join('\n');
    
    const newFileName = `log_${new Date().toISOString().split('T')[0]}.log`;
    const newFilePath = path.join(__dirname, '..', 'logs' , newFileName);
    
    fs.writeFile(newFilePath, transformedData, (err) => {
      if (err) {
        console.error('Error writing new log file:', err);
        return;
      }

      console.log(`Log file successfully copied and transformed to: ${newFileName}`);
      
      fs.writeFile(logFilePath, '', (err) => {
        if (err) {
          console.error('Error clearing original log file:', err);
        } else {
          console.log('Original log file cleared');
        }
      });
    });
  });
}

cron.schedule('0 0 * * *', () => {
  console.log('Starting log copy and clear...');
  copyAndTransformLogFile();
});
