import { createContext, useContext, useEffect, useState } from "react";
import { UseAuthContext } from "./Authentication";
import axios from "axios";
import extractToken from "../Utils/ExtractToken";

const AttendanceContext = createContext();

const AttendanceContextProvider = ({ children }) => {
	const [attendance, setAttendance] = useState([])
	const { authToken } = UseAuthContext();

	useEffect(() => {
		if (extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}`) {
			axios(`${process.env.REACT_APP_BASE_URL}/attendance/`, {
				method: "GET"
			})
				.then((res) => {
					if (res.data.error) {

					} else {
						setAttendance(res?.data?.attendance)
					}
				})
		} else if (extractToken()?.role === `${process.env.REACT_APP_TEACHER_ROLE}`) {
			axios(`${process.env.REACT_APP_BASE_URL}/attendance/token/teacher`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				}
			})
				.then((res) => {
					if (res.data.error) {

					} else {
						setAttendance(res?.data?.attendance)
					}
				})
		}
		// }
	}, []);

	return <AttendanceContext.Provider value={{ attendance, setAttendance }}>
		{children}
	</AttendanceContext.Provider>
}

const UseAttendanceContext = () => {
	return useContext(AttendanceContext);
}

export { AttendanceContextProvider, UseAttendanceContext };