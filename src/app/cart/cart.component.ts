import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private authService: AuthService) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.getCartItemsByUser(userId)?.subscribe((items) => {
        this.cartItems = items || [];
      });
    }
  }

  removeItem(product: any) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.removeItemFromCart(userId, product);
    }
  }

  increaseQuantity(product: any) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.increaseQuantity(userId, product);
    }
  }

  decreaseQuantity(product: any) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.decreaseQuantity(userId, product);
    }
  }

  getTotalPrice() {
    // Implement your logic to calculate the total price based on cart items and quantities
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.productPrice * item.quantity;
    }
    return totalPrice;
  }
}
