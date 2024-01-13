import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FixerService {
  constructor(private http: HttpClient) {}

  API_ACCESS_KEY = '88f7b7d9fa57694d26036ed7a0a626bc';
  BASE_URL = `http://data.fixer.io/api/latest?access_key=${this.API_ACCESS_KEY}`;

  getCurrencies() {
    return this.http.get(this.BASE_URL).pipe(map((i:any)=>  i.rates
   
    ));
  }
}
