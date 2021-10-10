import React from "react";

import { OrderItemModel } from "models";

import styles from "./OrderDetails.module.css";

type Props = {
    orderItems: OrderItemModel[];
    onAddItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onRemoveSingleItem: (id: number) => void;
};

const getTotalAmount = (orderItems: OrderItemModel[]) => {
    const amount = orderItems.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
    }, 0);

    return amount;
};

export default function OrderDetails(props: Props) {
    const { onAddItem, orderItems, onDeleteItem, onRemoveSingleItem } = props;
    const totalAmount = getTotalAmount(orderItems);

    return (
        <div>
            <div className="flex items-center justify-center mt-20 pl-10">
                <div className="col-span-12">
                    <div className="overflow-auto lg:overflow-visible">
                        <table
                            className={`${styles.table} text-gray-400 border-separate space-y-6 text-sm`}
                        >
                            <thead className="bg-gray-800 text-gray-500">
                                <tr>
                                    <th className="p-3 text-left">Product</th>
                                    <th className="p-3 text-left">Price</th>
                                    <th className="p-3 text-left">Quantity</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((orderItem) => (
                                    <tr className="bg-gray-800">
                                        <td className="p-3">
                                            <div className="flex align-items-center">
                                                <img
                                                    className="rounded-full h-12 w-12  object-cover"
                                                    src={
                                                        orderItem.imageUrl ||
                                                        "https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg"
                                                    }
                                                />
                                                <div className="ml-3">
                                                    <div className="">
                                                        {orderItem.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 font-bold">
                                            {orderItem.price}
                                        </td>
                                        <td className="p-3">
                                            <span className="bg-green-400 text-gray-50 rounded-md px-2">
                                                {orderItem.quantity}
                                            </span>
                                        </td>
                                        <td className="p-3 ">
                                            <span
                                                className="text-gray-400 hover:text-gray-100 mr-2"
                                                onClick={() =>
                                                    onAddItem(
                                                        orderItem.productId
                                                    )
                                                }
                                            >
                                                <i className="material-icons-outlined text-base">
                                                    +
                                                </i>
                                            </span>
                                            <span
                                                onClick={() =>
                                                    onRemoveSingleItem(
                                                        orderItem.productId
                                                    )
                                                }
                                                className="text-gray-400 hover:text-gray-100  mx-2"
                                            >
                                                <i className="material-icons-outlined text-base">
                                                    -
                                                </i>
                                            </span>
                                            <span
                                                onClick={() =>
                                                    onDeleteItem(
                                                        orderItem.productId
                                                    )
                                                }
                                                className="text-gray-400 hover:text-gray-100  ml-2"
                                            >
                                                <i className="material-icons-round text-base">
                                                    x
                                                </i>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="p-6">Total Amount:</td>
                                    <td className="p-6">
                                        ${totalAmount.toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
