import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Are you sure you want to quit?, You would not be able to return ');
    if (confirmation) {
      sessionStorage.clear();
    }
    return of(confirmation);
  }
}
