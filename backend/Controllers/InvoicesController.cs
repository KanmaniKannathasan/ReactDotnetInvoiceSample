using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace backend.Controllers
{
    // API controller for invoice operations
    [ApiController]
    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase
    {
        // In-memory static list simulating a database
        private static readonly List<Invoice> invoices = Enumerable.Range(1, 57)
            .Select(i => new Invoice
            {
                Id = i,
                Customer = $"Customer {i}",
                Amount = new System.Random().Next(0, 1000),
                Status = i % 3 == 0 ? "overdue" : i % 3 == 1 ? "paid" : "pending"
            }).ToList();

        /// <summary>
        /// Returns paginated list of invoices.
        /// Query params: page (default 1), perPage (default 10)
        /// </summary>
        /// <param name="page">Current page number</param>
        /// <param name="perPage">Invoices per page</param>
        /// <returns>Paginated invoices and total count</returns>
        [HttpGet]
        public IActionResult Get(int page = 1, int perPage = 10)
        {
            // Validate input
            if (page < 1 || perPage < 1)
                return BadRequest("Page and perPage must be positive integers.");

            // Pagination logic
            var data = invoices.Skip((page - 1) * perPage).Take(perPage).ToList();

            // Return data and total count for frontend pagination
            return Ok(new { data, total = invoices.Count });
        }
    }

    /// <summary>
    /// Invoice model representing a single invoice record.
    /// </summary>
    public class Invoice
    {
        public int Id { get; set; }
        public string Customer { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; }
    }
}
