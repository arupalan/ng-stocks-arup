namespace TestApi.Dto
{
    public class Stock
    {
        public string symbol { get; set; }
        public string companyName { get; set; }
        public decimal lastChange { get; set; }
        public decimal change { get; set; }
        public decimal changePercentage { get; set; }
        public decimal high { get; set; }
        public decimal low { get; set; }
        public decimal volume { get; set; }
    }
}
