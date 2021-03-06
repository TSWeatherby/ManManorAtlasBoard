widget = {
    //runs when we receive data from the job
    onData: function(el, data) {

        //The parameters our job passed through are in the data object
        //el is our widget element, so our actions should all be relative to that
        if (data.title) {
            $('.header', el).html(data.title);
        }
        else{
            $('.header', el).html("You forgot a Title");
        }
        if(data.returnValue>0){
           $('.content', el).html("£ " + data.returnValue); 
        }
        else{
            $('.content', el).html("-£ " + -1*data.returnValue);
        }
    }
};
