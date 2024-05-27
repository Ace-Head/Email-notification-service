// apps/api/src/email/sendgrid.provider.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendgrid from '@sendgrid/mail';
import { EmailProvider } from './email-provider.interface';

@Injectable()
export class SendGridProvider implements EmailProvider {
  constructor(private configService: ConfigService) {
    sendgrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const emailData = {
      to,
      from: 'your_verified_sendgrid_email@example.com', // Replace with your verified SendGrid sender email
      subject,
      text: body,
    };
    await sendgrid.send(emailData);
  }
}
