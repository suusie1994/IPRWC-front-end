import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderProduct, Product } from 'src/app/products/product.model';
import { ProductsService } from 'src/app/products/products.service';
import { Order } from '../order.model';
import { OrderItem } from '../order-item.model';
import { OrdersService } from '../orders.service';
import { UserService } from 'src/app/user/user.service';
import { Customer } from 'src/app/user/customer.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  customer!: Customer;
  orderId!: number;
  order!: Order;
  productsOfOrder!: OrderProduct[];

  constructor(private route: ActivatedRoute,
              private ordersService: OrdersService,
              private productsService: ProductsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.orderId = +params.id;
      this.order = await this.getOrderWithDetails(this.orderId);
      this.productsOfOrder = this.getProductsOfOrder();
      this.customer = {
        // tslint:disable: no-non-null-assertion
        id: this.order.orderItems![0].customerId,
        firstname: this.order.orderItems![0].firstname,
        lastname: this.order.orderItems![0].lastname,
        emailAddress: this.order.orderItems![0].emailAddress,
        address: this.order.orderItems![0].address,
        zipcode: this.order.orderItems![0].zipcode,
        city: this.order.orderItems![0].city,
        phoneNumber: this.order.orderItems![0].phoneNumber
      };
    });
  }

  async getOrderWithDetails(orderId: number): Promise<Order> {
    return await this.ordersService.getOrderAndDetailsByOrderId(orderId);
  }

  getProductsOfOrder(): OrderProduct[] {
    const productsOfOrder: OrderProduct[] = [];
    const orderitems = this.order.orderItems;
    orderitems?.forEach((item: OrderItem) => {
      if (item.productId !== undefined) {
        const product = this.getProductById(item.productId);
        productsOfOrder.push({
          productId: item.productId,
          amount: item.amount,
          orderId: item.orderId,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image
        });
      }
    });
    return productsOfOrder;
  }

  getProductById(productId: number): Product {
    return this.productsService.getProductById(productId);
  }

  getTotalPriceOrder(): number {
    let result = 0;
    this.productsOfOrder.forEach(orderProduct => {
      if (orderProduct.price) {
        result += (+orderProduct.price.replace(/,/g, '.') * orderProduct.amount);
      }
    });
    return result;
  }
  getPriceOfOrderProduct(price: any, amount: number): number {
    return +price.replace(/,/g, '.') * amount;
  }
}
