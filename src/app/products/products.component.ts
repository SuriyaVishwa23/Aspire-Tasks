import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Observable, map, takeWhile, timer } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {


  products: any[] = [];
  discountedProducts: any[] = [];

  saleEnded: boolean = false;



  constructor(private http: HttpClient, private cartService: CartService,private authService:AuthService) { }

  ngOnInit() {
    this.fetchDiscountedProducts();

    this.fetchProducts();
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:3000/products')
      .subscribe(products => {
        this.products = products;
      });
  }


  addToCart(product: any) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.addToCart(userId, product);
    }
  }

  fetchDiscountedProducts() {
    this.http.get<any[]>('http://localhost:3000/discountedproducts')
    .subscribe(discountedProducts => {
      this.discountedProducts = discountedProducts;

      // Update the sale duration for each discounted product
      this.discountedProducts.forEach(product => {
        product.remainingTime = product.saleduration * 60; // Convert sale duration to seconds
        this.startCountdown(product).subscribe(() => {
          if (product.remainingTime === 0) {
            this.saleEnded = true;
            this.deleteDiscountedProduct(product.id);
          }
        });
      });
    });
  }

  startCountdown(product: any): Observable<number> {
    return timer(0, 1000).pipe(
      takeWhile(() => product.remainingTime > 0),
      map(() => {
        product.remainingTime--;
        return product.remainingTime;
      })
    );
  }

  getFormattedTime(remainingTime: number): string {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  deleteDiscountedProduct(productId: number) {
    this.http.delete(`http://localhost:3000/discountedproducts/${productId}`).subscribe(() => {
      console.log(`Discounted product with ID ${productId} deleted.`);
    });
}
}
