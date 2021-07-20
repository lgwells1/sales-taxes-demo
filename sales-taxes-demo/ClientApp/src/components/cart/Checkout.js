import React, { useEffect, useState } from "react";
import ReceiptItem from "./ReceiptItem";

const Checkout = props => {

    const [receipt, setReceipt] = useState({ items: [], taxes: 0, total: 0 });

    useEffect(() => {
        getReceipt();
    }, [props]);

    const getReceipt = () => {
        props.calculateReceipt()
            .then(function (result) {
                setReceipt(result);
            });
    };

    return (
        !props.show
            ? <></>
            :
            <>
                <div className="hero is-primary">
                    <div className="hero-body container">
                        <h4 className="title">Receipt</h4>
                    </div>
                </div>
                <br />
                <div className="has-text-centered is-size-2">
                    Thank you!
                </div>
                <div className="columns is-centered">
                    <div className="column is-narrow">
                        <div className="container">

                            <br />
                            <div>
                                {receipt.items.map(item => (
                                    <ReceiptItem
                                        receiptItem={item}
                                    />
                                ))}
                            </div>
                            <br />
                            <div>
                                Sales Taxes: {receipt.taxes}
                            </div>
                            <div>
                                Total: {receipt.total}
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
};

export default Checkout;