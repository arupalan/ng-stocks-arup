using System;

namespace TestApi.Dto
{
    public class Candle
    {
        public decimal open { get; set; }
        public decimal high { get; set; }
        public decimal low { get; set; }
        public decimal close { get; set; }
        public decimal volume { get; set; }
        public DateTime date { get; set; }
    }
}
