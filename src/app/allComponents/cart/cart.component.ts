import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/allServices/common.service';
import { NotificationService } from 'src/app/allServices/notification.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/allServices/orders.service';
import { UserService } from 'src/app/allServices/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any;
  count: any;
  item: any;
  subTotal: any;
  order: any;
  userId : any;
  orderNumber : any;
  ol :any;
  user:any;


  constructor(private service: CommonService,
    private paymentService: NotificationService,
    private router: Router, 
    private ordersService:OrdersService,
    private userService: UserService) {
    this.cartItems = [];
    this.item = [];
    this.count = 0;
    

    this.order = {
      "orderNumber": "",
      "userId": "",
      "productId": "",
      "qty": "",
      "productDescription": "",
      "productPrict": 0,
      "totalPrice": 0,
      "imagePath": ""
    }
    this.userId = 1;
    this.ol=[];

    this.ordersService.getAllOrders().subscribe((data:any)=>
    {
      this.ol =data;
    });

    this.user = this.userService.getUser();

    

  }

  ngOnInit(): void {
    this.cartItems = this.service.cartItems;
    //console.log(this.cartItems);
    this.service.getCount().subscribe((data: any) => { this.count = data });
   // this.service.getCartStatus().subscribe((data: any) => this.cartItems.push(data));
   
  }

  proceedToPayment() {


    this.orderNumber = this.ol.length;

    localStorage.setItem('cartItems',JSON.stringify(this.cartItems));
   // console.log(this.cartItems);

   this.cartItems.forEach((record:any)=>{

    this.orderNumber = this.orderNumber+1;
    this.order = {
      "orderNumber": this.orderNumber,
      "userId": this.user.userId,
      "productId": record.productId,
      "qty": record.quantity ,
      "productDescription": "Description",
      "productPrict": record.productPrice,
      "totalPrice": (record.productPrice * record.quantity),
      "imagePath": record.imagePath
    }

    this.ordersService.registerOrder(this.order).subscribe((result:any)=>{
      console.log(result);
    });



    
  });

  
  console.log('order registered and the order is');
  console.log(this.order);

  this.service.cartItems = [];

  this.router.navigate(['/payment']);

  }

  get total() {
    return this.cartItems.reduce((sum: number, item: { productPrice: number; quantity: number; }) => sum + item.productPrice * item.quantity, 0);
  }
  // below two -- methods to show tosters
  showToasterPaymentSuccess() {
    this.paymentService.showSuccess("Payment Successfully !", "Order placed successfully!!")
  }

  showToasteraddressSuccess() {
    this.paymentService.showInfo("Address saved successfully", 'Please proceed with the payment process')
  }

  deliveryAddress(regForm: any) {
    let address: any;
    address = {
      fullName: regForm.fullName,
      emailId: regForm.emailId,
      mobileNum: regForm.mobileNum,
      addressType: regForm.addressType,
      primaryAdd: regForm.primaryAdd,
      city: regForm.city,
      pinCode: regForm.pinCode,
      state: regForm.state
    }
  }

  ngAfterContentChecked() {
    this.subTotal = this.cartItems.reduce(
        (prev: number, cur: { count: number; productPrice: number; }) => prev + cur.count * cur.productPrice, 0);
}

  addOne(item: any) {
    if(item.count>1){
      item.count--;
    }
    
  }

  minusOne(item: any) {
    item.count--;
  }

  remove(item: any) {
    console.log(item);

    this.service.remove(item).subscribe((item: any) => { console.log(item) });

    const i = this.cartItems.findIndex((element: any) => {
      return item.productId === element.productId;
    });
    this.cartItems.splice(i, 1);
  }

}


