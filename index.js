var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['B']);

// Clap --> pick up object -->  Doesn't take photo 
// No clap --? pick up object --> trigger camera

ambient.on('ready', function () {
 // Get points of light and sound data.
 var soundArr = [];
 var soundBool;
 var soundThresh = 0.04;
 var lightThresh = 0.03;
 setInterval( function () {
 	ambient.getSoundLevel( function(err, soundData) {
 		if (err) throw err;
 		soundArr.push(soundData);
 		if (soundArr.length > 10){
 			soundArr.shift();
 		}
 		soundBool = soundArr.reduce(function(prev, cur){
 			return prev || (cur > soundThresh);
 		}, false);
 		ambient.getLightLevel( function(err, lightData) {
 			if (err) throw err;
 			if (lightData.toFixed(8) > lightThresh){
 				if (!soundBool){
 					// Trigger the camera
 				}
 				console.log("BRIGHT", lightData.toFixed(8), "Sound info: Bool: ", soundBool, "Actual sound data: ", soundArr);
 			}
 			else {
 				console.log("IT's too dark", lightData.toFixed(8), "Sound info: Bool: ", soundBool, "Actual sound data: ", soundArr);
 			}
 		});
  })}, 500); 
});

ambient.on('error', function (err) {
	console.log(err)
});