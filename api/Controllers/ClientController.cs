using System.Collections.Generic;
using System.Linq;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route ("api/[controller]")]
    public class ClientController : Controller {
        private readonly APIContext _context;

        public ClientController (APIContext context) {
            _context = context;

            if (_context.Clients.Count () == 0) {
                _context.Clients.Add (new Client { AddressId = 1, Name = "Eric Waight", Company = "Test Company", Email = "ewaight@gmail.com", Username = "ewaight", Password = "Abc123$" });
                _context.SaveChanges ();
            }
        }

        [HttpGet]
        public IEnumerable<Client> GetAll () {
            return _context.Clients.ToList ();
        }

        [HttpGet ("{id}", Name = "GetClients")]
        public IActionResult GetById (long id) {
            var item = _context.Clients.FirstOrDefault (t => t.Id == id);
            if (item == null) {
                return NotFound ();
            }
            return new ObjectResult (item);
        }
    }
}