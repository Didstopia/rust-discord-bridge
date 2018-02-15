// Load environment variables from ".env"
require('dotenv').config()

const logger = require('./utils/logger')
const Discord = new (require('./service/discord'))(process.env.DISCORD_BOT_TOKEN, process.env.DISCORD_BOT_CHANNEL)
const Webrcon = new (require('./service/webrcon'))(process.env.WEBRCON_HOST, process.env.WEBRCON_PORT, process.env.WEBRCON_PASSWORD)

// TODO: Isn't most of this completely unnecessary,
//       and could be handled in the services directly?

// Setup Discord
Discord.on('ready', () => {
  logger.debug('Discord is ready')
})
Discord.on('command', (command, err) => {
  if (err) {
    logger.debug('Discord command error received: ' + err)

    // TODO: Send an error to the user
  } else {
    logger.debug('Discord command received: ' + command)

    // TODO: Process the command
  }
})
Discord.on('message', message => {
  logger.debug('Discord message received: ' + message)

  // TODO: Redirect the message to Rust
})

// Login to Discord
Discord.login()
.then(() => {
  logger.debug('Discord logged in')
})
.catch(err => {
  console.log(err)
})
