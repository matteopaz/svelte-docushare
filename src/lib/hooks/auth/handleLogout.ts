import { session } from '$app/stores';
import { DEPLOY_URL } from '/src/global.d';
export default function handleLogout(): void {
    session.update(async current => {
        current.user = null;
        current.loggedIn = false;
        return current;
    });
    const splitBySchema = DEPLOY_URL.split('//');
    const domain = "Domain=" + splitBySchema[splitBySchema.length - 1] + ";";
    document.cookie = 'Logout=yes;Max-Age=3600;' + domain; // When sent to the SK server, it will clear all cookies
}