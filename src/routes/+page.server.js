import process from 'node:process';

/** @type {import('./$types').PageServerLoad} */
export function load(event) {
    return { pid: process.pid };
}
