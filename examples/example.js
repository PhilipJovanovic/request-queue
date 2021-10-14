const RequestQueue = require('../index')

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