// Deprecated
// @ts-expect-error
import { API_URL } from '/src/global.d';
/**
 * 
 * @param jwt JWT store
 * @param loggedIn loggedIn boolean store
 * @param user user store
 */
async function checkAuth(jwt, loggedIn, user) {
	let token = "";
	jwt.subscribe(val => {
		token = val;
	});
	const authFetch = await fetch(`${API_URL}/auth/check`, {
		// TODO - add auth to a cookie and a JWT and use load
		method: 'GET',
		headers: {
			Authentication: `Bearer ${token}`
		}
	});
	if (authFetch.ok) {
		loggedIn.set(true);
	} else {
		loggedIn.set(false);
		user.invalidate();
		jwt.invalidate();
	}
}

export default checkAuth;
