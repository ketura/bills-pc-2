define(["jquery", "jquery-ui", "datatables", "app/types"], function($, jqueryUI, DataTables, typetab) 
{
    console.log($);
    console.log(typetab);
    typetab($);
    

    $( function() 
    {
        $( "#tabs" ).tabs();
        $("#tab-types").load("Types.html", function(){
            console.log(pokeTypes);
            TypeTabInit($);
        });
        
        //$("#tabs").draggable("destroy"); 

    });

    

    
});

