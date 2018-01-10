if(window.DebugOutput) console.log("js/app/BaseTab.js entry")

function BaseTab()
{
    this.$ = null;
}

BaseTab.prototype.AssignEvents = function() {};
BaseTab.prototype.DestroyControls = function() {};
BaseTab.prototype.BuildControls = function() {};
BaseTab.prototype.RebuildControls = function() 
{
    this.DestroyControls();
    this.BuildControls();
};

BaseTab.prototype.Init = function() 
{
    console.log("Tab type: " + this.constructor.name);
    if(window.DebugOutput) console.log("BaseTab init");
    this.BuildControls();
    this.AssignEvents();
};

define(["jquery"], function($) 
{
    if(window.DebugOutput) console.log("js/app/BaseTab.js define")
    t = new BaseTab();
    t.$ = $;
    return t;
});