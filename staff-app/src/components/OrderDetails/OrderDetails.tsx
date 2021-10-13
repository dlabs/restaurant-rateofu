import OrderItemAction from "components/OrderItemAction";
import React from "react";

import { OrderItemModel, OrderItemStatus } from "../../api/api-models";
import styles from "./OrderDetails.module.css";

type Props = {
    orderItems: OrderItemModel[];
};

const getIconByProductType = (type: string) => {
    return type === "drink" ? "local_bar" : "lunch_dining";
};

const statusInfo = {
    [OrderItemStatus.AWAITING]: {
        icon: "pending_actions",
        colorClass: "text-blue-600",
        text: "Awaiting",
    },
    [OrderItemStatus.IN_PROCESS]: {
        icon: "pending",
        colorClass: "text-yellow-500",
        text: "In preparation",
    },
    [OrderItemStatus.READY]: {
        icon: "done",
        colorClass: "text-green-400",
        text: "Ready to be served",
    },
    [OrderItemStatus.SERVED]: {
        icon: "done_all",
        colorClass: "text-pink-500",
        text: "Served",
    },
};

export default function OrderDetails(props: Props) {
    const { orderItems } = props;
    return (
        <div>
            <div className="flex items-center justify-center mt-6 pl-10 text-xl">
                <div className="col-span-12">
                    <div className="overflow-auto lg:overflow-visible">
                        <table
                            className={`${styles.table} text-gray-400 border-separate space-y-6 text-base`}
                        >
                            <thead className="bg-gray-800 text-gray-500">
                                <tr>
                                    <th className="p-3 text-left">Product</th>
                                    <th className="p-3 text-left">Price</th>
                                    <th className="p-3 text-left">Type</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((orderItem) => (
                                    <tr
                                        key={orderItem.id}
                                        className="bg-gray-800"
                                    >
                                        <td className="p-3">
                                            <div className="flex align-items-center">
                                                <img
                                                    className="rounded-full h-12 w-12  object-cover"
                                                    src={
                                                        orderItem.product
                                                            .imageUrl ||
                                                        "https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg"
                                                    }
                                                    alt="product"
                                                />
                                                <div className="ml-3">
                                                    <div className="">
                                                        {orderItem.product.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 font-bold">
                                            {orderItem.product.price}
                                        </td>
                                        <td className="p-3">
                                            <span className="text-gray-50 px-2 text-green-600">
                                                <i className="material-icons">
                                                    {getIconByProductType(
                                                        orderItem.product.type
                                                    )}
                                                </i>
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span
                                                className={`text-lg ${
                                                    statusInfo[orderItem.status]
                                                        ?.colorClass
                                                }`}
                                            >
                                                <i className="material-icons">
                                                    {
                                                        statusInfo[
                                                            orderItem.status
                                                        ]?.icon
                                                    }
                                                </i>
                                                <span className="ml-2">
                                                    {
                                                        statusInfo[
                                                            orderItem.status
                                                        ]?.text
                                                    }
                                                </span>
                                            </span>
                                        </td>
                                        <td className="p-3 ">
                                            <OrderItemAction
                                                orderItem={orderItem}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
