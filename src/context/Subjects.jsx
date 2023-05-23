import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SubjectContext = createContext();

const SubjectContextProvider = ({children}) => {
	const [subjects, setSubjects] = useState([]);
    const [subjectOptions, setSubjectOptions] = useState([]);

	useEffect(() => {
        axios(`${process.env.REACT_APP_BASE_URL}/subject/`)
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.message)
                } else {
                    setSubjects(res.data.subjects)
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }, []);

    useEffect(() => {
        setSubjectOptions(subjects.map((subject) => {
            return {
                label: `${subject.name} (${subject.grade})`,
                value: subject._id
            }
        }))
    }, [subjects])

	return <SubjectContext.Provider value={{subjects, setSubjects, subjectOptions}}>
		{children}
	</SubjectContext.Provider>
}

const UseSubjectContext = () => {
	return useContext(SubjectContext)
}

export { SubjectContextProvider, UseSubjectContext };