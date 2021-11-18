/// <reference types="@sveltejs/kit" />
export const API_URL = `http://127.0.0.1:8787`;
export interface AuthenticationForm {
    email: string,
    password: string,
    status: string,
    error: boolean
}