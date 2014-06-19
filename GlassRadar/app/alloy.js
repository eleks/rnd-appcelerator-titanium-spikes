// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// always use the module on android
if (OS_ANDROID) {
	Ti.Map = require('ti.map');

// use the module on iOS with TiSDK 3.2.0+
} else if (OS_IOS) {
	var parts = Ti.version.split('.'),
		major = parseInt(parts[0], 10),
		minor = parseInt(parts[1], 10);

	if (major > 3 || (major === 3 && minor >= 2)) {
		Ti.Map = require('ti.map');
	}
}
