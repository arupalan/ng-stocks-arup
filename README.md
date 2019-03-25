# Project Summary

###.Net Core WebAPI fetching Historical Financial Data from AlphaVantage Data Server using my personal token `(please do not overuse else I'll become rate limited)`

**Angular Front End feats**

##### a) D3 MACD Charting of the Financial Data Candles for the stock which the use clicks for charting on the main page

- 1.  With all due respect to Mike Bostock, D3 functional programming and chaining is great but I loose on resuability and code cyclomatics
- 2.  In this sample I've had to discard Angular's Encapsulation and instead work on the native, because both Angular and D3 writes to DOM
- 3.  Remebering d3 API and quarks is great but perhaps not necessary and there are otherways that are easier. Constraing oneself to a set of API is like becoming a memory chip which is contrained to thinking within the remit of a piece of paper or API **D3** because of the out-of-box ready made features already available.
- 4.  There are quite a few beautiful work at the Open Source in React but none so in Angular. Hence a reason to start an open source in Angular achieving same like React I showcased earlier

##### b) Subject

In Angular production code you really should not need Subject (which is kind of both Observable and Observer) Think of this as a "Read & Write" assembly line (you can both add cars onto the assembly line and observe cars that come off the assembly line) . But such is trying to be unrealistic and opening holes for bugs when in reality you only want to be either an observer or an Observable and not both at the same time

##### c) Cypress End to End Automated Test

There are 60 plus tests , but Cypress e2e is so declarative and platform agnostic

**.Net Core WebAPI Server**

    - ConcurrentDictionary
    The ApiVantageApi HttpClient I've essentially registered and injecting as a singleton, hence caching results wrapped in ConcurrentDictionary and invoking async method only when cache has no appropriate result

    - Reasons for GraphQL
    Now that this is making calls to external for the required data such that the client now has to make two separate endpoints to make meaningful data visualization. This is a perfect scenario where you may want to facade the multiple endpoints into a singularity. Next weekend I'll code the GraphQL facade

### 1. First

`yarn install`

### 2. Working of the Application

#### a) `yarn start` will bootstrap both .Net Core Server and the Angular FrontEnd

#### b) login using any userid/passwd

#### c) This will show the dashboard list of stocks fetched from the .Net Core `/stocks` endpoint

#### d) You can show click on any of the listed stock which will fetch the financial candles OHCL from the 3rd Party API server AlphaVantage

#### c) The datapoint are plotted in Angular Native using D3 and Techan (data formatting)

#### d) Click on the `Home` to retuen back to the list of Stocks

![Frontpage](https://github.com/arupalan/ng-stocks-arup/blob/master/static/usage.gif)

### 3. yarn test

![Testing](https://github.com/arupalan/ng-stocks-arup/blob/master/static/coverage.gif)

### 4. Cypress e2e `yarn e2e`

![Boot](https://github.com/arupalan/ng-stocks-arup/blob/master/static/e2e.gif)

backend integrated using webpack and should be running at port 5000 as per current configuration. Or alternately modify proxy.conf.js
