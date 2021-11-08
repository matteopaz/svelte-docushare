// @ts-expect-error
import { API_URL } from '/src/global.d';
// @ts-expect-error
import type { AuthenticationForm } from '/src/global.d';
import { jwt, user, loggedIn } from '$lib/stores';

export default async function handleLogin(login: AuthenticationForm): Promise<boolean> {
    login.status = '';
    login.error = false;
    if (login.email.length <= 0 || login.password.length <= 0) {
        login.status = 'Please fill in all fields';
        login.error = true;
        return;
    }
    const fetcher = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: login.email,
            password: login.password
        })
    });
    if (fetcher.status === 200) {
        jwt.set(await fetcher.text());
        user.set(login.email);
        loggedIn.set(true);
        return false; // Closes modal
    } else {
        login.status = await fetcher.text();
        login.error = true;
        return true; // Maintains modal 
    }
}