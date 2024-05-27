// apps/api/src/email/email-provider.interface.ts
export interface EmailProvider {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}
