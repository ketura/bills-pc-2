console.log("js/types.js entry")

requirejs(['./common'], function (common) 
{
    requirejs(["jquery", "BaseTab", 'app/types'], function($, BaseTab, types)
    {
        console.log("js/types.js require")
        console.log(types);
        return types;
        //types($);
        //InitTypeTab();
    });
});