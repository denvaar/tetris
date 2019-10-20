const Console = require('console').Console;
const fs = require('fs');

const stream = fs.createWriteStream('/tmp/tetris');
const logger = new Console(stream, stream);
export default logger;
