import { writable, readable } from "svelte/store";

export const loggedIn = writable(false);
export const user = writable("");
export const jwt = writable("");