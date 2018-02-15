const Command = require('./command')

class PingCommand extends Command {
  constructor (args) {
    super(args)
    this.logger.debug('New PingCommand() created')
  }

  async call (args) {
    await super.call(args)
    this.logger.debug('PingCommand() called with args:', args)
  }
}

module.exports = new PingCommand('!ping', 'Test the latency by pinging the server')
