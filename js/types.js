requirejs(['./common'], function (common) {
    requirejs(["jquery", 'app/types'], function($, types)
    {
        types($);
        InitTypeTab();
    });
});