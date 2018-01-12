function RenegadeData()
{
	this.PendingRequests = 0; 
	this.CompletedRequests = 0;
	this.$ = null;
	this.localforage = null;
	this.forageBasePath = "";
	this.PokeAPI = null;
}

RenegadeData.prototype.LoadingComplete = function()
{
	return this.PendingRequests === this.CompletedRequests;
};

RenegadeData.prototype.LoadJSON = function (path, name)
{
	this.PendingRequests++;
	var json = null;
	let self = this;

	this.$.ajax({
		'async': false,
		'global': false,
		'url': path,
		'dataType': "json",
		'success': function (data) {
			self.SetData(name, data);
			self.CompletedRequests++;
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status);
			console.log(thrownError);
			self.CompletedRequests++;
		  }
	});
	
	return json;
};

RenegadeData.prototype.SetData = function (name, json, callback)
{
	console.log("Saving " + this.forageBasePath + "/" + name);
	this[name] = json;
	this.localforage.setItem(this.forageBasePath + "/" + name, json).then(callback);
};

RenegadeData.prototype.GetData = function(name, callback)
{
	console.log("Retrieving " + this.forageBasePath + "/" + name);
	this.localforage.getItem(this.forageBasePath + "/" + name).then(callback);
};

RenegadeData.prototype.ClearData = function(name, callback)
{
	console.log("Clearing " + this.forageBasePath + "/" + name);
	this.localforage.removeItem(this.forageBasePath + "/" + name).then(callback);
};




function GetRenegadeData($, localforage, PokeAPI) 
{
	console.log("getdata");
	console.log(localforage);
	if(window.DebugOutput) console.log("js/app/RenegadeData.js define")
	if(typeof GetRenegadeData.data == 'undefined')
	{
		GetRenegadeData.data = new RenegadeData();
		GetRenegadeData.data.$ = $;
		GetRenegadeData.data.localforage = localforage;
		GetRenegadeData.data.forageBasePath = 'RenegadeData';
		GetRenegadeData.data.PokeAPI = PokeAPI;

		GetRenegadeData.data.LoadJSON('/js/app/data/Stats.json', 'Stats')

		RenegadeData.prototype.GetStats = function(callback)
		{
			return this.localforage.getItem("RenegadeData/Stats/Stats", callback);
		};

		PokeAPI.getTypesList()
		.then(function(response){
			//https://stackoverflow.com/a/39333479/888539
			let typeNames = [];
			let idRegex = /\/(\d+)\/$/;
			response.results.forEach(function(x){
				let match = x.url.match(idRegex);
				if(match[1] < 100)
				{
					let name = x.name.charAt(0).toUpperCase() + x.name.slice(1);
					typeNames.push(name);
				}
				
				GetRenegadeData.data.SetData("Types", typeNames);
				
			});
		});
		
	}

	

	return GetRenegadeData.data;
}

define(["jquery", "localforage", "PokeAPI"], GetRenegadeData);