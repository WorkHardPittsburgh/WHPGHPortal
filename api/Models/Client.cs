namespace api.Models
{
    public class Client
    {
        public int Id { get; set; }
        public int AddressId { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}