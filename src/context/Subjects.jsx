import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";

const SubjectContext = createContext();

const SubjectContextProvider = ({ children }) => {
    const [subjects, setSubjects] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);

    useEffect(() => {
        if (extractToken()?.token) {
            axios(`${process.env.REACT_APP_BASE_URL}/subject/`, {
                method: "GET",
                headers:{
					Authorization: `Bearer ${extractToken()?.token}`
				}
            })
                .then((res) => {
                    if (res.data.error) {
                        console.log(res.data.message)
                    } else {
                        console.log(res.data)
                        setSubjects(res.data.subjects)
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    }, []);

    useEffect(() => {
        setSubjectOptions(subjects?.map((subject) => {
            return {
                ...subject,
                label: `${subject.name} (${subject.grade})`,
                value: subject._id
            }
        }))
    }, [subjects])

    return <SubjectContext.Provider value={{ subjects, setSubjects, subjectOptions }}>
        {children}
    </SubjectContext.Provider>
}

const UseSubjectContext = () => {
    return useContext(SubjectContext)
}

export { SubjectContextProvider, UseSubjectContext };