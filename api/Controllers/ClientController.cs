using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/clients")]
    public class ClientController : Controller {
        private readonly APIContext _context;

        public ClientController (APIContext context) {
            _context = context;

            // if (_context.Clients.Count () == 0) {
            //     _context.Clients.Add (new Client { AddressId = 1, Name = "Eric Waight", Company = "Test Company", Email = "ewaight@gmail.com", Username = "ewaight", Password = "Abc123$" });
            //     _context.SaveChanges ();
            // }
        }
        //GET: /api/clients
        [Route ("")]
        [HttpGet]
        public IEnumerable<Client> GetAll () {
            return _context.Clients.ToList ();
        }

        //GET: /api/clients/{id}
        [Route ("{id}")]
        public IActionResult GetById (long id) {
            var item = _context.Clients.FirstOrDefault (t => t.Id == id);
            if (item == null) {
                return NotFound ();
            }
            return new ObjectResult (item);
        }

        //POST: /api/clients
        [Route ("")]
        [HttpPost]
        public IActionResult Create ([FromBody] Client item) {
            if (item == null) {
                return BadRequest ();
            }

            _context.Clients.Add (item);
            _context.SaveChanges ();

            return new ObjectResult (item);
        }

        [Route ("{id}")]
        [HttpPut]
        public IActionResult Update (int id, [FromBody] Client item) {
            if (item == null || item.Id != id) {
                return BadRequest ();
            }

            var selectedClient = _context.Clients.FirstOrDefault (t => t.Id == id);
            if (selectedClient == null) {
                return NotFound ();
            }

            selectedClient.AddressId = item.AddressId;
            selectedClient.Name = item.Name;
            selectedClient.Company = item.Company;
            selectedClient.Email = item.Email;
            selectedClient.Username = item.Username;
            selectedClient.Password = item.Password;

            _context.Clients.Update (selectedClient);
            _context.SaveChanges ();
            return new ObjectResult (item);
        }

        [Route ("{id}")]
        [HttpDelete]
        public IActionResult Delete (int id) {
            var item = _context.Clients.FirstOrDefault (t => t.Id == id);
            if (item == null) {
                return NotFound ();
            }

            _context.Clients.Remove (item);
            _context.SaveChanges ();
            return new NoContentResult ();
        }
    }
}