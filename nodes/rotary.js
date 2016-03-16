/*
***************************************************************************
# Copyright 2016 IBM
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#***************************************************************************
*/

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
