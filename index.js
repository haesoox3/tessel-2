var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['B']);

ambient.on('ready', function () {

  setInterval(function(){
  	ambient.getLightLevel( function(err ,lightData){
  		if (err) throw err;
  		else if (lightData.toFixed(8) > .03){
  			console.log("BRIGHT", lightData.toFixed(8));
  		}
  		else {
  			console.log("IT's too dark", lightData.toFixed(8));
  		}
  	})
  }, 500);
});

ambient.on('error', function (err) {
  console.log(err);
});