// Validate configuration
if (!process.env.DISCORD_BOT_TOKEN) {
  throw new Error('Missing "DISCORD_BOT_TOKEN" environment variable')
}

// Import the discord.js module
const Discord = require('discord.js')

// Create an instance of a Discord client
const client = new Discord.Client()

// The token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.DISCORD_BOT_TOKEN

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!')
  console.log(`Logged in as ${client.user.tag}!`)
})

// Create an event listener for messages
client.on('message', message => {
  // Ignore messages sent by the bot
  if (message.client.user.id === message.author.id) {
    console.log('Ignoring message from myself')
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
        console.log('Unknown command:', message.content)
      }
    } else {
      console.log('Unknown message:', message.content)
    }
  } else {
    console.log('Unknown channel:', message.channel)
  }
})

// Log our bot in
client.login(token)
