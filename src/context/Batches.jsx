import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";
import { UseAuthContext } from "./Authentication";

const BatchesContext = createContext();

const BatchesContextProvider = ({ children }) => {
    const [batches, setBatches] = useState([]);
    const [batchOptions, setBatchOptions] = useState([])
    const {authToken} = UseAuthContext()

    useEffect(() => {
        if (authToken) {
            if (extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}`) {
                axios(`${process.env.REACT_APP_BASE_URL}/batch/`)
                    .then((res) => {
                        if (res.data.error) {
                            console.log(res.data.message)
                        } else {
                            setBatches(res.data.batches)
                        }
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
            }else if (extractToken()?.role === `${process.env.REACT_APP_TEACHER_ROLE}`) {
                axios(`${process.env.REACT_APP_BASE_URL}/batch/token/teacher`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${extractToken()?.token}`
                    }
                })
                    .then((res) => {
                        if (res.data.error) {
                            console.log(res.data.message)
                        } else {
                            setBatches(res?.data?.batches)
                        }
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
            } else if(extractToken()?.role === `${process.env.REACT_APP_STUDENT_ROLE}`){
                axios(`${process.env.REACT_APP_BASE_URL}/batch/token/student`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${extractToken()?.token}`
                    }
                })
                    .then((res) => {
                        if (res.data.error) {
                            console.log(res.data.message)
                        } else {
                            setBatches(res.data.batches)
                        }
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
            }
        }
    }, [authToken]);

    useEffect(() => {
        setBatchOptions(batches?.map((batch) => {
            return {
                ...batch,
                label: `${batch?.name} (${batch?.academicYear})`,
                value: batch?._id
            }
        }))
    }, [batches]);


    return <BatchesContext.Provider value={{ batches, setBatches, batchOptions }}>
        {children}
    </BatchesContext.Provider>
}

const UseBatchesContext = () => {
    return useContext(BatchesContext)
}

export { BatchesContextProvider, UseBatchesContext };