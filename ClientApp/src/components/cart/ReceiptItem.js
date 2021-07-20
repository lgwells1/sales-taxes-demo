import React from "react";

const ReceiptItem = props => {
    const { receiptItem } = props;
    
    const quantity = receiptItem.quantity > 1 ? `(${receiptItem.quantity} @ ${(receiptItem.price / receiptItem.quantity).toFixed(2)})` : ``;
    return (
        <div>
            <div>
                {receiptItem.name}: {receiptItem.price} {quantity}
            </div>
        </div>
    );

};

export default ReceiptItem;