define(["jquery", "jquery-ui", "datatables"], function($) 
{
    return function($)
    {
        console.log($);

        window.pokeTypes = ['Fire', 'Water', 'Electric'];
        //The $(callback) function is basically something which runs after the entire document has been loaded.
        $(function () {
            TypeTabInit($);

        });

        window.TypeTabInit = function ($){
            console.log('got in');
            var typeDatatable = RegenerateTypeTable();

            $('[name=btnAddType]').on('click', function () {
                //console.log(typeDatatable.data());
                pokeTypes.push($('#inNewType').val());
                typeDatatable.destroy();
                $('#typeTable').empty();
                typeDatatable = RegenerateTypeTable();
                //console.log(typeDatatable.data());
            });
        }

        window.RegenerateTypeTable = function () 
        {
            console.log(pokeTypes);
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

            console.log(tableData);
            console.log(columns);


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