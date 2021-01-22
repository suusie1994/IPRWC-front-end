import { User } from './user.model';

export class Customer {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public emailAddress?: string,
    public address?: string,
    public zipcode?: string,
    public city?: string,
    public phoneNumber?: string,
    public user?: User
  ) {}
}
