using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {

    [Route ("api/addresses")]
    public class AddressController : Controller {
        private readonly APIContext _context;

        public AddressController (APIContext context) {
            _context = context;
        }

        //GET: /api/addresses
        [HttpGet]
        public IEnumerable<Address> GetAll () {
            return _context.Addresses.ToList ();
        }

        //GET: /api/addresses/{id}
        [HttpGet ("{id}")]
        public IActionResult GetById (int id) {
            var item = _context.Addresses.FirstOrDefault (t => t.Id == id);
            if (item == null) {
                return NotFound ();
            }

            return new ObjectResult (item);
        }

        //POST: /api/addresses/
        [HttpPost]
        public IActionResult Create ([FromBody] Address item) {
            if (item == null) {
                return BadRequest ();
            }

            _context.Addresses.Add (item);
            _context.SaveChanges ();

            return new ObjectResult (item);
        }

        //PUT: /api/addresses/{id}
        [HttpPut ("{id}")]
        public IActionResult Update (int id, [FromBody] Address item) {
            if (item == null || item.Id != id) {
                return BadRequest ();
            }

            var selectedAddress = _context.Addresses.FirstOrDefault (t => t.Id == id);
            if (selectedAddress == null) {
                return NotFound ();
            }

            selectedAddress.Street = item.Street;
            selectedAddress.City = item.City;
            selectedAddress.State = item.State;
            selectedAddress.Zip = item.Zip;

            _context.Addresses.Update (selectedAddress);
            _context.SaveChanges ();
            return new ObjectResult (item);
        }

        //DELETE: /api/addresses/{id}
        [HttpDelete ("{id}")]
        public IActionResult Delete (int id) {
            var item = _context.Addresses.FirstOrDefault (t => t.Id == id);
            if (item == null) {
                return NotFound ();
            }

            _context.Addresses.Remove (item);
            _context.SaveChanges ();
            return new NoContentResult ();
        }
    }
}
