var current = "home-section";
var masterWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var pulseManager;
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
$(document).ready(function() {
	linkedinRequest();
	if(masterWidth > 767)loadProjects(true);
	pulseManager = new Pulse();
	setTimeout(kickOff, 2000);
	jQuery.easing.def = "easeInOutSine";
    $(".mainbar").bind('scroll', function() {
    	//current scrolling position
    	var position = $('.mainbar').scrollTop();
    	//scroll top button
    	if((position/300) < 1.1){
    		$('.daydayup').css('opacity',position/300);
    		if((position/300) < 0.4){
	    		$('.daydayup').addClass('hidden');
	    	}else{
	    		$('.daydayup').removeClass('hidden');
	    	}
    	}
        //guidance scrolling
        if(position < 0.79 && $(window).innerWidth() > 800) {
        	$( ".navigation-button" ).trigger( "click" );
        }
        //update
        if(determine() != current) {
        	current = determine();
        	console.log('Zone Reporting: ' + current + '  ' + $(('.' + current)).position().top);
        }
        // Enable on spot animation
    	onSpotAnimation();
    	// Reset Preview
	    if($('.preview').hasClass('hidden') == false) preview(false);
    });
    // return to main screen from navigation
	$('.mainbar').css("transition", "transform 0.4s ease-out");
    $(window).click(function(event) {
    	if($('.mainbar').hasClass("perspective") == true && event.pageY > 100){
    		flip("back");
    		$('.mainbar').animate({scrollTop : 3},300);
    	}
    });
    //key stroke detection
    document.body.onkeydown = function(e) {
        var ev = e || event;var key = ev.keyCode;
        console.log("Key Pressed: " + key);
        if(key == 27) preview(false);
    }
    //hover dir
    $('.static-grid').height($('.static-grid').width() + "px");
    $('.sub-grid').each(function() {$(this).hoverdir({hoverDelay : 0});});
    // On spot animation Setup
    setTimeout(function(){
        $(".home-title").css('transform','none');
	}, 300);
	$('.soft-skills-one'  ).css("transform","translateY(-100px) scale(.1,.1) translateX(" +  2 * $('.soft-skills-one').width() + "px)");
	$('.soft-skills-two'  ).css("transform","translateY(-100px) scale(.1,.1) translateX(" +  2 * $('.soft-skills-one').width() + "px)");
	$('.soft-skills-three').css("transform","translateY(-100px) scale(.1,.1) translateX(" + -2 * $('.soft-skills-one').width() + "px)");
	$('.soft-skills-four' ).css("transform","translateY(-100px) scale(.1,.1) translateX(" + -2 * $('.soft-skills-one').width() + "px)");
});
$(document).on( "mousemove", function(event) {
	if(document.getElementsByClassName('mainbar')[0].className=='mainbar perspective')return;
	var pers = $('.home-title').width();
	var x = (20*( event.pageX - (innerWidth/2) ) / (innerWidth/2)).toFixed(2) * 1;
	var y = (20*( event.pageY - (innerHeight/2) ) / (innerHeight/2)).toFixed(2) * -1;
	var perx = ((50*( event.pageX - (innerWidth/2) ) / (innerWidth/2)).toFixed(2) * -1) + 55;
	var pery = ((50*( event.pageY - (innerHeight/2) ) / (innerHeight/2)).toFixed(2) * -1) + 50;
	$('.home-title').css('perspective', pers + 'px');
	if($(window).innerWidth() < 800){x=0;y=0;}
	$(".mainbar").css("background-position",(perx) + "% " + pery + "%");
	$('.home-title-inner').css('transform','rotateX(' + y + 'deg) rotateY(' + x + 'deg)');
});
function determine(){
	if(get(0) <= 0 && get(1) >=10) return 'dummy';
	if(get(1) <= 0 && get(2) >=10) return 'about-me-section';
	if(get(2) <= 0 && get(3) >=10) return 'skills-section';
	if(get(3) <= 0 && get(4) >=10) return 'experience-section';
	if(get(4) <= 0 && get(5) >=10) return 'education-section';
	if(get(5) <= 0 && get(6) >=10) return 'contact-me-section';
	return 'credit-section';
}
function get(number){
	if(number == 0)  return $('.dummy').position().top;
	if(number == 1)  return $('.about-me-section').position().top;
	if(number == 2)  return $('.skills-section').position().top;
	if(number == 3)  return $('.experience-section').position().top;
	if(number == 4)  return $('.education-section').position().top;
	if(number == 5)  return $('.contact-me-section').position().top;
	if(number == 6)  return $('.credit-section').position().top;
	if(number == 99) return 7;
}
function navReset(){
	var default_color = 'lightgrey';
	$('#nav-home'      ).css('color',default_color);
	$('#nav-skills'    ).css('color',default_color);
	$('#nav-about-me'  ).css('color',default_color);
	$('#nav-education' ).css('color',default_color);
	$('#nav-experience').css('color',default_color);
	$('#nav-contact-me').css('color',default_color);
}
function navClick(refs){
	if($('.mainbar').hasClass("perspective") == false) return;
	flip('navgiation clicked: ' + refs);
	location.href = refs;
	document.getElementById('mainbar').scrollTop += 2;
}
function navSet(section){
	navReset();
	var default_color = 'orangered';
	if(section == 'home-section'){
		document.getElementById('nav-home').style.color = default_color;
	}
	if(section == 'linkedin'){document.getElementById('nav-home').style.color = default_color;}
	if(section == 'about-me-section'){document.getElementById('nav-about-me').style.color = default_color;}
	if(section == 'skills-section'){document.getElementById('nav-skills').style.color = default_color;}
	if(section == 'experience-section'){document.getElementById('nav-experience').style.color = default_color;}
	if(section == 'education-section'){document.getElementById('nav-education').style.color = default_color;}
	if(section == 'contact-me-section'){document.getElementById('nav-contact-me').style.color = default_color;}
	if(section == 'credit-section'){document.getElementById('nav-contact-me').style.color = default_color;}
}
function flip(message){
	if(!isChrome)return;
	console.log('FLIPPP: ' + message + $('.mainbar').scrollTop());
	navSet(current);
	var main = document.getElementsByClassName('mainbar')[0];
	var button = document.getElementsByClassName('navigation-button')[0];
	var html = document.getElementsByTagName('html')[0];
	if($('.mainbar').hasClass("perspective") == false){
		html.style.backgroundColor = '#333';
		main.style.transform = 'rotateX(-7deg) translateY(100px)';
		main.className = 'mainbar perspective';
		main.style.opacity = '0.6';
		main.style.pointerEvents = 'none';
		pulseManager.start();
		main.style.overflowY = 'hidden';
		button.style.color = 'orangered';
		button.style.overflow = 'hidden';
		button.style.top = '5vh';
		button.style.borderRadius = '50%';
		setTimeout(function(){button.style.transform = 'rotate(90deg) scale(1.4,1.4)'; }, 200);
		navSet(current);
	}else if($('.mainbar').hasClass("perspective") == true){
		html.style.backgroundColor = 'transparent';
		pulseManager.stop();
		button.style.overflow = 'initial';
		button.style.borderRadius = '0px';
		button.style.color = 'green';
		button.style.transform = 'rotate(0deg)';
		main.style.overflowY = 'scroll';
		main.style.pointerEvents = 'initial';
		main.style.opacity = '1';
		main.style.transform = '';
		main.className = 'mainbar';
	}
}
function goToTopOfPage(){
	console.log('Top Button Clicked');
	$('.daydayup').attr('class','fa fa-arrow-up fa-3x daydayup');
    $('.mainbar').animate({scrollTop : 3},300);
    $('.daydayup').css('animation','none');
    setTimeout(function(){
	    $('.daydayup').css('top','-10vh');
	}, 200);
	setTimeout(function(){
	    hoverTopOfPage(false);
	    $('.daydayup').addClass('hidden');
	}, 500);
}
function hoverTopOfPage(scenario){
	if(scenario == true){//yes animation
		$('.daydayup').attr('class','fa fa-globe fa-3x daydayup');
		$('.daydayup').css('font-size','5em');
		$('.daydayup').css('animation','rotating 20s infinite linear');
	}else{
		$('.daydayup').attr('class','fa fa-chevron-circle-up fa-3x daydayup');
		$('.daydayup').css('font-size','3em');
	    $('.daydayup').css('top','85vh');
		$('.daydayup').css('animation','none');
	}
}
function sweet(specialMessage){
	swal(specialMessage, '', "error");
    $('.sweet-alert').css('margin','auto');
    $('.sweet-alert').css('position','fixed');
    $('.sweet-alert').css('border-radius','12px');
    $('.sweet-alert').css('top','calc(50vh - 100px)');
    $('.sweet-alert').css('transform','translate(-50%, -50%)');
}
function secret_send(){
	var name = document.getElementById("form-name").value; console.log(name);
	var email = document.getElementById("form-email").value;	console.log(email);
	var message = document.getElementById("form-message").value;	console.log(message);
	if(name.length <= 1){
		console.log('name too short');
		sweet('name too short');
		return;
	}else if(name == ''){
		console.log('name cannot be empty');
		sweet('name cannot be empty');
		return;
	}else if(email ==''){
		console.log('email cannot be empty');
		sweet('email cannot be empty');
		return;
	}else if(email .length <= 4){
		console.log('email too short. Has to be at least *@.*');
		sweet('email too short. Has to be at least *@.*');
		return;
	}else if(message.length < 5){
		console.log('message is too short');
		sweet('message is too short');
		return;
	}

	var violation = false;
	for(var x = 0; x < email.length; x++)	if(email[x] == '@') violation = true;
	if(violation == false) {
		console.log('email has to contain @');
		sweet('email has to contain @');
		return;
	}

	violation = false;
	for(var x = 0; x < email.length; x++)if(email[x] == '.') violation = true;
	if(violation == false){
		console.log('email has to contain . period');
		sweet('email has to contain . period');
		return;
	}

	var violation = false;
	for(var x = 0; x < email.length; x++)if(email[x] == '@' && email[x+1] != '.') violation = true;
	if(violation == false){
		console.log('email has to have valid hosting such as @gmail.com');
		sweet('email has to have valid hosting such as @gmail.com');
		return;
	}
	console.log('passed all validations');
	sweet('You will be directed to another site. Press back to return');
	$( ".secret-send" ).trigger( "click" );
	document.getElementById("form-name").value ='';
	document.getElementById("form-email").value ='';
	document.getElementById("form-message").value ='';
}
function kickOff(){

	// Instant setup
	$('.loading-page').remove();
	$(".loading-arc").addClass('bdcc');
	console.log('<><><><>><>><kick off <><><><><><><><><>><><');
	// Show Main Screen
	setTimeout(function(){
		$('.mainbar').css('visibility','visible');
		$('.mainbar').animate({scrollTop : 3},100);
	}, 600);

	// Kill loading screen		
	setTimeout(function(){
		$('.loading-arc').remove();
	}, 1200);

}
window.onresize = function(event){
	masterWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	preview(false);
	if(masterWidth <= projectFaithLimit)	loadProjects(false);
}
function preview(scenario){
	if(scenario == true && $('.preview').hasClass('hidden') == true) {
		if(window.innerWidth < 500 || window.innerHeight < 600) return;
		$('.preview').css('width','400px');
		$('.preview').css('opacity','1');
		$('.preview').css('height','400px');
		$('.preview').animate({scrollTop : 1},1);
		$('.mainbar').css('filter','blur(5px)');
		$('.preview').removeClass('hidden');
		$('.PreviewCaption').removeClass('hidden');
		$('.preview-dismiss').removeClass('hidden');
		$('.preview').animate({scrollTop : 120},5000);
		document.getElementsByClassName('ericsson-container')[0].title = '';
	}else if(scenario == false){
		document.getElementsByClassName('ericsson-container')[0].title = 'Ericsson Inc. Canada';
		$('.preview').css('width','0px');
		$('.preview').css('height','0px');
		$('.preview').css('opacity','0');
		setTimeout(function(){
			$('.preview-dismiss').addClass('hidden');
			$('.mainbar').css('filter','blur(0px)');
			$('.PreviewCaption').addClass('hidden');
			$('.preview').addClass('hidden');
		}, 200);
	}
}
function isBottom() {
	var total = document.getElementById('mainbar').scrollHeight;
	var view = document.getElementById('mainbar').offsetHeight;
	var scroll = $('.mainbar').scrollTop();
	if(view + scroll + 100 > total){console.log('IsBottom = TRUE');return true;}
	else return false;
}
function isInView(ele,adjustment){
	var value = $(ele)[0].getBoundingClientRect().top-document.getElementById('mainbar').offsetHeight - adjustment;
	if (value < 0) return true;
	else return false;
}
var flashingLarge = 0;
var flashingSmall = 0;
function linkedinRequest(){
	var input = window.location.href.toLowerCase();
	if(input.slice(input.length - 8) == "linkedin")
		window.location.href = "http://www.lnked.in/johnsonhan";
	else if(input.slice(input.length - 6) == "resume"){
		window.location.href = "http://www.johnsonhan.com/assets/Resume.pdf";
	}
}
function onSpotAnimation(){
	linkedinRequest();
    $('.static-grid').height($('.static-grid').width() + "px");
	if((isInView('.projects',-400) || isBottom()) && projectVirgin == true){
			sprayCards(projectAngleBig);
			projectVirgin = false;
	}
	if( (isInView('.language-container',0) || isBottom()) && !($('.language-container').hasClass('triggered')) ){
		$('.language-container').addClass("triggered");
		$('.language-progress-bar').css("transition","all 0s linear, width 1.5s linear");
		document.getElementsByClassName('language-progress-bar')[0].style.width = '96%';
	  	document.getElementsByClassName('language-progress-bar')[1].style.width = '96%';
	  	document.getElementsByClassName('language-progress-bar')[2].style.width = '60%';
	   	//flashing digits animation & tear-down script
	   	if(masterWidth > 767){

	   		$('.flashingDivLarge').css("transform","scale(2,2)");
			$('.flashingDivSmall').css("transform","scale(2,2)");

		   	var digitalFlashingTimer = setInterval(function(){
		   		// Increment
				flashingLarge ++;
				if(flashingSmall < 60)	flashingSmall ++;

				if(flashingLarge < 10){
					$('.flashingDivLarge').html(flashingLarge + "%");
					$('.flashingDivSmall').html(flashingSmall + "%");
				}else if(flashingLarge > 96){
					$('.flashingDivLarge').css("transform","scale(1,1)");
					$('.flashingDivSmall').css("transform","scale(1,1)");
				  	clearTimeout(digitalFlashingTimer);
				}
				else{
				  	$('.flashingDivLarge').html(flashingLarge + "%");
					$('.flashingDivSmall').html(flashingSmall + "%");
				}
			}, 10);
	   }
    }
    if( (isInView('.contact-form', -300) || isBottom()) && ($('.contact-form').hasClass('setup') == true) ){
    	$('.contact-form').removeClass("setup");
    	$('.contact-form').css("transform","scaleX(1)");
    }
    if(isInView('.profile-img' ,0) || isBottom()){
		$('.profile-img').css('border' ,'5px solid white');
		$('.profile-img').css('box-shadow' ,'orangered 0px 0px 0px 5px');
    }
    if((isInView('.home-icon',0) || isBottom()) && $('.home-icon').css('font-size') != "34px"){
    	$('.home-icon').css('font-size','34px');
    	$('.home-icon').css('line-height','48px');
    	$('.home-description').css('font-size','18px');
    }
    if((isInView('.soft-skills-one', -200) || isBottom()) && $('.soft-skills-one').hasClass("pre")){
    	$('.soft-skills-one').removeClass("pre");
		$('.soft-skills-one').css('transform','');
		$('.soft-skills-two').css('transform','');
		setTimeout(function(){$('.soft-skills-text').css('transform','scaleX(1)');}, 800);
    }
    if((isInView('.soft-skills-three', -200) || isBottom()) && $('.soft-skills-three').hasClass("pre")){
    	$('.soft-skills-three').removeClass("pre");
		$('.soft-skills-three').css('transform','');
		$('.soft-skills-four').css('transform','');
		setTimeout(function(){$('.soft-skills-text').css('transform','scaleX(1)');}, 800);
    }
    if(isInView('.contact-icon-bar',0) || isBottom()){
		$('.contact-icon-bar').css('font-size','64px');
		$('.contact-icon-bar').children().css("width", "91px");
    }
    if( (isInView('.waterloo-container', -300) || isBottom()) && $('.WaterlooIcon').hasClass('bb') == false){
    	$('.waterloo-container').css('transition','2s');
     	$('.WaterlooIcon').addClass('bb');
    	$('.WaterlooCaption').css('transform','scaleX(1)');
    	$('.WaterlooIcon').css('transform','');
    }
    if( (isInView('.semiahmoo-container', -300) || isBottom()) && $('.SemiahmooIcon').hasClass('bb') == false ){
    	$('.semiahmoo-container').css('transition','2s');
     	$('.SemiahmooIcon').addClass('bb');
    	$('.SemiahmooCaption').css('transform','scaleX(1)');
    	$('.SemiahmooIcon').css('transform','');
    }
    if( (isInView('.blackberry-container', -300) || isBottom()) && $('.BlackBerryIcon').hasClass('bb') == false ){
    	$('.blackberry-container').css('transition','2s');
     	$('.BlackBerryIcon').addClass('bb');
    	$('.BlackBerryCaption').css('transform','scaleX(1)');
    	$('.BlackBerryIcon').css('transform','');
    }
    if( (isInView('.ericsson-container', -300) || isBottom()) && $('.EricssonIcon').hasClass('bb') == false ){
    	$('.ericsson-container').css('transition','2s');
     	$('.EricssonIcon').addClass('bb');
    	$('.EricssonCaption').css('transform','scaleX(1)');
    	$('.EricssonIcon').css('transform','');
    }
    if( (isInView('.printable', 0) || isBottom()) && $('.printable').hasClass('printed') == false ){
    	$('.printable').addClass('printed');
    	$('.printable').addClass('fast-cursor');
    	$('.printable').css('height', "26px");
    	var operation = $('.printable').attr("text1") *  3 - 2;
    	var len  = $('.printable').attr("text1").length;
    	var duration = 1500;
    	var x = 0;

    	while(x < len){
    		setTimeout(function(){
    			$('.printable').css('color',"green");
		    	$('.printable').css('background-color',"green");
    			var index = $('.printable').html().length;
    			var text = $('.printable').attr("text1");
    			$('.printable').html($('.printable').html() + text[index]);
    		}, duration/len*(x++));
    	}

    	while(x < len * 2){
    		setTimeout(function(){
    			var text = $('.printable').html();
    			if(text.length < 0) return;
    			text = text.slice(0, text.length - 3);
    			$('.printable').html(text);
    		}, duration/len*(x++));
    	}
    	
    	while(x < len * 3){
    		setTimeout(function(){
    			$('.printable').css('color',"green");
		    	$('.printable').css('background-color',"transparent");
    			var index = $('.printable').html().length;
    			var text = $('.printable').attr("text2");
    			if(text[index] == undefined) return;
    			$('.printable').html($('.printable').html() + text[index]);
    		}, duration/len*(x++));
    	}
    	setTimeout(function(){
    			$('.printable').removeClass("fast-cursor");
    			$('.printable').addClass("slow-cursor");
		}, duration/len*x);
    }
}

function showLinkedIn(showRecommendations){
	if(showRecommendations == true)
		window.open("http://www.lnked.in/johnsonhan#recommendations");
	else
		window.open("http://www.lnked.in/johnsonhan");
	/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	www.lnked.in/johnsonhan
	www.lnkdin.me/johnsonhan
	=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
}
function openExternalLink(url){
	window.open(url);
}
function showEricsson(){
	window.open('http://www.ericsson.com/ca/');
}
// google-analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-77350416-1', 'auto');
ga('send', 'pageview');
