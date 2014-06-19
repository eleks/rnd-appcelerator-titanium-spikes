function Controller() {
    function loadData() {
        reloading = true;
        var url = "http://api.tumblr.com/v2/tagged?tag=lol&api_key=6rtN15kaXJIJpAdGcAPGbH7p8lpLnGeqr8Sap5OxJda9F4eLDu&offset=" + offset;
        var json;
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                reloading = false;
                Ti.API.info("Received text: " + this.responseText);
                json = JSON.parse(this.responseText);
                Ti.API.info("Received blog: " + JSON.stringify(json.response));
                for (var i = 0; json.response.length > i; ++i) {
                    var blog = json.response[i];
                    if (blog && blog.photos && blog.photos[0].original_size && blog.photos[0].original_size.url) {
                        var image = Ti.UI.createImageView({
                            width: 270,
                            height: 100,
                            image: " "
                        });
                        image.setImage(blog.photos[0].original_size.url);
                        var row = Alloy.createController("tumblrRow", {
                            icon: image.image,
                            title: JSON.stringify(blog.caption)
                        }).getView();
                        rows.push(row);
                    }
                }
                $.table.setData(rows);
            },
            onerror: function(e) {
                reloading = false;
                Ti.API.debug("STATUS: " + this.status);
                Ti.API.debug("TEXT:   " + this.responseText);
                Ti.API.debug("ERROR:  " + e.error);
                alert("There was an error retrieving the remote data. Try again.");
            },
            timeout: 5e3
        });
        xhr.open("GET", url);
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "view3";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view3 = Ti.UI.createView({
        id: "view3"
    });
    $.__views.view3 && $.addTopLevelView($.__views.view3);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.view3.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var reloading = false;
    var rows = [];
    var offset = 0;
    loadData();
    var lastDistance = 0;
    $.table.addEventListener("scroll", function(e) {
        var offset = e.contentOffset.y;
        var height = e.size.height;
        var total = offset + height;
        var theEnd = e.contentSize.height;
        var distance = theEnd - total;
        if (lastDistance > distance) {
            var nearEnd = .75 * theEnd;
            if (!reloading && total >= nearEnd) {
                offset += 1;
                loadData();
            }
        }
        lastDistance = distance;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;