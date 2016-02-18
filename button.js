module.exports = function(RED) {
  function Button(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    var upm_grove = require('jsupm_grove');
    var button = new upm_grove.GroveButton(parseInt(config.port));
    var currentButtonValue = 0;

    var interval = setInterval(function() {
      if(button.value() != currentButtonValue) {
        currentButtonValue = button.value();

        if((button.value() == 1 && config.on == 'down') ||
           (button.value() == 0 && config.on == 'up')) {
          node.send({payload: config.payload});
        }
      }
    }, 50);

    this.on('close', function() {
      clearInterval(interval);
    });
  }
  RED.nodes.registerType('button', Button);
}
