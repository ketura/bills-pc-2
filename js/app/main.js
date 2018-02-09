if(window.DebugOutput) console.log("js/app/main.js entry")



define(["jquery", "jquery-ui", "datatables", "app/types", "app/species"], function($, jqueryUI, DataTables, typeTab, speciesTab) 
{
	if(window.DebugOutput) console.log("js/app/main.js define")

	function FinalLoad()
	{
		if(window.DebugOutput) console.log("All tabs succesfully loaded.  Initializing tab content.");
		typeTab.Init();
		speciesTab.Init();
	}

	function TabLoad(tabname)
	{
		if(window.DebugOutput) console.log(tabname + " load complete");
		tabs--;
		if(tabs == 0)
		{
			FinalLoad();
		}
	}

	//this needs to be maintained
	let tabs = 2;
	

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
		//	 url: "Types.html",
		//	 dataType: "html",
		//	 success: function(html)
		//	 {
		//		 $("#tab-types").append(html);
		//		 console.log("load complete");
		//		 //typetab.Init();
		//	 }
		// });

		console.log("tab loads");
		console.log("type loading");
		$("#types").load("Types.html", function(){
			TabLoad("types tab");
		});

		console.log("species loading");
		$("#species").load("Species.html", function(){
			TabLoad("species tab");
		});
		console.log("loading complete");
		
		//$("#tabs").draggable("destroy"); 

	});

});

