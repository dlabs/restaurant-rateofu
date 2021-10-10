import React, { useState } from "react";

import { ProductModel, OrderItemModel } from "models";
import ProductTable from "components/ProductTable";
import OrderDetails from "components/OrderDetails";

import "./App.css";

function App() {
    const [orderItems, setOrderItems] = useState<OrderItemModel[]>([]);

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
        <div className="bg-gray-900 h-screen p-10 flex">
            <div className="mx-auto">
                <div className="flex">
                    <ProductTable onAddProductToCard={onAddProductToCard} />

                    {!!orderItems.length && (
                        <OrderDetails
                            orderItems={orderItems}
                            onAddItem={handleAddItem}
                            onDeleteItem={handleDeleteItem}
                            onRemoveSingleItem={handleRemoveSingleItem}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
