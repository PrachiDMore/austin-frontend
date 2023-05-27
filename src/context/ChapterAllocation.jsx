import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ChapterAllocationContext = createContext();

const ChapterAllocationContextProvider = ({children}) => {
	const [chapters, setChapters] = useState([]);
    const [chapterOptions, setChapterOptions] = useState([])

	useEffect(() => {
        axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/`)
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

    useEffect(() => {
        setChapterOptions(chapters.map((chapter) => {
            return {
                ...chapter,
                label: `${chapter.name} (${chapter.grade})`,
                value: chapter._id
            }
        }))
    }, [chapters])

	return <ChapterAllocationContext.Provider value={{chapters, setChapters, chapterOptions}}>
		{children}
	</ChapterAllocationContext.Provider>
}

const UseChapterAllocationContext = () => {
	return useContext(ChapterAllocationContext)
}

export { ChapterAllocationContextProvider, UseChapterAllocationContext };