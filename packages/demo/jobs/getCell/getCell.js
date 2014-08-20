var ical = require('ical'),
    _ = require('underscore');

module.exports = function(config, dependencies, job_callback) {
    var GoogleSpreadsheet = require("google-spreadsheet");

    var my_sheet = new GoogleSpreadsheet('1MFG5jYlhe4AIXjb5haeye0mW_kpZ3XUCxqEBfKzxp_w');

    // without auth -- read only
    // # is worksheet id - IDs start at 1

    my_sheet.getRows(
        1, function(err, row_data){
            console.log( 'pulled in '+row_data.length + ' rows ')
        }
    );
    var out = " ";
    // set auth to be able to edit/add/delete
        my_sheet.setAuth('manmanoroxford@gmail.com','fcT-dUx-W6Z-PGG', function(err) {
            my_sheet.getInfo(function (err, sheet_info) {
                console.log(sheet_info.title + ' is loaded');

                // use worksheet object if you want to forget about ids

                sheet_info.worksheets[0].getRows(
                    function (err, rows) {
                        out = rows[0];
                    })
            });


            /*// column names are set by google based on the first row of your sheet
            my_sheet.addRow(2, { colname: 'col value'});

            my_sheet.getRows(
                2, {
                    start: 100,            // start index
                    num: 100            // number of rows to pull
                },
                function (err, row_data) {
                    // do something...
                });*/
        });

        job_callback(null, {output: out, title: config.widgetTitle});
}
