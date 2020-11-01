import { IWithIdString } from 'app/shared/model/with-id-string.model';

export interface IWithIdStringDetails {
  id?: number;
  name?: string;
  withIdString?: IWithIdString;
}

export class WithIdStringDetails implements IWithIdStringDetails {
  constructor(public id?: number, public name?: string, public withIdString?: IWithIdString) {}
}
