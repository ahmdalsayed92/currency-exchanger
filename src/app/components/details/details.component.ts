import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExchangerComponent } from '../exchanger/exchanger.component';
import { SharedService } from '../../services/shared.service';
import { FixerService } from '../../services/fixer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ExchangerComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  data?: any;

  constructor(
    private fixer: FixerService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.handleResultInfo();
  }

  handleResultInfo() {
    this.fixer.getSympols().subscribe((sympols) => {
      this.data = {
        fromFullName: sympols[this.sharedService.sharedData?.from],
        from: this.sharedService.sharedData?.from,
        to: this.sharedService.sharedData?.to,
        amount: this.sharedService.sharedData?.amount,
        result: this.sharedService.sharedData?.result,
      };
    });
  }
}
