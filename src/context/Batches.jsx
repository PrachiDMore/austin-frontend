import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";

const BatchesContext = createContext();

const BatchesContextProvider = ({ children }) => {
    const [batches, setBatches] = useState([]);
    const [batchOptions, setBatchOptions] = useState([])

    useEffect(() => {
        if (extractToken()?.role !== "student") {
            axios(`${process.env.REACT_APP_BASE_URL}/batch/`)
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message)
                    } else {
                        setBatches(res.data.batches)
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        } else {
            axios(`${process.env.REACT_APP_BASE_URL}/batch/token/student`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message)
                    } else {
                        setBatches(res.data.batches)
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }, []);

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