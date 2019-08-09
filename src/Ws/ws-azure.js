const WebSocket = require('hyco-ws')

class WsAzure {
  constructor (config) {
    this.config = config.azure
    this.wss = null
  }

  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {String} options.host The hostname where to bind the server
   * @param {Number} options.port The port where to bind the server
   * @param {http.Server} options.server A pre-created HTTP/S server to use
   * @param {Function} options.verifyClient An hook to reject connections
   * @param {Function} options.handleProtocols An hook to handle protocols
   * @param {String} options.path Accept only connections matching this path
   * @param {Boolean} options.noServer Enable no server mode
   * @param {Boolean} options.clientTracking Specifies whether or not to track clients
   * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
   * @param {Number} options.maxPayload The maximum allowed message size
   * @param {Function} callback A listener for the `listening` event
   */
  Server (options, callback) {
    const uri = WebSocket.createRelayListenUri(this.config.ns, this.config.path)
    this.wss = WebSocket.createRelayedServer({
      server: uri,
      token: () => WebSocket.createRelayToken(uri, this.config.keyrule, this.config.key)
    }, ws => {
      callback && callback(ws)

      /* ws.onmessage = function (event) {
        console.log('onmessage: ' + event.data)
      }

      ws.on('close', function () {
        console.log('connection closed')
      }) */
    })

    /* this.wss.on('error', err => {
      console.log('error', err)
    }) */

    return this
  }

  on (name, listener) {
    this.wss.on(name, listener)
  }

  close () {
    this.wss.close()
  }
}

module.exports = WsAzure
