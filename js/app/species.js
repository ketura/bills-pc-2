if(window.DebugOutput) console.log("js/app/species.js entry")

define(["jquery", "app/BaseTab", "jquery-ui"], function($) 
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
        $(".accordion").accordion({
            collapsible: true,
            active: 0,
            heightStyle: "content",
            animate: 300
        })

    }

    return tab;
});  