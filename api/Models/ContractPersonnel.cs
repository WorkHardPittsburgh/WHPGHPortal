namespace api.Models
{
    public class ContractPersonnel
    {
        public int Id { get; set; }
        public int ContractId { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }

        public Contract Contracts { get; set; }
    }
}