import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SubjectContext = createContext();

const SubjectContextProvider = ({children}) => {
	const [subjects, setSubjects] = useState([]);
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

	return <SubjectContext.Provider value={{subjects, setSubjects}}>
		{children}
	</SubjectContext.Provider>
}

const UseSubjectContext = () => {
	return useContext(SubjectContext)
}

export { SubjectContextProvider, UseSubjectContext };