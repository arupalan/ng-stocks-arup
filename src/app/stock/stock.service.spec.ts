import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { StockService, Stock } from './stock.service';

describe('StockService', () => {
  let stockService: StockService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [HttpCacheService, StockService]
    });
  }));

  beforeEach(inject(
    [HttpCacheService, StockService, HttpTestingController],
    (
      htttpCacheService: HttpCacheService,
      _productService: StockService,
      _httpMock: HttpTestingController
    ) => {
      stockService = _productService;
      httpMock = _httpMock;

      htttpCacheService.cleanCache();
    }
  ));

  afterEach(() => {
    httpMock.verify();
  });

  describe('getStock', () => {
    it('should return a Stocks', () => {
      // Arrange
      const mockStocks: Stock[] = [
        {
          symbol: 'VNDT',
          companyName: 'Some VNDT',
          lastChange: 2.6,
          change: 3.5,
          changePercentage: 0.05,
          high: 8.3,
          low: 0.3,
          volume: 23456
        },
        {
          symbol: 'MSFT',
          companyName: 'SOME MSFT',
          lastChange: 2.6,
          change: 3.5,
          changePercentage: 0.05,
          high: 9.3,
          low: 0.3,
          volume: 23456
        },
        {
          symbol: 'VNDT',
          companyName: 'SOME VNDT',
          lastChange: 2.6,
          change: 5.5,
          changePercentage: 0.05,
          high: 18.3,
          low: 0.3,
          volume: 27456
        }
      ];

      // Act
      const stockSubscription = stockService.getStocks();

      // Assert
      stockSubscription.subscribe((stocks: Stock[]) => {
        expect(stocks).toEqual(mockStocks);
      });
      httpMock.expectOne({}).flush(mockStocks);
    });

    // it('should return empty stocks array in case of error', () => {
    //   // Act
    //   const stockSubscription = stockService.getStocks();
    //   const stockResponse: Stock[] = [];
    //   // Assert
    //   stockSubscription.subscribe((stocks: Stock[]) => {
    //     expect(typeof stocks).toEqual('string');
    //     expect(stocks).toContain(stockResponse);
    //   });
    //   httpMock.expectOne({}).flush(null, {
    //     status: 500,
    //     statusText: 'error'
    //   });
    // });
  });
});
