const fs = require('fs')

var commands = {}

// FIXME: Since this isn't synchronous, it may cause issues down the line
fs.readdir(__dirname, (err, files) => {
  if (err) {
    throw err
  }
  files.forEach(file => {
    if (file !== 'index.js' && file !== 'command.js') {
      let obj = require('./' + file)
      commands[obj.constructor.name] = obj
    }
  })
})

module.exports = commands
