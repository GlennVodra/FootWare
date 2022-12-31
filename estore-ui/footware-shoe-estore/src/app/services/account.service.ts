import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Shoe } from '../interfaces/shoe';
import { Account } from '../interfaces/account';
import { Transaction } from '../interfaces/transaction';
import { Coupon } from '../interfaces/coupon';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = "http://localhost:8080/accounts";


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

  
  getAccount(userName: string): Observable<Account> {
    const url = `${this.accountUrl}/${userName}`;
    return this.http.get<Account>(url).pipe(
      tap(account => this.log(`fetched account username=${account.userName}`)),
      catchError(this.handleError<Account>(`getAccount useranme=${userName}`))
    );
  }


  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl)
      .pipe(
        tap(_ => this.log('fetched accounts')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      );
  }


  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountUrl, account, this.httpOptions)
    .pipe(tap(_ => this.log(`added account [username=${account.userName}, displayname=${account.displayName}]`)),
    catchError(this.handleError<any>('addAccount'))
    );
  }
  

  deleteAccount(username: string): Observable<any> {
    const url = `${this.accountUrl}/${username}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted account with username=${username}`)),
      catchError(this.handleError<any>('deleteShoe'))
    );
  }


  updateAccount(username: string, account: Account): Observable<any>{
    const url = `${this.accountUrl}/${username}`;
    return this.http.put(url, account, this.httpOptions).pipe(
      tap(_ => this.log(`updated account username=${account.userName}, displayname=${account.displayName}`)),
      catchError(this.handleError<any>('updateShoe'))
    );
  }

  getCart(username: string): Observable<Shoe[]> {
    const url = `${this.accountUrl}/${username}/cart`;
    return this.http.get<Shoe[]>(url)
      .pipe(
        tap((_) => this.log('fetched cart')),
        catchError(this.handleError<Shoe[]>('getCart', []))
      );
  }

  getShoeFromCart(username: string, id: number): Observable<Shoe> {
    const url = `${this.accountUrl}/${username}/cart/${id}`;
    return this.http.get<Shoe>(url)
      .pipe(
        tap((_) => this.log('fetched shoe from cart')),
        catchError(this.handleError<Shoe>('getShoeFromCart'))
      );
  }  

  addToCart(username: string, shoe: Shoe): Observable<any> {
    const url = `${this.accountUrl}/${username}/cart`;
    return this.http.post<Shoe>(url, shoe, this.httpOptions).pipe(
      tap((newShoe: Shoe) => this.log(`added shoe 
      [brand=${shoe.brand}, name=${shoe.name}, model=${shoe.model},
        color=${shoe.color}, shoeType=${shoe.shoeType}, size=${shoe.size},
        price=${shoe.price}, quantity=${shoe.quantity}]`)),
      catchError(this.handleError<Shoe>('addToCart'))
    );
  }

  updateShoeInCart(username: string, shoe: Shoe): Observable<any> {
    const url = `${this.accountUrl}/${username}/cart`;
    return this.http.put(url, shoe, this.httpOptions).pipe(
      tap((_) => this.log(`updated shoe color =${shoe.color}, size=${shoe.size}`)),
      catchError(this.handleError<any>('updateShoeInCart'))
    );
  }

  removeShoeFromCart(username: string, id: number): Observable<Shoe> {
    const url = `${this.accountUrl}/${username}/cart/${id}`;
    return this.http.delete<Shoe>(url, this.httpOptions).pipe(
      tap((_) => this.log(`removed shoe with id=${id} from cart`)),
      catchError(this.handleError<Shoe>('removeShoeFromCart'))
    );
  }

  removeAllShoesFromCart(username: string): Observable<Shoe[]> {
    const url = `${this.accountUrl}/${username}/cart/all`;
    return this.http.delete<Shoe[]>(url, this.httpOptions).pipe(
      tap((_) => this.log(`all shoes checked out from cart`)),
      catchError(this.handleError<Shoe[]>('removeShoeFromCart'))
    );
  }

  getWishlist(username: string): Observable<Shoe[]> {
    const url = `${this.accountUrl}/${username}/wishlist`;
    return this.http.get<Shoe[]>(url)
      .pipe(
        tap((_) => this.log('fetched wishlist')),
        catchError(this.handleError<Shoe[]>('getWishlist', []))
      );
  }

  getShoeFromWishlist(username: string, id: number): Observable<Shoe> {
    const url = `${this.accountUrl}/${username}/wishlist/${id}`;
    return this.http.get<Shoe>(url)
      .pipe(
        tap((_) => this.log('fetched shoe from wishlist')),
        catchError(this.handleError<Shoe>('getShoeFromWishlist'))
      );
  }  

  addToWishlist(username: string, shoe: Shoe): Observable<any> {
    const url = `${this.accountUrl}/${username}/wishlist`;
    return this.http.post<Shoe>(url, shoe, this.httpOptions).pipe(
      tap((newShoe: Shoe) => this.log(`added shoe 
      [brand=${shoe.brand}, name=${shoe.name}, model=${shoe.model},
        color=${shoe.color}, shoeType=${shoe.shoeType}, size=${shoe.size},
        price=${shoe.price}, quantity=${shoe.quantity}]`)),
      catchError(this.handleError<Shoe>('addToWishlist'))
    );
  }

  updateShoeInWishlist(username: string, shoe: Shoe): Observable<any> {
    const url = `${this.accountUrl}/${username}/wishlist`;
    return this.http.put(url, shoe, this.httpOptions).pipe(
      tap((_) => this.log(`updated shoe color =${shoe.color}, size=${shoe.size}`)),
      catchError(this.handleError<any>('updateShoeInWishlist'))
    );
  }

  removeShoeFromWishlist(username: string, id: number): Observable<Shoe> {
    const url = `${this.accountUrl}/${username}/wishlist/${id}`;
    return this.http.delete<Shoe>(url, this.httpOptions).pipe(
      tap((_) => this.log(`removed shoe with id=${id} from wishlist`)),
      catchError(this.handleError<Shoe>('removeShoeFromWishlist'))
    );
  }


  addToPurchaseHistory(username: string, transaction: Transaction): Observable<Transaction> {
    const url = `${this.accountUrl}/${username}/purchases`;
    return this.http.post<Transaction>(url, transaction, this.httpOptions).pipe(
      tap((newTransaction: Transaction) => this.log(`added transaction ${newTransaction.id}`)),
      catchError(this.handleError<Transaction>('addToPurchaseHistory'))
    );
  }

  getPurchaseHistory(username: string): Observable<Transaction[]> {
    const url = `${this.accountUrl}/${username}/purchases`;
    return this.http.get<Transaction[]>(url)
      .pipe(
        tap((_) => this.log('fetched purchase history')),
        catchError(this.handleError<Transaction[]>('getPurchaseHistory'))
      );
  }

  getTransactionFromPurchaseHistory(username: string, id: string): Observable<Transaction> {
    const url = `${this.accountUrl}/${username}/purchases/${id}`;
    return this.http.get<Transaction>(url)
      .pipe(
        tap((_) => this.log('fetched purchase history')),
        catchError(this.handleError<Transaction>('getTransactionFromPurchaseHistory'))
      );
  }


  applyCouponToCart(username: string, coupon: Coupon): Observable<any> {
    const url = `${this.accountUrl}/${username}/cart/coupon`;
    return this.http.put(url, coupon, this.httpOptions).pipe(
      tap((_) => this.log(`used coupon with code=${coupon.code}, discount=${coupon.discount}`)),
      catchError(this.handleError<any>('applyCouponToCart'))
    );
    
  }

  getUsedCouponsList(username: string): Observable<Coupon[]> {
    const url = `${this.accountUrl}/${username}/usedcoupons`;
    return this.http.get<Coupon[]>(url)
      .pipe(
        tap(_ => this.log('fetched coupons from user')),
        catchError(this.handleError<Coupon[]>('getUsedCouponsList', []))
      );
  }  


  private log(message: string) {
    this.messageService.add(`AccountService: ${message}`);
  }
}
