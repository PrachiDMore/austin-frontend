import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext();

const CourseContextProvider = ({children}) => {
	const [courses, setCourses] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);

	useEffect(() => {
        axios(`${process.env.REACT_APP_BASE_URL}/course/`)
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.message)
                } else {
                    setCourses(res.data.courses)
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }, []);

    useEffect(() => {
        setCourseOptions(courses.map((e) => {
            if (!e.isDisabled) {
                return {
                    ...e,
                    value: e._id,
                    label: `${e.name} (${e.grade})`
                }
            }
        }))
    }, [courses]);


	return <CourseContext.Provider value={{courses, setCourses, courseOptions}}>
		{children}
	</CourseContext.Provider>
}

const UseCourseContext = () => {
	return useContext(CourseContext)
}

export { CourseContextProvider, UseCourseContext };