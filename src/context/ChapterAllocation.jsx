import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";

const ChapterAllocationContext = createContext();

const ChapterAllocationContextProvider = ({ children }) => {
    const [chapterAllocations, setChapterAllocations] = useState([]);

    useEffect(() => {
        if (extractToken()?.role !== "student") {
            axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/`, {
                method: "GET"
            })
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message)
                    } else {
                        setChapterAllocations(res?.data?.chapterAllocations);
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }else{
            axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/student`, {
                method: "GET"
            })
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message)
                    } else {
                        setChapterAllocations(res?.data?.chapterAllocations);
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }, []);

    return <ChapterAllocationContext.Provider value={{ chapterAllocations, setChapterAllocations }}>
        {children}
    </ChapterAllocationContext.Provider>
}

const UseChapterAllocationContext = () => {
    return useContext(ChapterAllocationContext)
}

export { ChapterAllocationContextProvider, UseChapterAllocationContext };