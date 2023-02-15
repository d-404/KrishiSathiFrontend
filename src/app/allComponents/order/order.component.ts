import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/allServices/notification.service';
import { OrdersService } from 'src/app/allServices/orders.service';
import { UserService } from 'src/app/allServices/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  // productList: any;
  // cartItems : any;
  // retData : any;

  ordersList: any;
  user:any;
  userType : any;

  constructor(private notifyService: NotificationService, private service : UserService, private ordersService: OrdersService) {
    // this.productList = [
    //   { productId: 1, productName: 'Dahlia', productDescription: 'Premium quality Dahlia seeds.', imgPath: "/assets/Category Images/Flowers/Dahlia.jpg", productPrice: '250.30', quantity: '9' },
    //   { productId: 2, productName: 'Apple', productDescription: 'Premium quality Apple seeds.', imgPath: "/assets/Category Images/Fruits/Apple.jpg", productPrice: '200.50', quantity: '2' }
    // ];


    // this.retData = localStorage.getItem('cartItems');
    // this.cartItems = JSON.parse(this.retData);
    // console.log(this.cartItems);

    localStorage.removeItem('cartItems');

    this.user = this.service.getUser();
    // console.log('This is user');
    // console.log(this.user);
    this.userType = this.user.userType;
  }
 
  ngOnInit(): void {

    if(this.userType =='admin'){
      this.ordersService.getAllOrders().subscribe((data:any)=>
      {
        this.ordersList =data;
        console.log('this is orders list');
        console.log(this.ordersList);
      });
  
    }else{
      this.ordersService.getOrdersById(this.user.userId).subscribe((data:any)=>{
        this.ordersList = data;
        console.log('this is orders list for user');
        console.log(this.user.userId);
      });
    }
  }
 
}
