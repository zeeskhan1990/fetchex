# Fetcher API

## Examples

**GET** something:

```javascript
Fetcher.get('/something.json').then(success).catch(failure);
```

**GET** something else with same-origin credentials:

```javascript
Fetcher.get('/something-else.json', true).then(success).catch(failure);
```

**GET** something with headers

```javascript
Fetcher.get('/something', {
  headers: {
    'Accept': 'application/json',
    'X-Request-With': 'fetch'
  }
});
```
**POST/PATCH** some JSON data:

```javascript
Fetcher.post('/something.json', JSON.stringify({ user: {name: 'Simon' }), 'json');
```

Or **PATCH/POST** regular form data:

```javascript
Fetcher.patch('/something.json', 'user[name]=Simon', 'form');
```

**POST/PATCH** some other body type with same origin credentials:

```javascript
Fetcher.post('/something.json', btoa('hello'), 'application/base64', true);
```

**POST/PATCH** buffers:

```javascript
const arrayBuffer = new ArrayBuffer(128);
const view   = new Int32Array(buffer);

for (let i = 0; i < view.length; i++)
  view[i] = Math.pow(i, 2);

Fetcher.patch('/something.json', buffer, 'application/octet-stream');
```