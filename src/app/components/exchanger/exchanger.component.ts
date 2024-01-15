import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FixerService } from '../../services/fixer.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-exchanger',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './exchanger.component.html',
  styleUrl: './exchanger.component.scss',
  providers: [FixerService],
})
export class ExchangerComponent implements OnInit, OnChanges {
  constructor(
    private fixerService: FixerService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  @Input() details: boolean = false;
  @Input() data: any;

  @Output() resultInfo = new EventEmitter<any>();
  rates?: any;
  currencies?: Array<string>;
  result?: any;

  form = new FormGroup({
    amount: new FormControl('', [
      Validators.pattern(/^\d+$/),
      Validators.required,
    ]),
    from: new FormControl(
      { value: 'EUR', disabled: true },
      Validators['required']
    ),
    to: new FormControl(
      { value: 'USD', disabled: true },
      Validators['required']
    ),
  });

  ngOnInit(): void {
    this.checkAmountValidity();
    this.getFixer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.form.patchValue({
        from: changes['data'].currentValue?.from,
        to: changes['data'].currentValue?.to,
        amount: changes['data'].currentValue?.amount,
      });
      this.result = changes['data'].currentValue?.result;
    }
  }
  getFixer() {
    this.fixerService.getCurrencies().subscribe((data) => {
      this.rates = data;
      this.currencies = Object.keys(data);
    });
  }

  checkAmountValidity() {
    this.form.get('amount')?.statusChanges.subscribe((status) => {
      if (this.details === true) {
        this.form.get('from')?.disable();
        this.form.get('to')?.enable();
      } else {
        if (status === 'VALID') {
          this.form.get('from')?.enable();
          this.form.get('to')?.enable();
        } else {
          this.form.get('from')?.disable();
          this.form.get('to')?.disable();
        }
      }
    });
  }
  convert() {
    const from: any = this.form.get('from')?.value;
    const to: any = this.form.get('to')?.value;
    const amount: any = this.form.get('amount')?.value;
    this.result = (this.rates[to] / this.rates[from]) * amount;
  }

  swap() {
    const from: any = this.form.get('from')?.value;
    const to: any = this.form.get('to')?.value;
    this.form.get('from')?.setValue(to);
    this.form.get('to')?.setValue(from);
    this.form.updateValueAndValidity();
    this.convert();
  }

  navToDetails() {
    const from: any = this.form.get('from')?.value;
    const to: any = this.form.get('to')?.value;
    const amount: any = this.form.get('amount')?.value;
    this.sharedService.setSharedDetails({
      from,
      to,
      amount,
      result: this.result,
    });

    this.router.navigate(['/details']);
  }
}
