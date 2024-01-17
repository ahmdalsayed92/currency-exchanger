import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { FixerService } from '../../services/fixer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  rates: any;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private fixerService: FixerService
  ) {}
  ngOnInit(): void {
    this.getFixer();
  }

  navToDetails(from: any, to: any) {
    this.sharedService.setSharedDetails({
      from,
      to,
      amount: 1,
      result: this.rates[to] / this.rates[from],
    });

    this.router.navigate(['/details']);
  }

  getFixer() {
    this.fixerService.getCurrencies().subscribe((data) => {
      this.rates = data;
    });
  }
}
