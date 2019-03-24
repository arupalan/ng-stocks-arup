using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Linq;
using TestApi.Dto;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TestApi.api
{
    public class AlphaVantageApi
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger _logger;

        #region ctor
        public AlphaVantageApi(IHttpClientFactory clientFactory, ILogger<AlphaVantageApi> logger)
        {
            _clientFactory = clientFactory;
            _logger = logger;
        }
        #endregion

        public async Task<IList<Candle>> GetCandles(string symbol)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&outputsize=full&apikey=2DVGFZ4QO7LI2DEV");
            request.Headers.Add("Accept", "application/json");
            HttpClient client = _clientFactory.CreateClient();
            try
            {
                HttpResponseMessage response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    var jsonData = await response.Content.ReadAsStringAsync();
                    JObject my_obj = JsonConvert.DeserializeObject<JObject>(jsonData);
                    IList<Candle> lstCandles = new List<Candle>();
                    foreach (KeyValuePair<string, JToken> sub_obj in (JObject)my_obj["Time Series (Daily)"])
                    {
                        //Console.WriteLine(sub_obj.Key + "\topen" + sub_obj.Value["1. open"] + "\thigh" + sub_obj.Value["2. high"] + "\tlow" + sub_obj.Value["3. low"] + "\tclose" + sub_obj.Value["4. close"] + "\tvolume" + sub_obj.Value["5. volume"]);
                        lstCandles.Add(new Candle()
                        {
                            date = DateTime.Parse(sub_obj.Key),
                            open = (decimal)sub_obj.Value["1. open"],
                            high = (decimal)sub_obj.Value["2. high"],
                            low = (decimal)sub_obj.Value["3. low"],
                            close = (decimal)sub_obj.Value["4. close"],
                            volume = (decimal)sub_obj.Value["5. volume"]
                        });
                    }
                    return lstCandles;
                }
                else
                {
                    System.Console.WriteLine("API returned No data:");
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
