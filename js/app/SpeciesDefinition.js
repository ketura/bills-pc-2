
function Species(name)
{
	this.Name = name;
	this.Version = 1;
	this.Notes = "";
	this.NationalPokedexNumber = 0;
	this.PokedexNumber = 0;
	this.Legendary = false;
	this.PokedexEntry = "";
	this.Types = {};
	this.BaseStats = {};
	

}



define(["jquery"], function($) 
{
    if(window.DebugOutput) console.log("js/app/BaseTab.js define")
    t = new BaseTab();
    t.$ = $;
    return t;
});