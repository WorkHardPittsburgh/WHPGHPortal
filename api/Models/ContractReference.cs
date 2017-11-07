namespace api.Models
{
    public class ContractReference
    {
        public int Id { get; set; }
         public int ContractId { get; set; }
         public string Name { get; set; }
         public string Description { get; set; }

         public Contract Contracts { get; set; }
    }
}