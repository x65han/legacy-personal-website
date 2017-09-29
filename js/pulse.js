var Pulse = function(){ 
	// Constructor
	console.log("New Pulse Generated!");
	var initialSize = 80;
	var initialOpacity = 1;
	var pulseTimer,size,opacity;
	this.start = function(){
		$('.pulse').removeClass("hidden");
		$('.pulseIcon').removeClass("hidden");
		size = initialSize;
		opacity = initialOpacity;
		this.loop();
	}
	this.stop = function(){
		console.log("STOP emitting signal");
		clearInterval(pulseTimer);
		$('.pulse').addClass("hidden");
		$('.pulseIcon').addClass("hidden");
	}
	this.loop = function(){
		console.log("Emit Pulse");
		pulseTimer = setInterval(function(){
		 	$('.pulse').width(size);
		 	$('.pulse').height(size);
		 	$('.pulse').css("opacity", opacity);
		 	$('.pulseIcon').css("opacity", opacity + (1 - initialOpacity));
		 	size += 0.5;
		 	opacity -= 1/300;
		 	if(size > 250){
		 		opacity = initialOpacity;
		 		size = initialSize; 
		 	}
	 	}, 10);
	}
}