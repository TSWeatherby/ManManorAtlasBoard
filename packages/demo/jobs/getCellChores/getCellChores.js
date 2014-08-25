module.exports = function(config, dependencies, job_callback) {
    var GoogleSpreadsheet = require("google-spreadsheet");

    var my_sheet = new GoogleSpreadsheet('1CcNRTfqG2feSMZWFR8fAg0RC13Wvdr9cW8Q5lV27FDI');

    var out = " ";
    // set auth to be able to edit/add/delete
        my_sheet.setAuth('manmanoroxford@gmail.com','fcT-dUx-W6Z-PGG', function(err) {
            my_sheet.getInfo(function (err, sheet_info) {
                console.log(sheet_info.title + ' is loaded');

                var today = new Date();
                d = today.getDay();
                var weekday = new Array(7);
                weekday[0]=  "sunday";
                weekday[1] = "monday";
                weekday[2] = "tuesday";
                weekday[3] = "wednesday";
                weekday[4] = "thursday";
                weekday[5] = "friday";
                weekday[6] = "saturday";

                sheet_info.worksheets[0].getRows(function(err, rows){

                    var meal = rows[0][weekday[d]]; 
                    var cook = rows[1][weekday[d]];
                    var clean = rows[2][weekday[d]];
                    var extras = rows[3][weekday[d]];
                    var mealTomorrow = rows[0][weekday[(d+1)%7]]; 
                    var cookTomorrow = rows[1][weekday[(d+1)%7]];
                    var cleanTomorrow = rows[2][weekday[(d+1)%7]];
                    var extrasTomorrow = rows[3][weekday[(d+1)%7]];

                    job_callback(null, {meal: meal, cook: cook, clean: clean , extras: extras, mealTomorrow: mealTomorrow, cookTomorrow: cookTomorrow, cleanTomorrow: cleanTomorrow, extrasTomorrow: extrasTomorrow, title: config.widgetTitle, request: config.request});
                });
            });
        });

        
}
