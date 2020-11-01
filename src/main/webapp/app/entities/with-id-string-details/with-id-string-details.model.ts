import { IWithIdString } from 'app/entities/with-id-string/with-id-string.model';

export interface IWithIdStringDetails {
  id?: string;
  details?: string | null;
  withIdString?: IWithIdString | null;
}

export class WithIdStringDetails implements IWithIdStringDetails {
  constructor(public id?: string, public details?: string | null, public withIdString?: IWithIdString | null) {}
}

export function getWithIdStringDetailsIdentifier(withIdStringDetails: IWithIdStringDetails): string | undefined {
  return withIdStringDetails.id;
}
