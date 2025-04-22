import { Component } from '@angular/core';

@Component({
  selector: 'app-boas-vindas',
  templateUrl: './boas-vindas.component.html',
  styleUrls: ['./boas-vindas.component.scss']
})
export class BoasVindasComponent {
  currentDate = new Date(2025, 3, 22);
}
