import { API_URL } from './global.d';
function parseCookies(cookieString: string): { [key: string]: any } {
    // Parse req.headers.cookie into an object
    let cookies = {};
    if (cookieString) {
      cookieString.split(";").forEach((cookie) => {
        const parts = cookie.split("=");
        cookies[parts[0].trim()] = (parts[1] || "").trim();
      });
    }
    return cookies;
  }

export async function handle({ request, resolve }) {
	if (request.headers.cookie) {
		request.locals.cookie = request.headers.cookie;
	}
    if(parseCookies(request.locals.cookie).Logout) {
        request.locals.Logout = true;
        const resolvedRequest = await resolve(request);
        return {
            ...resolvedRequest,
            headers: {
                "set-cookie": ["Logout=no;Max-Age=0", "Authentication=invalid;Max-Age=0"],
            }
        }
    } else {
        return await resolve(request);
    }
}

export async function getSession({ locals }) {
	if (locals.cookie && !locals.Logout) {
		const authFetch: Response = await fetch(`${API_URL}/auth/check`, {
			headers: {
				cookie: locals.cookie
			},
			credentials: 'include'
		});
		if (authFetch.ok) {
			return {
				loggedIn: true,
				user: await authFetch.text()
			};
		} else {
			return {
				loggedIn: false,
				user: null
			};
		}
	} else return {
        loggedIn: false,
        user: null
    };
}