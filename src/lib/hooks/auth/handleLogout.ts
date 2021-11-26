import { session } from '$app/stores';
export default function handleLogout(): void {
    session.update(async current => {
        current.user = null;
        current.loggedIn = false;
        return current;
    });
    document.cookie = 'Logout=yes;Max-Age=3600;'; // When sent to the SK server, it will clear all cookies
}