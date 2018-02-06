
function Species(name)
{
	this.Name = name || "";
	this.Version = 1;
	this.Notes = "";
	this.NationalPokedexNumber = 0;
	this.CanonPokedexNumber = 0;
	this.Legendary = false;
	this.PokedexEntry = "";
	this.Types = {};
	this.BaseStats = {};
	this.StatVariance = {};
	this.Gender = "";
	this.GendermaleSpread = 0.5;
	this.Dimorphism = {
		Male: {},
		Female: {}
	};
	this.EvolvesFrom = "";
	this.EvolvesInto = {};

}



define(["jquery"], function($) 
{
    if(window.DebugOutput) console.log("js/app/SpeciesDefinition.js define")
    return Species;
});