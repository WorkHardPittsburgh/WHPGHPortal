namespace api.Models
{
    public class ContractSampleWork
    {
        public int Id { get; set; }
        public int ContractId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }

        public Contract Contracts { get; set; }
    }
}