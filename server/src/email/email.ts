import * as nodemailer from "nodemailer";

class Config {
<<<<<<< HEAD
    HOST = "smtp.gmail.com";
    PORT = 587;
    USER = "felipe.nunesalmeida@gmail.com";
    PASSWORD = "";
}

export class Mail {
  constructor(
      public to?: string,
      public subject?: string,
      public message?: string) { }


  async sendMail() {

    let config = new Config()

    const transporter = nodemailer.createTransport({
        host: config.HOST,
        port: config.PORT,
        secure: false,
        auth: {
            user: config.USER,
            pass: config.PASSWORD
        },
        tls: { rejectUnauthorized: false }
    });

    const answer = await transporter.sendMail({
      text: "Texto olaa",
      subject: "assunto do email",
      from: "Nome do enviador",
      to: ['rbnn@cin.ufpe.br']
    });
  }


}
=======
	HOST = "";
	PORT = 587;
	USER = "";
	PASSWORD = "";
}

export class Mail {
	constructor(
		public to?: string,
		public subject?: string,
		public message?: string
	) {}

	sendMail() {
		let configs = new Config();

		let mailOptions = {
			from: "portalband@band.com.br",
			to: this.to,
			subject: this.subject,
			html: this.message,
		};

		const transporter = nodemailer.createTransport({
			host: configs.HOST,
			port: configs.PORT,
			secure: false,
			auth: {
				user: configs.USER,
				pass: configs.PASSWORD,
			},
			tls: { rejectUnauthorized: false },
		});

		console.log(mailOptions);

		transporter.sendMail(mailOptions, function (error: any, info: any) {
			if (error) {
				return error;
			} else {
				return "E-mail enviado com sucesso!";
			}
		});
	}
}
>>>>>>> 894413c60859d4293c527973b5bbfd8085d0a6e7
