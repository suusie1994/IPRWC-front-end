import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  subscription!: Subscription;
  productToAdd: Product = {
    id: 0,
    amount: 0,
    name: '',
    description: '',
    price: '',
    image: ''
  };
  showModal = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.subscription = this.productsService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
    this.products = this.productsService.getAllProducts();
  }

  onSubmit(form: NgForm): void {
    const product = {
      id: this.products[this.products.length - 1].id + 1,
      amount: form.value.amount,
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      image: form.value.image
    };
    this.productsService.createProduct(product);
    form.reset();
    this.showModal = false;
    location.reload();
  }

  openModal(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }
}
