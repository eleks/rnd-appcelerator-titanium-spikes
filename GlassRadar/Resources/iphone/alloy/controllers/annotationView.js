function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "annotationView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.annotation = Ti.Map.createAnnotation({
        id: "annotation"
    });
    $.__views.annotation && $.addTopLevelView($.__views.annotation);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.annotation.title = args.title || "<no title>";
    $.annotation.latitude = args.latitude || 0;
    $.annotation.longitude = args.longitude || 0;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;