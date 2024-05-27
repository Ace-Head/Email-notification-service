// apps/api/src/email/email.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailgunProvider } from './mailgun.provider';
import { SendGridProvider } from './sendgrid.provider';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  providers: [EmailService, MailgunProvider, SendGridProvider],
})
export class EmailModule {}
