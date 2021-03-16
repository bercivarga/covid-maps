// https://documenter.getpostman.com/view/10808728/SzS8rjbc

import React, { useState, useEffect, useContext } from 'react';

const AppContext = React.createContext();

const URL = 'https://api.covid19api.com/summary';

export default function AppProvider({ children }) {
	const [ countries, setCountries ] = useState([]);

	useEffect(() => {
		fetch(URL).then((res) => res.json()).then((data) => {
			setCountries(data['Countries']);
		});
	}, []);

	return <AppContext.Provider value={{ countries }}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };
