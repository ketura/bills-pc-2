// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.



if(window.DebugOutput) console.log("js/common.js entry")

requirejs.config(
{
    baseUrl: 'js',
    paths: 
    {
         app: './app'
        ,lib: './lib'
        ,"jquery": "//code.jquery.com/jquery-3.2.1.min"
        ,'jquery-private': "lib/jquery-private"
        ,"jquery-ui": "//code.jquery.com/ui/1.12.1/jquery-ui.min"
        //,"datatables": "//cdnjs.cloudflare.com/ajax/libs/datatables/1.10.16/js/jquery.dataTables"
        ,"datatables": "lib/DataTables-1.10.16/js/jquery.dataTables.min"
        ,"select": "lib/Select-1.2.4/js/dataTables.select"
        ,"BaseTab": "app/BaseTab"
        ,"CellEdit": "lib/cellEdit"
        ,"pokeapi-js-wrapper": "lib/PokeAPI-JS-wrapper-1.0.0/js/pokeapi-js-wrapper.min"
        ,"PokeAPI": "app/PokeAPI"
        ,"localforage": "lib/localForage-1.5.5/js/localforage.min"
    },
    onNodeCreated: function(node, config, module, path) 
    {
      // Here's a list of differet integrities for different scripts
      // Append to this list for all scripts that you want SRI for
      var sri = {
        "jquery": "sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        ,"jquery-ui": "sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
      };
      
      if (sri[module]) {
        node.setAttribute('integrity', sri[module]);
        node.setAttribute('crossorigin', 'anonymous');
      }
    },
    map: 
    {
      // '*' means all modules will get 'jquery-private'
      // for their 'jquery' dependency.
      '*': { 'jquery': 'jquery-private' },
      '*': { 'PokeAPI': 'pokeapi-js-wrapper' },
      '*': { 'datatables.net': 'datatables' },
      

      // 'jquery-private' wants the real jQuery module
      // though. If this line was not here, there would
      // be an unresolvable cyclic dependency.
      'jquery-private': { 'jquery': 'jquery' }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
//requirejs(['app/main']);