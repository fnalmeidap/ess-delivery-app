import { response } from "express";
import { Promotion } from "./promotion";

export class PromotionService {
	promotions: Promotion[] = [];

	/**
	 * Checks if a string is a valid ISO date
	 * @param date Date to be checked
	 * @returns true for valid date, false for invalid date
	 */
	isIsoDate(date: string): boolean {
		if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)) return false;
		var d = new Date(date);
		return d.toISOString() === date;
	}

	/**
	 * Adds a new promotion to the list of promotions
	 * @param promotion Promotion to be added
	 * @returns true for success, false for failure
	 */
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

	/**
	 * Update a promotion searching on list by id
	 * @param promotion Promotion to be updated
	 * @returns true for success, false for failure
	 */
	update(promotion: Promotion): boolean {
		const toBeUpdated = this.getById(promotion.id);
		try {
			toBeUpdated.update(promotion);
		} catch {
			return false;
		}
		return true;
	}

	/**
	 * Deletes a promotion searching on list by id
	 * @param promotionId Promotion id to be deleted
	 */
	deleteById(promotionId: number): void {
		this.promotions = this.promotions.filter(
			(promotion) => promotion.id != promotionId
		);
	}

	/**
	 * Deletes a promotion searching on list by name
	 * @param promotionName Promotion name to be searched
	 */
	deleteByName(promotionName: string): void {
		this.promotions.filter((promotion) => promotion.name != promotionName);
	}

	/**
	 * Getter method for all promotions
	 * @returns List of promotions
	 */
	get(): Promotion[] {
		return this.promotions;
	}

	/**
	 * Searches for a promotion by id
	 * @param promotionId Promotion id to be searched and returned
	 * @returns Promotion with the given id
	 */
	getById(promotionId: number): Promotion {
		return this.promotions.find(({ id }) => id == promotionId);
	}
}
