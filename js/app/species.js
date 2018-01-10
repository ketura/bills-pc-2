console.log("js/app/species.js entry")

define(["jquery", "app/BaseTab", "jquery-ui"], function($, BaseTab) 
{
    console.log("js/app/species.js define")
    tab = BaseTab;

    tab.pokeTypes = ['Fire', 'Water', 'Electric'];
    tab.typeDatatable = null;

    //The $(callback) function is basically something which runs after the entire document has been loaded.
    $(function () {
        console.log("js/app/species.js actual")
        tab.Init();
    });

    tab.AssignEvents = function()
    {
        // console.log("assigning");
        // console.log(tab);
        // $('[name=btnAddType]').on('click', function()
        // {
        //     tab.pokeTypes.push($('#inNewType').val());
        //     tab.RebuildControls();
        // });
    };

    tab.DestroyControls = function()
    {
        // var self = this;
        // // console.log("destroy");
        // // console.log(self);

        // self.typeDatatable.MakeCellsEditable("destroy");
        // self.typeDatatable.destroy();
        // $('#typeTable').empty();
    };

    tab.BuildControls = function () 
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