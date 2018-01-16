if(window.DebugOutput) console.log("js/app/species.js entry")

define(["jquery", "PokeAPI", "app/data/SpeciesDefinition", "app/data/RenegadeData", "app/BaseTab", "jquery-ui"], function($, PokeAPI, SpeciesDef, RenegadeData) 
{
    function SpeciesTab()
    {
        BaseTab.call(this, $);

        this.Species = [];
        this.DataPath = "SpeciesTab";
    }

    SpeciesTab.prototype = Object.create(BaseTab.prototype);
    SpeciesTab.prototype.contructor = SpeciesTab;

    if(window.DebugOutput) console.log("js/app/species.js define")
    let tab = new SpeciesTab();

    tab.Species = [];

    //The $(callback) function is basically something which runs after the entire document has been loaded.
    $(function () {
        
        if(window.DebugOutput) console.log("js/app/species.js actual")
        console.log("species load");
        console.log($);
        tab.LoadData();
        //tab.Init();
    });

    SpeciesTab.prototype.AssignEvents = function()
    {
        // console.log("assigning");
        // console.log(tab);
        $('#btnSave').click(function()
        {
            console.log(tab);
            tab.UpdateData();
            tab.SaveData();
        });

        $('input').change(function(){
            tab.UpdateData();
        });
    };

    SpeciesTab.prototype.DestroyControls = function()
    {
        // var self = this;
        // // console.log("destroy");
        // // console.log(self);

        // self.typeDatatable.MakeCellsEditable("destroy");
        // self.typeDatatable.destroy();
        // $('#typeTable').empty();
    };

    SpeciesTab.prototype.BuildControls = function () 
    {
        //Accordion layout outlined here: https://stackoverflow.com/a/13315683/888539
        $(".accordion").accordion({
            collapsible: true,
            active: 0,
            heightStyle: "content",
            animate: 300
        })

        $('input[type="checkbox"]').checkboxradio();

    };

    SpeciesTab.prototype.PopulateData = function()
    {
        console.log("PopulateData");
        console.log($(document));
        console.log($('#chk-Legendary').checkboxradio());
        console.log($('#txt-pokedex-number'));
        console.log(tab.Data);

        $('#txt-pokedex-number').val(tab.Data.NationalPokedexNumber);
        $('#txt-canon-pokedex-number').val(tab.Data.CanonPokedexNumber);
        $('#chk-Legendary').prop('checked', tab.Data.Legendary);
        $('#txt-pokedex-entry').val(tab.Data.PokedexEntry);

        $('input[type="checkbox"]').trigger("change");
        console.log("populate should have finished");

    };

    SpeciesTab.prototype.UpdateData = function(data)
    {
        console.log("updating");
        console.log(data);
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