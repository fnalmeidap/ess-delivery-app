import * as nodemailer from "nodemailer";

class Config {
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
