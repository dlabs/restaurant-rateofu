import React, { useState } from "react";

import { ProductModel, OrderItemModel } from "models";
import { submitOrder } from "api/customer-api";
import ProductTable from "components/ProductTable";
import OrderDetails from "components/OrderDetails";

import "./App.css";

function App() {
    const [orderItems, setOrderItems] = useState<OrderItemModel[]>([]);
    // * Shortcut: Table no is generated randomly; Maybe add table management later;
    const [tableNo] = useState(Math.floor(Math.random() * (18 - 1) + 1));
    const [orderSubmitted, setOrderSubmitted] = useState(false);

    const onAddProductToCard = (product: ProductModel) => {
        const newOrderItems = [...orderItems];
        const oiIndex = orderItems.findIndex(
            (oi) => oi.productId === product.id
        );

        if (oiIndex === -1) {
            newOrderItems.push({
                productId: product.id,
                name: product.name,
                quantity: 1,
                price: product.price,
                imageUrl: product.imageUrl,
            });
        } else {
            newOrderItems[oiIndex].quantity++;
        }
        setOrderItems(newOrderItems);
    };

    const handleSubmitOrder = async (
        orderItems: OrderItemModel[],
        tableNo: number
    ) => {
        try {
            await submitOrder(
                orderItems.map((oi) => ({
                    quantity: oi.quantity,
                    productId: oi.productId,
                })),
                tableNo
            );
            setOrderSubmitted(true);
        } catch (err) {
            // * Shortcut: error handling
        }
    };

    const handleAddItem = (productId: number) => {
        const newOrderItems = orderItems.map((oi) =>
            oi.productId === productId
                ? { ...oi, quantity: oi.quantity + 1 }
                : oi
        );

        console.log(orderItems);
        setOrderItems(newOrderItems);
    };

    const handleDeleteItem = (productId: number) => {
        const newOrderItems = orderItems.filter(
            (oi) => oi.productId !== productId
        );

        setOrderItems(newOrderItems);
    };

    const handleRemoveSingleItem = (productId: number) => {
        let newOrderItems = [...orderItems];
        const oiIndex = orderItems.findIndex(
            (oi) => oi.productId === productId
        );

        if (newOrderItems[oiIndex].quantity === 1) {
            newOrderItems = orderItems.filter(
                (oi) => oi.productId !== productId
            );
        } else {
            newOrderItems[oiIndex].quantity--;
        }

        setOrderItems(newOrderItems);
    };

    return (
        <div className="h-screen">
            <h1 className="neon text-center text-4xl text-white pt-8 font-medium" style={{fontFamily: 'Tourney'}}>
                Welcome to The Restaurant at the End of the Universe!
            </h1>
            <div className="text-center text-4xl text-white pt-8">
                <h3>Your table number: {tableNo}</h3>
            </div>

            <div className="p-10 flex">
                <div className="mx-auto">
                    <div className="flex">
                        {!orderSubmitted && (
                            <ProductTable
                                onAddProductToCard={onAddProductToCard}
                            />
                        )}

                        {!!orderItems.length && (
                            <OrderDetails
                                tableNo={tableNo}
                                orderItems={orderItems}
                                onAddItem={handleAddItem}
                                onDeleteItem={handleDeleteItem}
                                onRemoveSingleItem={handleRemoveSingleItem}
                                onSubmitOrder={handleSubmitOrder}
                                orderSubmitted={orderSubmitted}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
