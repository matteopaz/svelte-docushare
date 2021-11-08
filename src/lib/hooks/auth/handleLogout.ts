import { user, jwt, loggedIn } from '$lib/stores';
export default function handleLogout(): void {
    user.invalidate();
    jwt.invalidate();
    loggedIn.set(false);
}