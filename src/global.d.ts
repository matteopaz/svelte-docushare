/// <reference types="@sveltejs/kit" />
export const API_URL = `http://localhost:8010/proxy`;
export interface AuthenticationForm {
    email: string,
    password: string,
    status: string,
    error: boolean
}