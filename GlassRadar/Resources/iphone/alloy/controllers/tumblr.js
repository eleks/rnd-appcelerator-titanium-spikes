function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tumblr";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var exports = exports || this;
    exports.Tumblr = function() {
        function createAuthWindow() {
            var self = this, oauth = this.oauthClient, webViewWindow = Ti.UI.createWindow({
                title: this.windowTitle
            }), webView = Ti.UI.createWebView(), loadingOverlay = Ti.UI.createView({
                backgroundColor: "black",
                opacity: .7,
                zIndex: 1
            }), actInd = Titanium.UI.createActivityIndicator({
                height: 50,
                width: 10,
                message: "Loading...",
                color: "white"
            }), closeButton = Ti.UI.createButton({
                title: this.windowClose
            }), backButton = Ti.UI.createButton({
                title: this.windowBack
            });
            this.webView = webView;
            webViewWindow.leftNavButton = closeButton;
            actInd.show();
            loadingOverlay.add(actInd);
            webViewWindow.add(loadingOverlay);
            webViewWindow.open({
                modal: true
            });
            webViewWindow.add(webView);
            closeButton.addEventListener("click", function() {
                webViewWindow.close();
                self.fireEvent("cancel", {
                    success: false,
                    error: "The user cancelled.",
                    result: null
                });
            });
            backButton.addEventListener("click", function() {
                webView.goBack();
            });
            webView.addEventListener("beforeload", function() {
                isAndroid || webViewWindow.add(loadingOverlay);
                actInd.show();
            });
            webView.addEventListener("load", function(event) {
                if (-1 === event.url.indexOf(self.authorizeUrl)) {
                    webViewWindow.remove(loadingOverlay);
                    actInd.hide();
                    webViewWindow.leftNavButton !== backButton && (webViewWindow.leftNavButton = backButton);
                    if (-1 !== event.url.indexOf("oauth_verifier")) {
                        isAndroid || webViewWindow.close();
                        var verifier = oauth.parseTokenRequest({
                            text: event.url.split("?")[1]
                        }, void 0);
                        oauth.post("http://www.tumblr.com/oauth/access_token", verifier, function(e) {
                            var token = oauth.parseTokenRequest(e, e.responseHeaders["Content-Type"] || void 0);
                            oauth.setAccessToken([ token.oauth_token, token.oauth_token_secret ]);
                            self.fireEvent("login", {
                                success: true,
                                error: false,
                                accessTokenKey: oauth.getAccessTokenKey(),
                                accessTokenSecret: oauth.getAccessTokenSecret()
                            });
                            self.authorized = true;
                            isAndroid && webViewWindow.close();
                        }, function() {
                            self.fireEvent("login", {
                                success: false,
                                error: "Failure to fetch access token, please try again.",
                                result: data
                            });
                        });
                    }
                } else {
                    webViewWindow.remove(loadingOverlay);
                    actInd.hide();
                    webViewWindow.leftNavButton !== closeButton && (webViewWindow.leftNavButton = closeButton);
                }
            });
        }
        var K = function() {}, isAndroid = "android" === Ti.Platform.osname, jsOAuth = require("jsOAuth-1.3.3");
        var Tumblr = function(options) {
            var self;
            self = this instanceof Tumblr ? this : new K();
            options || (options = {});
            self.windowTitle = options.windowTitle || "Tumblr Authorization";
            self.windowClose = options.windowClose || "Close";
            self.windowBack = options.windowBack || "Back";
            self.consumerKey = options.consumerKey;
            self.consumerSecret = options.consumerSecret;
            self.authorizeUrl = "http://www.tumblr.com/oauth/authorize";
            self.accessTokenKey = options.accessTokenKey;
            self.accessTokenSecret = options.accessTokenSecret;
            self.authorized = false;
            self.listeners = {};
            self.accessTokenKey && self.accessTokenSecret && (self.authorized = true);
            options.requestTokenUrl = options.requestTokenUrl || "http://www.tumblr.com/oauth/request_token";
            self.oauthClient = jsOAuth.OAuth(options);
            return self;
        };
        K.prototype = Tumblr.prototype;
        Tumblr.prototype.authorize = function() {
            var self = this;
            if (this.authorized) setTimeout(function() {
                self.fireEvent("login", {
                    success: true,
                    error: false,
                    accessTokenKey: self.accessTokenKey,
                    accessTokenSecret: self.accessTokenSecret
                });
            }, 1); else {
                createAuthWindow.call(this);
                this.oauthClient.setAccessToken("", "");
                this.oauthClient.post(this.oauthClient.requestTokenUrl, {}, function(e) {
                    var token = self.oauthClient.parseTokenRequest(e, e.responseHeaders["Content-Type"] || void 0);
                    self.oauthClient.setAccessToken([ token.oauth_token, token.oauth_token_secret ]);
                    self.webView.url = self.authorizeUrl + "?" + e.text;
                }, function(e) {
                    self.fireEvent("login", {
                        success: false,
                        error: "Failure to fetch access token, please try again.",
                        result: e
                    });
                });
            }
        };
        Tumblr.prototype.request = function(path, params, headers, httpVerb, callback) {
            var url, self = this, oauth = this.oauthClient;
            url = path.match(/^https?:\/\/.+/i) ? path : "http://api.tumblr.com/" + path;
            oauth.request({
                method: httpVerb,
                url: url,
                data: params,
                headers: headers,
                success: function(data) {
                    callback.call(self, {
                        success: true,
                        error: false,
                        result: data
                    });
                },
                failure: function(data) {
                    callback.call(self, {
                        success: false,
                        error: "Request failed",
                        result: data
                    });
                }
            });
        };
        Tumblr.prototype.logout = function(callback) {
            this.oauthClient.setAccessToken("", "");
            this.accessTokenKey = null;
            this.accessTokenSecret = null;
            this.authorized = false;
            callback();
        };
        Tumblr.prototype.addEventListener = function(eventName, callback) {
            this.listeners = this.listeners || {};
            this.listeners[eventName] = this.listeners[eventName] || [];
            this.listeners[eventName].push(callback);
        };
        Tumblr.prototype.fireEvent = function(eventName, data) {
            var eventListeners = this.listeners[eventName] || [];
            for (var i = 0; eventListeners.length > i; i++) eventListeners[i].call(this, data);
        };
        return Tumblr;
    }(this);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;