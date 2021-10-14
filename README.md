# req queue
 NodeJs + Request.js based request queue


## Installation

```
npm i request-queue
```

## Usage

```js
const RequestQueue = require('req-queue')

const reqQ = new RequestQueue(2000, true) // init queue with 2 sec delay on each request and debug on

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

```md
2021-10-14T09:46:14.639Z [Add]: 	Adding new request [GET https://jsonplaceholder.typicode.com/todos/1]
2021-10-14T09:46:14.643Z [Check]: 	Routine offline, starting...
2021-10-14T09:46:14.643Z [Add]: 	Adding new request [GET https://jsonplaceholder.typicode.com/todos/1]
2021-10-14T09:46:16.647Z [Interval]: 	New interval check
2021-10-14T09:46:16.647Z [Send]: 	Sending GET https://jsonplaceholder.typicode.com/todos/1
2021-10-14T09:46:18.651Z [Interval]: 	New interval check
2021-10-14T09:46:18.651Z [Send]: 	Sending GET https://jsonplaceholder.typicode.com/todos/1
2021-10-14T09:46:18.653Z [Clear]: 	Queue empty, stopping routine
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```