(function($) {
	jQuery.fn.stopwatch = function() {
		var clock = $(this);
		var timer = 0;
		
		clock.addClass('stopwatch');
		
		// This is bit messy, but IE is a crybaby and must be coddled. 
		clock.html('<div class="display"><span class="sec">0</span></div>');
		clock.append('<input type="button" class="start" value="Start" />');
		clock.append('<input type="button" class="stop" value="Stop" />');
		clock.append('<input type="button" class="reverse" value="Reverse" />');
		clock.append('<input type="button" class="reset" value="Reset" />');
		clock.append('<h2 class="log"></h2>');
		
		// We have to do some searching, so we'll do it here, so we only have to do it once.
		var s = clock.find('.sec').first();
		var start = clock.find('.start').first();
		var stop = clock.find('.stop').first();
		var reset = clock.find('.reset').first();
		var reverse = clock.find('.reverse').first();
		var log = clock.find('.log').first();
		
		var logcount = 1;
		
		start.bind('click', function() {
			timer = setInterval(countup, 1000);
		});
		
		stop.bind('click', function() {
			clearInterval(timer);
			timer = 0;
		});
		
		reset.bind('click', function() {
			clearInterval(timer);
			timer = 0;
			s.html('0');
			log.empty();
			logcount = 1;
		});
		
		reverse.bind('click', function() {
			clearInterval(timer);
			log.text(logcount);
			logcount++;
			timer = setInterval(countdown, 1000);
		});
		
		function countup() {
			// parseInt() doesn't work here...
			second = parseFloat(s.text());
			
			second++;
			
			s.html(second);
		}
		
		function countdown() {
			// parseInt() doesn't work here...
			second = parseFloat(s.text());
			
			second--;
			
			s.html(second);
			
			if (second <= 0) {
				clearInterval(timer);
				return start.click();
			}
		}
	}
})(jQuery);
