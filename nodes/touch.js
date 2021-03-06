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
