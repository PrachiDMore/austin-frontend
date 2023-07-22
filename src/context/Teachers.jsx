import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";

const TeacherContext = createContext();

const TeacherContextProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([])
    useEffect(() => {
        if (extractToken()?.token && extractToken()?.role !== `${process.env.REACT_APP_STUDENT_ROLE}`) {
            axios(`${process.env.REACT_APP_BASE_URL}/teacher`, {
                method: "GET",
                headers:{
					Authorization: `Bearer ${extractToken()?.token}`
				}
            })
                .then((res) => {
                    if (res.data.error) {
                        // console.log(res.data.message)
                    } else {
                        setTeachers(res.data.teachers)
                    }
                })
                .catch((err) => {
                    // console.log(err.message)
                })
        }
    }, []);


    useEffect(() => {
        setTeacherOptions(teachers?.map((e) => {
            if (!e.isDisabled) {
                return {
                    ...e,
                    value: e._id,
                    label: `${e.fullname} (${e.username})`
                }
            }
        }))
    }, [teachers]);

    return <TeacherContext.Provider value={{ teachers, setTeachers, teacherOptions }}>
        {children}
    </TeacherContext.Provider>
}

const UseTeacherContext = () => {
    return useContext(TeacherContext)
}

export { TeacherContextProvider, UseTeacherContext };