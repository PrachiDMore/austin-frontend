import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const batchesContext = createContext();

const batchesContextProvider = ({children}) => {
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

	return <batchesContext.Provider value={{batches, setBatches}}>
		{children}
	</batchesContext.Provider>
}

const UsebatchesContext = () => {
	return useContext(batchesContext)
}

export { batchesContextProvider, UsebatchesContext };