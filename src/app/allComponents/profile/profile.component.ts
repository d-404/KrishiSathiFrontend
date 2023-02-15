import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/allServices/notification.service';
import { UserService } from 'src/app/allServices/user.service';

declare var jQuery: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: any;
  allCustomers: any;
  person: any;

  constructor(private userService: UserService, private notifiy: NotificationService) {
    this.user = this.userService.getUser();
    console.log(this.user);
  }

  ngOnInit() {
  }

  editProfile() {
    console.log('Update Profile');
    jQuery('#updateProfile').modal('show');
  }

  updateProfile() {
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe((data: any) => {console.log(this.user)});
    this.notifiy.showInfo("", "Profile Updated Successfully");
  }
}

