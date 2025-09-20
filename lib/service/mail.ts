import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class MailService implements Notifier {
  private mailSender: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;
  constructor() {
    this.mailSender = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendNotification(payload: NotifyPayload): Promise<void> {
    await this.mailSender.sendMail({
      from: process.env.MAIL_FROM,
      to: payload.to,
      subject: payload.title,
      html: payload.message,
    });
  }
}
