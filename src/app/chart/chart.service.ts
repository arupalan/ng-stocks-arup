import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { CandleModel } from '../models/candle.model';
import { ActivatedRoute } from '@angular/router';

const routes = {
  candles: (context: string) => `/candles/${context}`
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Chart {
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
export class ChartService {
  constructor(private httpClient: HttpClient) {}

  getCandles(symbol: string): Observable<CandleModel[]> {
    return this.httpClient.get<CandleModel[]>(routes.candles(symbol)).pipe(
      tap(_ => console.log('fetched candles', _)),
      catchError(this.handleError('getCandles', []))
    );
  }
  private log(message: string) {
    console.log(`stockService: ${message}`);
  }
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`ChartService ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
