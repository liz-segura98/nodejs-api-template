// Import the 'express' module along with 'Request' and 'Response' types from express
import express from 'express';
// Import Config module, this is local
import { config  } from './config';
import routes from './api';
import listEndpoints from 'express-list-endpoints';
import db from './config/database-sequelize.config';
import { Cors, RateLimit } from './api/middleware';

// Specify the port number for the server
const port: number = config.api.port;

// Create an Express application
const app = express();

// Configure global cors
app.use(Cors);
// Configure global Rate Limits
app.use(RateLimit);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes from 'routes' directory
app.use(config.api.prefix, routes());

// Start the server and listen on the specified port
const start = (port: number) => {
  app.listen(port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${port}`);
    console.log(listEndpoints(app));
  });
}

// If we have configured database
if (config.database.useDatabase) {
  // Validate we have access to database connection
  db.authenticate().then(() => {
    // Create connection on database
    db.sync({ force: false })
      .then(() => (start(port)));
  }).catch((error) => (console.error('Unable to connect to the database: ', error)));
} else {
  start(port);
}


