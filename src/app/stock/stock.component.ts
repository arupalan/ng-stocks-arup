import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {Router, ActivatedRoute} from '@angular/router';

import { StockService, Stock } from './stock.service';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stocks: Stock[];
  isLoading: boolean;
  @Input() cols: number;
  @Input() gutterSize: string;
  faChartLine = faChartLine;

  constructor(private stockService: StockService , private router: Router,  private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    this.stockService
      .getStocks()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((stocks: Stock[]) => {
        this.stocks = stocks;
      });
  }

  // onStockCandles( url: string,  symbol: string) {
  //   const candlesurl = `${url}/${symbol}`;
  //   this.route.queryParams.subscribe(params =>
  //           this.router.navigate([params.redirect || candlesurl ], { replaceUrl: true }).then(e => {
  //             if (e) {
  //               console.log('Navigation to ' + candlesurl + ' is successful!');
  //             } else {
  //               console.log('Navigation has failed!');
  //             }
  //           })
  //   );
  // }
}
