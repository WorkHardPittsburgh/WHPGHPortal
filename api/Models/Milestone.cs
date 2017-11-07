using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Milestone
    {
        public int Id { get; set; }
        public int UptakeId { get; set; }
        public string Name { get; set; }
        [MaxLength(50)]
        public string Description { get; set; }
        public int Hours { get; set; }
        public int Rate { get; set; }
        public int PercentComplete { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime CompeleteDate { get; set; }
        public string MilestoneStatus { get; set; }
    }
}