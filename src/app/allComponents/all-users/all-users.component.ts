import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/allServices/notification.service';
import { UserService } from 'src/app/allServices/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  allCustomers: any;

  constructor(private userService : UserService, private notifyService: NotificationService){
   
  }

  ngOnInit() {
    this.userService.getUsersByType("customer").subscribe((data: any) => {
      this.allCustomers = (data);
    });
  }

  deleteCustomer(item: any) {
    this.userService.deleteUser(item.userId).subscribe();
    this.notifyService.showError("" ,"Customer Deleted Successfully");
  }
}
