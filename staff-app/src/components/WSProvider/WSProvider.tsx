import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../store";
import { onServerMessage } from "../../store/slices/staff-slice.reducer";
import { accessTokenSelector } from "../../store/selectors/staff.selector";

export const WSContext = React.createContext<WebSocket | null>(null);

type Props = {
    children: React.ReactNode;
};

export default function WSProvider(props: Props) {
    const { children } = props;
    const accessToken = useSelector(accessTokenSelector);
    const wsRef = useRef<WebSocket | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!accessToken) return;

        if (wsRef.current?.readyState !== WebSocket.OPEN) {
            wsRef.current = new WebSocket(process.env.REACT_APP_WS_URL || "");

            wsRef.current.addEventListener("open", onOpen);
            wsRef.current.addEventListener("message", onMessage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    const onOpen = useCallback(() => {
        const data = JSON.stringify({
            action: "linkConnection",
            accessToken: accessToken,
        });

        wsRef.current?.send(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, wsRef.current]);

    const onMessage = (e: any) => {
        try {
            const data = JSON.parse(e.data);

            dispatch(onServerMessage(data));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <WSContext.Provider value={wsRef.current}>
            {children}
        </WSContext.Provider>
    );
}
