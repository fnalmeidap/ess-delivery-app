import { response } from "express";
import { Promotion } from "./promotion";

export class PromotionService {
	promotions: Promotion[] = [];

	isIsoDate(date: string): boolean {
		if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)) return false;
		var d = new Date(date);
		return d.toISOString() === date;
	}

	add(promotion: Promotion): boolean {
		let id = this.promotions.length + 1;
		promotion.id = id;

		if (
			this.isIsoDate(String(promotion.start)) &&
			this.isIsoDate(String(promotion.end))
		) {
			this.promotions.push(new Promotion(promotion));
			return true;
		}
		return false;
	}

	update(promotion: Promotion): boolean {
		const toBeUpdated = this.getById(promotion.id);
		try {
			toBeUpdated.update(promotion);
		} catch {
			return false;
		}
		return true;
	}

	deleteById(promotionId: number): void {
		this.promotions = this.promotions.filter(
			(promotion) => promotion.id != promotionId
		);
	}

	deleteByName(promotionName: string): void {
		this.promotions.filter((promotion) => promotion.name != promotionName);
	}

	get(): Promotion[] {
		return this.promotions;
	}

	getById(promotionId: number): Promotion {
		return this.promotions.find(({ id }) => id == promotionId);
	}
}
