import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

 
  cartItems: any;
  count: Subject<any>;
  productToBeAdded: Subject<any>;

  constructor(private httpClient: HttpClient) {
   
    this.cartItems = [];
    this.count = new Subject();
    this.productToBeAdded = new Subject();
   }

   addToCart(prod: any): any{
    this.cartItems.push(prod);

    this.productToBeAdded.next(prod);
    this.count.next(this.cartItems.length);
   }

   getCartStatus():any{
    return this.productToBeAdded.asObservable();
   }

   getCount(): any {
    return this.count.asObservable();
   }

   showCartItems(): any {
   // return this.cartItems;
   return this.productToBeAdded;
   }

   remove(item: any) {
   
    return this.httpClient.delete('/remove/' + item.productId);
  }

   
  getAllCropData(): any {
    return this.httpClient.get('https://api.data.gov.in/resource/35be999b-0208-4354-b557-f6ca9a5355de?api-key=579b464db66ec23bdd000001e655172a7ef143624ee30d0d194b3b19&format=json&limit=246092');
  }


}
