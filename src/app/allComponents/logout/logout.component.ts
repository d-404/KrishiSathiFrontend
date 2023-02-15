import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/allServices/user.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private authService: SocialAuthService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.setUserLoggedOut();
  }

}
