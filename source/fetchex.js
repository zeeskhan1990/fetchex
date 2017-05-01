import 'es6-promise/auto';
import 'isomorphic-fetch';

const types = {
    json: 'application/json',
    formData: 'application/x-www-form-urlencoded',
    text: 'text/plain'
};

const wrapFetch = (method, url, contentType='json', accept='json', creds, init, body) => {
    if (typeof(body) === 'undefined' && method !== 'GET') throw 'body is required';
    if (typeof(body) === 'undefined' && method !== 'GET') throw 'type is required';

    init = init || {};
    if (method !== 'GET')
        init.body = body;
    init.method = method;
    init.headers = init.headers || {};
    init.headers['Content-Type'] = types[contentType] || contentType;
    // if (accept === 'json')
    init.headers['Accept'] = types[accept] || accept;

    if (creds === true)
        init.credentials = 'same-origin';
    else if (typeof(creds) !== 'undefined')
        init.credentials = creds;

    return fetch(url, init);
}

const extractResponse = (rawResponse, type) => {
    if (rawResponse.ok)
        return rawResponse[type]();
    throw new Error(rawResponse.status);
}

const fetchex = {
    fetch:(url, init) => {
        return fetch(url, init);
    },

    get:(url, contentType, accept, creds, init) => {
        return wrapFetch('GET', url, contentType, accept, creds, init);
    },

    post:(url, body, contentType, accept, creds, init) => {
        return wrapFetch('POST', url, contentType, accept, creds, init, body);
    },

    patch:(url, body, contentType, accept, creds, init) => {
        return wrapFetch('PATCH', url, contentType, accept, creds, init, body);
    },

    getJson: (url, contentType, creds, init) => {
         return wrapFetch('GET', url, contentType, 'json', creds, init)
         .then((response) => extractResponse(response, 'json'));
    },

    postJson: (url, body, contentType, creds, init) => {
        return wrapFetch('POST', url, contentType, 'json', creds, init, body)
        .then((response) => extractResponse(response, 'json'));
    },

    patchJson: (url, body, contentType, creds, init) => {
        return wrapFetch('PATCH', url, contentType, 'json', creds, init, body)
        .then((response) => extractResponse(response, 'json'));
    },

    getFile: (url, contentType, creds, init) => {
        return wrapFetch('GET', url, contentType, 'file', creds, init)
        .then((response) => extractResponse(response, 'file'));
    },

    postFile: (url, body, contentType, creds, init) => {
        return wrapFetch('POST', url, contentType, 'file', creds, init, body)
        .then((response) => extractResponse(response, 'file'));
    },

    patchFile: (url, body, contentType, creds, init) => {
        return wrapFetch('POST', url, contentType, 'file', creds, init, body)
        .then((response) => extractResponse(response, 'file'));
    },

    getText: (url, contentType, creds, init) => {
        return wrapFetch('GET', url, contentType, 'text', creds, init)
        .then((response) => extractResponse(response, 'text'));
    },

    postText: (url, body, contentType, creds, init) => {
        return wrapFetch('GET', url, contentType, 'text', creds, init, body)
        .then((response) => extractResponse(response, 'text'));
    },

    patchText: (url, body, contentType, creds, init) => {
        return wrapFetch('GET', url, contentType, 'text', creds, init, body)
        .then((response) => extractResponse(response, 'text'));
    },
};

export default fetchex