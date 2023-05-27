import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const BatchesContext = createContext();

const BatchesContextProvider = ({children}) => {
	const [batches, setBatches] = useState([]);
	useEffect(() => {
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
    }, []);

	return <BatchesContext.Provider value={{batches, setBatches}}>
		{children}
	</BatchesContext.Provider>
}

const UseBatchesContext = () => {
	return useContext(BatchesContext)
}

export { BatchesContextProvider, UseBatchesContext };