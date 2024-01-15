import { Injectable } from '@angular/core';
import { FixerService } from './fixer.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private fixer: FixerService) {}

  sharedData?: any;
  setSharedDetails(details: any) {
    this.sharedData = details;
  }
}
