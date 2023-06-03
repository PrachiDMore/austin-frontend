const extractToken = () => {
	if (sessionStorage.getItem(btoa("token")) != undefined || sessionStorage.getItem(btoa("token")) != null) {
		return JSON.parse(atob(sessionStorage.getItem(btoa("token"))))
	}
}

export default extractToken;