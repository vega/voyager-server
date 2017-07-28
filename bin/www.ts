import * as http from 'http';

import * as app from '../app';

/**
 * Get port from environment and store in Express.
 */
const PORT = process.env.PORT || '3000';
app.set('port', PORT);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(PORT);

interface HTTPError {
  syscall?: string;
  code?: string;
}

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', (error: HTTPError) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // tslint:disable-next-line:no-console
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // tslint:disable-next-line:no-console
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', () => {
  const addr = server.address();
  const bind = (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`);
  // tslint:disable-next-line:no-console
  console.log(`Listening on ${bind}`);
});
