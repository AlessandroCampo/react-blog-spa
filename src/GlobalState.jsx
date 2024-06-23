// GlobalStateContext.js
import React, { createContext, useState } from 'react';

// Create a context
export const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
    const [state, setState] = useState({
        user: undefined,

    });

    return (
        <GlobalStateContext.Provider value={{ state, setState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
