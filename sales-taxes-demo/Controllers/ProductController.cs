using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace sales_taxes_demo.Controllers 
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase {

        [HttpGet]
        public List<Product> Get() {
            
            //Use func in utility class to fetch products
            return ProductUtility.fetchProducts();
        }
    }
}