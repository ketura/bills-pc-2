requirejs(['./common'], function (common) {
    requirejs(["jquery", "BaseTab", 'app/types'], function($, BaseTab, types)
    {
        console.log("types.js page");
        console.log(BaseTab);
        //types($);
        //InitTypeTab();
    });
});