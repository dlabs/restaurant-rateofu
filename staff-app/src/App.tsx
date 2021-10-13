import React from "react";
import { useSelector } from "react-redux";

import WSProvider from "components/WSProvider";
import Auth from "components/Auth";
import Dashboard from "components/Dashboard";
import { isAuthenticatedSelector } from "store/selectors/staff.selector";

import "./App.css";

function App() {
    const isAuthenticated = useSelector(isAuthenticatedSelector);

    return (
        <WSProvider>
            <div className="bg-gray-900 h-screen p-10">
                {!isAuthenticated ? <Auth /> : <Dashboard />}
            </div>
        </WSProvider>
    );
}

export default App;
