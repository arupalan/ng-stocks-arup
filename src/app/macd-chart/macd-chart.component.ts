import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
  HostListener
} from '@angular/core';
import * as d3 from 'd3';
import * as techan from 'techan';
import { CandleModel } from '@app/models/candle.model';

@Component({
  selector: 'app-macd-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './macd-chart.component.html',
  styleUrls: ['./macd-chart.component.scss']
})
export class MacdChartComponent implements OnChanges {
  @Input()
  data: CandleModel[];
  @Input()
  title: string;
  @ViewChild('chart')
  private chartContainer: ElementRef;

  constructor() {}

  ngOnChanges(): void {
    if (!this.data) {
      return;
    }
    this.createChart();
  }

  onResize() {
    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;

    const margin = { top: 20, right: 50, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const x = techan.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const candlestick = techan.plot
      .candlestick()
      .xScale(x)
      .yScale(y);

    const xAxis = d3.axisBottom(x);
    const xTopAxis = d3.axisTop(x);
    const yAxis = d3.axisLeft(y);
    const yRightAxis = d3.axisRight(y);
    const ohlcAnnotation = techan.plot
      .axisannotation()
      .axis(yAxis)
      .orient('left')
      .format(d3.format(',.2f'));
    const ohlcRightAnnotation = techan.plot
      .axisannotation()
      .axis(yRightAxis)
      .orient('right')
      .translate([width, 0]);
    const timeAnnotation = techan.plot
      .axisannotation()
      .axis(xAxis)
      .orient('bottom')
      .format(d3.timeFormat('%Y-%m-%d'))
      .width(65)
      .translate([0, height]);

    const timeTopAnnotation = techan.plot
      .axisannotation()
      .axis(xTopAxis)
      .orient('top');

    const crosshair = techan.plot
      .crosshair('g')
      .xScale(x)
      .yScale(y)
      .xAnnotation([timeAnnotation, timeTopAnnotation])
      .yAnnotation([ohlcAnnotation, ohlcRightAnnotation]);

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const accessor = candlestick.accessor();

    const coordsText = svg
      .append('text')
      .style('text-anchor', 'end')
      .attr('class', 'coords')
      .attr('x', width - 5)
      .attr('y', 15);

    const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S');
    let data = this.data
      .slice(0, 200)
      .map(function(d) {
        return {
          date: parseDate(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: +d.close,
          volume: +d.volume
        };
      })
      .sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b));
      });

    data = data.sort(function(a, b) {
      return d3.ascending(accessor.d(a), accessor.d(b));
    });

    x.domain(data.map(accessor.d));
    y.domain(techan.scale.plot.ohlc(data, accessor).domain());

    svg
      .append('g')
      .datum(data)
      .attr('class', 'candlestick')
      .call(candlestick);

    svg
      .append('g')
      .attr('class', 'x axis')
      .call(xTopAxis);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    svg
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + width + ',0)')
      .call(yRightAxis);

    svg
      .append('g')
      .attr('class', 'y annotation left')
      .datum([{ value: 74 }, { value: 67.5 }, { value: 58 }, { value: 40 }]) // 74 should not be rendered
      .call(ohlcAnnotation);

    svg
      .append('g')
      .attr('class', 'x annotation bottom')
      .datum([{ value: x.domain()[30] }])
      .call(timeAnnotation);

    svg
      .append('g')
      .attr('class', 'y annotation right')
      .datum([{ value: 61 }, { value: 52 }])
      .call(ohlcRightAnnotation);

    svg
      .append('g')
      .attr('class', 'x annotation top')
      .datum([{ value: x.domain()[80] }])
      .call(timeTopAnnotation);

    svg
      .append('g')
      .attr('class', 'crosshair')
      .datum({ x: x.domain()[80], y: 67.5 })
      .call(crosshair)
      .each(function(d) {
        console.log('move', d);
      }); // Display the current data

    svg
      .append('text')
      .attr('x', 5)
      .attr('y', 15)
      .text(this.title);
  }
}
