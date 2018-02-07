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

        this.PokeTypes = [];
        this.typeDatatable = null;
        this.DataPath = "TypesTab";
    }

    TypeTab.prototype = Object.create(BaseTab.prototype);
    TypeTab.prototype.contructor = TypeTab;
    TypeTab.prototype.SelectedType = null;
    
    let tab = new TypeTab();

    RData.GetData("Types", function (data){
        //console.log(data);
        tab.PokeTypes = data || [];
        tab.RebuildControls();
    });

    tab.PokeTypes = [];
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
        // console.log(tab);
        $('#btnAddType').click(function()
        {
            tab.PokeTypes.push($('#inNewType').val());
            tab.RebuildControls();
        });

        // $('input').change(function(){
        //     tab.UpdateData();
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
            $("#inNewType").ProcessEvents = false;
            tab.SetDefaultTypes();

            $("#inNewType").ProcessEvents = true;
            console.log($("#inNewType"));
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

    };

    function OnTypeTagClicked(event, ui)
    {
        console.log(ui);
        console.log($("#inNewType"))
        if(!ui.tag.hasClass("selected"))
        {
            $(".tagit-choice").removeClass("selected");
            ui.tag.addClass("selected");
            tab.SelectedType = ui.tagLabel;
        }
    }

    function OnTypeTagAdded(event, ui, duringInitialization)
    {
        if(duringInitialization || $("#inNewType").ProcessEvents === false)
            return;

        tab.SelectType(ui.tagLabel);
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
    }

    TypeTab.prototype.SetDefaultTypes = function()
    {
        this.ClearAllTypes();
        this.SetTypes(this.PokeTypes);
    }

    TypeTab.prototype.SetTypes = function(typesArray)
    {
        if(!typesArray)
            return;

        let self = this;

        let eventState = $("#inNewType").ProcessEvents;
        let selected = self.SelectedType;
        $("#inNewType").ProcessEvents = false;

        self.ClearAllTypes();
        typesArray.forEach(function(type){
            self.AddNewType(type, true, true);
        });

        $("#inNewType").ProcessEvents = eventState;
        self.SelectType(selected);
    }

    TypeTab.prototype.SortTypesAlphabetically = function()
    {
        let tags = $("#inNewType").tagit("assignedTags");

        tags.sort(function(a,b){
            return a.localeCompare(b);
        });

        this.SetTypes(tags);
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
            return;

        let index = tags.indexOf(type)

        //remove the old instance
        tags.splice(tags.indexOf(type), 1);
        //insert the new name at the old index
        tags.splice(index, 0, name);

        this.ClearAllTypes();
        this.SetTypes(tags);
    }

    TypeTab.prototype.UpdateSubtypeName = function(type, subtype, name)
    {
        
    }

    TypeTab.prototype.AddNewType = function(name, hasOffense, hasDefense)
    {
        $("#inNewType").tagit("createTag", name);
    }

    TypeTab.prototype.AddNewSubtype = function(type, name, damageDict, statDict, abilityArray)
    {
        
    }

    TypeTab.prototype.RegenerateTable = function()
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
        $("#inNewType").ProcessEvents = true;

        $('#inNewSubtype').tagit({
            fieldName: "subTypeInput",
            removeConfirmation: true,
            placeholderText: "Add subtypes here",
            singleField: true,
            onTagClicked: OnSubtypeTagClicked
        });
        $("#inNewSubtype").ProcessEvents = true;



        var tableData = [];
        var headerRow = {name:""};
        var columns = [
            { data: 'name', className: 'dt-center'}
        ];

        self.PokeTypes.forEach(function(row){
            headerRow[row] = row;
        });
        tableData.push(headerRow);

        self.PokeTypes.forEach(function(row){
            columns.push({ data: row, className: 'cell dt-center'});
            var dataRow = {name: row};
            self.PokeTypes.forEach(function(col){
                dataRow[col] = 0;
            });
            tableData.push(dataRow);
        });

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
        //     buttons: [
        //         'copy', 'csv'
        //     ]
        // });

        //self.typeDatatable.buttons().container().appendTo( $('.col-sm-6:eq(0)', self.typeDatatable.table().container() ) );

        self.typeDatatable.MakeCellsEditable({
            "onUpdate": self.UpdateCell
        });

        // $('#typeTable').on( 'click', 'tr', function () 
        // {
        //     console.log('clicked');
        //     if ( $(this).hasClass('selected')) 
        //     {
        //         $(this).removeClass('selected');
        //     }
        //     else 
        //     {
        //         self.typeDatatable.$('tr.selected').removeClass('selected');
        //         $(this).addClass('selected');
        //     }
        // });

        return self.typeDatatable
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

        self.PokeTypes.forEach(function(name){
            tab.Data[name] = new TypeDef();
            tab.Data[name].Name = name;
        });
        // tab.Data.NationalPokedexNumber = $('#txt-pokedex-number').val() || 0;
        // tab.Data.CanonPokedexNumber = $('#txt-canon-pokedex-number').val() || 0;
        // tab.Data.Legendary = $('#chk-Legendary').prop('checked') || false;
        // tab.Data.PokedexEntry = $('#txt-pokedex-entry').val() || "";

    };

    return tab;
});  