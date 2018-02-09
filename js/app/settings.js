if(window.DebugOutput) console.log("js/app/settings.js entry")

define(["jquery", "app/data/RenegadeData", "app/BaseTab", "jquery-ui"], function($, RenegadeData) 
{
	function SettingsTab()
	{
		BaseTab.call(this, $);

		this.Species = [];
		this.DataPath = "SettingsTab";
	}

	SettingsTab.prototype = Object.create(BaseTab.prototype);
	SettingsTab.prototype.contructor = SettingsTab;

	if(window.DebugOutput) console.log("js/app/settings.js define")
	let tab = new SettingsTab();

	tab.Species = [];


	//The $(callback) function is basically something which runs after the entire document has been loaded.
	$(function () {
		console.log("settings load");
		if(window.DebugOutput) console.log("js/app/settings.js actual")
		tab.LoadData();
		//tab.Init();
	});

	SettingsTab.prototype.AssignEvents = function()
	{

	};

	SettingsTab.prototype.DestroyControls = function()
	{

	};

	SettingsTab.prototype.BuildControls = function () 
	{
		console.log("building");
		console.log($('input[type="checkbox"]'));
		//Accordion layout outlined here: https://stackoverflow.com/a/13315683/888539
		$(".accordion").accordion({
			collapsible: true,
			active: 0,
			heightStyle: "content",
			animate: 300
		})

		$('input[type="checkbox"]').checkboxradio();

	};

	SettingsTab.prototype.PopulateData = function()
	{
		console.log("PopulateData");
		console.log($('#chk-Legendary').checkboxradio());

		$('#txt-pokedex-number').val(tab.Data.NationalPokedexNumber);
		$('#txt-canon-pokedex-number').val(tab.Data.CanonPokedexNumber);
		$('#chk-Legendary').prop('checked', tab.Data.Legendary);
		$('#txt-pokedex-entry').val(tab.Data.PokedexEntry);

		$('input[type="checkbox"]').trigger("change");

	};

	SettingsTab.prototype.UpdateData = function(data)
	{
		if(typeof(data) !== 'undefined' && data !== null)
		{
			tab.Data = data;
			return;
		}
		
		if(tab.Data === null)
		{
			tab.Data = new SpeciesDef();
		}
		tab.Data.NationalPokedexNumber = $('#txt-pokedex-number').val() || 0;
		tab.Data.CanonPokedexNumber = $('#txt-canon-pokedex-number').val() || 0;
		tab.Data.Legendary = $('#chk-Legendary').prop('checked') || false;
		tab.Data.PokedexEntry = $('#txt-pokedex-entry').val() || "";
	};

	return tab;
});  