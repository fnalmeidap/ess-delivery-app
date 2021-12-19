export class Promotion {
  id: number;
  name: string;
  status: string;
  start: Date;
  end: Date;

  constructor(promotion: Promotion) {
    this.id = promotion.id;
    this.name = promotion.name;
    this.status = promotion.status ?? 'Inactive';
    this.start = promotion.start;
    this.end = promotion.end;
  }

  update(promotion: Promotion): void {
    this.name = promotion.name;
    this.status = promotion.status;
    this.start = promotion.start;
    this.end = promotion.end;
  }        
}