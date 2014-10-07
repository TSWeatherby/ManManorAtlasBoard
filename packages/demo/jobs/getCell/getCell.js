module.exports = function(config, dependencies, job_callback) {
    var GoogleSpreadsheet = require("google-spreadsheet");
    var math = require('mathjs');

    var my_sheet = new GoogleSpreadsheet('1MFG5jYlhe4AIXjb5haeye0mW_kpZ3XUCxqEBfKzxp_w');

    var out = " ";
    // set auth to be able to edit/add/delete
        my_sheet.setAuth('manmanoroxford@gmail.com','fcT-dUx-W6Z-PGG', function(err) {
            my_sheet.getInfo(function (err, sheet_info) {
                console.log(sheet_info.title + ' is loaded');

                sheet_info.worksheets[0].getRows(function(err, rows){ 
                    out = rows[config.row].title;
                    var out = out.toString();
                    var blah = 3.14;
                    blah = parseFloat(out);
                    blah = blah.toFixed(2);
                    job_callback(null, {returnValue: blah, title: config.widgetTitle});
                });
            });
        });

        
}
