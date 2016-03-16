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
  function Lcd(config) {
    RED.nodes.createNode(this,config);
    var node = this;

    var l = require('jsupm_i2clcd');
    var myLcd = new l.Jhd1313m1(parseInt(config.port), 0x3E, 0x62);

    this.on('input', function(msg) {
      var line1 = msg.line1||config.line1;
      var line2 = msg.line2||config.line2;

      myLcd.setColor(parseInt(config.bgColorR), parseInt(config.bgColorG), parseInt(config.bgColorB));
      myLcd.setCursor(0, 0);
      myLcd.write(line1);
      myLcd.setCursor(1, 0);
      myLcd.write(line2);
    });
  }
  RED.nodes.registerType('lcd', Lcd);
}
