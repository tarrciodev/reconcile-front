"use server";

import { BASE_URL } from "./define-url";

export async function api<T>(
    input: string | URL | globalThis.Request,
    init?: RequestInit
) {
    const response = await fetch(`${BASE_URL}${input}`, init);

    const data = await response.json();

    return data as T;
}
