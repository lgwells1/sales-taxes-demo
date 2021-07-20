using System;

namespace sales_taxes_demo
{
    public class Product {
        public int id { get; set; }
        public string name { get; set; }
        public double price { get; set; }
        public bool basicTaxExempt { get; set; }
        public bool domestic { get; set; }
        public int stock { get; set; }
    }
}