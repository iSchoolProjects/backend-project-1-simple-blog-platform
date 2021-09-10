import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import mailConfig from '../config/mailconfig';

@Module({
  imports: [MailerModule.forRoot(mailConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
