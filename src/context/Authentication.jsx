import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import extractToken from "../Utils/ExtractToken";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [authToken, setAuthToken] = useState("");
	const navigate = useNavigate()

	const logout = () => {
		sessionStorage.removeItem(btoa("token"));
		navigate("/signin")
	}

	useEffect(() => {
		// window.addEventListener('close')
		if (extractToken()?.token) {
			setAuthToken(extractToken()?.token)
		} else {
			navigate("/signin")
		}
	}, []);

	useEffect(() => {
		if (authToken) {
			if (extractToken()?.role === `${process.env.REACT_APP_STUDENT_ROLE}`) {
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
							if (!res.data?.admission?.isDisabled) {
								setUser(res.data.admission)
								console.log(res.data.admission)
							} else {
								logout()
								console.log(res.data.message)
							}
						}
					})
					.catch((err) => {
						console.log(err.message)
					})
			} else if (extractToken()?.role === "teacher") {
				axios(`${process.env.REACT_APP_BASE_URL}/teacher/token`, {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${authToken}`
					}
				})
					.then((res) => {
						if (res.data.error) {
							console.error(res.data.message)
						} else {
							if (!res.data?.teacher?.isDisabled) {
								setUser(res.data.teacher)
								console.log(res.data.teacher)
							} else {
								logout()
								console.log(res.data.message)
							}
						}
					})
					.catch((err) => {
						console.log(err.message)
					})
			}
		}
	}, [authToken]);

	return <AuthContext.Provider value={{ authToken, setAuthToken, user, logout, setUser }}>
		{children}
	</AuthContext.Provider>
}

export const UseAuthContext = () => {
	return useContext(AuthContext);
}
