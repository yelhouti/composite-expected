export interface IWithIdString {
  id?: string;
}

export class WithIdString implements IWithIdString {
  constructor(public id?: string) {}
}
