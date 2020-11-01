import { IWithUUIDDetails } from 'app/entities/with-uuid-details/with-uuid-details.model';

export interface IWithUUID {
  uuid?: string;
  name?: string;
  withUUIDDetails?: IWithUUIDDetails | null;
}

export class WithUUID implements IWithUUID {
  constructor(public uuid?: string, public name?: string, public withUUIDDetails?: IWithUUIDDetails | null) {}
}

export function getWithUUIDIdentifier(withUUID: IWithUUID): string | undefined {
  return withUUID.uuid;
}
