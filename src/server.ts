// Import the 'express' module along with 'Request' and 'Response' types from express
import express from 'express';
// Import Config module, this is local
import { config } from './config';
import cors from 'cors';
import routes from './api';
import listEndpoints from 'express-list-endpoints';

// Specify the port number for the server
const port: number = config.api.port;

// Create an Express application
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes from 'routes' directory
app.use(config.api.prefix, routes());

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
  console.log(listEndpoints(app));
});
