module.exports = function(RED) {
  function Led(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    var upmled = require('jsupm_grove');
    var on = false;
    var myled = new upmled.GroveLed(parseInt(config.port));

    this.on('input', function(msg) {
      var operation = msg.operation||config.operation;
      on = operation == 'toggle' ? !on : (operation == 'on');

      if(on) {
        myled.on();
      } else {
        myled.off();
      }

    });
  }
  RED.nodes.registerType('led', Led);
}
