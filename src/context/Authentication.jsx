import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import extractToken from "../Utils/ExtractToken";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [authToken, setAuthToken] = useState("");

	useEffect(() => {
		if (extractToken()?.token) {
			setAuthToken(extractToken()?.token)
		}
	}, []);

	useEffect(() => {
		if (authToken) {
			if (extractToken()?.token) {
				axios(`${process.env.REACT_APP_BASE_URL}/admission/token`, {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${authToken}`
					}
				})
				.then((res) => {
					if (res.data.error) {
							console.error(res.data.message)
						} else {
							console.log(res.data.admission)
							setUser(res.data.admission)
						}
					})
					.catch((err) => {
						console.log(err.message)
					})
			}
		}
	}, [authToken]);

	return <AuthContext.Provider value={{ authToken, setAuthToken, user }}>
		{children}
	</AuthContext.Provider>
}

export const UseAuthContext = () => {
	return useContext(AuthContext);
}
