using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TestApi.Dto;
using TestApi.Helper;
using System.Threading.Tasks;
using TestApi.api;
using System.Net.Http;

namespace TestApi.Controllers
{
    [ApiController]
    public class StockController : ControllerBase
    {
        [HttpGet]
        [Route("~/v1/stocks")]
        public async Task<ActionResult<IList<Stock>>> GetStocks()
        {
            try
            {
                return await DataStore.GetStocksAsync();
            }
            catch (HttpRequestException)
            {
                return null;
            }
        }



    }
}

