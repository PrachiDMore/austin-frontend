import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TeacherContext = createContext();

const TeacherContextProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([])
    useEffect(() => {
        axios(`${process.env.REACT_APP_BASE_URL}/teacher`)
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.message)
                } else {
                    setTeachers(res.data.teachers)
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }, []);


    useEffect(() => {
        setTeacherOptions(teachers.map((e) => {
            if (!e.isDisabled) {
                return {
                    ...e,
                    value: e._id,
                    label: `${e.fullname} (${e.salaryType})`
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