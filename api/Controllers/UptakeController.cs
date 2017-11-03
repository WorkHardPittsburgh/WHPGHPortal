using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/uptakes")]
    public class UptakeController : Controller {
        private readonly APIContext _context;

        public UptakeController (APIContext context) {
            _context = context;
        }

        //GET: api/uptakes
        [HttpGet]
        public IEnumerable<Uptake> GetAll () {
            return _context.Uptakes.ToList ();
        }

        //GET: api/uptakes/id
        [HttpGet ("{id}")]
        public IActionResult GetById (int Id) {
            var item = _context.Uptakes.FirstOrDefault (t => t.Id == Id);
            if (item == null) {
                return NotFound ();
            }
            return new ObjectResult (item);
        }

        //POST: api/uptakes
        [HttpPost]
        public IActionResult Create ([FromBody] Uptake item) {
            if (item == null) {
                return BadRequest ();
            }

            _context.Uptakes.Add (item);
            _context.SaveChanges ();

            return new ObjectResult (item);
        }

        [HttpPut ("{id}")]
        public IActionResult Update (int id, [FromBody] Uptake item) {
            if (item == null || item.Id != id) {
                return BadRequest ();
            }

            var selectedUptake = _context.Uptakes.FirstOrDefault (t => t.Id == id);
            if (selectedUptake == null) {
                return NotFound ();
            }

            selectedUptake.ProjectName = item.ProjectName;
            selectedUptake.UptakeStatus = item.UptakeStatus;
            selectedUptake.ServiceType = item.ServiceType;
            selectedUptake.ProjectDesc = item.ProjectDesc;
            selectedUptake.ProjectStatus = item.ProjectStatus;
            selectedUptake.OwnerId = item.OwnerId;
            selectedUptake.ClientId = item.ClientId;

            _context.Uptakes.Update (selectedUptake);
            _context.SaveChanges ();
            return new ObjectResult (item);
        }

        [HttpDelete ("{id}")]
        public IActionResult Delete (int id) {
            var item = _context.Uptakes.FirstOrDefault (t => t.Id == id);
            if (item == null) {
                return NotFound ();
            }

            _context.Uptakes.Remove (item);
            _context.SaveChanges ();
            return new NoContentResult ();
        }
    }
}