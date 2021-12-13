/// <reference types="@sveltejs/kit" />
export const API_URL = `https://api.docushare.matteopaz.me`;
export interface AuthenticationForm {
    email: string,
    password: string,
    status: string,
    error: boolean
}