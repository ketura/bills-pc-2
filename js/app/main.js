define(["jquery", "jquery-ui", "datatables", "app/types"], function($, jqueryUI, DataTables, typetab) 
{
    console.log("main");
    console.log(typetab);

    $( function() 
    {
        $( "#tabs" ).tabs();
        $("#tab-types").load("Types.html", function(){
            typetab.Init();
        });
        
        //$("#tabs").draggable("destroy"); 

    });

});

