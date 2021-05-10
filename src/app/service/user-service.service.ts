import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, Bank } from '../modules/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private Url = 'http://api.mygemstone.online/api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
      private http: HttpClient,
  ) { }

  /*
  // Get the list of all users in the api
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.Url).pipe(
        tap(_ => console.log('fetched Users')),
        catchError(this.handleError<User[]>('getUsers', []))
    );
  }
   */


  /** GET hero by id. Will 404 if id not found */
  checkUser(username: any): Observable<User> {
    const url = `${this.Url}/${username}`;
    return this.http.get<User>(url).pipe(
        catchError(this.handleError<User>(`getUser id=${username}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  verifyEmail(email: string): Observable<number>{
    const url = `${this.Url}/email/${email}`;
    return this.http.get<number>(url).pipe(
        catchError(this.handleError<number>(`verifyEmail id=${email}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  verifyPhone(mobile: string): Observable<number>{
    const url = `${this.Url}/phone/${mobile}`;
    return this.http.get<number>(url).pipe(
        catchError(this.handleError<number>(`verifyPhone id=${mobile}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  verifyUsername(Username: string){
    const url = `${this.Url}/username/${Username}`;
    return this.http.get(url).pipe(
        catchError(this.handleError<User>(`verifyUsername id=${Username}`))
    );
  }

  // Update user details
  updateBankDetails(bank: Bank, user: any){
    const url = `${this.Url}/${user}`;
    return this.http.put(url, bank, this.httpOptions).pipe(
        catchError(this.handleError('updateBankDetails'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  verifyCoupon(coupon: number, id: any): Observable<number>{
    const url = `${this.Url}/coupon/${id}/${coupon}`;
    return this.http.get<number>(url).pipe(
        catchError(this.handleError<number>(`verifyUsername id=${coupon}`))
    );
  }

  // Update user details
  updateCoupon(coupon: number, id: any): Observable<any> {
    const url = `${this.Url}/coupon/${id}`;
    return this.http.put<any>(url, coupon, this.httpOptions).pipe(
        catchError(this.handleError<any>('updateBankDetails'))
    );
  }


  /*
  // GET hero by id. Will 404 if id not found

  getUser(id: number): Observable<User> {
    const url = `${this.Url}/${id}`;
    return this.http.get<User>(url).pipe(
        tap(_ => console.log(`fetched hero id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
   */

  /*
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>('${this.Url}/?name=$(term)').pipe(
        tap( x => x.length ?
            `"{$term}"` :
            ''
        ),
        catchError(this.handleError<User[]>('searchUsers', []))
    );
  }
   */

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(this.Url, user, this.httpOptions).pipe(
        catchError(this.handleError<any>('registerUser'))
    );
  }

  password(pass: object, user: any): Observable<any> {
    const url = `${this.Url}/password/${user}`;
    return this.http.post<any>(url, pass, this.httpOptions).pipe(
        catchError(this.handleError<any>('password'))
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
