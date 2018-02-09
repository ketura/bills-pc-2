if(window.DebugOutput) console.log("js/species.js entry")

requirejs(['./common'], function (common) 
{
	requirejs(["jquery", "BaseTab", 'app/species'], function($, BaseTab, species)
	{
		if(window.DebugOutput) console.log("js/species.js require")
		species.Init();
		return species;
	});
});