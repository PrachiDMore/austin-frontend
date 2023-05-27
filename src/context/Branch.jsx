import axios from 'axios';
import { useEffect } from 'react';
import { useContext, createContext, useState } from 'react';

const BranchContext = createContext();

const BranchContextProvider = ({ children }) => {
	const [branches, setBranches] = useState([]);
	const [branchOptions, setBranchOptions] = useState([]);

	useEffect(() => {
		axios(`${process.env.REACT_APP_BASE_URL}/branch/`, {
			method: "GET"
		})
			.then((res) => {
				if (res.data.error) {
					alert(res.data.message)
				} else {
					setBranches(res.data.branches);
				}
			})
	}, []);

	useEffect(() => {
		setBranchOptions(branches?.map((branch) => {
			return {
				...branch,
				label: `${branch?.name} (${branch?.city})`,
				value: branch?._id
			}
		}))
	}, [branches]);

	return <BranchContext.Provider value={{ branches, setBranches, branchOptions }}>
		{children}
	</BranchContext.Provider>
}

const UseBranchContext = () => {
	return useContext(BranchContext)
}

export { UseBranchContext, BranchContextProvider }