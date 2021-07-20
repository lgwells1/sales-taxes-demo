using System.Collections.Generic;

namespace sales_taxes_demo {
    public class Receipt {
        public List<ReceiptItem> items { get; set; }
        public double taxes { get; set; }
        public double total { get; set; }
        
    }
}