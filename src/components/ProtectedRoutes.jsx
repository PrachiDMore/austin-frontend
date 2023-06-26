import { Navigate, Outlet } from "react-router-dom";
import extractToken from "../Utils/ExtractToken";

const ProtectedRoutes = ({role}) => {
	return (
		role?.includes(extractToken()?.role) ? <Outlet /> : <Navigate to="/signin" />
	);
};
export default ProtectedRoutes;