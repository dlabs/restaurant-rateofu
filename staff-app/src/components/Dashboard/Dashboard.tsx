import { requestOrders } from "store/slices/staff-slice.reducer";
import OrderDetails from "../OrderDetails";
import React, { useEffect } from "react";
import { useAppDispatch } from "store";
import { useSelector } from "react-redux";
import { ordersSelector } from "store/selectors/staff.selector";

export default function Dashboard() {
    const orders = useSelector(ordersSelector);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestOrders());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            <h2 className="text-center text-6xl mb-8 text-white">ORDERS</h2>
            {orders.map((o) => (
                <div
                    className="text-center border-2 border-green-400 rounded-lg"
                    key={o.id}
                >
                    <div className="max-w-3xl w-full mx-auto z-10">
                        <div className="flex flex-col">
                            <div className="bg-gray-900 border border-gray-900 shadow-lg  rounded-3xl p-4 m-4">
                                <div className="flex-none sm:flex">
                                    <div className=" relative h-32 w-32   sm:mb-0 mb-3">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRASuqzyBpeUdHXezIKk6xVO2Q_wZZ4OOs6A&usqp=CAU"
                                            alt="aji"
                                            className=" w-32 h-32 object-cover rounded-2xl"
                                        />
                                    </div>
                                    <div className="flex-auto sm:ml-5 justify-evenly">
                                        <div className="flex items-center justify-between sm:mt-2">
                                            <div className="flex items-center">
                                                <div className="flex flex-col">
                                                    <div className="w-full flex-none text-lg text-gray-200 font-bold leading-none">
                                                        Order No. {o.id}
                                                    </div>
                                                    <div className="flex-auto text-gray-400 mt-4 mb-2">
                                                        <span className="mr-3 ">
                                                            Table No.{" "}
                                                            {o.tableNo}
                                                        </span>
                                                        <span className="mr-3 border-r border-gray-600 max-h-0"></span>
                                                        <span>Main Floor</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="flex-no-shrink bg-gray-600 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full">
                                                {new Date(
                                                    o.createdAt
                                                ).getDate()}{" "}
                                                {new Date(
                                                    o.createdAt
                                                ).toLocaleString("default", {
                                                    month: "short",
                                                })}{" "}
                                                -{" "}
                                                {new Date(
                                                    o.createdAt
                                                ).toLocaleTimeString(
                                                    "default",
                                                    { timeStyle: "short" }
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex pt-2  text-sm text-gray-400">
                                            <div className="flex-1 inline-flex items-center">
                                                <i className="material-icons">
                                                    payments
                                                </i>
                                                <p className="ml-4">
                                                    Total: {o.totalAmount}
                                                </p>
                                            </div>
                                            <div className="flex-1 inline-flex items-center">
                                                <i className="material-icons">
                                                    shopping_cart
                                                </i>
                                                <p className="ml-4">
                                                    Items amount:{" "}
                                                    {o.orderItems.length}
                                                </p>
                                            </div>
                                            <span className="flex-no-shrink bg-blue-400 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full">
                                                IN PROCESS
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <OrderDetails orderItems={o.orderItems} />
                </div>
            ))}
        </div>
    );
}
