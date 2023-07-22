import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";
import { UseBatchesContext } from "./Batches";
import { UseAuthContext } from "./Authentication";

const ChapterAllocationContext = createContext();

const ChapterAllocationContextProvider = ({ children }) => {
    const [chapterAllocations, setChapterAllocations] = useState([]);
    const [individualChapterAllocation, setIndividualChapterAllocation] = useState([]);
    const { batches, individualBatches } = UseBatchesContext()
    const { user } = UseAuthContext()

    useEffect(() => {
        if (extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` || extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_ROLE}` || extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_VIEWER_ROLE}`) {
            axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res.data.error) {
                        // console.log(res.data.message)
                    } else {
                        setChapterAllocations(res?.data?.chapterAllocations);
                    }
                })
                .catch((err) => {
                    // console.log(err.message)
                })
            axios(`${process.env.REACT_APP_BASE_URL}/individual-chapterAllocation/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res.data.error) {
                        // console.log(res.data.message)
                    } else {
                        setIndividualChapterAllocation(res.data.chapterAllocations)
                    }
                })
                .catch((err) => {
                    // console.log(err.message)
                })
        } else if (extractToken()?.role === `${process.env.REACT_APP_TEACHER_ROLE}`) {
            axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/teacher`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res.data.error) {
                        // console.log(res.data.message)
                    } else {
                        setChapterAllocations(res?.data?.chapterAllocations);
                    }
                })
                .catch((err) => {
                    // console.log(err.message)
                })
            axios(`${process.env.REACT_APP_BASE_URL}/individual-chapterAllocation/teacher`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res.data.error) {
                        // console.log(res.data.message)
                    } else {
                        setIndividualChapterAllocation(res.data.chapterAllocations)
                    }
                })
                .catch((err) => {
                    // console.log(err.message)
                })
        } else if(extractToken()?.token){
            const batchId = batches?.map((batch) => {
                return batch._id
            })
            axios(`${process.env.REACT_APP_BASE_URL}/chapterAllocation/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res.data.error) {
                        // console.log(res.data.message)
                    } else {
                        setChapterAllocations(res?.data?.chapterAllocations?.filter((chapterAllocation) => {
                            return batchId?.includes(chapterAllocation?.batch?._id)
                        }));
                    }
                })
                .catch((err) => {
                    // console.log(err.message)
                })
            const individualBatchId = individualBatches?.map((batch) => {
                return batch._id
            })
            axios(`${process.env.REACT_APP_BASE_URL}/individual-chapterAllocation/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res.data.error) {
                        // console.log(res.data.message)
                    } else {
                        setIndividualChapterAllocation(res?.data?.chapterAllocations?.filter((chapterAllocation) => {
                            return individualBatchId?.includes(chapterAllocation?.individualBatch?._id)
                        }));
                    }
                })
                .catch((err) => {
                    // console.log(err.message)
                })
        }
    }, [batches, individualBatches]);

    return <ChapterAllocationContext.Provider value={{ chapterAllocations, setChapterAllocations, individualChapterAllocation, setIndividualChapterAllocation }}>
        {children}
    </ChapterAllocationContext.Provider>
}

const UseChapterAllocationContext = () => {
    return useContext(ChapterAllocationContext)
}

export { ChapterAllocationContextProvider, UseChapterAllocationContext };