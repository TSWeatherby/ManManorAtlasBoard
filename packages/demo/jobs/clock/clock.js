
module.exports = function (config, dependencies, job_callback) {
	var isStfu = function (date, data) {
		var time = date.getHours() * 100 + date.getMinutes();
		for (var i = 0; i < data.length; i++) {
			var stfuPeriod = data[i];
			if (stfuPeriod.start <= time && stfuPeriod.end >= time) {
				return true;
			}
		}
		return false;
	};

	var prefixZero = function (val) {
		return (val < 10 ? '0' : '') + val;
	};

	Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
	}

	var actDate = new Date();
	if (!config.stfuOnly) {
		var dateStr = prefixZero(actDate.getDate())
		+ '-' + prefixZero(actDate.getMonth()+1)
		+ '-' + actDate.getFullYear();
		
		var oxonDate = "";

		var weekday = new Array(7);
                weekday[0]=  "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";

		if(actDate.getMonth() == 9 || 10 || 11){
			var oxonTerm = "Michaelmas";
			var oxonWeek = actDate.getWeek() - 41;
			oxonDate = weekday[actDate.getDay()] + ", Week " + oxonWeek + ", "+ oxonTerm;
		}
		else if(actDate.getMonth() == 0 || 1 || 2){
			var oxonTerm = "Hilary";
			var oxonWeek = actDate.getWeek() - 2;
			oxonDate = weekday[actDate.getDay()] + ", Week " + oxonWeek + ", "+ oxonTerm;
		}
		else if(actDate.getMonth() == 3 || 4 || 5 || 6){
			var oxonTerm = "Trinity";
			var oxonWeek = actDate.getWeek() - 16;
			oxonDate = weekday[actDate.getDay()] + ", Week " + oxonWeek + ", "+ oxonTerm;
		}


		var dataObj = {
				isStfu: isStfu(actDate, config.stfuHours),
				hour: prefixZero(actDate.getHours()),
				minutes: prefixZero(actDate.getMinutes()),
				dateStr: dateStr,
				oxonDate: oxonDate
		};
	} else {
		var dataObj = {
				isStfu: isStfu(actDate, config.stfuHours)
		};	
	}
	job_callback(null, dataObj);
};
