import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { UserService } from 'src/app/allServices/user.service';
import { NotificationService } from 'src/app/allServices/notification.service';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  userType: any;
  loggedIn: any;
  email: any;
  email2: any;
  password: any;
  password2: any;
  otpStatus: any;
  verifiedEmail: any;
  OTP: any;
  userOtp: any;
  reason: any;

  constructor(private authService: SocialAuthService, private userService: UserService,
    private notifyService: NotificationService) {
    this.userType = 'customer';
    this.verifiedEmail = false;
    this.otpStatus = false;
    this.password2='';

  }

  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      this.reason = "fetchUser";
      this.userService.loginByGoogle(user, this.userType, this.reason);
    });

  }

  async sendOtp() {
    this.reason = "checkUser";
    await this.userService.getUserbyEmail(this.email2, this.userType, this.reason).then((data: any) => {
      this.user = data;
      if (this.user != null) {
        this.OTP = this.user.password;
        console.log(this.OTP);
        this.otpStatus = true;
        this.notifyService.showSuccess("OTP Sent Successfully !", "")
      } else {
        this.notifyService.showError("", "User not registered...!");
      }
    })
  }

  verifyOTP() {
    if (this.OTP == this.userOtp) {
      this.verifiedEmail = true;
      this.notifyService.showSuccess("OTP verified  Successfully !", "")
    } else {
      this.notifyService.showWarning("OTP not matched !", "")
    }
  }

  verifyByPassword() {
    this.userService.loginByPassword(this.email, this.password, this.userType);
  }

  editPassword() {
    jQuery('#updatePassword').modal('show');
  }

  updatePassword() {
    this.user.password=this.password2;
    this.userService.updateUser(this.user).subscribe((data :any) =>{
      console.log(data);
    });

    this.verifiedEmail = false;
    this.otpStatus = false;
    this.user=null;
    this.email2=null;
    this.password2=null;
    this.notifyService.showSuccess( "Please login again","Password updated successfully");
    
    jQuery('#updatePassword').modal('');
  }


}
