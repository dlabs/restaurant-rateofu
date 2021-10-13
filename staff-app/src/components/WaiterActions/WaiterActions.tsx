import React, { useState } from "react";
import {
    roleSelector,
    batchesToBeServedSelector,
    accessTokenSelector,
} from "../../store/selectors/staff.selector";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { serveOrderBatch } from "store/slices/staff-slice.reducer";
import { StaffRoles } from "../Auth/staff-roles.enum";

type Props = {
    orderId: number;
};

export default function WaiterActions(props: Props) {
    const { orderId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const role = useSelector(roleSelector);
    const accessToken = useSelector(accessTokenSelector);
    const batchesToBeServed = useSelector(batchesToBeServedSelector);
    const orderRelatedBatches = batchesToBeServed.filter(
        (bts) => bts.orderId === orderId
    );
    const dispatch = useAppDispatch();

    if (role === StaffRoles.WAITER && orderRelatedBatches.length > 0) {
        return (
            <div>
                <h3 className="mb-4">The order batch has been assigned to you!</h3>
                {orderRelatedBatches.map((orb) => (
                    <button key={orb.batchType + orb.orderId}
                        disabled={isLoading}
                        onClick={async () => {
                            setIsLoading(true);
                            await dispatch(
                                serveOrderBatch({
                                    accessToken: accessToken || "",
                                    batchType: orb.batchType,
                                    orderId: orb.orderId,
                                })
                            );
                            setIsLoading(false);
                        }}
                        className="flex-no-shrink px-5 ml-4 py-2 text-md shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full bg-green-400"
                    >
                        {isLoading ? (
                            <div
                                className="spinner icon-spinner-3 spinner-sm"
                                aria-hidden="true"
                            ></div>
                        ) : (
                            `Serve ${orb.batchType} batch`
                        )}
                    </button>
                ))}
            </div>
        );
    }

    return <React.Fragment />;
}
