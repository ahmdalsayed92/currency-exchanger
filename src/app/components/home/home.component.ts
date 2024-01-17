import { Component } from '@angular/core';
import { ExchangerComponent } from '../exchanger/exchanger.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ExchangerComponent, CardComponent],
})
export class HomeComponent {
  cardsDataList?: any;
  handleCardsData(data: any) {
    this.cardsDataList = data;
  }
}
