const Service = require('./service')

const WebSocket = require('uws')

class Webrcon extends Service {
  constructor (host, port, password) {
    super()

    this.logger.debug('Webrcon client created')

    this.client = new WebSocket(`ws://${host || 'localhost'}:${port}:28016/${password}`)

    let self = this
    this.client.on('connection', websocket => self.emit('ready'))
    this.client.on('message', message => self.emit('message', message))
  }
}

module.exports = Webrcon

/*
const client =

const onMessage = message => {
  logger.debug('Received a message: ' + message)
}

client.on('connection', websocket => {
  logger.debug('Connection established')
  websocket.on('message', onMessage)
  websocket.send('Something')
})
*/
