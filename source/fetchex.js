
const types = {
    json: 'application/json',
    form: 'application/x-www-form-urlencoded'
};

const fetchWithBody = (method, input, body, type, creds, init) => {
    if (typeof(body) === 'undefined') throw 'body is required';
    if (typeof(body) === 'undefined') throw 'type is required';

    init = init || {};

    if (creds === true)
        init.credentials = 'same-origin';
    else if (typeof(creds) !== 'undefined')
        init.credentials = creds;

    init.method = method;
    init.body = body

    init.headers = init.headers || {};
    init.headers['Content-Type'] = types[type] || type;

    if (type == 'json')
        init.headers['Accept'] = init.headers['Accept'] || types[type];

    return fetch(input, init);
}

const fetchex = {
    fetch:(input, init) => {
        return fetch(input, init);
    },

    get:(input, creds, init) => {
        init = init || {};
        init.method = 'GET';

        if (creds === true)
            init.credentials = 'same-origin';
        else if (creds != undefined)
            init.credentials = creds;

        return fetch(input, init);
    },

    post:(input, body, type, creds, init) => {
        return fetchWithBody('POST', input, body, type, creds, init);
    },

    patch:(input, body, type, creds, init) => {
        return fetchWithBody('PATCH', input, body, type, creds, init);
    },
};

export default fetchex