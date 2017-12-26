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

    this.Init = function(jq) 
    {
        this.$ = jq;
        this.RebuildControls();
        this.AssignEvents();
    };
}

define(["jquery"], function($) 
{
    return new Tab();
});