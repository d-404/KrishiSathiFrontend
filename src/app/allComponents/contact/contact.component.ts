import { Component } from '@angular/core';
import { NotificationService } from 'src/app/allServices/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  title = 'toaster-not';

  constructor(private notifyService: NotificationService) { }

  showToasterSuccess() {
    this.notifyService.showSuccess("Message Successfully Sent!", "Thanks for contacting us!!")
  }

}
