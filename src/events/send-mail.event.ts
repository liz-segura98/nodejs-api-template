import { config } from "../config";
import { sendEmailService } from "../services";
import { EventEmitter } from 'events';

export const sendMailEvent: EventEmitter = new EventEmitter();

sendMailEvent.on('send-error-mail', async (data: { data: string}) => {
  // Send email to notify of unhandled error
  await sendEmailService.sendEmail({
    subject: 'ERROR',
    text: data.data,
    receivers: config.smtp.emailTo,
  })
});