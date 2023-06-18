const extractToken = () => {
	try {
		if (sessionStorage.getItem(btoa("token")) != undefined || sessionStorage.getItem(btoa("token")) != null) {
			return JSON.parse(atob(sessionStorage.getItem(btoa("token"))))
		}
	} catch (error) {
		console.warning("Token Tampered")
	}
}

export default extractToken;