if(window.DebugOutput) console.log("js/app/types.js entry")



define(["jquery", "CellEdit", "datatables", "select", "app/data/TypeDefinition", "app/data/RenegadeData", "localforage", "tag-it", "app/BaseTab", "jquery-ui"]
	, function($,  CellEdit,  datatables,   select, TypeDef, RData, localforage) 
{
	if(window.DebugOutput) console.log("js/app/types.js define")

	CellEdit();

	var MAX_NUM = Math.pow(2,32);

	function TypeTab()
	{
		BaseTab.call(this);

		this.PokeTypes = {};
		this.typeDatatable = null;
		this.DataPath = "TypesTab";
		this.DefaultTypes = []
	}

	TypeTab.prototype = Object.create(BaseTab.prototype);
	TypeTab.prototype.contructor = TypeTab;
	TypeTab.prototype.SelectedType = null;
	
	let tab = new TypeTab();

	//polls PokeAPI for the types info
	RData.GetData("Types", function (data){
		if(!data)
		{
			return;
		}
		
		tab.DefaultTypes = data;
	});

	tab.typeDatatable = null;

	//The $(callback) function is basically something which runs after the entire document has been loaded.
	//$(function () {
		
		//this can't be called here, since this is going to get hit before main actually loads.  It will need to be in the js of each page that uses it.
		//tab.Init();
		//this can't be called here either stupid.  Put it in Init().
		//tab.LoadData();
	//});

	TypeTab.prototype.AssignEvents = function()
	{
		console.log("assigning types");

		// $('input').change(function(){
		//	 tab.UpdateData();
		// });

		console.log($('#btnSaveTypes'));

		$('#btnSave').click(function()
		{
			console.log("save button clicked");
			console.log(tab);
			tab.UpdateData();
			tab.SaveData();
		});

		$('#btnDefaultTypes').click(function()
		{
			console.log("default types button clicked");
			$("#inNewType").data("ProcessEvents", false);
			tab.SetDefaultTypes();

			$("#inNewType").data("ProcessEvents", true);
		});

		$('#btnMoveTypeFront').click(function()
		{
			tab.SetTypeIndex(tab.SelectedType, 0);
		});

		$('#btnMoveTypeBack').click(function()
		{
			tab.SetTypeIndex(tab.SelectedType, MAX_NUM);
		});

		$('#btnMoveTypeLeft').click(function()
		{
			tab.MoveTypeIndex(tab.SelectedType, -1);
		});

		$('#btnMoveTypeRight').click(function()
		{
			tab.MoveTypeIndex(tab.SelectedType, 1);
		});

		$('#btnSortTypes').click(function()
		{
			tab.SortTypesAlphabetically();
		});

		$('#btnDeleteType').click(function()
		{
			tab.RemoveType(tab.SelectedType);
		});

		$('#inTypeName').change(function(event)
		{
			tab.UpdateTypeName(tab.SelectedType, event.target.value);
		});

	};

	function OnTypeTagClicked(event, ui)
	{
		tab.SelectType(ui.tagLabel);
	}

	function OnTypeTagAdded(event, ui, duringInitialization)
	{
		if(duringInitialization || $("#inNewType").data("ProcessEvents") === false)
			return;

		tab.AddNewType(ui.tagLabel);
	}

	function OnTypeTagRemoved(event, ui)
	{
		if(ui.tagLabel === 'Normal')
			return false;
	}

	function OnSubtypeTagClicked(event, ui)
	{
		console.log(ui);
		ui.tag.addClass("selected");
	}

	TypeTab.prototype.ClearAllTypes = function()
	{
		$("#inNewType").tagit("removeAll");
		for(let type in this.PokeTypes)
		{
			this.PokeTypes[type].Active = false;
		}
	}

	TypeTab.prototype.RemoveType = function(type)
	{
		if(!type)
			return;

		$("#inNewType").tagit("removeTagByLabel", type);
		let tags = $("#inNewType").tagit("assignedTags");
		this.SelectType(tags[tags.length - 1]);

		if(type in this.PokeTypes)
		{
			this.PokeTypes[type].Active = false;
		}

		this.RegenerateTable();
	}

	TypeTab.prototype.SetDefaultTypes = function()
	{
		this.SetTypes(this.DefaultTypes);
	}

	TypeTab.prototype.SetTypes = function(typesArray)
	{
		if(!typesArray)
			return;

		let self = this;

		let eventState = $("#inNewType").data("ProcessEvents");
		let selected = self.SelectedType;
		$("#inNewType").data("ProcessEvents", false);

		self.ClearAllTypes();
		typesArray.forEach(function(type){
			self.AddNewType(type, true, true, true);
		});

		$("#inNewType").data("ProcessEvents", eventState);
		self.SelectType(selected);

		self.RegenerateTable();
	}

	TypeTab.prototype.SortTypesAlphabetically = function()
	{
		let tags = $("#inNewType").tagit("assignedTags");

		tags.sort(function(a,b){
			return a.localeCompare(b);
		});

		this.SetTypes(tags);
		this.RegenerateTable();
	}

	TypeTab.prototype.SetTypeIndex = function(type, index)
	{
		console.log("SetTypeIndex");
		let tags = $("#inNewType").tagit("assignedTags");
		if(!tags.includes(type))
			return;

		index = Math.max(0, index);
		index = Math.min(tags.length - 1, index);

		//remove the old instance
		tags.splice(tags.indexOf(type), 1);
		//insert into the new index
		tags.splice(index, 0, type);

		this.ClearAllTypes();
		this.SetTypes(tags);
	}

	TypeTab.prototype.MoveTypeIndex = function(type, index)
	{
		console.log("MoveTypeIndex");
		let tags = $("#inNewType").tagit("assignedTags");
		if(!tags.includes(type))
			return;

		if(typeof(index) !== 'number')
			return;

		this.SetTypeIndex(type, tags.indexOf(type) + index);
	}

	TypeTab.prototype.UpdateTypeName = function(type, name)
	{
		let tags = $("#inNewType").tagit("assignedTags");
		if(!tags.includes(type))
		{
			$('#inTypeName').val("");
			return;
		}

		if(type === "Normal")
		{
			$('#inTypeName').val("Normal");
			return;
		}

		let index = tags.indexOf(type)

		//remove the old instance
		tags.splice(tags.indexOf(type), 1);
		//insert the new name at the old index
		tags.splice(index, 0, name);

		this.ClearAllTypes();
		this.SetTypes(tags);
		this.SelectType(name);

		console.log(this.PokeTypes);
	}

	TypeTab.prototype.UpdateSubtypeName = function(type, subtype, name)
	{
		
	}

	TypeTab.prototype.AddNewType = function(name, hasOffense, hasDefense, addTag)
	{
		if(addTag)
		{
			$("#inNewType").tagit("createTag", name);
		}

		if(!(name in this.PokeTypes))
		{
			this.PokeTypes[name] = new TypeDef.Type(name);

			this.PokeTypes[name].HasOffensive = typeof(hasOffense) === "undefined" ? true : hasOffense;
			this.PokeTypes[name].HasDefensive = typeof (hasDefense) === "undefined" ? true : hasDefense;
		}
		else
		{
			this.PokeTypes[name].Active = true;
			this.PokeTypes[name].HasOffensive = hasOffense || this.PokeTypes[name].HasOffensive;
			this.PokeTypes[name].HasDefensive = hasDefense || this.PokeTypes[name].HasDefensive;
		}

		for(let type in this.PokeTypes)
		{
			this.PokeTypes[type].UpdateType(name);
			this.PokeTypes[name].UpdateType(type);
		}

		tab.SelectType(name);

		//console.log(tab.PokeTypes);

		if ($("#inNewType").data("ProcessEvents"))
		{
			tab.RegenerateTable();
		}
	}

	TypeTab.prototype.AddNewSubtype = function(type, name, damageDict, statDict, abilityArray)
	{
		
	}

	

	TypeTab.prototype.SelectType = function(newType)
	{
		let tags = $("#inNewType").tagit("assignedTags");
		//console.log(tags);
		//console.log(newType);
		if(!tags.includes(newType))
			return;

		this.DeselectAllTypes();

		let control = $("li:contains('" + newType + "')").addClass("selected");
		tab.SelectedType = newType;

		$('#inTypeName').val(newType);
		let type = this.PokeTypes[newType];
		$('#chkOffensiveType').prop("checked", type.HasOffensive).checkboxradio("refresh");
		$('#chkDefensiveType').prop("checked", type.HasDefensive).checkboxradio("refresh");
	}

	TypeTab.prototype.DeselectAllTypes = function()
	{
		$(".tagit-choice").removeClass("selected");
		tab.SelectedType = null;
	}

	TypeTab.prototype.SelectSubtype = function(newsubType)
	{
		
	}

	TypeTab.prototype.DeselectAllSubtypes = function()
	{
		
	}

	TypeTab.prototype.DestroyControls = function()
	{
		var self = this;
		// console.log("destroy");
		//console.log(self);
		//console.log(self.typeDatatable);

		if(self.typeDatatable !== null)
		{
			self.typeDatatable.MakeCellsEditable("destroy");
			self.typeDatatable.destroy();
		}
		$('#typeTable').empty();
	};

	TypeTab.prototype.UpdateCell = function(cell, row, col, oldValue)
	{
		//console.log("Updated data in (" + col + ", " + row + ")");
		//console.log("New value: " + cell.data() + "; old value: " + oldValue);
	}

	TypeTab.prototype.BuildControls = function () 
	{
		console.log("types BuildControls");
		var self = this;

		$(".accordion").accordion({
			collapsible: true,
			active: 0,
			heightStyle: "content",
			animate: 300
		})

		$('input[type="checkbox"]').checkboxradio();

		$('#inNewType').tagit({
			fieldName: "typeInput",
			removeConfirmation: true,
			placeholderText: "Add types here",
			singleField: true,
			singleFieldNode: $('#inNewType'),
			onTagClicked: OnTypeTagClicked,
			afterTagAdded: OnTypeTagAdded,
			beforeTagRemoved: OnTypeTagRemoved
		});
		$("#inNewType").data("ProcessEvents", true);

		$('#inNewSubtype').tagit({
			fieldName: "subTypeInput",
			removeConfirmation: true,
			placeholderText: "Add subtypes here",
			singleField: true,
			onTagClicked: OnSubtypeTagClicked
		});
		$("#inNewSubtype").data("ProcessEvents", true);


		self.RegenerateTable();   

		this.AddNewType("Normal", true, true, true);

		return self.typeDatatable
	}

	TypeTab.prototype.RegenerateTable = function()
	{
		console.log("regenerating");
		var self = this;
		this.DestroyControls();

		//console.log(self.PokeTypes);

		var tableData = [];
		var headerRow = {name:""};
		var columns = [
			{ data: 'name', className: 'dt-center'}
		];

		let tags = $("#inNewType").tagit("assignedTags")

		for (let row of tags)
		{
			if(!self.PokeTypes[row].Active)
				continue;
			headerRow[row] = row;
		}
		tableData.push(headerRow);

		for (let row of tags)
		{
			if (!self.PokeTypes[row].Active)
				continue;

			columns.push({ data: row, className: 'cell dt-center'});
			var dataRow = {name: row};
			for (let col of tags)
			{
				if (!self.PokeTypes[col].Active)
					continue;
				dataRow[col] = self.PokeTypes[row].DamageProfiles[col];
			}
			tableData.push(dataRow);
		}

		self.typeDatatable = $("#typeTable").DataTable({
			"data": tableData,
			"autoWidth": true,
			"columns": columns,
			paging: false,
			ordering: false,
			searching: false,
			info: false,
			processing: true,
			select: 
			{
				style: 'os',
				items: 'cell',
				blurable: true
			},
			stateSave: true
		});

		var rowheaders = self.typeDatatable.cells(function(index, data, node){
			return index.row === 0 && index.column !== 0;
		});
		rowheaders.nodes().toJQuery().addClass("header-row");

		var colheaders = self.typeDatatable.cells(function(index, data, node){
			return index.column === 0 && index.row !== 0;
		});
		colheaders.nodes().toJQuery().addClass("header-col add");

		var corner = self.typeDatatable.cells(function(index, data, node){
			return index.column === 0 && index.row === 0;
		});
		corner.nodes().toJQuery().addClass("header-corner");


		// new $.fn.dataTable.Buttons(self.typeDatatable, {
		//	 buttons: [
		//		 'copy', 'csv'
		//	 ]
		// });

		//self.typeDatatable.buttons().container().appendTo( $('.col-sm-6:eq(0)', self.typeDatatable.table().container() ) );

		self.typeDatatable.MakeCellsEditable({
			"onUpdate": self.UpdateCell
		});

		// $('#typeTable').on( 'click', 'tr', function () 
		// {
		//	 console.log('clicked');
		//	 if ( $(this).hasClass('selected')) 
		//	 {
		//		 $(this).removeClass('selected');
		//	 }
		//	 else 
		//	 {
		//		 self.typeDatatable.$('tr.selected').removeClass('selected');
		//		 $(this).addClass('selected');
		//	 }
		// });
	}

	TypeTab.prototype.UpdateData = function(data)
	{
		var self = this;

		if(window.DebugOutput) console.log("types UpdateData")
		if(typeof(data) !== 'undefined' && data !== null)
		{
			tab.Data = data;
			return;
		}
		
		if(tab.Data === null)
		{
			tab.Data = {}; //TypeDef();
		}

		//console.log(self.typeDatatable.cells());

		self.typeDatatable.rows().every(function(index){
			let data = this.data();
			//console.log(data);
			//console.log(Object.keys(data));
		});

		for(let name in Object.keys(self.PokeTypes))
		{
			tab.Data[name] = self.PokeTypes[name]
		}
		// tab.Data.NationalPokedexNumber = $('#txt-pokedex-number').val() || 0;
		// tab.Data.CanonPokedexNumber = $('#txt-canon-pokedex-number').val() || 0;
		// tab.Data.Legendary = $('#chk-Legendary').prop('checked') || false;
		// tab.Data.PokedexEntry = $('#txt-pokedex-entry').val() || "";

	};

	return tab;
});  