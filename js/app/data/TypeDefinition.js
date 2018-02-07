
function Type(name)
{
	this.Name = name || "";
	this.Version = 1;
	this.Notes = "";
	this.HasOffensive = true;
	this.HasDefensive = true;
	this.Subtypes = {};
	this.DamageProfiles = {};
}

function Subtype(name)
{
	this.Name = name || "";
	this.Version = 1;
	this.DamageProfiles = {};
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
	return { Type: Type, Subtype: Subtype };
});