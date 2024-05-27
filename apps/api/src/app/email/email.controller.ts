// apps/api/src/email/email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() createEmailDto: CreateEmailDto): Promise<void> {
    await this.emailService.sendEmail(createEmailDto);
  }
}
