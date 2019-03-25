using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestApi.api;
using TestApi.Dto;
using TestApi.Helper;

namespace TestApi.Controllers
{
    [ApiController]
    public class CandleController : ControllerBase
    {
        private readonly AlphaVantageApi _alphaVantageApiService;
        public CandleController(AlphaVantageApi alphaVantageApiService) => _alphaVantageApiService = alphaVantageApiService;

        [HttpGet]
        [Route("~/v1/candles/{symbol}")]
        public async Task<ActionResult<IList<Candle>>> GetCandlesAsync(string symbol)
        {
            try
            {
                var candlestasks = await _alphaVantageApiService.GetCandles(symbol);
                return candlestasks as List<Candle>;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
