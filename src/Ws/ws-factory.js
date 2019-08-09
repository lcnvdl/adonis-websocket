module.exports = {
  get (config) {
    if (config.implementation === 'ws') {
      return require('ws')
    }
    else {
      return new (require('./ws-azure'))(config)
    }
  }
}
