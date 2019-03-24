using System.Collections.Generic;
using TestApi.Dto;
using System.Threading.Tasks;

namespace TestApi.Helper
{
    public static class DataStore
    {
        public static async Task<List<Stock>> GetStocksAsync()
        {
            var lstStocks = new List<Stock>
            {
                new Stock() { symbol = "VNET", companyName = "21Vianet Group Inc. ADR", lastChange = 8.54m, change = 0.04m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "AGTK", companyName = "Agritek Holdings Inc.", lastChange = -0.01m, change = -0.01m, changePercentage = -6.46m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "AKAM", companyName = "Akamai Technologies Inc.", lastChange = 72.52m, change = -0.07m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "BIDU", companyName = "Baidu Inc. ADR", lastChange = 170.17m, change = -0.56m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "BCOR", companyName = "Blucora Inc.", lastChange = 33.68m, change = -0.01m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "WIFI", companyName = "Boingo Wireless Inc.", lastChange = 20.80m, change = -0.20m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "BRNW", companyName = "Brainybrawn Inc.", lastChange = 0.00m, change = 0.00m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "CARB", companyName = "Carbonite Inc.", lastChange = 24.04m, change = 0.00m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "JRJC", companyName = "China Finance Online Co. Ltd. ADR", lastChange = 1.51m, change = 0.00m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "CCIH", companyName = "ChinaCache International Holdings Ltd. ADR", lastChange = 1.17m, change = 0.02m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m },
                new Stock() { symbol = "CCOI", companyName = "Cogent Communications Holdings Inc.", lastChange = 51.46m, change = 0.10m, changePercentage = 0.47m, high = 8.63m, low = 8.36m, volume = 318372m }
            };
            await Task.Delay(1000);
            return lstStocks;
        }

    }
}
