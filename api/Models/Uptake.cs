namespace api.Models {
    public class Uptake {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDesc { get; set; }
        public int ClientId { get; set; }
        public int OwnerId { get; set; }
    }
}