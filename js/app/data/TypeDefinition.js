
function Type(name)
{
	this.Name = name || "";
	this.Version = 1;
	this.Notes = "";
    this.Hides = [];
    this.TypeProfiles = {};
}

// {
//     "Name": "Ice",
//    "Subtypes": [
//        "Thick Fat",
//        "Frost"
//    ],
//    "Damage": {
//        "Bark": 1.2,
//        "Leaf": 1.4
//    }
// }

define(["jquery"], function($) 
{
    if(window.DebugOutput) console.log("js/app/TypesDefinition.js define");
    return Type;
});