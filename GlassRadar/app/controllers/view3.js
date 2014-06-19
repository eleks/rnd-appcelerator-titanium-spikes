

// var tumblr = require('tumblr').Tumblr({
        // consumerKey: '6rtN15kaXJIJpAdGcAPGbH7p8lpLnGeqr8Sap5OxJda9F4eLDu',
        // consumerSecret: 'EwfwCRSFKyk2WBgJTtP71yIzIMs2b6y4RMypahOMPiE9Tdfqnu',
        // accessTokenKey: Ti.App.Properties.getString('tumblrAccessTokenKey', ''),
        // accessTokenSecret: Ti.App.Properties.getString('tumblrAccessTokenSecret', '')
    // });
//     
// var tumblrAuthorize = function (event) {
// tumblr.addEventListener('login', function (e) {
   // if (e.success) {
     // Ti.App.Properties.setString('tumblrAccessTokenKey', e.accessTokenKey);
     // Ti.App.Properties.setString('tumblrAccessTokenSecret', e.accessTokenSecret);
// 
	// tumblr.request('v2/tagged?tag=lol', {}, {}, 'POST', function (e) {
    // if (e.success) {
       // var json = JSON.parse(e.result.text);
       // Ti.API.info(json);
    // } else {
       // // error proc...
       // Ti.API.info('failed to get blog');
    // }
	// });
// 
// 
 		// } else {
         // // error proc…
        // Ti.API.info('failed to login ' + e.text);
     // }
   // });
// 
   // tumblr.authorize();
// };

var reloading = false;

var rows = [];
var offset = 0;    

function loadData () 
{

reloading = true;  

var url ="http://api.tumblr.com/v2/tagged?tag=lol&api_key=6rtN15kaXJIJpAdGcAPGbH7p8lpLnGeqr8Sap5OxJda9F4eLDu&offset=" + offset;
var json;

var xhr = Ti.Network.createHTTPClient({
onload: function() {
	reloading = false;
	Ti.API.info("Received text: " + this.responseText);
	json = JSON.parse(this.responseText); 
	
	Ti.API.info("Received blog: " + JSON.stringify(json.response));
	
	for (var i = 0; i < json.response.length; ++ i)
	{
		var blog = json.response[i];
		// Ti.API.info("Received blog: " + JSON.stringify(blog.caption));
		
		if (blog && blog.photos && blog.photos[0].original_size && blog.photos[0].original_size.url)
		{
			var image = Ti.UI.createImageView({
    	width: 270,
    	height: 100,
    	image: ' '
		});
		image.setImage(blog.photos[0].original_size.url);
		
		 var row = Alloy.createController('tumblrRow', {
			icon: image.image,
			title: JSON.stringify(blog.caption)
		 }).getView();
 
 // Ti.API.info("Row title: " + row.title.text); 
 
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
alert('There was an error retrieving the remote data. Try again.');
},
timeout:5000
});
xhr.open("GET", url);
xhr.send();

};

loadData();

var lastDistance = 0; // calculate location to determine direction

$.table.addEventListener('scroll',function(e)
{
    var offset = e.contentOffset.y;
    var height = e.size.height;
    var total = offset + height;
    var theEnd = e.contentSize.height;
    var distance = theEnd - total;
 
    // going down is the only time we dynamically load,
    // going up we can safely ignore -- note here that
    // the values will be negative so we do the opposite
    if (distance < lastDistance)
    {
        // adjust the % of rows scrolled before we decide to start fetching
        var nearEnd = theEnd * .75;
 
        if (!reloading && (total >= nearEnd))
        {
        	offset += 1;
            loadData();
        }
    }
    lastDistance = distance;
 
});    

// tumblrAuthorize();