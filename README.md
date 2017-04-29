# Fetchex API

## Examples

**GET** something:

```javascript
Fetchex.get('/something.json').then(success).catch(failure);
```

**GET** something else with same-origin credentials:

```javascript
Fetchex.get('/something-else.json', true).then(success).catch(failure);
```

**GET** something with headers

```javascript
Fetchex.get('/something', {
  headers: {
    'Accept': 'application/json',
    'X-Request-With': 'fetch'
  }
});
```
**POST/PATCH** some JSON data:

```javascript
Fetchex.post('/something.json', JSON.stringify({ user: {name: 'Simon' }), 'json');
```

Or **PATCH/POST** regular form data:

```javascript
Fetchex.patch('/something.json', 'user[name]=Simon', 'form');
```

**POST/PATCH** some other body type with same origin credentials:

```javascript
Fetchex.post('/something.json', btoa('hello'), 'application/base64', true);
```

**POST/PATCH** buffers:

```javascript
const arrayBuffer = new ArrayBuffer(128);
const view   = new Int32Array(buffer);

for (let i = 0; i < view.length; i++)
  view[i] = Math.pow(i, 2);

Fetchex.patch('/something.json', buffer, 'application/octet-stream');
```