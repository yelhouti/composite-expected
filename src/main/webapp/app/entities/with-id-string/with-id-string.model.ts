import { IWithIdStringDetails } from 'app/entities/with-id-string-details/with-id-string-details.model';

export interface IWithIdString {
  id?: string;
  name?: string | null;
  withIdStringDetails?: IWithIdStringDetails | null;
}

export class WithIdString implements IWithIdString {
  constructor(public id?: string, public name?: string | null, public withIdStringDetails?: IWithIdStringDetails | null) {}
}

export function getWithIdStringIdentifier(withIdString: IWithIdString): string | undefined {
  return withIdString.id;
}
