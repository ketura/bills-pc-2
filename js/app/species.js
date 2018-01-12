if(window.DebugOutput) console.log("js/app/species.js entry")

define(["jquery", "PokeAPI", "app/data/SpeciesDefinition", "app/data/RenegadeData", "app/BaseTab", "jquery-ui"], function($, PokeAPI, SpeciesDef, RenegadeData) 
{
    function SpeciesTab()
    {
        BaseTab.call(this);

        this.Species = [];
    }

    SpeciesTab.prototype = Object.create(BaseTab.prototype);
    SpeciesTab.prototype.contructor = SpeciesTab;

    if(window.DebugOutput) console.log("js/app/species.js define")
    let tab = new SpeciesTab();

    tab.Species = [];

    console.log(PokeAPI);

    //The $(callback) function is basically something which runs after the entire document has been loaded.
    $(function () {
        console.log("species load");
        if(window.DebugOutput) console.log("js/app/species.js actual")
        //tab.Init();
    });

    SpeciesTab.prototype.AssignEvents = function()
    {
        // console.log("assigning");
        // console.log(tab);
        $('#btnSave').on('click', function()
        {
            console.log(tab);
            tab.SaveData();
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

    SpeciesTab.prototype.SaveData = function()
    {
        var def = new SpeciesDef();
        console.log(def);
        def.NationalPokedexNumber = $('#txt-pokedex-number').val() || 0;
        def.CanonPokedexNumber = $('#txt-canon-pokedex-number').val() || 0;

        RenegadeData.SetData("SpeciesTab", def);
    };

    return tab;
});  