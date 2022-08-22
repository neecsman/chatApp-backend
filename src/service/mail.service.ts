import nodemailer from "nodemailer";

class MailService {
  async sendActivationMail(email: string, link: string) {
    const options = {
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    try {
      let transporter = nodemailer.createTransport(options);
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Активация аккаунта для чатика",
        text: "",
        html: `
                    <div>
                    <h1>Активация аккаунта</h1>
                    <p>Для активации аккаунта перейдите по ссылке</p>
                    <a href"http://localhost:3000/user/activate/${link}">http://localhost:3000/user/activate/${link}</a>
                    </div>
                  `,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MailService();
