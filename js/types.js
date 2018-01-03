requirejs(['./common'], function (common) {
    requirejs(["jquery", "BaseTab", 'app/types'], function($, BaseTab, types)
    {
        console.log("types.js page");
        console.log(types);
        return types;
        //types($);
        //InitTypeTab();
    });
});