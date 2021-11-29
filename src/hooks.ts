import { API_URL } from './global.d';
function parseCookies(cookieString: string): { [key: string]: any } {
	// Parse req.headers.cookie into an object
	let cookies = {};
	if (cookieString) {
		cookieString.split(';').forEach((cookie) => {
			const parts = cookie.split('=');
			cookies[parts[0].trim()] = (parts[1] || '').trim();
		});
	}
	return cookies;
}

export async function handle({ request, resolve }) {
	const cookies = parseCookies(request.headers.cookie);
	if (cookies.Authentication && !cookies.Logout) {
        request.locals.jwt = cookies.Authentication;
		const jwt = cookies.Authentication;
		const rawParts = jwt.split(" ")[1].split('.');
		const parts = [atob(rawParts[0]).toString(), atob(rawParts[1]).toString()];
		const payload = JSON.parse(parts[1] || '{}');
		if (!payload.exp || payload.exp <= Date.now() / 1000) {
			request.locals.user = null;
			request.locals.loggedIn = false;
			request.locals.jwt = null;
		} else {
			request.locals.user = payload.user;
			request.locals.loggedIn = true;
		}
	} else {
		request.locals.user = null;
		request.locals.loggedIn = false;
		if (cookies.Logout) {
			const resolvedRequest = await resolve(request);
            request.locals.cookie = "";
			return {
				...resolvedRequest,
				headers: {
					'set-cookie': ['Logout=no;Max-Age=0', 'Authentication=invalid;Max-Age=0'],
                    'content-type': 'text/html'
				}
			};
		}
	}
    request.locals.cookie = request.headers.cookie;
	return await resolve(request);
}

export async function getSession({ locals }) {
	return {
		user: locals.user ?? null,
		loggedIn: locals.loggedIn ?? false,
        jwt: locals.jwt ?? null
	};
}
