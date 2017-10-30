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

            if (_context.Clients.Count () == 0) {
                _context.Clients.Add (new Client { AddressId = 1, Name = "Eric Waight", Company = "Test Company", Email = "ewaight@gmail.com", Username = "ewaight", Password = "Abc123$" });
                _context.SaveChanges ();
            }
        }
        //GET: /api/clients!
        [Route ("")]
        [HttpGet]
        public IEnumerable<Client> GetAll () {
            return _context.Clients.ToList ();
        }

        //GET: /api/clients/{id}
        [Route ("{id}")]
        // [HttpGet ("{id}", Name = "GetClients")]
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
        public IActionResult Create ([FromBody] Client client) {
            if (client == null) {
                return BadRequest ();
            }

            _context.Clients.Add (client);
            _context.SaveChanges ();

            return CreatedAtRoute ("", new { id = client.Id }, client);
        }

        [Route ("{id}")]
        [HttpPut]
        public IActionResult Update (int id, [FromBody] Client client) {
            if (client == null || client.Id != id) {
                return BadRequest ();
            }

            var selectedClient = _context.Clients.FirstOrDefault (t => t.Id == id);
            if (selectedClient == null) {
                return NotFound ();
            }

            selectedClient.AddressId = client.AddressId;
            selectedClient.Name = client.Name;
            selectedClient.Company = client.Company;
            selectedClient.Email = client.Email;
            selectedClient.Username = client.Username;
            selectedClient.Password = client.Password;

            _context.Clients.Update (selectedClient);
            _context.SaveChanges ();
            return new NoContentResult ();
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