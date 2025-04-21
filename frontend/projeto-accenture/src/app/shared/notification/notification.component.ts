import { Component } from '@angular/core';
import { NotificationService } from 'src/app/service/NotificationService';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}

  closeNotification(): void {
    this.notificationService.clearNotification();
  }
}
