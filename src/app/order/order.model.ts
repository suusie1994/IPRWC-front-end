import { OrderItem } from './order-item.model';

export class Order {
  public id: number;
  public date?: Date;
  public customerId?: number;
  public orderItems?: OrderItem[];
  public status?: string;

  constructor(id: number, date?: Date, customerId?: number, orderItems?: OrderItem[], status?: string){
    this.id = id;
    this.date = date;
    this.customerId = customerId;
    this.orderItems = orderItems;
    this.status = status;
  }
}

export class OrderToDatabase {
  public date?: Date;
  public customerId?: number;
  public status?: string;

  constructor(date?: Date, customerId?: number, status?: string){
    this.date = date;
    this.customerId = customerId;
    this.status = status;
  }
}
