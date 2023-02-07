import React, { useState, useContext, createContext, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading
            }}>
{children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
};
export default AppProvider;