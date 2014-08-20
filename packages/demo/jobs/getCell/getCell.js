module.exports = function(config, dependencies, job_callback) {
    var GoogleSpreadsheet = require("google-spreadsheet");

    var my_sheet = new GoogleSpreadsheet('1MFG5jYlhe4AIXjb5haeye0mW_kpZ3XUCxqEBfKzxp_w');

    var out = " ";
    // set auth to be able to edit/add/delete
        my_sheet.setAuth('manmanoroxford@gmail.com','fcT-dUx-W6Z-PGG', function(err) {
            my_sheet.getInfo(function (err, sheet_info) {
                console.log(sheet_info.title + ' is loaded');

                sheet_info.worksheets[0].getRows(function(err, rows){ 
                    console.log(rows[0].title);
                    out = rows[0].title;
                    console.log("Out:" + out)
                    job_callback(null, {returnValue: out, title: config.widgetTitle});
                });
            });
        });

        
}
