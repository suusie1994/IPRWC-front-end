export class CartItem {
  public id?: number;
  public productId: number;
  public userId?: number;
  public amount: number;

  constructor(productId: number, amount: number, userId?: number, id?: number){
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.amount = amount;
  }
}
