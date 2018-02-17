const Message = require('./message')

class WebrconMessage extends Message {
  constructor (args) {
    super(args)
    this.logger.debug('New WebrconMessage() created')
  }
}

module.exports = WebrconMessage
