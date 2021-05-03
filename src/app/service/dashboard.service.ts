import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private Url = 'http://localhost:8000/api/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
      private http: HttpClient
  ) { }


  login(details: object): Observable<any>{
    const url = `${this.Url}`;
    return this.http.post<any>(this.Url, details, this.httpOptions).pipe(
        catchError(this.handleError<any>('LoginRequest'))
    );
  }

  checkUser(user: any){
    const url = `${this.Url}/${user}`;
    return this.http.get(url).pipe(
        catchError(this.handleError('checkUser'))
    );
  }

  getInfo(user: any): Observable<any>{
    const url = `${this.Url}/info/${user}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError('getInfo'))
    );
  }

  getReferralDetails(user: any): Observable<any>{
    const url = `${this.Url}/ref/${user}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError('getReferralDetails'))
    );
  }

  getCouponAmount(user: any): Observable<any>{
    const url = `${this.Url}/coupon/${user}`;
    return this.http.get<any>(url).pipe(
        catchError(this.handleError('getCouponAmount'))
    );
  }

  changePassword(user: any, details: any) {
    const url = `${this.Url}/password/${user}`;
    return this.http.post(url, details, this.httpOptions).pipe(
      catchError(this.handleError<any>('changePassword'))
    );
  }

  changeBank(user: any, details: any) {
    const url = `${this.Url}/bank/${user}`;
    return this.http.post(url, details, this.httpOptions).pipe(
        catchError(this.handleError('changePassword'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
