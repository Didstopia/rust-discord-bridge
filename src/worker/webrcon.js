// Validate configuration
if (!process.env.WEBRCON_URL) {
  throw new Error('Missing "WEBRCON_URL" environment variable')
}

const WebSocket = require('uws')
const client = new WebSocket(process.env.WEBRCON_URL)

const onMessage = message => {
  console.log('Received: ' + message)
}

client.on('connection', websocket => {
  websocket.on('message', onMessage)
  websocket.send('Something')
})
