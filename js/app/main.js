if(window.DebugOutput) console.log("js/app/main.js entry")



define(["jquery", "jquery-ui", "datatables", "app/types", "app/species"], function($, jqueryUI, DataTables, typeTab, speciesTab) 
{
    if(window.DebugOutput) console.log("js/app/main.js define")
    

    $( function() 
    {
        if(window.DebugOutput) console.log("js/app/main.js actual")
        //Initializes the actual tab UI code
        $( "#tabs" ).tabs();

        console.log(speciesTab);
        console.log(typeTab);
        

        //killing the "Synchronous XMLHttpRequest on the main thread is deprecated" warning doesn't seem to be feasible
        // with our mix of jquery and require.js.
        // $.ajax({
        //     url: "Types.html",
        //     dataType: "html",
        //     success: function(html)
        //     {
        //         $("#tab-types").append(html);
        //         console.log("load complete");
        //         //typetab.Init();
        //     }
        // });

        console.log("tab loads");
        console.log("type loading");
        $("#tab-types").load("Types.html", function(){
            if(window.DebugOutput) console.log("types tab load complete");
            typeTab.Init();
        });

        console.log("species loading");
        $("#tab-species").load("Species.html", function(){
            if(window.DebugOutput) console.log("species tab load complete");
            speciesTab.Init();
        });
        console.log("loading complete");
        
        //$("#tabs").draggable("destroy"); 

    });

});

