import { createContext, useContext, useEffect, useState } from "react";
import { UseAuthContext } from "./Authentication";
import axios from "axios";
import extractToken from "../Utils/ExtractToken";

const AttendanceContext = createContext();

const AttendanceContextProvider = ({ children }) => {
	const [attendance, setAttendance] = useState([])
	const [individualAttendance, setIndividualAttendance] = useState([])
	const { authToken } = UseAuthContext();
	const [refresh, setRefresh] = useState(0)

	useEffect(() => {
		if (authToken) {
			if (extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` || extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_ROLE}` ||  extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_VIEWER_ROLE}`) {
				axios(`${process.env.REACT_APP_BASE_URL}/attendance/`, {
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
					.catch((err) => {
						console.log(err.message)
					})
				axios(`${process.env.REACT_APP_BASE_URL}/individual-attendance/`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${extractToken()?.token}`
					}
				})
					.then((res) => {
						if (res.data.error) {

						} else {
							setIndividualAttendance(res?.data?.attendance)
						}
					})
					.catch((err) => {
						console.log(err.message)
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
					.catch((err) => {
						console.log(err.message)
					})
				axios(`${process.env.REACT_APP_BASE_URL}/individual-attendance/token/teacher`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${extractToken()?.token}`
					}
				})
					.then((res) => {
						if (res.data.error) {

						} else {
							setIndividualAttendance(res?.data?.attendance)
						}
					})
					.catch((err) => {
						console.log(err.message)
					})
			}
		}
	}, [authToken, refresh]);

	return <AttendanceContext.Provider value={{ attendance, setAttendance, individualAttendance, setIndividualAttendance, refresh, setRefresh }}>
		{children}
	</AttendanceContext.Provider>
}

const UseAttendanceContext = () => {
	return useContext(AttendanceContext);
}

export { AttendanceContextProvider, UseAttendanceContext };