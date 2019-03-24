import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
  HostListener,
  OnInit,
  OnDestroy
} from '@angular/core';
import * as d3 from 'd3';
import * as techan from 'techan';
import { CandleModel } from '../models/candle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from '@app/chart/chart.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  @Input()
  data: CandleModel[];
  @Input() title: string;
  symbol = 'MSFT';
  @ViewChild('chart')
  private chartContainer: ElementRef;
  private symbolSubscription: any;

  constructor(
    private chartService: ChartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.symbolSubscription = this.route.params.subscribe(params => {
      this.symbol = params['symbol'];
      this.title = params['companyName'];
      console.log('ChartComponent symbol', this.symbol);
    });

    this.isLoading = true;
    this.chartService
      .getCandles(this.symbol)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((candles: CandleModel[]) => {
        this.data = candles;
      });
  }

  ngOnDestroy() {
    this.symbolSubscription.unsubscribe();
  }
}
