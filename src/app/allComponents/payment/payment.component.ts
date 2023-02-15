import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/allServices/common.service';
import { NotificationService } from 'src/app/allServices/notification.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  count: any;
  item: any;
  cartItems: any;


  constructor(private service: CommonService,
    private paymentService: NotificationService) {
    this.cartItems = [

    ];
    this.item = [];
    this.count = 0;
  }

  ngOnInit(): void {
    this.cartItems = this.service.cartItems;
    console.log(this.cartItems);
    this.service.getCount().subscribe((data: any) => { this.count = data });
    //this.service.getCartStatus().subscribe((data: any) => this.cartItems.push(data));
  }


  // below two -- methods to show tosters
  showToasterPaymentSuccess() {
    this.paymentService.showSuccess("Payment Successfull !", "Order placed successfully!!")
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
      // addressType: regForm.addressType,
      flatAddress: regForm.flatAddress,
      city: regForm.city,
      pinCode: regForm.pinCode,
      state: regForm.state
    }
    
}

payment(regForm: any){

}

}
