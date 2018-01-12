if(window.DebugOutput) console.log("js/app/BaseTab.js entry")

function BaseTab($)
{
    this.$ = $;
    this.Data = null;
    this.DataPath = "";
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


BaseTab.prototype.UpdateData = function(data) 
{
    this.Data = data;
};

BaseTab.prototype.PopulateData = function(data) {};


define(["jquery", "app/data/RenegadeData"], function($, RenegadeData) 
{
    if(window.DebugOutput) console.log("js/app/BaseTab.js define")

    t = new BaseTab();
    t.$ = $;

    BaseTab.prototype.LoadData = function() 
    {
        let self = this;
        RenegadeData.GetData(this.DataPath, function(data){
            self.UpdateData(data);
            self.PopulateData();
        });
    };

    BaseTab.prototype.SaveData = function()
    {
        RenegadeData.SetData(this.DataPath, this.Data);
    };
    
    BaseTab.prototype.ClearData = function()
    {
        RenegadeData.ClearData(this.DataPath);
    };

    return t;
});