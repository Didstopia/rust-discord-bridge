const logger = require('../../utils/logger')

class Message {
  constructor () {
    // Hide the logger from JSON.stringify
    Object.defineProperty(this, 'logger', { value: 'static', writable: true })
    this.logger = logger

    this.logger.debug('New Message() created')
  }
}

module.exports = Message
