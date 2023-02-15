import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) {
    
   }

   getAllOrders(): any{
    return this.httpClient.get('/getAllOrders');
   }

   getOrdersById(id:any): any{
    return this.httpClient.get('/getOrdersById/'+ id);
   }

   registerOrder(order: any): any{
    return this.httpClient.post('/registerOrder', order);
   }
}
