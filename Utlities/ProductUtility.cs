using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace sales_taxes_demo
{
    public static class ProductUtility
    {
        public static List<Product> fetchProducts()
        {

            var products = new List<Product>();
            try
            {
                var fileContents = "";
                //Read in products from json file
                using (var sr = new StreamReader("products.json"))
                {
                    fileContents = sr.ReadToEnd();
                }
                products.AddRange(JsonSerializer.Deserialize<Product[]>(fileContents, null));
            }
            catch (System.Exception e)
            {
                ///TODO: Add custom logger
                throw;
            }

            return products;
        }
    }
}