console.log("js/species.js entry")

requirejs(['./common'], function (common) 
{
    requirejs(["jquery", "BaseTab", 'app/species'], function($, BaseTab, species)
    {
        console.log("js/species.js require")
        return species;
    });
});