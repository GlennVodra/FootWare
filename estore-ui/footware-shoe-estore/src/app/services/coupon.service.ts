import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Coupon } from '../interfaces/coupon';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private couponUrl = "http://localhost:8080/coupons";


  constructor(private http: HttpClient,
    private messageService: MessageService) { 
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }


  private log(message: string) {
    this.messageService.add(`AccountService: ${message}`);
  }


  getCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.couponUrl)
      .pipe(
        tap(_ => this.log('fetched coupons')),
        catchError(this.handleError<Coupon[]>('getCoupons', []))
      );
  }


  getCoupon(code: string): Observable<Coupon> {
    const url = `${this.couponUrl}/${code}`;
    return this.http.get<Coupon>(url)
      .pipe(
        tap(_ => this.log('fetched coupons')),
        catchError(this.handleError<Coupon>('getCoupons'))
      );
  }


  addCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(this.couponUrl, coupon, this.httpOptions)
    .pipe(tap(_ => this.log(`added coupons [code=${coupon.code}, discount=${coupon.discount}]`)),
    catchError(this.handleError<any>('addCoupon'))
    );
  }


  deleteCoupon(code: string): Observable<any> {
    const url = `${this.couponUrl}/${code}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted coupon with code=${code}`)),
      catchError(this.handleError<any>('deleteCoupon'))
    );
  }
}
