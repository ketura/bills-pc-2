if(window.DebugOutput) console.log("js/settings.js entry")

requirejs(['./common'], function (common) 
{
	requirejs(["jquery", "BaseTab", 'app/settings'], function($, BaseTab, settings)
	{
		if(window.DebugOutput) console.log("js/settings.js require")
		settings.Init();
		return settings;
	});
});