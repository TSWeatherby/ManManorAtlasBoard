widget = {
    onData: function (el, data) {
        $('.content', el).empty();

        if (data.title) {
            $('h2', el).text(data.title);
        }

        if (!data.events || !data.events.length) {
            $('.content', el).append($("<div>").html("No events found."));
        } else {
            
            this.log (data.events.length + ' calendar events found!'); 

            data.events.forEach(function (event) {
                var eventDiv = $("<div/>").addClass('leave-event');
                $(eventDiv).append($("<div/>").addClass('leave-dates').append(event.startDate + " - " + event.endDate));
                $(eventDiv).append($("<div/>").addClass('leave-summary').append(event.summary));
                $(eventDiv).append($("<div/>").addClass('leave-attendees').append(event.attendees));

                $('.content', el).append(eventDiv);
            });
        }
    }
};