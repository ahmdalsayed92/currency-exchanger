import { Component, OnInit } from '@angular/core';
import { FixerService } from '../../services/fixer.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-exchanger',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './exchanger.component.html',
  styleUrl: './exchanger.component.scss',
  providers: [FixerService],
})
export class ExchangerComponent implements OnInit {
  constructor(private fixerService: FixerService) {}

  rates?: any;
  currencies?: Array<string>;
  result?: any;

  form = new FormGroup({
    amount: new FormControl('1', Validators['required']),
    from: new FormControl('EUR', Validators['required']),
    to: new FormControl('USD', Validators['required']),
  });

  ngOnInit(): void {
    this.fixerService.getCurrencies().subscribe((data) => {
      (this.rates = data), (this.currencies = Object.keys(data));
    });
  }

  convert() {
    const from: any = this.form.get('from')?.value;
    const to: any = this.form.get('to')?.value;
    const amount: any = this.form.get('amount')?.value;

    this.result = (this.rates[to] / this.rates[from]) * amount;
  }
}
