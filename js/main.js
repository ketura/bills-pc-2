window.DebugOutput = true;

if(window.DebugOutput) console.log("js/main.js entry")

requirejs(['./common'], function (common) 
{
	if(window.DebugOutput) console.log("js/main.js require")
  requirejs(['app/main']);

});