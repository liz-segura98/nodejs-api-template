import { config } from "../config";
import { emailTransport } from "../config/email.config";

export class SendEmailService {
  async sendEmail(options: { subject: string, text: string, receivers: string}): Promise<void> {
    const { subject, receivers, text } = options;

    try {
      await emailTransport.sendMail({
        from: config.smtp.email,
        to: receivers,
        subject,
        text,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const sendEmailService = new SendEmailService()