export class Product {
  constructor(
    public id: number,
    public amount?: number,
    public name?: string,
    public description?: string,
    public price?: string,
    public image?: string
  ){}
}
export class OrderProduct {
  public productId: number;
  public amount: number;
  public orderId: number;
  public name?: string;
  public description?: string;
  public price?: string;
  public image?: string;

  constructor(
    productId: number,
    amount: number,
    orderId: number,
    name: string,
    description: string,
    price: string,
    image: string
  ){
    this.productId = productId;
    this.amount = amount;
    this.orderId = orderId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}
