# Project Summary
.Net Core WebAPI fetching Historical Financial Data from AlphaVantage Data Server using my personal token (please do not overuse else I'll become rate limited)
Angular Front End featuring
##### a) D3 MACD Charting of the Financial Data Candles for the stock which the use clicks for charting on the main page
##### b) Over 60 plus Tests
##### c) Cypress End to End Test

### 1. yarn install

### 2. Working of the Application
#### a) `yarn start` will bootstrap both .Net Core Server and the Angular FrontEnd
#### b) login using any userid/passwd 
#### c) This will show the dashboard list of stocks fetched from the .Net Core `/stocks` endpoint
#### d) You can show click on any of the listed stock which will fetch the financial candles OHCL from the 3rd Party API server AlphaVantage
#### c) The datapoint are plotted in Angular Native using D3 and Techan (data formatting) 
![Frontpage](https://github.com/arupalan/ng-stocks-arup/blob/master/static/usage.gif)

### 2. yarn test

![Testing](https://github.com/arupalan/ng-stocks-arup/blob/master/static/coverage.gif)

### 3. Cypress e2e `yarn e2e` 

![Boot](https://github.com/arupalan/ng-stocks-arup/blob/master/static/e2e.gif)
backend integrated using webpack and should be running at port 5000 as per current configuration. Or alternately modify proxy.conf.js
