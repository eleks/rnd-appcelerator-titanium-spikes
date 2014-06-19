function doClick(e) {
    alert($.label.text);
}

//$.index.open();

var isAndroid = false; if (Titanium.Platform.name == 'android') { isAndroid = true; }
 
//create new array
var arr = [];
 
//loop
for (var i = 0; i < 4; ++i)
{
	var myannotation = Ti.Map.createAnnotation({
		animate: false,  //it won't animate the pin
		title: "Pin " + i, // will be required if you need to detect a 'click' event
		subtitle: "My Subtitle",
		customView:Ti.UI.createImageView({ 
    				image:"annotation.png", 
    				width:60, 
    				height:60, 
    				borderRadius:30 
					})
// image: "annotation.png", // can be used to replace the default pin
// height: 40,
// width: 40
		});

switch (i)
{
case 0:
    myannotation.latitude = 37.47; //coordinates
	myannotation.longitude = -122.12; //coordinates

  	break;
case 1:
        myannotation.latitude = 37.42; //coordinates
	myannotation.longitude = -122.00; //coordinates
    break;
    case 2:
            myannotation.latitude = 37.37; //coordinates
	myannotation.longitude = -122.03; //coordinates
    break;
    case 3:
            myannotation.latitude = 37.31; //coordinates
	myannotation.longitude = -122.08; //coordinates
    break;
default:
    alert('none of the above');
    break;
}

	arr.push(myannotation);
    // alert(arr[i]);
}

$.map.annotations = arr;

// for (var i = 0; i < arr.length; ++i)
// {
	// $.map.addAnnotation(arr[i]);
// }

function getLocation(){
//Get the current position and set it to the mapview
Titanium.Geolocation.getCurrentPosition(function(e){
        var region={
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            animate:true,
            latitudeDelta:0.001,
            longitudeDelta:0.001
        };
        $.map.setLocation(region);
});
}
 

function randomXToY(minVal,maxVal)
{
	 var randVal = minVal+(Math.random()*(maxVal-minVal)); 
	return Math.round(randVal); 
}

var timerMod = require('ti.mely');
var timer = timerMod.createTimer();

 function showUpdate(d){
        // var msg = "interval changed - interval set to " + d.interval;
            // msg += " interval count = " + d.intervalCount;
        // Ti.API.info(msg);
        
        $.map.removeAllAnnotations();
        
        for (var i = 0; i < arr.length; ++i)
        {
        	try
			{
				var annotation = arr[i];
        		// $.map.mapview.removeAnnotation(annotation);
        		var random = randomXToY(-100, 100) / 10000;
        		annotation.latitude += random;
        	
        		random = randomXToY(-100, 100) / 10000;
        		annotation.longitude += random;
				$.map.addAnnotation(annotation);
			}//end try
			catch(E)
			{
				alert(E);
			}//end catch
        	
        	// randomize coords
        	
        	
        	
        	// $.map.addAnnotation(arr[i]);
        }
        
        // $.map.annotations = arr;
        // getLocation();
 }

    timer.addEventListener('onIntervalChange',showUpdate);
    
     timer.start({
        interval:2000,
        debug:true
    });

// if (!isAndroid) {
    // myannotation.pincolor = Titanium.Map.ANNOTATION_PURPLE;
// } else {
    // myannotation.pinImage = "../images/annotation.png";
// }


$.map.addEventListener('click', function(e)
{
	if(e.clicksource === 'pin')
	{
		Ti.API.info("The Pin at Latitude: " + e.annotation.latitude + " Longitude: " + e.annotation.longitude + " was clicked.");
	}
});