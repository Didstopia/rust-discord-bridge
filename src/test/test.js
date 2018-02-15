const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect

// require('../')

describe('Outer Test Group', () => {
  describe('Inner Test Group', () => {
    it('Expect 1 to be greater than 0', (done) => {
      try {
        expect(1).to.be.greaterThan(0)
        done()
      } catch (err) {
        done(err)
      }
    })
    it('Expect 1 + 1 to equal to 2', (done) => {
      try {
        expect(1 + 1).to.equal(2)
        done()
      } catch (err) {
        done(err)
      }
    })
  })
})
