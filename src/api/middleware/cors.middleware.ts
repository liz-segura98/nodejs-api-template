import cors from 'cors';
import { config } from '../../config';

const OriginError: string = 'The CORS policy for this site does not allow access from the specified Origin.';
// Update to your given origins
const allowedList: string[] = config.api.allowedOrigins;

const allowOrigins = function (origin: any, callback: any) {
  if (origin && allowedList.indexOf(origin) === -1) {
    return callback(new Error(OriginError), false);
  }
  return callback(null, true);
}

export const ConfigCORS: cors.CorsOptions = {
  origin: allowOrigins,
  methods: ['GET,PUT,POST,DELETE'],
}

export const CorsHandler = cors(ConfigCORS);