function Controller() {
    function randomXToY(minVal, maxVal) {
        var randVal = minVal + Math.random() * (maxVal - minVal);
        return Math.round(randVal);
    }
    function showUpdate() {
        $.map.removeAllAnnotations();
        for (var i = 0; arr.length > i; ++i) try {
            var annotation = arr[i];
            var random = randomXToY(-100, 100) / 1e4;
            annotation.latitude += random;
            random = randomXToY(-100, 100) / 1e4;
            annotation.longitude += random;
            $.map.addAnnotation(annotation);
        } catch (E) {
            alert(E);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "view1";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view1 = Ti.UI.createView({
        id: "view1"
    });
    $.__views.view1 && $.addTopLevelView($.__views.view1);
    var __alloyId1 = [];
    $.__views.map = Ti.Map.createView({
        annotations: __alloyId1,
        ns: Ti.Map,
        id: "map"
    });
    $.__views.view1.add($.__views.map);
    $.__views.__alloyId2 = Alloy.createController("overlay", {
        id: "__alloyId2",
        __parentSymbol: $.__views.map
    });
    $.__views.__alloyId2.setParent($.__views.map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var arr = [];
    for (var i = 0; 4 > i; ++i) {
        var myannotation = Ti.Map.createAnnotation({
            animate: false,
            title: "Pin " + i,
            subtitle: "My Subtitle",
            customView: Ti.UI.createImageView({
                image: "annotation.png",
                width: 60,
                height: 60,
                borderRadius: 30
            })
        });
        switch (i) {
          case 0:
            myannotation.latitude = 37.47;
            myannotation.longitude = -122.12;
            break;

          case 1:
            myannotation.latitude = 37.42;
            myannotation.longitude = -122;
            break;

          case 2:
            myannotation.latitude = 37.37;
            myannotation.longitude = -122.03;
            break;

          case 3:
            myannotation.latitude = 37.31;
            myannotation.longitude = -122.08;
            break;

          default:
            alert("none of the above");
        }
        arr.push(myannotation);
    }
    $.map.annotations = arr;
    var timerMod = require("ti.mely");
    var timer = timerMod.createTimer();
    timer.addEventListener("onIntervalChange", showUpdate);
    timer.start({
        interval: 2e3,
        debug: true
    });
    $.map.addEventListener("click", function(e) {
        "pin" === e.clicksource && Ti.API.info("The Pin at Latitude: " + e.annotation.latitude + " Longitude: " + e.annotation.longitude + " was clicked.");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;