const Service = require('./service')
const Commands = require('../models/commands')
const DiscordJS = require('discord.js')
const DiscordMessage = require('../models/messages/discordMessage')

class Discord extends Service {
  constructor (token, channel) {
    super()

    this.logger.debug('Discord client created')

    if (!token) {
      throw new Error('Missing Discord bot token')
    }

    this.token = token
    this.client = new DiscordJS.Client()

    let self = this
    this.client.on('ready', () => {
      self.emit('ready')
    })
    this.client.on('message', message => {
      // FIXME: We also need to ignore messages sent by OTHER bots!

      let discordMessage = new DiscordMessage(message)

      // Ignore messages sent by the bot
      if (message.client.user.id === message.author.id) {
        self.logger.debug('Ignoring my own message: ' + message.content)
        return
      }

      // Bind to a specific channel (if configured)
      if (!self.channel || self.channel === message.channel.name) {
        // Handle commands
        if (message.content.startsWith('!')) {
          // Get the command name, stripping any whitespaces away
          let commandHasSpaces = message.content.indexOf(' ')
          let commandName = message.content.substring(0, commandHasSpaces !== -1 ? commandHasSpaces : message.content.length)

          // Parse the command itself
          let command
          for (let i in Commands) {
            let c = Commands[i]
            if (!command && c.name === commandName) {
              command = c
            }
          }

          // Return the command or an error if no command was found
          self.emit('command', command, !command ? new Error(`Command "${commandName}" not found!`) : undefined)
        }

        // Handle other messages
        else {
          self.emit('message', discordMessage)
        }
      }
    })
  }

  async login () {
    this.logger.debug('Logging in to Discord..')
    return this.client.login(this.token)
  }

  async send (message) {
    this.logger.debug('Sending message to Discord:', message)

    // TODO: Figure out how to send the message
  }
}

module.exports = Discord

/*
// Load our commands
const Commands = require('../models/commands')

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`)

  Commands.PingCommand.call()
})

// Create an event listener for messages
client.on('message', message => {
  // Ignore messages sent by the bot
  if (message.client.user.id === message.author.id) {
    logger.debug('Ignoring message from myself')
    return
  }

  // If the channel is "botchat"
  if (message.channel.name === 'botchat') {
    // If the message is a "!" command
    if (message.content.startsWith('!')) {
      // Ping the user with each command response
      let pingUser = '<@' + message.author.id + '>'
      // If the message is "ping"
      if (message.content.toLocaleLowerCase() === '!ping') {
        // Send "pong" to the same channel
        let messageTimestamp = message.createdTimestamp
        let currentTimestamp = new Date().getTime()
        let timestampDifference = currentTimestamp - messageTimestamp
        message.channel.send(pingUser + ', ' + '***PONG!*** (~' + timestampDifference + 'ms)')
      } else {
        logger.debug('Unknown command:', message.content)
      }
    } else {
      logger.debug('Unknown message:', message.content)
    }
  } else {
    logger.debug('Unknown channel:', message.channel)
  }
})

// Log our bot in
client.login(token)
*/
