define(["jquery", "app/BaseTab", "jquery-ui", "datatables"], function($, BaseTab) 
{
    tab = BaseTab;

    tab.pokeTypes = ['Fire', 'Water', 'Electric'];
    tab.typeDatatable = null;

    //The $(callback) function is basically something which runs after the entire document has been loaded.
    $(function () {
        tab.Init();
    });

    tab.AssignEvents = function()
    {
        // console.log("assigning");
        // console.log(tab);
        $('[name=btnAddType]').on('click', function()
        {
            tab.RebuildControls();
        });
    };

    tab.DestroyControls = function()
    {
        var self = this;
        // console.log("destroy");
        // console.log(self);
        
        self.pokeTypes.push($('#inNewType').val());
        self.typeDatatable.destroy();
        $('#typeTable').empty();
    };

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

        self.pokeTypes.forEach(function(row){
            columns.push({ data: row, className: 'dt-center'});
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
            processing: true
        });


        return self.typeDatatable
    }

    return tab;
});  