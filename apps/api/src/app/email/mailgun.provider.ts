// apps/api/src/email/mailgun.provider.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mailgun from 'mailgun-js';
import { EmailProvider } from './email-provider.interface';

@Injectable()
export class MailgunProvider implements EmailProvider {
  private mailgunClient: mailgun.Mailgun;

  constructor(private configService: ConfigService) {
    this.mailgunClient = mailgun({
      apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
      domain: this.configService.get<string>('MAILGUN_DOMAIN'),
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const emailData = {
      from: 'your_verified_mailgun_email@example.com', // Replace with your verified Mailgun sender email
      to,
      subject,
      text: body,
    };
    await this.mailgunClient.messages().send(emailData);
  }
}
