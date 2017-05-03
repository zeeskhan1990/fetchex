# fetchex API

fetchex is a simple wrapper over the fetch api and is isomorphic, i.e, can be used in the browser as well as in the node environment.

  - Has easy reponse wrapper for json, texts and formData
  - Supports GET, POST, PUT, PATCH, DELETE requests
  - Also has a vanilla `fetch` method which does the same as the raw fetch API
  
## Syntax
For **GET** request type which does not have any request body:

```fetchex.get(url, accept, contentType, init)```

For other request types which may have a request body:

```fetchex.get(url, body, accept, contentType, init)```

Default value for **accept** and **contentType** is _json_.


## Examples

**GET** something:

```javascript
fetchex.get('/something.json').then(success).catch(failure);
```

**GET** something with headers

```javascript
fetchex.get('/something,json', 'json', 'json', {
  headers: {
    'Accept': 'application/json',
    'X-Request-With': 'fetch'
  }
});
```
**POST/PATCH** some JSON data:

```javascript
fetchex.post('/something.json', JSON.stringify({ user: {name: 'Simon' }));
```

Or **PATCH/POST** regular form data:

```javascript
fetchex.patch('/something.json', 'user[name]=Simon', 'json', 'form');
```

**POST/PATCH** some other body type:

Sending base64 string and expecting a plain text in response

```javascript
fetchex.post('/something.json', btoa('hello'), 'text', 'application/base64');
```

**POST/PATCH** buffers:

```javascript
const arrayBuffer = new ArrayBuffer(128);
const view   = new Int32Array(buffer);

for (let i = 0; i < view.length; i++)
  view[i] = Math.pow(i, 2);

fetchex.patch('/something.json', buffer, 'json', 'application/octet-stream');
```