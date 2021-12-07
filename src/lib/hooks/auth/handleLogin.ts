// @ts-expect-error
import type { AuthenticationForm } from '/src/global.d';
// @ts-expect-error
import { API_URL } from '/src/global.d';
import { session } from "$app/stores";

export default async function handleLogin(login: AuthenticationForm): Promise<boolean> {
	login.status = '';
	login.error = false;
	if (login.email.length <= 0 || login.password.length <= 0) {
		login.status = 'Please fill in all fields';
		login.error = true;
		return true;
	}
	const fetcher = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({
			email: login.email,
			password: login.password
		})
	});
	if (fetcher.status === 200) {
		const token = await fetcher.text();
		let parts: any[] = token.split(".");
		// Parse parts[0] from base64 to string to JSON
		parts[1] = atob(parts[1]);
		parts[1] = JSON.parse(parts[1]);

		session.update(current => {
			current.loggedIn = true;
			current.user = parts[1].user;
			current.jwt = token;
			return current;
		});
	} else {
		login.status = await fetcher.text();
		login.error = true;
		return true; // Maintains modal
	}
}
