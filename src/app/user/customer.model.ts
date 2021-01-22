import { User } from './user.model';

export class Customer {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public emailaddress?: string,
    public address?: string,
    public zipcode?: string,
    public phonenumber?: string
  ) {}
}
