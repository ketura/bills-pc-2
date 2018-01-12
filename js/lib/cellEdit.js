//Taken from here: https://github.com/ejbeaty/CellEdit

/*! CellEdit 1.0.19
 * ©2016 Elliott Beaty - datatables.net/license
 */

/**
 * @summary     CellEdit
 * @description Make a cell editable when clicked upon
 * @version     1.0.19
 * @file        dataTables.editCell.js
 * @author      Elliott Beaty
 * @contact     elliott@elliottbeaty.com
 * @copyright   Copyright 2016 Elliott Beaty
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

if(window.DebugOutput) console.log("js/lib/cellEdit.js entry");

define(["jquery", "datatables", "select"], function($) 
{
    if(window.DebugOutput) console.log("js/lib/cellEdit.js define");
    return function()
    {
        if(window.DebugOutput) console.log("js/lib/cellEdit.js actual");
        $.fn.dataTable.Api.register('MakeCellsEditable()', function (settings) 
        {
            if(window.DebugOutput) console.log("js/lib/cellEdit.js MakeCellsEditable");
            var table = this.table();

            $.fn.extend({
                // UPDATE
                updateEditableCell: function (callingElement) 
                {
                    // Need to redeclare table here for situations where we have more than one datatable on the page. See issue6 on github
                    var table = $(callingElement.closest("table")).DataTable().table();
                    var row = table.row($(callingElement).parents('tr'));
                    var cell = table.cell($(callingElement).parent());
                    var columnIndex = cell.index().column;
                    var rowIndex = cell.index().row;
                    var inputField =getInputField(callingElement);

                    // Update
                    var newValue = inputField.val();
                    if (!newValue && ((settings.allowNulls) && settings.allowNulls != true)) 
                    {
                        // If columns specified
                        if (settings.allowNulls.columns) 
                        {
                            // If current column allows nulls
                            if (settings.allowNulls.columns.indexOf(columnIndex) > -1) 
                            {
                                _update(newValue);
                            } else 
                            {
                                _addValidationCss();
                            }
                            // No columns allow null
                        } else if (!newValue) 
                        {
                            _addValidationCss();
                        }
                        //All columns allow null
                    } else
                    {
                        _update(newValue);
                    }
                    function _addValidationCss() 
                    {
                        // Show validation error
                        if (settings.allowNulls.errorClass) 
                        {
                            $(inputField).addClass(settings.allowNulls.errorClass)
                        } else
                        {
                            $(inputField).css({ "border": "red solid 1px" });
                        }
                    }
                    function _update(newValue)
                    {
                        var oldValue = cell.data();
                        cell.data(newValue);
                        //Return cell & row.
                        settings.onUpdate(cell, rowIndex, columnIndex, oldValue);
                    }
                    // Get current page
                    var currentPageIndex = table.page.info().page;
                    
                    //Redraw table
                    table.page(currentPageIndex).draw(false);
                },
                // CANCEL
                cancelEditableCell: function (callingElement)
                {
                    var table = $(callingElement.closest("table")).DataTable().table();
                    var cell = table.cell($(callingElement).parent());
                    // Set cell to it's original value
                    cell.data(cell.data());

                    // Redraw table
                    table.draw();
                }
            });

            // Destroy
            if (settings === "destroy") 
            {
                $(table.body()).off("click", "td");
                table = null;
            }

            //console.log("Table:")
            //console.log(table.cells());
            if (table != null) 
            {
                

                $(table.body()).on('click', 'td', function(event) 
                {
                    table = $('.dataTable').DataTable();

                    var cell = table.cell(this);
                    //clicking the upper-left corner cell
                    if(cell.index().row === 0 && cell.index().column === 0)
                    {
                        table.cells('.selected').deselect();
                        table.cells(function(index, data, node){
                            return $(node).hasClass('cell') 
                                && !$(node).hasClass('header-row')
                                && !$(node).hasClass('header-col')
                                && !$(node).hasClass('corner');
                        }).select();
                        $('.cell').removeClass('last-selected-cell');
                        table.cell({row: 1, column: 1}).nodes().toJQuery().addClass('last-selected-cell')
                        event.stopPropagation();
                    }
                    else if(cell.index().row === 0)
                    {
                        table.cells('.selected').deselect();
                        table.cells(function(index, data, node){
                            return index.column === cell.index().column && index.row !== 0;
                        }).select();
                        $('.cell').removeClass('last-selected-cell');
                        table.cell({row: 1, column: cell.index().column}).nodes().toJQuery().addClass('last-selected-cell')
                        event.stopPropagation();
                    }
                    else if(cell.index().column === 0)
                    {
                        table.cells('.selected').deselect();
                        table.cells(function(index, data, node){
                            return index.row === cell.index().row && index.column !== 0;
                        }).select();
                        $('.cell').removeClass('last-selected-cell');
                        table.cell({row: cell.index().row, column: 1}).nodes().toJQuery().addClass('last-selected-cell')
                        event.stopPropagation();
                    }

                    else
                    {
                        $('.cell').removeClass('last-selected-cell');
                        cell.nodes().toJQuery().addClass('last-selected-cell')
                    }
                });
                // On cell click
                $(document).keypress( function (event) 
                //$(table.body()).on('click', 'td', function () 
                {
                    // console.log("Key:");
                    // console.log(event.key);
                    // console.log("Char:");
                    // console.log(event.char); 
                    // if(event.which !== 13)
                    // {
                    //     return;
                    // }

                    table = $('.dataTable').DataTable();
                    
                    var selected = table.cells(".selected");
                    if(typeof selected === 'undefined' || selected.length === 0)
                    {
                        //return;
                    }

                    if(table.cell(this).length === 0)
                    {
                        return;
                    }
                    console.log(cell);


                    var currentColumnIndex = table.cell(this).index().column;
                    var currentRowIndex = table.cell(this).index().row;

                    console.log(currentColumnIndex);

                    if(currentColumnIndex === 0 || currentRowIndex === 0)
                    {
                        return;
                    }

                    if($(table.cell(this)).hasClass("selected"))
                    {
                        //event.stopPropagation();
                        //return;
                    }

                    // DETERMINE WHAT COLUMNS CAN BE EDITED
                    if ((settings.columns && settings.columns.indexOf(currentColumnIndex) > -1) || (!settings.columns)) 
                    {
                        var row = table.row($(this).parents('tr'));
                        editableCellsRow = row;

                        var cell = table.cell(this).node();
                        var oldValue = table.cell(this).data();
                        // Sanitize value
                        oldValue = sanitizeCellValue(oldValue);

                        // Show input
                        if (!$(cell).find('input').length && !$(cell).find('select').length && !$(cell).find('textarea').length) 
                        {
                            // Input CSS
                            var input = getInputHtml(currentColumnIndex, settings, oldValue);
                            $(cell).html(input.html);
                            if (input.focus) 
                            {
                                $('#ejbeatycelledit').focus();
                            }
                        }
                    }
                });
            }
            
        });

        function getInputHtml(currentColumnIndex, settings, oldValue) 
        {
            var inputSetting, inputType, input, inputCss, confirmCss, cancelCss;

            input = {"focus":true,"html":null}

            if(settings.inputTypes)
            {
                $.each(settings.inputTypes, function (index, setting) 
                {
                    if (setting.column == currentColumnIndex) 
                    {
                        inputSetting = setting;
                        inputType = inputSetting.type.toLowerCase();
                    }
                });
            }
            
            if (settings.inputCss) { inputCss = settings.inputCss; }
            if (settings.confirmationButton)
            {
                confirmCss = settings.confirmationButton.confirmCss;
                cancelCss = settings.confirmationButton.cancelCss;
                inputType = inputType + "-confirm";
            }
            switch (inputType) 
            {
                case "list":
                    input.html = "<select class='" + inputCss + "' onchange='$(this).updateEditableCell(this);'>";
                    $.each(inputSetting.options, function (index, option) 
                    {
                        input.html = input.html + "<option value='" + option.value + "' >" + option.display + "</option>"
                    });
                    input.html = input.html + "</select>";
                    input.focus = false;
                    break;
                case "list-confirm": // List w/ confirm
                    input.html = "<select class='" + inputCss + "'>";
                    $.each(inputSetting.options, function (index, option) 
                    {
                        input.html = input.html + "<option value='" + option.value + "' >" + option.display + "</option>"
                    });
                    input.html = input.html + "</select>&nbsp;<a href='javascript:void(0);' class='" + confirmCss + "' onclick='$(this).updateEditableCell(this);'>Confirm</a> <a href='javascript:void(0);' class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ";
                    input.focus = false;
                    break;
                case "datepicker": //Both datepicker options work best when confirming the values
                case "datepicker-confirm":
                    // Makesure jQuery UI is loaded on the page
                    if (typeof $.ui == 'undefined') 
                    {
                        alert("jQuery UI is required for the DatePicker control but it is not loaded on the page!");
                        break;
                    }
                    $(".datepick").datepicker("destroy");
                    input.html = "<input id='ejbeatycelledit' type='text' name='date' class='datepick " + inputCss + "'   value='" + oldValue + "'></input> &nbsp;<a href='javascript:void(0);' class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a href='javascript:void(0);' class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a>";
                    setTimeout(function () { //Set timeout to allow the script to write the input.html before triggering the datepicker 
                        var icon = "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif";
                        // Allow the user to provide icon 
                        if (typeof inputSetting.options !== 'undefined' && typeof inputSetting.options.icon !== 'undefined') 
                        {
                            icon = inputSetting.options.icon;
                        }
                        var self = $('.datepick').datepicker(
                            {
                                showOn: "button",
                                buttonImage: icon,
                                buttonImageOnly: true,
                                buttonText: "Select date"
                            });
                    },100);
                    break;
                case "text-confirm": // text input w/ confirm
                    input.html = "<input id='ejbeatycelledit' class='" + inputCss + "' value='"+oldValue+"'></input>&nbsp;<a href='javascript:void(0);' class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a href='javascript:void(0);' class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ";
                    break;
                case "undefined-confirm": // text input w/ confirm
                    input.html = "<input id='ejbeatycelledit' class='" + inputCss + "' value='" + oldValue + "'></input>&nbsp;<a href='javascript:void(0);' class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a href='javascript:void(0);' class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a> ";
                    break;
                case "textarea": 
                case "textarea-confirm":
                    input.html = "<textarea id='ejbeatycelledit' class='" + inputCss + "'>"+oldValue+"</textarea><a href='javascript:void(0);' class='" + confirmCss + "' onclick='$(this).updateEditableCell(this)'>Confirm</a> <a href='javascript:void(0);' class='" + cancelCss + "' onclick='$(this).cancelEditableCell(this)'>Cancel</a>";
                    break;            
                default: // text input
                    input.html = "<input id='ejbeatycelledit' class='" + inputCss + "' onfocusout='OnEditableFocusOut(this)' value='" + oldValue + "'></input>";
                    break;
            }
            return input;
        }

        window.OnEditableFocusOut = function(item)
        {
            $(item).updateEditableCell(item);
        }

        function getInputField(callingElement) 
        {
            // Update datatables cell value
            var inputField;
            switch ($(callingElement).prop('nodeName').toLowerCase())
            {
                case 'a': // This means they're using confirmation buttons
                    if ($(callingElement).siblings('input').length > 0)
                    {
                        inputField = $(callingElement).siblings('input');
                    }
                    if ($(callingElement).siblings('select').length > 0)
                    {
                        inputField = $(callingElement).siblings('select');
                    }
                    if ($(callingElement).siblings('textarea').length > 0)
                    {
                        inputField = $(callingElement).siblings('textarea');
                    }
                break;
                default:
                    inputField = $(callingElement);
            }
            return inputField;
        }

        function sanitizeCellValue(cellValue) 
        {
            if (typeof (cellValue) === 'undefined' || cellValue === null || cellValue.length < 1) 
            {
                return "";
            }

            // If not a number
            if (isNaN(cellValue)) 
            {
                // escape single quote
                cellValue = cellValue.replace(/'/g, "&#39;");
            }
            return cellValue;
        }
    }
});    