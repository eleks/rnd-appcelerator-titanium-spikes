function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tumblrRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tumblrRow = Ti.UI.createTableViewRow({
        height: "80dp",
        hasChild: true,
        id: "tumblrRow"
    });
    $.__views.tumblrRow && $.addTopLevelView($.__views.tumblrRow);
    $.__views.icon = Ti.UI.createImageView({
        left: 0,
        top: 5,
        height: 70,
        width: 70,
        id: "icon"
    });
    $.__views.tumblrRow.add($.__views.icon);
    $.__views.title = require("ti.styledlabel").createLabel({
        left: 80,
        top: 0,
        height: 80,
        width: 200,
        ns: "require('ti.styledlabel')",
        id: "title"
    });
    $.__views.tumblrRow.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.icon.image = args.icon;
    $.icon.borderRadius = 36;
    $.title.html = args.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;