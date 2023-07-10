import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import extractToken from "../Utils/ExtractToken";
import { UseAuthContext } from "./Authentication";

const BranchManagerContext = createContext();

const BranchManagerContextProvider = ({ children }) => {
    const [branchManagers, setBranchManagers] = useState([]);
    const [branchManagerOptions, setBranchManagerOptions] = useState([])
    const { authToken } = UseAuthContext()

    useEffect(() => {
        if (extractToken()?.role !== `${process.env.REACT_APP_STUDENT_ROLE}`) {
            axios(`${process.env.REACT_APP_BASE_URL}/branch-manager/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res?.error) {
                        console.error(res.message)
                    } else {
                        setBranchManagers(res?.data?.users)
                    }
                })
        }
    }, [authToken]);

    useEffect(() => {
        setBranchManagerOptions(branchManagers?.map((branchManager) => {
            return {
                ...branchManager,
                label: `${branchManager?.firstname} ${branchManager?.lastname} (${branchManager?.username})`,
                value: branchManager?._id
            }
        }))
    }, [branchManagers]);


    return <BranchManagerContext.Provider value={{ branchManagerOptions, branchManagers, setBranchManagers }}>
        {children}
    </BranchManagerContext.Provider>
}

const UseBranchManagerContext = () => {
    return useContext(BranchManagerContext)
}

export { BranchManagerContextProvider, UseBranchManagerContext };