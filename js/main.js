console.log("js/main.js entry")

requirejs(['./common'], function (common) 
{
	console.log("js/main.js require")
  requirejs(['app/main']);

});