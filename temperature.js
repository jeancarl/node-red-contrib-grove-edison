module.exports = function(RED) {
  function Temperature(config) {
    RED.nodes.createNode(this,config);
    var node = this;

    var groveSensor = require('jsupm_grove');
    var temp = new groveSensor.GroveTemp(parseInt(config.port));

    this.on('input', function(msg) {
      var unit = msg.unit||config.unit;
      var celsius = temp.value();

      msg = {};

      if(unit == 'fahrenheit' || unit == 'all') {
        msg.fahrenheit = Math.round(celsius * 9.0/5.0 + 32.0);
      }

      if(unit == 'celsius' || unit == 'all') {
        msg.celsius = celsius;
      }

      node.send(msg);
    });
  }
  RED.nodes.registerType('temperature', Temperature);
}
