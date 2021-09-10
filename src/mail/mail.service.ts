import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../entity/user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeMail(user: User) {
    await this.mailerService.sendMail({
      to: `${user.email}`,
      subject: 'Welcome to our BLOG!',
      template: './welcome-mail.hbs',
      context: {
        name: user.firstName,
      },
    });
  }

  async sendMailForNewPassword(email: string, token: string, username: string) {
    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Reset password',
      template: './forgot-password.hbs',
      context: { url: token, username },
    });
  }
}
