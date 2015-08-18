var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    initializeTabletopObject('1H5R8DHOhm1BStoUzq68RFMeaaR58moAheBIx6SSHIyE');

});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */

    var tableColumns =   [
		{"mDataProp": "position", "sTitle": "Position Title", "sClass": "center"},
		{"mDataProp": "type", "sTitle": "Type of Internship", "sClass": "center"},
		{"mDataProp": "company", "sTitle": "Company", "sClass": "center"},
		{"mDataProp": "start", "sTitle": "Start Date", "sClass": "center"},
		{"mDataProp": "end", "sTitle": "End Date", "sClass": "center"},
		{"mDataProp": "salary", "sTitle": "Salary", "sClass": "center"},
		{"mDataProp": "url", "sTitle": "Website", "sClass": "center"},
		{"mDataProp": "description", "sTitle": "Description", "sClass": "center"}
	];
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict("#demo").html("<table cellpadding='0' cellspacing='0' border='0' class='display table table-bordered table-striped' id='data-table-container'></table>");

    var oTable = jqueryNoConflict("#data-table-container").dataTable({
        "sPaginationType": "bootstrap",
        "iDisplayLength": 25,
        "aaData": dataSource,
        "aoColumns": createTableColumns(),
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            console.log(aData);
            $("td:eq(6)", nRow).html("<a href='http://" + aData.website + "'>Website</a>");
            return nRow;
        },
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        }
    });

};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort["string-case-asc"]  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort["string-case-desc"] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};
