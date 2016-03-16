module.exports = function(RED) {
  function Touch(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    var lastValue = 0;
    var mraa_touch = require('mraa');
    var touch = new mraa_touch.Gpio(parseInt(config.port));
    touch.dir(mraa_touch.DIR_IN);

    var interval = setInterval(function() {
      if(touch.read() != lastValue) {
        lastValue = touch.read();

        if((lastValue == 1 && config.on == 'down') ||
           (lastValue == 0 && config.on == 'up')) {
          node.send({payload: config.payload});
        }
      }
    }, 50);

    this.on('close', function() {
      clearInterval(interval);
    });
  }
  RED.nodes.registerType('touch', Touch);
}
