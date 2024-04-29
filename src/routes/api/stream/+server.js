import process from 'node:process';

/**
 * @param {Headers} headers
 * @param {string[]} filteredHeaderNames
 * @returns {Object.<string, string>}
 */
function filterHeaders(headers, filteredHeaderNames) {
    /** @type {Object.<string, string>} */
    const filteredHeaders = {};
    for (const headerName of filteredHeaderNames) {
        const headerValue = headers.get(headerName);
        if (headerValue !== null) {
            filteredHeaders[headerName] = headerValue;
        }
    }
    return filteredHeaders;
}

console.log('Process ID:', process.pid);

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    const requestHeaders = filterHeaders(event.request.headers, ['range']);
    const response = await fetch('https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4', {
        signal: event.request.signal,
        headers: requestHeaders,
    });
    const responseHeaders = filterHeaders(response.headers, ['content-length', 'content-type', 'content-range', 'accept-ranges']);
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
    });
}
