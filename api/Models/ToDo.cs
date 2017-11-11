using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public int MilestoneId { get; set; }
        public int AssigneeId { get; set; }
        public string Name { get; set; }
        [MaxLength(50)]
        public string Description { get; set; }
        public string ToDoStatus { get; set; }
    }
}