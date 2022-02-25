/// <reference types="@sveltejs/kit" />
let api_url = "";
let deploy_url = "";
if (import.meta.env.PROD) {
	api_url = `https://docushare.matteopaz.me/api`;
	deploy_url = `https://docushare.matteopaz.me`;
} else if (import.meta.env.STAGING) {
	api_url = `https://docushare-lite.matteodev.workers.dev`;
	deploy_url = `https://docushare-lite.matteodev.workers.dev`;
} else {
	api_url = `http://localhost:3000/api`;
	deploy_url = `http://localhost:3000`;
}
export const API_URL = api_url;
export const DEPLOY_URL = deploy_url;
export interface AuthenticationForm {
	email: string;
	password: string;
	status: string;
	error: boolean;
}
