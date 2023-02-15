import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/allServices/user.service';
import { NotificationService } from 'src/app/allServices/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  person: any;
  email: any;
  OTP: any;
  verifiedEmail: any;
  otpStatus: any;
  userOtp: any

  constructor(private router: Router, private userService: UserService, private notifyService: NotificationService) {

    this.person = {
      userName: 'Enter Your Name',
      email: 'Enter Your Email Id',
      gender: '',
      dob: '',
      password: '',
      userType: 'customer'
    };

    this.verifiedEmail = false;
    this.otpStatus = false;
  }


  ngOnInit() {

  }

  RegisterUser() {
    this.userService.registerUser(this.person).subscribe((data: any) => {
      console.log(data);
    });
    alert("Successfully Registered");
    this.router.navigate(['login']);
  }

  async sendOtp() {
    await this.userService.verifyEmail(this.email + "@gmail.com").then((data: any) => {
      if (data != "9999999") {
        this.OTP = data;
        this.otpStatus = true;
        console.log(data);
        this.notifyService.showSuccess("OTP Sent Successfully !", "")
      } else {
        this.notifyService.showWarning("Can not send OTP !", "")
      }

    });

  }

  verifyEmail() {
    if (this.OTP == this.userOtp) {
      this.person.email = this.email+"@gmail.com";
      this.verifiedEmail = true;
      this.notifyService.showSuccess("Email verified  Successfully !", "")
    } else {
      this.notifyService.showWarning("OTP not matched !", "")
    }
  }

}