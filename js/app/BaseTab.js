console.log("js/app/BaseTab.js entry")

function Tab()
{
    
    this.$ = null;
    this.AssignEvents = function() {};
    this.DestroyControls = function() {};
    this.BuildControls = function() {};
    this.RebuildControls = function() 
    {
        this.DestroyControls();
        this.BuildControls();
    };

    this.Init = function() 
    {
        console.log("tab init");
        this.BuildControls();
        this.AssignEvents();
    };
}

define(["jquery"], function($) 
{
    console.log("js/app/BaseTab.js define")
    t = new Tab();
    t.$ = $;
    return t;
});