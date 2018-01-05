console.log("js/app/main.js entry")

define(["jquery", "jquery-ui", "app/types", "datatables"], function($, jqueryUI, typetab, DataTables) 
{
    console.log("js/app/main.js define")
    console.log(typetab);

    $( function() 
    {
        console.log("js/app/main.js actual")
        //Initializes the actual tab UI code
        $( "#tabs" ).tabs();

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


        $("#tab-types").load("Types.html", function(){
            console.log("load complete");
            typetab.Init();
        });
        
        //$("#tabs").draggable("destroy"); 

    });

});

