import { createTransport } from 'nodemailer';
import { config } from '.';

export const emailTransport = createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: {
    user: config.smtp.email,
    pass: config.smtp.password,
  },
});