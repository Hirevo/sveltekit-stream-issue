import process from 'node:process';

/**
 * @param {Headers} headers
 * @param {string[]} forwardedHeaderNames
 * @returns {Object.<string, string>}
 */
function forwardHeaders(headers, forwardedHeaderNames) {
    /** @type {Object.<string, string>} */
    const forwardedHeaders = {};
    for (const headerName of forwardedHeaderNames) {
        const headerValue = headers.get(headerName);
        if (headerValue !== null) {
            forwardedHeaders[headerName] = headerValue;
        }
    }
    return forwardedHeaders;
}

console.log('Process ID:', process.pid);

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    const requestHeaders = forwardHeaders(event.request.headers, ['range']);
    const response = await fetch('https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4', {
        signal: event.request.signal,
        headers: requestHeaders,
    });
    const responseHeaders = forwardHeaders(response.headers, ['content-length', 'content-type', 'content-range', 'accept-ranges']);
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
    });
}
