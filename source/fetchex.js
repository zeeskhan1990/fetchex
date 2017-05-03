import 'es6-promise/auto';
import 'isomorphic-fetch';

const types = {
    json: 'application/json',
    formData: 'application/x-www-form-urlencoded',
    text: 'text/plain'
};

const wrapFetch = (method, url, accept='json', contentType='json', init, body) => {

    init = init || {};
    init.method = method;
    init.headers = init.headers || {};
    init.headers['Accept'] = types[accept] || accept;
    init.headers['Content-Type'] = types[contentType] || contentType;
    if (typeof body !== 'undefined')
        init.body = body;
    const fetchPromise = fetch(url, init);
    if (types.hasOwnProperty(accept))
        return fetchPromise.then((response) => extractResponse(response, accept));
    else
        return fetchPromise;
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

    get:(url,accept, contentType, init) => {
        return wrapFetch('GET', url, accept, contentType, init)
    },

    post:(url, body, accept, contentType, init) => {
        return wrapFetch('POST', url, accept, contentType, init, body);
    },

    patch:(url, body, accept, contentType, init) => {
        return wrapFetch('PATCH', url, accept, contentType, init, body);
    },

    put:(url, body, accept, contentType, init) => {
        return wrapFetch('PUT', url, accept, contentType, init, body);
    },

    delete:(url, body, accept, contentType, init) => {
        return wrapFetch('DELETE', url, accept, contentType, init, body);
    }
};

export default fetchex