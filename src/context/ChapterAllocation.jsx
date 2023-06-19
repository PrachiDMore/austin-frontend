import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";
import { UseBatchesContext } from "./Batches";
import { UseAuthContext } from "./Authentication";

const ChapterAllocationContext = createContext();

const ChapterAllocationContextProvider = ({ children }) => {
    const [chapterAllocations, setChapterAllocations] = useState([]);
    const { batches } = UseBatchesContext()
    const {user} = UseAuthContext()

    useEffect(() => {
        if (extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}`) {
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
        } else if (extractToken()?.role === `${process.env.REACT_APP_TEACHER_ROLE}`) {
            axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/teacher`, {
                method: "GET",
                headers:{
                    Authorization: `Bearer ${extractToken()?.token}`
                }
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
        } else {
            const batchId = batches?.map((batch) => {
                return batch._id
            })
            axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/`, {
                method: "GET"
            })
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message)
                    } else {
                        setChapterAllocations(res?.data?.chapterAllocations?.filter((chapterAllocation) => {
                            return batchId?.includes(chapterAllocation?.batch?._id)
                        }));
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }, [batches]);

    return <ChapterAllocationContext.Provider value={{ chapterAllocations, setChapterAllocations }}>
        {children}
    </ChapterAllocationContext.Provider>
}

const UseChapterAllocationContext = () => {
    return useContext(ChapterAllocationContext)
}

export { ChapterAllocationContextProvider, UseChapterAllocationContext };