import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/allServices/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginStatus: any;
  userType: any;

  constructor(private userservice: UserService ,private router : Router ) {
   
  } 

  ngOnInit(): void {
    
    this.userservice.getLoginStatus().subscribe((data: any) => {
      this.loginStatus = data;
    });

    this.userservice.getUserType().subscribe((data :any) =>{
      this.userType =data;
    });
   
  }
  
}
