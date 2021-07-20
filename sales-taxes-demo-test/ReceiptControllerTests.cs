using NUnit.Framework;
using sales_taxes_demo.Controllers;


namespace sales_taxes_demo_test
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }
        [Test]
        public void CalculateProductTaxThatIsNotTaxExemptWithImportTaxReturnsFifteen()
        {
            ReceiptController rc = new ReceiptController();
            
            double expected = 15.00;
            double actual = rc.calculateTax(false, false, 100.00);
            
            Assert.AreEqual(expected, actual);
        }

        [Test]
        public void CalculateProductTaxThatIsTaxExemptWithImportTaxReturnsFive()
        {
            ReceiptController rc = new ReceiptController();
            
            double expected = 5.00;
            double actual = rc.calculateTax(true, false, 100.00);
            
            Assert.AreEqual(expected, actual);
        }

        [Test]
        public void CalculateProductTaxThatIsNotTaxExemptWithNoImportTaxReturnsFive()
        {
            ReceiptController rc = new ReceiptController();
            
            double expected = 10.00;
            double actual = rc.calculateTax(false, true, 100.00);
            
            Assert.AreEqual(expected, actual);
        }

        [Test]
        public void CalculateProductTaxThatIsTaxExemptWithNoImportTaxReturnsZero()
        {
            ReceiptController rc = new ReceiptController();
            
            double expected = 0.00;
            double actual = rc.calculateTax(true, true, 100.00);
            
            Assert.AreEqual(expected, actual);
        }
    }
}