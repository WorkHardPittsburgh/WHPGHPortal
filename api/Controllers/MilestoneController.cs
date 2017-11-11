using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/milestones")]

    public class MilestoneController : Controller {
        private readonly APIContext _context;

        public MilestoneController (APIContext context) {
            _context = context;
        }

        //GET: api/milestones
        [HttpGet]
        public IEnumerable<Milestone> GetAll () {
            return _context.Milestones.ToList ();
        }

        //GET: /api/milestones/1
        [HttpGet ("{id}")]
        public IActionResult GetById (int id) {
            var item = _context.Milestones.FirstOrDefault (t => t.Id == id);
            if (item == null) {
                return NotFound ();
            }
            return new ObjectResult (item);
        }

        //POST: /api/milestones
        [HttpPost]
        public IActionResult Create ([FromBody] Milestone item) {
            if (item == null) {
                return BadRequest ();
            }

            _context.Milestones.Add (item);
            _context.SaveChanges ();

            return new ObjectResult (item);
        }

        //PUT: /api/milestones/1
        [HttpPut ("{id}")]
        public IActionResult Update (int id, [FromBody] Milestone item) {
            if (item == null || item.Id != id) {
                return BadRequest ();
            }

            var selectedMilestone = _context.Milestones.FirstOrDefault (t => t.Id == id);
            if (selectedMilestone == null) {
                return NotFound ();
            }

            selectedMilestone.UptakeId = item.UptakeId;
            selectedMilestone.Name = item.Name;
            selectedMilestone.Description = item.Description;
            selectedMilestone.Hours = item.Hours;
            selectedMilestone.Rate = item.Rate;
            selectedMilestone.PercentComplete = item.PercentComplete;
            selectedMilestone.StartDate = item.StartDate;
            selectedMilestone.CompeleteDate = item.CompeleteDate;
            selectedMilestone.MilestoneStatus = item.MilestoneStatus;

            _context.Milestones.Update (selectedMilestone);
            _context.SaveChanges ();
            return new ObjectResult (item);
        }

        //DELETE: /api/milestones/1
        [HttpDelete ("{id}")]
        public IActionResult Delete (int id) {
            var item = _context.Milestones.FirstOrDefault (t => t.Id == id);
            if (item == null) {
                return NotFound ();
            }

            _context.Milestones.Remove (item);
            _context.SaveChanges ();
            return new NoContentResult ();
        }
    }
}