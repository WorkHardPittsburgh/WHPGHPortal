using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/todos")]
    public class ToDoController : Controller
    {
        private readonly APIContext _context;

        public ToDoController (APIContext context) {
            _context = context;
        }

          //POST: /api/todos
        [HttpPost ("")]
        public IActionResult Create ([FromBody] ToDo item) {
            if (item == null) {
                return BadRequest ();
            }

            _context.ToDos.Add (item);
            _context.SaveChanges ();

            return new ObjectResult (item);
        }

        //GET: /api/todos/1
        [HttpPost ("{?AssigneeId=AssigneeId}")]
        public IActionResult GetByAssigneeId (int AssigneeId) {
            var item = _context.ToDos.FirstOrDefault (t => t.AssigneeId == AssigneeId);
            if (item == null) {
                return NotFound ();
            }
            return new ObjectResult (item);
        }

        

    }
}