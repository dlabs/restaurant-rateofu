import { OrderItemModel, OrderItemStatus } from "api/api-models";
import { StaffRoles } from "components/Auth/staff-roles.enum";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import {
    accessTokenSelector,
    roleSelector,
    staffIdSelector,
} from "../../store/selectors/staff.selector";
import { executeOrderItemStatusUpdate } from "store/slices/staff-slice.reducer";

type Props = {
    orderItem: OrderItemModel;
};

export default function OrderItemAction(props: Props) {
    const { orderItem } = props;
    const [isLoading, setIsLoading] = useState(false);
    const role = useSelector(roleSelector);
    const accessToken = useSelector(accessTokenSelector);
    // * Necessary for validation that an item is being processed by THIS staff so he can mark an item as ready
    const staffId = useSelector(staffIdSelector);

    const apiData = {
        accessToken: accessToken || "", // Access token can be null which is not allowed by action types
        orderId: orderItem.orderId,
        orderItemId: orderItem.id,
    };

    const dispatch = useAppDispatch();

    if (
        (orderItem.product.type === "drink" && role === StaffRoles.BARTENDER) ||
        (orderItem.product.type === "food" && role === StaffRoles.CHEF)
    ) {
        switch (orderItem.status) {
            case OrderItemStatus.AWAITING:
                return (
                    <button
                        disabled={isLoading}
                        onClick={async () => {
                            setIsLoading(true);
                            await dispatch(
                                executeOrderItemStatusUpdate({
                                    ...apiData,
                                    newStatus: OrderItemStatus.IN_PROCESS,
                                })
                            );
                            setIsLoading(false);
                        }}
                        className="flex-no-shrink px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full bg-blue-400"
                    >
                        {isLoading ? (
                            <div
                                className="spinner icon-spinner-3 spinner-sm"
                                aria-hidden="true"
                            ></div>
                        ) : (
                            "PREPARE"
                        )}
                    </button>
                );
            case OrderItemStatus.IN_PROCESS:
                return orderItem.processedBy === staffId ? (
                    <button
                        disabled={isLoading}
                        onClick={async () => {
                            setIsLoading(true);
                            await dispatch(
                                executeOrderItemStatusUpdate({
                                    ...apiData,
                                    newStatus: OrderItemStatus.READY,
                                })
                            );
                            setIsLoading(false);
                        }}
                        className="flex-no-shrink px-5 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full bg-green-400"
                    >
                        {isLoading ? (
                            <div
                                className="spinner icon-spinner-3 spinner-sm"
                                aria-hidden="true"
                            ></div>
                        ) : (
                            "FINISH"
                        )}
                    </button>
                ) : (
                    <div className="cursor-pointer select-none">
                        <i className="material-icons">block</i>
                    </div>
                );
        }
    }

    return (
        <div className="cursor-pointer select-none">
            <i className="material-icons">block</i>
        </div>
    );
}
