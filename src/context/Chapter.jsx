import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ChapterContext = createContext();

const ChapterContextProvider = ({children}) => {
	const [chapters, setChapters] = useState([]);
    const [chapterOptions, setChapterOptions] = useState([])

	useEffect(() => {
        axios(`${process.env.REACT_APP_BASE_URL}/chapter/`)
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data.message)
                } else {
                    setChapters(res.data.chapters)
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, []);

    useEffect(() => {
        setChapterOptions(chapters?.map((chapter) => {
            return {
                ...chapter,
                label: `${chapter.name} (${chapter.grade})`,
                value: chapter._id
            }
        }))
    }, [chapters])

	return <ChapterContext.Provider value={{chapters, setChapters, chapterOptions}}>
		{children}
	</ChapterContext.Provider>
}

const UseChapterContext = () => {
	return useContext(ChapterContext)
}

export { ChapterContextProvider, UseChapterContext };