const logger = require('../utils/logger')
const EventEmitter = require('events')

class Service extends EventEmitter {
  constructor () {
    super()
    this.logger = logger
  }
}

module.exports = Service
