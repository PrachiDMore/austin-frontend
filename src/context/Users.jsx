import { createContext, useContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	let asda = "sdasdS"
	return <UserContext.Provider value={{ asda }}>
		{children}
	</UserContext.Provider>
}

export const UseUserContext = () => {
	return useContext(UserContext)
}