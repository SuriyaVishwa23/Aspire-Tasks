import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsMap = new Map<string, BehaviorSubject<any[]>>();
  public cartItems$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadCartItems();
  }

  addToCart(userId: string, product: any) {
    const cartItems = this.getOrCreateUserCartItems(userId);
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cartItems.push(product);
    }

    this.cartItemsMap.get(userId)?.next(cartItems);
    this.saveCartItems();
  }

  removeItemFromCart(userId: string, product: any) {
    const cartItems = this.getOrCreateUserCartItems(userId);
    const updatedItems = cartItems.filter((item) => item.id !== product.id);

    this.cartItemsMap.get(userId)?.next(updatedItems);
    this.saveCartItems();
  }

  increaseQuantity(userId: string, product: any) {
    const cartItems = this.getOrCreateUserCartItems(userId);
    const updatedItems = cartItems.map((item) => {
      if (item.id === product.id) {
        item.quantity += 1;
      }
      return item;
    });

    this.cartItemsMap.get(userId)?.next(updatedItems);
    this.saveCartItems();
  }

  decreaseQuantity(userId: string, product: any) {
    const cartItems = this.getOrCreateUserCartItems(userId);
    const updatedItems = cartItems.map((item) => {
      if (item.id === product.id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });

    this.cartItemsMap.get(userId)?.next(updatedItems);
    this.saveCartItems();
  }

  getCartItemsByUser(userId: string) {
    return this.cartItemsMap.get(userId)?.asObservable();
  }

  private getOrCreateUserCartItems(userId: string) {
    if (!this.cartItemsMap.has(userId)) {
      const cartItemsSubject = new BehaviorSubject<any[]>([]);
      this.cartItemsMap.set(userId, cartItemsSubject);
    }
    return this.cartItemsMap.get(userId)?.getValue() || [];
  }

  private saveCartItems() {
    const cartItemsMapArray = Array.from(this.cartItemsMap.entries());
    const cartItemsMapObject: any = {};

    for (const [userId, cartItemsSubject] of cartItemsMapArray) {
      cartItemsMapObject[userId] = cartItemsSubject.getValue();
    }

    this.http.post("http://localhost:3000/cart", cartItemsMapObject).subscribe(
      () => {},
      error => {
        console.log('Error saving cart items:', error);
      }
    );
  }

  private loadCartItems() {
    this.http.get<any>("http://localhost:3000/cart").subscribe(
      cartItemsMapObject => {
        for (const userId in cartItemsMapObject) {
          if (cartItemsMapObject.hasOwnProperty(userId)) {
            const cartItemsSubject = new BehaviorSubject<any[]>(cartItemsMapObject[userId]);
            this.cartItemsMap.set(userId, cartItemsSubject);
          }
        }
        this.cartItems$.next(cartItemsMapObject);
      },
      error => {
        console.log('Error loading cart items:', error);
      }
    );
  }
}
