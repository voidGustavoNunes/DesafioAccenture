import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from 'src/app/service/LoadingService';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor(public loadingService: LoadingService) {}
}
