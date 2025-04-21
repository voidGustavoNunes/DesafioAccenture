import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notificationSubject = new BehaviorSubject<Notification | null>(null);
  public notification$ = this._notificationSubject.asObservable();

  // Adicione este método público para limpar notificações
  clearNotification(): void {
    this._notificationSubject.next(null);
  }

  success(message: string): void {
    this._notificationSubject.next({ message, type: 'success' });
    this.clearAfterDelay();
  }

  error(message: string): void {
    this._notificationSubject.next({ message, type: 'error' });
    this.clearAfterDelay();
  }

  info(message: string): void {
    this._notificationSubject.next({ message, type: 'info' });
    this.clearAfterDelay();
  }

  warning(message: string): void {
    this._notificationSubject.next({ message, type: 'warning' });
    this.clearAfterDelay();
  }

  private clearAfterDelay(delay: number = 5000): void {
    setTimeout(() => {
      this._notificationSubject.next(null);
    }, delay);
  }
}
