import { IWithIdStringDetails } from 'app/shared/model/with-id-string-details.model';

export interface IWithIdString {
  id?: number;
  withIdStringDetails?: IWithIdStringDetails;
}

export class WithIdString implements IWithIdString {
  constructor(public id?: number, public withIdStringDetails?: IWithIdStringDetails) {}
}
