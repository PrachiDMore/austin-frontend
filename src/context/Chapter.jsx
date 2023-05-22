import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ChapterContext = createContext();

const ChapterContextProvider = ({children}) => {
	const [chapters, setChapters] = useState([]);
	useEffect(() => {
        axios(`${process.env.REACT_APP_BASE_URL}/chapter/`)
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.message)
                } else {
                    setChapters(res.data.chapters)
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }, []);

	return <ChapterContext.Provider value={{chapters, setChapters}}>
		{children}
	</ChapterContext.Provider>
}

const UseChapterContext = () => {
	return useContext(ChapterContext)
}

export { ChapterContextProvider, UseChapterContext };