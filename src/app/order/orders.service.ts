import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CartItem } from '../cart/cart-item.model';
import { ApiService } from '../shared/api.service';
import { UserService } from '../user/user.service';
import { OrderItem } from './order-item.model';
import { Order, OrderToDatabase } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders: Order[] = [];
  private orderDetails: OrderItem[] = [];
  ordersChanged = new Subject<Order[]>();
  isAuthenticated = false;

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private authService: AuthService,
              private userService: UserService) {
    this.isAuthenticated = this.authService.hasAuthorization();
  }

  async getOrders(): Promise<any>{
    const headers = this.apiService.createRequestHeaders();
    const id = this.userService.getLoggedInUser()?.id;
    this.orders = [];
    this.orderDetails = [];
    return new Promise<any>(resolve => {
      this.http.get<Order[]>('http://localhost:8080/api/orders/customer/' + id, {headers})
      .subscribe(async data => {
        for (const order of data){
          this.orders.push(order);
          this.ordersChanged.next(this.orders.slice());
          this.orderDetails.push.apply(this.orderDetails, await this.getOrderDetailsOfOrderId(order.id));
        }
        resolve(this.orders.slice());
      });
    });
  }

  async getOrderDetails(): Promise<OrderItem[]> {
    const headers = this.apiService.createRequestHeaders();
    if (this.orderDetails){
      return this.orderDetails;
    }
    return new Promise<any>(resolve => {
      this.http.get<OrderItem[]>('http://localhost:8080/api/orderDetail/', { headers })
      .subscribe( data => {
        this.orderDetails = data;
        resolve(this.orderDetails.slice());
      });
    });
  }

  async createOrder(cartItems: CartItem[]): Promise<any> {
    const customer = await this.userService.getCustomerDataOfUser();
    let newOrder: OrderToDatabase;
    const orderItems: OrderItem[] = [];
    newOrder = new OrderToDatabase(new Date(), this.userService.getLoggedInUser()?.id, 'Betaald en verzonden');

    return this.httpCreateOrder(newOrder).then(async data => {
      for (const item of cartItems){
        const orderitem = new OrderItem(
          item.productId,
          item.amount,
          data.id,
          customer.id,
          customer.firstname,
          customer.lastname,
          customer.emailAddress,
          customer.address,
          customer.zipcode,
          customer.city,
          customer.phoneNumber);
        await this.httpCreateOrderDetail(orderitem).then(orderitemdata => {
          orderItems.push(orderitemdata);
        });
      }
      return data;
    });
  }
  private httpCreateOrder(newOrder: OrderToDatabase): Promise<any> {
    const headers = this.apiService.createRequestHeaders();
    return new Promise<any>(resolve => {
      this.http.put<Order>('http://localhost:8080/api/orders/create', newOrder, {headers})
      .subscribe(data => {
        resolve(data);
      });
    });
  }
  private httpCreateOrderDetail(orderItem: OrderItem): Promise<any>{
    const headers = this.apiService.createRequestHeaders();
    return new Promise<any>(resolve => {
      this.http.put<OrderItem>('http://localhost:8080/api/orderDetail/create', orderItem, {headers})
      .subscribe(() => {
        resolve(orderItem);
      });
    });
  }
  getOrderAndDetailsByOrderId(orderId: number): Promise<Order> {
    const headers = this.apiService.createRequestHeaders();
    return new Promise<Order>(resolve => {
      this.http.get<Order>('http://localhost:8080/api/orders/' + orderId, {headers})
      .subscribe(async (data: Order) => {
        data.orderItems = await this.getOrderDetailsOfOrderId(data.id);
        resolve(data);
      });
    });
  }

  private async getOrderDetailsOfOrderId(orderId: number): Promise<OrderItem[]> {
    const headers = this.apiService.createRequestHeaders();
    return new Promise<OrderItem[]>(resolve => {
      this.http.get<OrderItem[]>('http://localhost:8080/api/orderDetail/' + orderId, {headers})
      .subscribe(data => {
        resolve(data);
      });
    });
  }

  updateOrder(orderToUpdate: OrderToDatabase): Promise<Order> {
    const headers = this.apiService.createRequestHeaders();
    return new Promise<any>(resolve => {
      this.http.put<Order>('http://localhost:8080/api/orders/update', orderToUpdate, {headers})
      .subscribe(data => {
        resolve(data);
      });
    });
  }
  removerOrder(orderId: number): Promise<void> {
    const headers = this.apiService.createRequestHeaders();
    return new Promise<any>(resolve => {
      this.http.delete<Order>('http://localhost:8080/api/orders/' + orderId, {headers})
      .subscribe(data => {
        resolve(data);
      });
    });
  }
}
