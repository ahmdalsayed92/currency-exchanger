import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ExchangerComponent } from '../exchanger/exchanger.component';
import { SharedService } from '../../services/shared.service';
import { FixerService } from '../../services/fixer.service';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ExchangerComponent, NgChartsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  data?: any;
  lastDays: any = [];
  rates: any = [];
  chartData = {
    labels: [''],
    datasets: [
      {
        label: 'Rates Past Year',
        data: [],
        backgroundColor: 'rgb(0 ,167 ,255, 0.7)',
        borderColor: 'rgb(0 ,167 ,255, 1)',
        borderWidth: 1,
      },
    ],
  };

  constructor(
    private fixer: FixerService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.handleResultInfo();
    this.getLastDaysOfPastYear();
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
      forkJoin(
        this.lastDays.map((date: any) =>
          this.fixer.getHistoricalRates(date, this.data?.to)
        )
      ).subscribe((responses: any) => {
        this.chartData.datasets[0].data = responses;
        this.chart?.update();
      });
    });
  }

  getLastDaysOfPastYear() {
    const today = new Date();
    const lastYear = new Date(today.getFullYear() - 1, 11, 31);

    for (let month = 0; month <= 12; month++) {
      const lastDayOfMonth = new Date(lastYear.getFullYear(), month, 0);
      const formattedDate = lastDayOfMonth.toISOString().slice(0, 10);
      this.lastDays.push(formattedDate);
      this.chartData.labels = this.lastDays;
    }
  }
}
