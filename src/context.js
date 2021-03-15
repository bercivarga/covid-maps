// https://documenter.getpostman.com/view/10808728/SzS8rjbc

import React, { useState, useEffect, useContext } from 'react';

const AppContext = React.createContext();

export default function AppProvider({ children }) {
	return <AppContext.Provider value={'Hi!'}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };
