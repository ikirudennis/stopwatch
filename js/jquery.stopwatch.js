(function($) {
	jQuery.fn.stopwatch = function( options ) {
		var settings = $.extend( {
			'displaytime' : false,
		}, options);
		var clock = $(this);
		var timer = 0;

		clock.addClass('stopwatch');

		// This is bit messy, but IE is a crybaby and must be coddled. 
		clock.append('<div class="display"><span id="sec">0</span><span id="hms">00:00:00</span></div>');
		clock.append('<input type="button" id="start" value="Start" />');
		clock.append('<input type="button" id="pause" value="Pause" />');
		clock.append('<input type="button" id="reverse" value="Reverse" />');
		clock.append('<input type="button" id="reset" value="Reset" />');
		clock.append('<h2 id="log"></h2>');

		// We have to do some searching, so we'll do it here, so we only have to do it once.
		var s = clock.find('#sec');
		var hms = clock.find('#hms');
		var start = clock.find('#start');
		var pause = clock.find('#pause').css('visibility', 'hidden');
		var reset = clock.find('#reset').css('visibility', 'hidden');
		var reverse = clock.find('#reverse').css('visibility', 'hidden');
		var log = clock.find('#log');

		var logcount = 1;

		if (settings.displaytime) {
			s.hide();
		} else {
			hms.hide();
		}

		var direction = countup;

		start.click(function() {
			timer = setInterval(direction, 1000);
			start.css('visibility', 'hidden');
			pause.css('visibility', 'visible');
			reverse.css('visibility', 'visible');
			reset.css('visibility', 'visible');
		});

		pause.click(function() {
			clearInterval(timer);
			timer = 0;
			start.css('visibility', 'visible');
			pause.css('visibility', 'hidden');
			reset.css('visibility', 'visible');
		});

		reverse.click(function() {
			clearInterval(timer);
			log.text(logcount);
			logcount++;
			if (direction == countup) {
				direction = countdown;
			}
			else {
				direction = countup;
			}
			timer = setInterval(direction, 1000);
			start.css('visibility', 'hidden');
			pause.css('visibility', 'visible');
			reverse.css('visibility', 'visible');
			reset.css('visibility', 'visible');
		});

		reset.click(function() {
			clearInterval(timer);
			timer = 0;
			s.html('0');
			hms.html('00:00:00');
			log.empty();
			logcount = 1;
			direction = countup;
			start.css('visibility', 'visible');
			pause.css('visibility', 'hidden');
			reverse.css('visibility', 'hidden');
			reset.css('visibility', 'hidden');
		});

		function secToTime(sec) {
			var h = Math.floor( sec / ( 60 * 60 ) );
			h = (h < 10) ? '0' + h : h;
			var mmod = sec % ( 60 * 60 );
			var m = Math.floor( mmod / 60 );
			m = (m < 10) ? '0' + m : m;
			var smod = sec % 60;
			var s = Math.ceil( smod );
			s = (s < 10) ? '0' + s : s;
			var hms = [h, m, s].join(':');
			return hms;
		}

		function countup() {
			// parseInt() doesn't work here...
			second = parseFloat(s.text());

			second++;

			s.html(second);
			hms.html(secToTime(second));
		}

		function countdown() {
			// parseInt() doesn't work here...
			second = parseFloat(s.text());

			second--;

			s.html(second);
			hms.html(secToTime(second));

			if (second <= 0) {
				clearInterval(timer);
				direction = countup;
				return start.click();
			}
		}
	}
})(jQuery);
