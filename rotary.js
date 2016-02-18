module.exports = function(RED) {
  function Rotary(config) {
    RED.nodes.createNode(this,config);
    var node = this;

    var port = config.port;
    var upm_grove = require('jsupm_grove');
    var groveRotary = new upm_grove.GroveRotary(0);

    this.on('input', function(msg) {
      msg = {};
      msg.value = groveRotary.abs_value();
      msg.deg = groveRotary.abs_deg();
      msg.rad = groveRotary.abs_rad();

      node.send(msg);
    });
  }
  RED.nodes.registerType('rotary', Rotary);
}
