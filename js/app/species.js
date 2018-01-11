if(window.DebugOutput) console.log("js/app/species.js entry")

define(["jquery", "pokeapi-js-wrapper", "app/BaseTab", "jquery-ui"], function($, PokeAPI) 
{
    function SpeciesTab()
    {
        BaseTab.call(this);

        this.Species = [];
    }

    SpeciesTab.prototype = Object.create(BaseTab.prototype);
    SpeciesTab.prototype.contructor = SpeciesTab;

    if(window.DebugOutput) console.log("js/app/species.js define")
    tab = new SpeciesTab();

    tab.Species = [];

    console.log(PokeAPI);
    var pokedex = new PokeAPI.Pokedex();
    pokedex.getPokemonByName('eevee')
        .then(function(response){
            console.log(response);
        });

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
        // $('[name=btnAddType]').on('click', function()
        // {
        //     tab.pokeTypes.push($('#inNewType').val());
        //     tab.RebuildControls();
        // });
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

    }

    return tab;
});  