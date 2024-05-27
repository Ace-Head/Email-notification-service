// apps/api/src/email/email.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailgunProvider } from './mailgun.provider';
import { SendGridProvider } from './sendgrid.provider';
import { CreateEmailDto } from './dto/create-email.dto';
import { EmailProvider } from './email-provider.interface';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly maxRetries = 3;
  private readonly providers: EmailProvider[];

  constructor(
    private configService: ConfigService,
    private mailgunProvider: MailgunProvider,
    private sendgridProvider: SendGridProvider
  ) {
    this.providers = [mailgunProvider, sendgridProvider];
  }

  async sendEmail(createEmailDto: CreateEmailDto): Promise<void> {
    const { to, subject, body } = createEmailDto;

    for (const provider of this.providers) {
      for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
        try {
          this.logger.log(
            `Sending email to ${to} using ${provider.constructor.name}, attempt ${attempt}`
          );
          await provider.sendEmail(to, subject, body);
          this.logger.log(
            `Email sent to ${to} using ${provider.constructor.name}`
          );
          return;
        } catch (error) {
          this.logger.error(
            `Failed to send email on attempt ${attempt} using ${provider.constructor.name}: ${error.message}`
          );
          if (attempt === this.maxRetries) {
            this.logger.warn(
              `Switching to next provider after ${this.maxRetries} failed attempts`
            );
            break;
          }
        }
      }
    }

    throw new Error('All email providers failed');
  }
}
