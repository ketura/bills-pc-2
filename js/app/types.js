define(["jquery", "jquery-ui", "datatables"], function($) 
{
    console.log("types.js actual");
    
    return function($)
    {
        window.pokeTypes = ['Fire', 'Water', 'Electric'];
        //The $(callback) function is basically something which runs after the entire document has been loaded.
        $(function () {
            TypeTabInit($);

        });

        window.TypeTabInit = function ($){
            var typeDatatable = RegenerateTypeTable();

            $('[name=btnAddType]').on('click', function () {
                pokeTypes.push($('#inNewType').val());
                typeDatatable.destroy();
                $('#typeTable').empty();
                typeDatatable = RegenerateTypeTable();
            });
        }

        window.RegenerateTypeTable = function () 
        {
            var tableData = [];
            var headerRow = {name:""};
            var columns = [
                { data: 'name', className: 'dt-center'}
            ];

            pokeTypes.forEach(function(row){
                headerRow[row] = row;
            });
            tableData.push(headerRow);

            pokeTypes.forEach(function(row){
                columns.push({ data: row, className: 'dt-center'});
                var dataRow = {name: row};
                pokeTypes.forEach(function(col){
                    dataRow[col] = 0;
                });
                tableData.push(dataRow);
            });

            var typeDatatable = $("#typeTable").DataTable({
                "data": tableData,
                "autoWidth": true,
                "columns": columns,
                paging: false,
                ordering: false,
                searching: false,
                info: false,
                processing: true
            });


            return typeDatatable
        }
    }
});  