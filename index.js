const request = require('request')
const chalk = require('chalk')

class RequestQueue {
    /**
     * Initialize Queue Object
     * @param {*} delay delay between requests (in ms)
     */
    constructor(delay, debug) {
        this.queue = []
        this.routineActive = false
        this.debug = debug || false

        this.changeDelay(delay)

        /* Helper function */
        this.sleep = ms => new Promise(resolve => setTimeout(resolve), ms)
    }

    /**
     * Change delay between requests
     * @param {*} delay between requests in ms
     */
    changeDelay(delay) {
        this.delay = typeof parseInt(delay) == 'number' && parseInt(delay) >= 0 ? parseInt(delay) : 1000
    }
    
    /**
     * Adds element to queue 
     * and starts routine if queue is empty
     * @param {{request: Object, callback: Function}} data data object for queue
     */
    add(data) {
        this.debugLog('Add', `Adding new request [${data.request.method || 'GET'} ${data.request.url}]`)

        this.queue.push(data)

        if(!this.routineActive) {
            this.debugLog('Check', 'Routine offline, starting...')
            this.execute()
        }
    }

    /**
     * Checks whether current queue has items
     * @returns true / false
     */
    hasQueueElements() {
        return this.queue.lengh > 0
    }

    /**
     * Executes routine until no element is left
     */
    execute() {
        this.routineActive = true

        this.sint = setInterval(() => {
            this.debugLog('Interval', 'New interval check')
            this.send(this.queue.shift())

            if(this.queue.length < 1) {
                clearInterval(this.sint)
                this.routineActive = false
                this.debugLog('Clear', 'Queue empty, stopping routine')
            }
        }, this.delay);
    }

    /**
     * Sends Data
     * @param {{request: Object, callback: Function}} data 
     */
    send(data) {
        this.debugLog('Send', `Sending ${data.request.method || 'GET'} ${data.request.url}`)
        request(data.request, (err, req, body) => {
            if(data.callback)
                data.callback(err, req, body)
        })
    }

    /**
     * Console logs steps for debug purposes
     * @param {*} data 
     */
    debugLog(step, data) {
        if(this.debug)
            console.log(`${new Date().toISOString()} [${chalk.green(step)}]: \t${chalk.cyan(data)}`)
    }
}

module.exports = RequestQueue