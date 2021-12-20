import bodyParser = require("body-parser");
import express = require("express");
// import cors = require('cors');
import nodemailer = require("nodemailer");
import { PaymentService } from "./src/payment/payment-service";
import { Payment } from "./src/payment/payment";
import { Mail } from "./src/email/email";

import { PromotionService } from "./src/promotion/promotion-service";
import { Promotion } from "./src/promotion/promotion";

var app = express();

var allowCrossDomain = function (req: any, res: any, next: any) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
};
// app.use(cors({origin: "*" }));
app.use(allowCrossDomain);

app.use(bodyParser.json());

var promotionService: PromotionService = new PromotionService();
var paymentService: PaymentService = new PaymentService();

/*
#########################################################################
#                              PAGAMENTOS                               #
#########################################################################
*/

enum Config {
	HOST = "felipe nunes",
	PORT = 587,
	USER = "",
	PASSWORD = "",
}

app.get("/payments", function (req, res) {
	const payments = paymentService.get();
	res.send(payments);
});

app.get("/payments/:id", function (req, res) {
	const id = parseInt(req.params.id);
	const payment = paymentService.getById(id);
	if (payment) {
		res.send(payment);
	} else {
		res.status(404).send({ message: `Payment ${id} could not be found` });
	}
});

app.post("/email", function (req: express.Request, res: express.Response) {
  const email = new Mail();
  const ans = email.sendMail();
});

app.post("/payments", function (req: express.Request, res: express.Response) {
	const payment: Payment = <Payment>req.body;
	try {
		const result = paymentService.add(payment);
		if (result) {
			res.status(201).send({ status: 201 });
		} else {
			res.status(403).send({ status: 403 });
		}
	} catch (err) {
		const { message } = err;
		res.status(400).send({ message });
	}
});

app.put("/payments", function (req: express.Request, res: express.Response) {
	const payment: Payment = <Payment>req.body;
	const result = paymentService.update(payment);
	if (result) {
		res.send(result);
	} else {
		res
			.status(404)
			.send({ message: `Payment ${payment.id} could not be found.` });
	}
});

app.delete(
	"/payments/:id",
	function (req: express.Request, res: express.Response) {
		const id = parseInt(req.params.id);
		const payment = paymentService.getById(id);
		if (payment) {
			paymentService.deleteById(id);
			res.send({ message: `Payment ${id} deleted successfully` });
		} else {
			res.status(404).send({ message: `Payment ${id} could not be found` });
		}
	}
);

/*
#########################################################################
##                             PROMOÇÕES                               ##
#########################################################################
*/

app.get("/promotions", function (req, res) {
	const promotions = promotionService.get();
	res.send(promotions);
});

app.get("/promotions/:id", function (req, res) {
	const id = parseInt(req.params.id);
	const promotion = promotionService.getById(id);
	if (promotion) {
		res.send(promotion);
	} else {
		res.status(404).send({ message: `Promotion ${id} could not be found` });
	}
});

app.post("/promotions", function (req: express.Request, res: express.Response) {
	const promotion: Promotion = <Promotion>req.body;
	try {
		const result = promotionService.add(promotion);
		if (result) {
			res.status(201).send({ message: "Promotion added successfully" });
		} else {
			res.status(403).send({ message: "Error creating new promotion" });
		}
	} catch (err) {
		const { message } = err;
		res.status(400).send({ message });
	}
});

app.put("/promotions", function (req: express.Request, res: express.Response) {
	const promotion: Promotion = <Promotion>req.body;
	const result = promotionService.update(promotion);
	if (result) {
		res.send(result);
	} else {
		res
			.status(404)
			.send({ message: `Promotion ${promotion.id} could not be found.` });
	}
});

app.delete(
	"/promotions/:id",
	function (req: express.Request, res: express.Response) {
		const id = parseInt(req.params.id);
		const promotion = promotionService.getById(id);

		if (promotion) {
			promotionService.deleteById(id);
			res.send({ message: `Promotion ${id} deleted successfully` });
		} else {
			res.status(404).send({ message: `Promotion ${id} could not be found` });
		}
	}
);

var server = app.listen(3000, function () {
	console.log("Servidor iniciado.\n Vasco.");
});

function closeServer(): void {
	server.close();
}

export { app, server, closeServer };
