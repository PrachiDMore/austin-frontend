import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";
import { UseAuthContext } from "./Authentication";

const BranchManagerViewerContext = createContext();

const BranchManagerViewerContextProvider = ({ children }) => {
    const [BranchManagerViewers, setBranchManagerViewers] = useState([]);
    const [BranchManagerViewerOptions, setBranchManagerViewerOptions] = useState([])
    const { authToken } = UseAuthContext()

    useEffect(() => {
        if (extractToken()?.role !== `${process.env.REACT_APP_STUDENT_ROLE}` && extractToken()?.role !== `${process.env.REACT_APP_TEACHER_ROLE}`) {
            axios(`${process.env.REACT_APP_BASE_URL}/branch-manager-viewer`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res?.error) {
                        console.error(res.message)
                    } else {
                        setBranchManagerViewers(res?.data?.users)
                    }
                })
        }
    }, [authToken]);

    useEffect(() => {
        setBranchManagerViewerOptions(BranchManagerViewers?.map((BranchManagerViewer) => {
            return {
                ...BranchManagerViewer,
                label: `${BranchManagerViewer?.firstname} ${BranchManagerViewer?.lastname} (${BranchManagerViewer?.username})`,
                value: BranchManagerViewer?._id
            }
        }))
    }, [BranchManagerViewers]);


    return <BranchManagerViewerContext.Provider value={{ BranchManagerViewerOptions, BranchManagerViewers, setBranchManagerViewers }}>
        {children}
    </BranchManagerViewerContext.Provider>
}

const UseBranchManagerViewerContext = () => {
    return useContext(BranchManagerViewerContext)
}

export { BranchManagerViewerContextProvider, UseBranchManagerViewerContext };