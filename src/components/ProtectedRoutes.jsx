import { Navigate, Outlet } from "react-router-dom";
import extractToken from "../Utils/ExtractToken";

const ProtectedRoutes = ({role}) => {
	return (
		extractToken()?.role === role ? <Outlet /> : <Navigate to="/signin" />
	);
};
export default ProtectedRoutes;