namespace api.Models {
    public class Uptake {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string UptakeStatus { get; set; }
        public string ServiceType { get; set; }
        public string ProjectDesc { get; set; }
        public string ProjectStatus { get; set; }
        public int ClientId { get; set; }
        public int OwnerId { get; set; }
    }
}