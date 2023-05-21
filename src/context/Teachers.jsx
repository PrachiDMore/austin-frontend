import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TeacherContext = createContext();

const TeacherContextProvider = ({children}) => {
	const [teachers, setTeachers] = useState([]);
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

	return <TeacherContext.Provider value={{teachers, setTeachers}}>
		{children}
	</TeacherContext.Provider>
}

const UseTeacherContext = () => {
	return useContext(TeacherContext)
}

export { TeacherContextProvider, UseTeacherContext };