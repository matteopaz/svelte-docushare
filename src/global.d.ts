/// <reference types="@sveltejs/kit" />
export const API_URL = `https://127.0.0.1:8787`;
export const DEPLOY_URL = `https://127.0.0.1:3000`; 
export interface AuthenticationForm {
    email: string,
    password: string,
    status: string,
    error: boolean
}