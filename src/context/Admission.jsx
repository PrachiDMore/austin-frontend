import axios from 'axios';
import { useEffect } from 'react';
import { useContext, createContext, useState } from 'react';
import extractToken from '../Utils/ExtractToken';

const AdmissionContext = createContext();

const AdmissionContextProvider = ({ children }) => {
	const [admissions, setAdmissions] = useState([]);
	const [admissionOptions, setAdmissionOptions] = useState([]);

	useEffect(() => {
		if (extractToken()?.role !== `${process.env.REACT_APP_STUDENT_ROLE}`) {
			axios(`${process.env.REACT_APP_BASE_URL}/admission/`, {
				method: "GET",
				headers:{
					Authorization: `Bearer ${extractToken()?.token}`
				}
			})
				.then((res) => {
					if (res.data.error) {
						console.log(res.data.message)
					} else {
						setAdmissions(res.data.admissions);
					}
				})
		}
	}, []);

	useEffect(() => {
		setAdmissionOptions(admissions?.map((admission) => {
			return {
				...admission,
				label: `${admission?.firstname} ${admission?.lastname} (${admission?.grade})`,
				value: admission?._id
			}
		}))
	}, [admissions]);

	return <AdmissionContext.Provider value={{ admissions, setAdmissions, admissionOptions }}>
		{children}
	</AdmissionContext.Provider>
}

const UseAdmissionContext = () => {
	return useContext(AdmissionContext)
}

export { UseAdmissionContext, AdmissionContextProvider }