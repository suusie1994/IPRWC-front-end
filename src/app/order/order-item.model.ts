export class OrderItem {
  public id?: number;
  public orderId: number;
  public productId: number;
  public amount: number;
  public customerId: number;
  public firstname: string;
  public lastname: string;
  public emailAddress: string;
  public address: string;
  public zipcode: string;
  public city: string;
  public phoneNumber: string;

  constructor(
    productId: number,
    amount: number,
    orderId: number,
    customerId: number,
    firstname: string,
    lastname: string,
    emailAddress: string,
    address: string,
    zipcode: string,
    city: string,
    phoneNumber: string,
    id?: number){
    this.orderId = orderId;
    this.productId = productId;
    this.amount = amount;
    this.id = id;
    this.customerId = customerId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.emailAddress = emailAddress;
    this.address = address;
    this.zipcode = zipcode;
    this.city = city;
    this.phoneNumber = phoneNumber;
  }
}
