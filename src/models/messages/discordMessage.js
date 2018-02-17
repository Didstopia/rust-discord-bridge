const Message = require('./message')

class DiscordMessage extends Message {
  constructor (message) {
    super()

    // this.message = message

    this.userId = message.author.id
    this.userName = message.author.name

    this.channelId = message.channel.id
    this.channelName = message.channel.name

    this.content = message.content

    this.logger.debug('New DiscordMessage() created')
  }
}

module.exports = DiscordMessage
