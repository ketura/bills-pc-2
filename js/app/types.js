if(window.DebugOutput) console.log("js/app/types.js entry")



define(["jquery", "CellEdit", "datatables", "select", "app/data/TypeDefinition", "app/data/RenegadeData", "localforage", "tag-it", "app/BaseTab", "jquery-ui"]
    , function($,  CellEdit,  datatables,   select, TypeDef, RData, localforage) 
{
    if(window.DebugOutput) console.log("js/app/types.js define")

    CellEdit();

    function TypeTab()
    {
        BaseTab.call(this);

        this.PokeTypes = [];
        this.typeDatatable = null;
        this.DataPath = "TypesTab";
    }

    TypeTab.prototype = Object.create(BaseTab.prototype);
    TypeTab.prototype.contructor = TypeTab;

    
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
    };

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

        $('#inNewType').tagit({
            removeConfirmation: true
        });

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