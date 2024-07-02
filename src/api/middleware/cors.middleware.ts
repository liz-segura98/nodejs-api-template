import cors from 'cors';

const OriginError: string = 'The CORS policy for this site does not allow access from the specified Origin.';
// Update to your given origins
const allowedList = ['http://localhost:3000'];

const allowOrigins = function (origin: any, callback: any) {
  if (origin && allowedList.indexOf(origin) === -1) {
    return callback(new Error(OriginError), false);
  }
  return callback(null, true);
}

export const ConfigCORS: cors.CorsOptions = {
  origin: allowOrigins,
  methods: ['GET,PUT,POST,DELETEHEAD'],
}

export const Cors = cors(ConfigCORS);