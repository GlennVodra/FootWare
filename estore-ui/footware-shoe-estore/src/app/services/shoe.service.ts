import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Shoe } from '../interfaces/shoe';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {
  private inventoryUrl = 'http://localhost:8080/inventory';

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

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getInventory(): Observable<Shoe[]> {
    return this.http.get<Shoe[]>(this.inventoryUrl)
      .pipe(
        tap((_) => this.log('fetched inventory')),
        catchError(this.handleError<Shoe[]>('getInventory', []))
      );
  }

  getShoe(id: number): Observable<Shoe> {
    const url = `${this.inventoryUrl}/${id}`;
    return this.http.get<Shoe>(url).pipe(
      tap((_) => this.log(`fetched shoe id=${id}`)),
      catchError(this.handleError<Shoe>(`getShoe id=${id}`))
    );
  }

  addShoe(shoe: Shoe): Observable<Shoe> {
    return this.http.post<Shoe>(this.inventoryUrl, shoe, this.httpOptions)
      .pipe(tap(() => this.log(this.toString(shoe))),
        catchError(this.handleError<Shoe>('addShoe'))
      );
  }

  updateShoe(shoe: Shoe): Observable<any> {
    return this.http.put(this.inventoryUrl, shoe, this.httpOptions).pipe(
      tap((_) => this.log(`updated shoe price=${shoe.price}, shoe size=${shoe.size}`)),
      catchError(this.handleError<any>('updateShoe'))
    );
  }

  updateShoes(shoes: Shoe[]): Observable<any> {
    return this.http.put(this.inventoryUrl + "/updateShoes", shoes, this.httpOptions).pipe(
      catchError(error => {
        shoes.forEach(shoe => {
          if (shoe.quantity <= 0)
            this.log("Shoe Id " + shoe.id + "'s quantity is below 0")
        })
        let updatedShoes: Shoe[] = shoes.filter(shoe => shoe.quantity > 0)
        return of(updatedShoes)
      }),
    );
  }


  deleteShoe(id: number): Observable<Shoe> {
    const url = `${this.inventoryUrl}/${id}`;
    return this.http.delete<Shoe>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted shoe id=${id}`)),
      catchError(this.handleError<Shoe>('deleteShoe'))
    );
  }

  searchInventory(term: string): Observable<Shoe[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Shoe[]>(`${this.inventoryUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found shoes matching ${term}`) :
        this.log(`no shoes matching "${term}"`)),
      catchError(this.handleError<Shoe[]>('searchInvenotry', []))
    );
  }

  toString(shoe: Shoe) {
    return `added shoe [brand=${shoe.brand}, name=${shoe.name}, model=${shoe.model},
      color=${shoe.color}, shoeType=${shoe.shoeType}, size=${shoe.size},
      price=${shoe.price}, quantity=${shoe.quantity}]`;
  }

  private log(message: string) {
    this.messageService.add(`ShoeService: ${message}`);
  }


}
