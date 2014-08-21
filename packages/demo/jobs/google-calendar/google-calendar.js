var ical = require('ical'),
    _ = require('underscore');

module.exports = function(config, dependencies, job_callback) {
    var maxEntries = config.maxEntries;
    var logger = dependencies.logger;
    var formatDate = function(date) {
        var d = date.getDay();
        var h = date.getHours();
        var M = date.getMinutes();
        var weekday = new Array(7);
        weekday[0]=  "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";
        if(h==0 && M==0){
            return weekday[d];
        }
        else{
            return '' + weekday[d] + ' ' + (h<=9?'0'+h:h) + ':' + (M<=9?'0'+M:M);
        }
    };
    var formatDateEnd = function(date) {
        var d = date.getDay();
        var h = date.getHours();
        var M = date.getMinutes();
        var weekday = new Array(7);
        weekday[0]=  "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";
        if(h==0 && M==0){
            return weekday[d];
        }
        else{
            return '' + (h<=9?'0'+h:h) + ':' + (M<=9?'0'+M:M);
        }
    };

    ical.fromURL(config.calendarUrl, {}, function(err, data){

        if (err){
            logger.error(err);
            job_callback("error loading calendar");
            return;
        }

        var events = _.sortBy(data, function(event) { return event.start; });
        events = _.filter(events, function(event) { return event.end >= new Date(); });

        var result = [];
        var counter = 0;
        events.forEach(function(event) {
            console.log(event);
            if (counter < maxEntries) {
                counter++;
                if(event.start.getDate()==event.end.getDate() && event.start.getFullYear()==event.end.getFullYear() && event.start.getMonth()==event.end.getMonth()){
                    result.push({startDate: formatDate(event.start), endDate: formatDateEnd(event.end), summary: event.summary});
                }
                else{
                    result.push({startDate: formatDate(event.start), endDate: formatDate(event.end), summary: event.summary});
                }
            }
        });

        job_callback(null, {events: result, title: config.widgetTitle});
    });
};