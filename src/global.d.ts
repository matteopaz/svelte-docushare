/// <reference types="@sveltejs/kit" />
export const API_URL = `https://docushare-api-dev.matteodev.workers.dev`;
export interface AuthenticationForm {
    email: string,
    password: string,
    status: string,
    error: boolean
}