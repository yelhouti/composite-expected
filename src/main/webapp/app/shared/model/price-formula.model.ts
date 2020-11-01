export interface IPriceFormula {
  id?: number;
  formula?: string;
}

export class PriceFormula implements IPriceFormula {
  constructor(public id?: number, public formula?: string) {}
}
