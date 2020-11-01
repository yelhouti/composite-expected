import { IWithUUID } from 'app/entities/with-uuid/with-uuid.model';

export interface IWithUUIDDetails {
  uuid?: string;
  details?: string | null;
  withUUID?: IWithUUID | null;
}

export class WithUUIDDetails implements IWithUUIDDetails {
  constructor(public uuid?: string, public details?: string | null, public withUUID?: IWithUUID | null) {}
}

export function getWithUUIDDetailsIdentifier(withUUIDDetails: IWithUUIDDetails): string | undefined {
  return withUUIDDetails.uuid;
}
