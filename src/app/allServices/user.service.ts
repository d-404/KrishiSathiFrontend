import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLogged: boolean;
  loginStatus: Subject<any>;
  user: any;
  userType: Subject<any>;

  constructor(private authService: SocialAuthService, private router: Router, private httpClient: HttpClient, private notifyService: NotificationService) {

    this.isUserLogged = false;
    this.loginStatus = new Subject();
    this.userType = new Subject();
  }

  getLoginStatus(): any {
    return this.loginStatus.asObservable();
  }

  setUserLoggedIn() {
    this.isUserLogged = true;
    this.loginStatus.next(this.isUserLogged);
  }

  setUserLoggedOut() {

    this.authService.signOut().then(x => {
      this.isUserLogged = false;
      this.loginStatus.next(this.isUserLogged);
    });

  }

  //  Login By Google

  async loginByGoogle(user: any, userType: any ,reason :any) {
   
    await this.getUserbyEmail(user.email, userType ,reason).then((data: any) => {

      if (data != null) {

        data.photoUrl = user.photoUrl;
        this.setUser(data);
        this.userType.next(data.userType);
        this.setUserLoggedIn();

        this.router.navigate(['profile']);
      } else {
        this.notifyService.showError("", "Not a registered user !");
        this.authService.signOut();
      }
    });
  }

  //Login By password
  async loginByPassword(email: any, password: any, userType: any) {

    await this.getUserbyPassword(email, password, userType).then((data: any) => {

      if (data != null) {

        data.photoUrl = "/assets/home-img/profile-icon.png";
        this.setUser(data);
        this.userType.next(data.userType);
        this.setUserLoggedIn();

        this.router.navigate(['profile']);
      } else {
        this.notifyService.showError("", "Not a registered user !");
      }
    });

  }

  setUser(user: any) {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }

  getUserType(): any {
    return this.userType.asObservable();
  }

  // User Services

  // Create a new user
  registerUser(person: any) {
    console.log(person);
    return this.httpClient.post('/registerUser', person);
  }

  // Fetch all user
  getUsersByType(userType: any) {
    return this.httpClient.get('/getByUserType/' + userType);
  }


  // Get user by emailId
  getUserbyEmail(email: any, userType: any ,reason :any) {
    return this.httpClient.get("/getUserByEmail/" + email + "/" + userType + "/"+reason).toPromise();
  }

  // Get user by password
  getUserbyPassword(email: any, password: any, userType: any) {
    return this.httpClient.get("/getUserByPassword/" + email + "/" + password + "/" + userType).toPromise();

  }

  //Upadate user
  updateUser(user: any) {
    return this.httpClient.put('/updateUser', user);
  }

  //Delete user
  deleteUser(userId: any) {
    return this.httpClient.delete('/deleteEmployee/'+userId);
  }

  //Verify Email
  verifyEmail(email: any) {
    return this.httpClient.get("/verifyEmail/" + email).toPromise();
  }

}
