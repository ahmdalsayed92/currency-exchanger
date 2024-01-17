import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FixerService {
  constructor(private http: HttpClient) {}

  API_ACCESS_KEY = '88f7b7d9fa57694d26036ed7a0a626bc';
  BASE_URL = `http://data.fixer.io/api/`;

  getCurrencies() {
    const url = `${this.BASE_URL}latest?access_key=${this.API_ACCESS_KEY}`;
    return this.http.get(url).pipe(map((i: any) => i.rates));
  }

  getSympols() {
    const url = `${this.BASE_URL}symbols?access_key=${this.API_ACCESS_KEY}`;
    return this.http.get(url).pipe(map((i: any) => i.symbols));
  }

  getHistoricalRates(date: string, to: string) {
    const url = `${this.BASE_URL}${date}?access_key=${this.API_ACCESS_KEY}`;
    return this.http.get(url).pipe(map((i: any) => i.rates[to]));
  }
}
