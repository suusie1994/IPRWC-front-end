export class CartItem {
  public productId: number;
  public userId?: number;
  public amount: number;
  public id: number;

  constructor(productId: number, amount: number, id: number, userId?: number){
    this.productId = productId;
    this.userId = userId;
    this.amount = amount;
    this.id = id;
  }
}
