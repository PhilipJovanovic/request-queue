# request queue
 NodeJs + Request.js based request queue


## Installation

```
npm i request-queue
```

## Usage

```js
const RequestQueue = require('request-queue')

const reqQ = new RequestQueue(2000) // init queue with 2 sec delay on each request

reqQ.add({
    request: {
        url: 'https://jsonplaceholder.typicode.com/todos/1' 
    }
}) // executes request without response handling


function handleResponse(err, req, body) {
    console.log(body)
}

reqQ.add({
    request: {
        url: 'https://jsonplaceholder.typicode.com/todos/1' 
    },
    callback: handleResponse
}) // executes request with response handling via callback

```

## Output

```
Add Adding new request [GET https://jsonplaceholder.typicode.com/todos/1]
Check Routine offline, starting...
Add Adding new request [GET https://jsonplaceholder.typicode.com/todos/1]
Interval New interval check
Send Sending GET https://jsonplaceholder.typicode.com/todos/1
Interval New interval check
Send Sending GET https://jsonplaceholder.typicode.com/todos/1
Clear Queue empty, stopping routine
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```