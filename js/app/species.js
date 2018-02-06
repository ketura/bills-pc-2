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

    SpeciesTab.prototype.AssignEvents = function()
    {
        if(window.DebugOutput) console.log("species AssignEvents")
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
        if(window.DebugOutput) console.log("species BuildControls")
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
        if(window.DebugOutput) console.log("species PopulateData")

        $('#txt-pokedex-number').val(tab.Data.NationalPokedexNumber);
        $('#txt-canon-pokedex-number').val(tab.Data.CanonPokedexNumber);
        $('#chk-Legendary').prop('checked', tab.Data.Legendary);
        $('#txt-pokedex-entry').val(tab.Data.PokedexEntry);

        $('input[type="checkbox"]').trigger("change");
    };

    SpeciesTab.prototype.UpdateData = function(data)
    {
        if(window.DebugOutput) console.log("species UpdateData")
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