var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var parts = Ti.version.split("."), major = parseInt(parts[0], 10), minor = parseInt(parts[1], 10);

(major > 3 || 3 === major && minor >= 2) && (Ti.Map = require("ti.map"));

Alloy.createController("index");