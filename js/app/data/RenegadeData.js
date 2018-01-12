function RenegadeData()
{
	this.PendingRequests = 0; 
	this.CompletedRequests = 0;
	this.$ = null;
	this.localforage = null;
	this.forageBasePath = "";
	this.PokeAPI = null;
}

RenegadeData.prototype.LoadJSON = function (path, name, foragepath)
{
	this.PendingRequests++;
	var json = null;
	this.$.ajax({
		'async': false,
		'global': false,
		'url': my_url,
		'dataType': "json",
		'success': function (data) {
			this[name] = data;
			this.CompletedRequests++;
		}
	});
	return json;
};

RenegadeData.prototype.LoadingComplete = function()
{
	return this.PendingRequests === this.CompletedRequests;
};

define(["jquery", "localforage", "PokeAPI"], function($, localforage, PokeAPI) 
{
	if(window.DebugOutput) console.log("js/app/RenegadeData.js define")
	let data = new RenegadeData();
	data.$ = $;
	data.localforage = localforage;
	data.forageBasePath = 'RenegadeData';
	data.PokeAPI = PokeAPI;

	data.LoadJSON('/js/app/data/Stats.json', 'Stats', 'Stats')

	return data;
});