import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

const routes = {
  stocks: () => `/stocks`
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Stock {
  symbol: string;
  companyName: string;
  lastChange: number;
  change: number;
  changePercentage: number;
  high: number;
  low: number;
  volume: number;
}

@Injectable()
export class StockService {
  constructor(private httpClient: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(routes.stocks()).pipe(
      tap(_ => console.log('fetched stocks', _)),
      catchError(this.handleError('getStocks', []))
    );
  }
  private log(message: string) {
    console.log(`stockService: ${message}`);
  }
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error('StockService', error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`StockService ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
