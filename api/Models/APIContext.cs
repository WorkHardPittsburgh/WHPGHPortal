using Microsoft.EntityFrameworkCore;

namespace api.Models {
    public class APIContext : DbContext {
        public APIContext (DbContextOptions<APIContext> options) : base (options) { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Uptake> Uptakes { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<ContractPersonnel> ContractPersonnel { get; set; }
        public DbSet<ContractReference> ContractReference { get; set; }
        public DbSet<ContractSampleWork> ContractSampleWork { get; set; }
        public DbSet<Milestone> Milestones { get; set; }
        public DbSet<Task> Tasks { get; set; }
    }

}