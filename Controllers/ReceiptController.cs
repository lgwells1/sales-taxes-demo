using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace sales_taxes_demo.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ReceiptController : ControllerBase
    {

        [HttpPost]
        public Receipt Post([FromBody] List<CartItem> cartItems)
        {
            System.Console.WriteLine(cartItems);
            Receipt receipt = new Receipt();
            receipt.items = new List<ReceiptItem>();
            double tempTaxes = 0.00;
            double tempTotal = 0.00;

            List<Product> products = ProductUtility.fetchProducts();
            ///todo solve round to nearest 5 cents issue.
            foreach (CartItem item in cartItems)
            {
                Product product = products.Find(x => x.id == item.id);
                System.Console.WriteLine("Processing Product: {0}", product.name);
                ReceiptItem receiptItem = new ReceiptItem();
                double preTaxPrice = product.price * item.quantity;
                double itemTaxes = calculateTax(product.basicTaxExempt, product.domestic, preTaxPrice);
                
                receiptItem.id = item.id;
                receiptItem.name = product.name;
                receiptItem.quantity = item.quantity;
                receiptItem.price = Math.Round(preTaxPrice + itemTaxes,2);
                
                tempTaxes += itemTaxes;
                tempTotal += receiptItem.price;

                receipt.items.Add(receiptItem);
            }

            receipt.taxes = Math.Round(tempTaxes, 2);
            receipt.total = Math.Round(tempTotal, 2);

            return receipt;
        }

        private double calculateTax(bool basicTaxExempt, bool domestic, double preTaxPrice)
        {
            double totalTaxes;
            const double importTaxRate = 0.05;
            const double basicTaxRate = 0.10;

            if (!basicTaxExempt && !domestic)
            {
                //Handle basic taxes and import tax
                System.Console.WriteLine("tax exempt and imported");
                double importTax = Math.Round((preTaxPrice * importTaxRate) * 20, 2) / 20;
                double basicTax = Math.Round((preTaxPrice * basicTaxRate) * 20, 2) / 20;
                totalTaxes = importTax + basicTax;
                System.Console.WriteLine(totalTaxes);
            }
            else if (basicTaxExempt && !domestic)
            {
                System.Console.WriteLine("Tax Exempt but imported");
                System.Console.WriteLine(preTaxPrice);
                System.Console.WriteLine(importTaxRate);
                System.Console.WriteLine(preTaxPrice * importTaxRate);
                totalTaxes = Math.Round((preTaxPrice * importTaxRate) * 20, 2) / 20;
                System.Console.WriteLine(totalTaxes);
            }
            else if (!basicTaxExempt && domestic)
            {
                System.Console.WriteLine("Not tax Exempt and not imported");
                totalTaxes = Math.Round((preTaxPrice * basicTaxRate) * 20, 2) / 20;
                System.Console.WriteLine(totalTaxes);
            }
            else
            {
                System.Console.WriteLine("Tax Exempt and Domestic");
                //Item is tax exempt and domestic
                totalTaxes = 0.00;
            }

            return totalTaxes;
        }
    }
}