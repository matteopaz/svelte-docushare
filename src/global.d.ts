/// <reference types="@sveltejs/kit" />
export const API_URL = `https://docushare.matteopaz.me/api`;
export const DEPLOY_URL = `https://docushare.matteopaz.me`; 
export interface AuthenticationForm {
    email: string,
    password: string,
    status: string,
    error: boolean
}