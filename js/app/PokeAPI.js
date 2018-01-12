define(["pokeapi-js-wrapper"], function(pokeapi) 
{
	if(window.DebugOutput) console.log("js/PokeAPI.js define")
	var options =
	{
		protocol: 'https',
		versionPath: '/api/v2/',
		cache: true
	}
	var pokedex = new pokeapi.Pokedex(options);
	return pokedex;
});