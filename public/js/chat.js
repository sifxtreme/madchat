madpadChat = {
	scrollDown: function(){
		$('#messages').stop().animate({
		  scrollTop: $("#messages")[0].scrollHeight
		}, 800);
	},

	replaceEmoticons: function(str){
		var emoticons = [
			{regex: /O:\)/g, image: 'angel'},
			{regex: /O:-\)/g, image: 'angel'},
			{regex: />:\(/g, image: 'angry'},
			{regex: />:-\(/g, image: 'angry'},
			{regex: /\(baseball\)/g, image: 'baseball'},
			{regex: /\(basketball\)/g, image: 'basketball'},
			{regex: /\(bear\)/g, image: 'bear'},
			{regex: /\(beer\)/g, image: 'beer'},
			{regex: /\^.\^/g, image: 'bigsmile'},
			{regex: /\(bomb\)/g, image: 'bomb'},
			{regex: /\(cat\)/g, image: 'cat'},
			{regex: /\(cheers\)/g, image: 'cheers'},
			{regex: /:-\//g, image: 'confused'},
			{regex: /;\(/g, image: 'crying'},
			{regex: /;-\(/g, image: 'crying'},
			{regex: /\(devil\)/g, image: 'devil'},
			{regex: /\(dog\)/g, image: 'dog'},
			{regex: /\(dragon\)/g, image: 'dragon'},
			{regex: /X-D/g, image: 'ecstatic'},
			{regex: /XD/g, image: 'ecstatic'},
			{regex: /:\|/g, image: 'eh'},
			{regex: /\(elsa\)/g, image: 'elsa'},
			{regex: /\(fire\)/g, image: 'fire'},
			{regex: /\(football\)/g, image: 'football'},
			{regex: /\(frog\)/g, image: 'frog'},
			{regex: /\(futbol\)/g, image: 'futbol'},
			{regex: /\(ghost\)/g, image: 'ghost'},
			{regex: /8-\)/g, image: 'glasses'},
			{regex: /8\)/g, image: 'glasses'},
			{regex: /:\)/g, image: 'happy'},
			{regex: /:-\)/g, image: 'happy'},
			{regex: /<3/g, image: 'heart'},
			{regex: /:-\*/g, image: 'kiss'},
			{regex: /:\*/g, image: 'kiss'},
			{regex: /\(koala\)/g, image: 'koala'},
			{regex: /\(lightning\)/g, image: 'lightning'},
			{regex: /\(monkey\)/g, image: 'monkey'},
			{regex: /\(octopus\)/g, image: 'octopus'},
			{regex: /:o/g, image: 'oh'},
			{regex: /:O/g, image: 'oh'},
			{regex: /:-o/g, image: 'oh'},
			{regex: /:-O/g, image: 'oh'},
			{regex: /-_-/g, image: 'okay'},
			{regex: /\(panda\)/g, image: 'panda'},
			{regex: /\(poop\)/g, image: 'poop'},
			{regex: /\(rabbit\)/g, image: 'rabbit'},
			{regex: /:D/g, image: 'reallyhappy'},
			{regex: /:-D/g, image: 'reallyhappy'},
			{regex: /\(riceball\)/g, image: 'riceball'},
			{regex: /\:\(/g, image: 'sad'},
			{regex: /\:-\(/g, image: 'sad'},
			{regex: /\(santa\)/g, image: 'santa'},
			{regex: /\(snow\)/g, image: 'snow'},
			{regex: /\(snowman\)/g, image: 'snowman'},
			{regex: /\(stuart\)/g, image: 'stuart'},
			{regex: /\(sun\)/g, image: 'sun'},
			{regex: /\(tennis\)/g, image: 'tennis'},
			{regex: /\(tiger\)/g, image: 'tiger'},
			{regex: /\(toothless\)/g, image: 'toothless'},
			{regex: /:p/g, image: 'tongue'},
			{regex: /:P/g, image: 'tongue'},
			{regex: /:-p/g, image: 'tongue'},
			{regex: /:-P/g, image: 'tongue'},
			{regex: /\;p/g, image: 'tongue-wink'},
			{regex: /\;P/g, image: 'tongue-wink'},
			{regex: /\;-p/g, image: 'tongue-wink'},
			{regex: /\;-P/g, image: 'tongue-wink'},
			{regex: /\(tup\)/g, image: 'thumbsup'},
			{regex: /\(tdown\)/g, image: 'thumbsdown'},
			{regex: /\(water\)/g, image: 'water'},
			{regex: /\(whale\)/g, image: 'whale'},
			{regex: /o\.o/g, image: 'what'},
			{regex: /O\.O/g, image: 'what'},
			{regex: /;\)/g, image: 'wink'},
			{regex: /;-\)/g, image: 'wink'},
			{regex: /\(seenoevil\)/g, image: 'seenoevil'},
			{regex: /\(hearnoevil\)/g, image: 'hearnoevil'},
			{regex: /\(speaknoevil\)/g, image: 'speakoevil'},
		]

		for(var i = 0; i<emoticons.length; i++){
			str = str.replace(emoticons[i].regex,
				'<img style="width: 18px;" src="/images/emoticons/' + emoticons[i].image + '.png"/>');
		}

		return str;
	},

 	prepareChatMessage: {
 		convertLinks: function(str){
			return Autolinker.link(str);
 		},
 		convertLineBreaks: function(str){
 			return str.replace(/\r\n|\r|\n/g,"<br />");
 		},
 	},

 	appendChat: function(messageObject){
 		var message = this.prepareChatMessage.convertLineBreaks(messageObject.message);
		message = this.replaceEmoticons(message);
		message = this.prepareChatMessage.convertLinks(message);
		
		var whichClass;
		if(messageObject.name == "me"){
			whichClass = 'user';
		}
		else{
			whichClass = 'other-user';
		}

		var messageToAppend = "<div class='" + whichClass + "'><div class='message-area'>";
		if(messageObject.profileId == ""){
			messageToAppend += '<div style="background:'+ messageObject.picture.color +' url(\'/images/chat/animals/'+ messageObject.picture.animal +'.png\') no-repeat center center; background-size: 44px 44px;" class="avatar"></div>';	
		}
		else{
			messageToAppend += '<div style="background:url('+ messageObject.picture +') no-repeat center center; background-size: 44px 44px" class="avatar"></div>';
		}
		
		messageToAppend += '<div class="content">' + message +'<div class="name">' + messageObject.name + '</div></div></div></div>';
		
		$('#messages').append(messageToAppend);
		
		this.scrollDown();
 		
	}

}