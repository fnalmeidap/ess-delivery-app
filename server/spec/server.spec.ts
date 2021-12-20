import "jasmine";
import request = require("request-promise");

const baseUrl = "http://localhost:3000";

const promotionsUrl = `${baseUrl}/promotions`;
const paymentsUrl = `${baseUrl}/payments`;

describe("O servidor", () => {
	var server: any;

	beforeAll(() => {
		server = require("../server");
	});

	afterAll(() => {
		server.closeServer();
	});

	it("Inicialmente retornará uma lista de promoções vazia.", () => {
		return request
			.get(promotionsUrl)
			.then((body) => expect(body).toBe("[]"))
			.catch((e) => expect(e).toEqual(null));
	});

	it("Inicialmente retornará uma lista de métodos de pagamento vazia.", () => {
		return request
			.get(paymentsUrl)
			.then((body) => expect(body).toBe("[]"))
			.catch((e) => expect(e).toEqual(null));
	});

	it("Cadastra uma promoção válida", () => {
		const today = new Date();
		const tomorrow = new Date();

		tomorrow.setDate(today.getDate() + 1);

		const body = {
			name: "Promoção de teste",
			start: today.toISOString(),
			end: tomorrow.toISOString(),
		};

		const options: any = {
			method: "POST",
			uri: promotionsUrl,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(200);
		});
	});

	it("Cadastra uma promoção inválida", () => {
		const body = {
			name: "Promoção de teste",
			start: "text",
			end: "text",
		};

		const options: any = {
			method: "POST",
			uri: promotionsUrl,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(403);
		});
	});

	it("Cadastra novo método de pagamento válido", () => {
		const body = {
			type: "Visa",
			status: "Ativa",
			value: "Visa",
		};

		const options: any = {
			method: "POST",
			uri: paymentsUrl,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(200);
		});
	});

	it("Cadastra novo método de pagamento inválido", () => {
		const body = {
			type: "Cartãoxs Visa",
			status: "Ativo",
			value: "Visa",
		};

		const options: any = {
			method: "POST",
			uri: paymentsUrl,
			body,
			json: true,
		};

		return request(options).catch(({ statusCode }) => {
			expect(statusCode).toBe(403);
		});
	});
});
