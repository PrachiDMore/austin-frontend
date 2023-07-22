import axios from 'axios';
import { useEffect } from 'react';
import { useContext, createContext, useState } from 'react';
import extractToken from '../Utils/ExtractToken';
import { UseAuthContext } from './Authentication';

const BranchContext = createContext();

const BranchContextProvider = ({ children }) => {
	const [branches, setBranches] = useState([]);
	const [branchOptions, setBranchOptions] = useState([]);
	const { authToken } = UseAuthContext();

	useEffect(() => {
		if (extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}`) {
			axios(`${process.env.REACT_APP_BASE_URL}/branch/`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				}
			})
				.then((res) => {
					if (res.data.error) {
						// console.log(res.data.message)
					} else {
						setBranches(res.data.branches);
					}
				})
		} else if (extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_ROLE}` || extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_VIEWER_ROLE}`) {
			axios(`${process.env.REACT_APP_BASE_URL}/branch/`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				}
			})
				.then((res) => {
					if (res.data.error) {
						// console.log(res.data.message)
					} else {
						// console.log(res.data)
						setBranches(res.data.branches);
					}
				})
		}
	}, [authToken]);

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