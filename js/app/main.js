define(["jquery", "jquery-ui", "datatables", "app/types"], function($, jqueryUI, DataTables, typetab) 
{
    typetab($);
    

    $( function() 
    {
        $( "#tabs" ).tabs();
        $("#tab-types").load("Types.html", function(){
            TypeTabInit($);
        });
        
        //$("#tabs").draggable("destroy"); 

    });

    

    
});

