const logger = require('../../utils/logger')

class Command {
  constructor (name, description = 'No description provided', adminOnly = false) {
    if (!name) {
      throw new Error('Command required property "name" not specified')
    }

    // Hide the logger from JSON.stringify
    Object.defineProperty(this, 'logger', { value: 'static', writable: true })
    this.logger = logger

    this.name = name
    this.description = description
    this.adminOnly = adminOnly

    this.logger.debug('New Command() created: ' + this.name + ' (' + this.description + ')')
  }

  async call (isAdmin = false, message) {
    if (this.adminOnly && !isAdmin) {
      return 'You do not have access to this command.'
    }
    this.logger.debug('Calling command: ' + this.name)
  }
}

module.exports = Command
