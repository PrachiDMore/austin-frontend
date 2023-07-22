import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";
import { UseBatchesContext } from "./Batches";

const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const { batches } = UseBatchesContext();
    const [courseOptions, setCourseOptions] = useState([]);

    useEffect(() => {
        if (extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` || extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_ROLE}` || extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_VIEWER_ROLE}`  || extractToken()?.role === `${process.env.REACT_APP_TEACHER_ROLE}`) {
            axios(`${process.env.REACT_APP_BASE_URL}/course/`, {
                method: "GET",
                headers:{
					Authorization: `Bearer ${extractToken()?.token}`
				}
            })
                .then((res) => {
                    if (res.data.error) {
                        // console.log(res.data.message)
                    } else {
                        setCourses(res.data.courses)
                    }
                })
                .catch((err) => {
                    // console.log(err.message)
                })
        } else {
            setCourses(batches?.map((batch) => {
                return batch?.course
            }))
        }
    }, [batches]);

    useEffect(() => {
        setCourseOptions(courses?.map((e) => {
            if (!e.isDisabled) {
                return {
                    ...e,
                    value: e._id,
                    label: `${e.name} (${e.grade})`
                }
            }
        }))
    }, [courses]);


    return <CourseContext.Provider value={{ courses, setCourses, courseOptions }}>
        {children}
    </CourseContext.Provider>
}

const UseCourseContext = () => {
    return useContext(CourseContext)
}

export { CourseContextProvider, UseCourseContext };