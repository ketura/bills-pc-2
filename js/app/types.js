console.log("js/app/types.js entry")

define(["jquery", "app/BaseTab", "CellEdit", "datatables", "select", "jquery-ui"], function($, BaseTab, CellEdit, datatables, select) 
{
    console.log("js/app/types.js define")
    console.log(select);
    CellEdit();
    tab = BaseTab;

    tab.pokeTypes = ['Fire', 'Water', 'Electric'];
    tab.typeDatatable = null;

    //The $(callback) function is basically something which runs after the entire document has been loaded.
    $(function () {
        console.log("js/app/types.js actual")
        tab.Init();
    });

    tab.AssignEvents = function()
    {
        // console.log("assigning");
        // console.log(tab);
        $('[name=btnAddType]').on('click', function()
        {
            tab.pokeTypes.push($('#inNewType').val());
            tab.RebuildControls();
        });
    };

    tab.DestroyControls = function()
    {
        var self = this;
        // console.log("destroy");
        // console.log(self);

        self.typeDatatable.MakeCellsEditable("destroy");
        self.typeDatatable.destroy();
        $('#typeTable').empty();
    };

    tab.UpdateCell = function(cell, row, col, oldValue)
    {
        console.log("Updated data in (" + col + ", " + row + ")");
        console.log("New value: " + cell.data() + "; old value: " + oldValue);
    }

    tab.BuildControls = function () 
    {
        var self = this;
        // console.log("build");
        // console.log(self);

        var tableData = [];
        var headerRow = {name:""};
        var columns = [
            { data: 'name', className: 'dt-center'}
        ];

        self.pokeTypes.forEach(function(row){
            headerRow[row] = row;
        });
        tableData.push(headerRow);

        console.log("header info: ")
        console.log(headerRow);

        self.pokeTypes.forEach(function(row){
            columns.push({ data: row, className: 'cell dt-center'});
            var dataRow = {name: row};
            self.pokeTypes.forEach(function(col){
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
        colheaders.nodes().toJQuery().addClass("header-col");

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

    return tab;
});  