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
        this.BuildControls();
        this.AssignEvents();
    };
}

define(["jquery"], function($) 
{
    console.log("new BaseTab");
    t = new Tab();
    t.$ = $;
    return t;
});