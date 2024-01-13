import { Component } from '@angular/core';
import { ExchangerComponent } from '../exchanger/exchanger.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ExchangerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
