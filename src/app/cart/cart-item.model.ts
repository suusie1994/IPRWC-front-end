export class CartItem {
  public id: number;
  public productId: number;
  public userId?: number;
  public amount: number;

  constructor(id: number, productId: number, amount: number, userId?: number){
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.amount = amount;
  }
}
