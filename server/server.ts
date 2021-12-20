import bodyParser = require("body-parser");
import express = require("express");

var app = express();

import { PaymentService } from "./src/payment/payment-service";
import { PromotionService } from "./src/promotion/promotion-service";
import { Promotion } from "./src/promotion/promotion";
import { Payment } from "./src/payment/payment";
import { Mail } from "./src/email/email";

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

/**
 * GET /payments/
 */
app.get("/payments", function (req, res) {
	const payments = paymentService.get();
	res.send(payments);
});

/**
 * GET /payments/:id
 */
app.get("/payments/:id", function (req, res) {
	const id = parseInt(req.params.id);
	const payment = paymentService.getById(id);
	if (payment) {
		// Only send the payment if it exists
		res.send(payment);
	} else {
		// Otherwise send a 404 error
		res.status(404).send({ message: `Payment ${id} could not be found` });
	}
});

/**
 * POST /payments/
 */
app.post("/payments", function (req: express.Request, res: express.Response) {
	const payment: Payment = <Payment>req.body;
	try {
		const result = paymentService.add(payment);
		// Result depends on the success of the operation.
		// If successful, the result is the added payment
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

/**
 * PUT /payments
 */
app.put("/payments", function (req: express.Request, res: express.Response) {
	const payment: Payment = <Payment>req.body;
	const result = paymentService.update(payment);
	// Result depends on the success of the operation.
	// If successful, the result is true.
	if (result) {
		res.send(result);
	} else {
		res
			.status(404)
			.send({ message: `Payment ${payment.id} could not be found.` });
	}
});

/**
 * DELETE /payments/:id
 */
app.delete(
	"/payments/:id",
	function (req: express.Request, res: express.Response) {
		const id = parseInt(req.params.id);
		const payment = paymentService.getById(id);
		if (payment) {
			paymentService.deleteById(id);
			res.send({ status: 203 });
		} else {
			res
				.status(404)
				.send({ status: 404, message: `Payment ${id} could not be found` });
		}
	}
);

/*
#########################################################################
##                             PROMOÇÕES                               ##
#########################################################################
*/

/**
 * GET /promotions/
 */
app.get("/promotions", function (req, res) {
	const promotions = promotionService.get();
	res.send(promotions);
});

/**
 * GET /promotions/:id
 */
app.get("/promotions/:id", function (req, res) {
	const id = parseInt(req.params.id);
	const promotion = promotionService.getById(id);
	if (promotion) {
		res.send(promotion);
	} else {
		res.status(404).send({ message: `Promotion ${id} could not be found` });
	}
});

/**
 * POST /promotions/
 */
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

/**
 * PUT /promotions
 */
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

/**
 * DELETE /promotions/:id
 */
app.delete(
	"/promotions/:id",
	function (req: express.Request, res: express.Response) {
		const id = parseInt(req.params.id);
		const promotion = promotionService.getById(id);

		if (promotion) {
			promotionService.deleteById(id);
			res.send({ status: 203 });
		} else {
			res
				.status(404)
				.send({ status: 404, message: `Payment ${id} could not be found` });
		}
	}
);

/*
####################################################
# 											Email										   #
####################################################
*/

/**
 * Send email
 */
app.post("/email", function (req: express.Request, res: express.Response) {
	const to = req.body.email;
	const email = new Mail(to);

	const ans = email.sendMail();
});

var server = app.listen(3000, function () {
	console.log("Servidor iniciado...");
});

function closeServer(): void {
	server.close();
}

export { app, server, closeServer };
