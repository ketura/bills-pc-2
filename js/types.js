window.DebugOutput = true;

if(window.DebugOutput) console.log("js/types.js entry")

requirejs(['./common'], function (common) 
{
    if(window.DebugOutput) console.log("js/types.js outer require")
    return requirejs(["jquery", "BaseTab", 'app/types'], function($, BaseTab, types)
    {
        if(window.DebugOutput) console.log("js/types.js require")
        types.Init();
        return types;
    });
});