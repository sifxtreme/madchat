$(document).ready(function(){

	var madpadChat = {
		
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
			
			var chatUserName = messageObject.user.name;
			var whichClass = 'user';
			if(messageObject.user.id == userData.id){
				chatUserName = 'me';
			}
			else{
				whichClass = 'other-user';
				if(!chatUserName){
					if(messageObject.unknown && messageObject.unknown.name){
						chatUserName = messageObject.unknown.name;
					}
				}
			}

			// create message html
			var msgDiv = document.createElement('div');
			msgDiv.className = whichClass;
			var msgAreaDiv = document.createElement('div');
			msgAreaDiv.className = 'message-area';

			var msgAvatarDiv = document.createElement('div');
			msgAvatarDiv.id = 'ccc';
			msgAvatarDiv.className = 'avatar chat-avatar';
			msgAreaDiv.appendChild(msgAvatarDiv);			

			var msgContentDiv = document.createElement('div');
			msgContentDiv.className = 'content';
			msgContentDiv.innerHTML = message;
			var nameDiv = document.createElement('div');
			nameDiv.className = 'name';
			nameDiv.innerHTML = chatUserName;
			msgContentDiv.appendChild(nameDiv);
			msgAreaDiv.appendChild(msgContentDiv);

			if(!messageObject.user.profileId){
				msgAvatarDiv.style.backgroundImage = "url('/images/chat/animals/"+messageObject.user.animal+".png')";
				msgAvatarDiv.style.backgroundColor = messageObject.user.color;
			}
			else{
				msgAvatarDiv.style.backgroundImage = "url('"+messageObject.user.picture+"')";
			}

			msgDiv.appendChild(msgAreaDiv);
			$('#messages').append(msgDiv);
			
			this.scrollDown();
	 		
		},

		sendMessages: function(){
			$('.message-input').keypress(function(e){
				/* allows enter to send messages and shift enter to make new line */
				if(e.which == 13 && !e.shiftKey){
					$(this).submit();
					return false;
				}
			});
		},

		run: function(){
			this.sendMessages();
		},

	};
	madpadChat.run();



	// submitting to chat
	$('.madpadChatForm').submit(function(){
		var msg = $('#m').val();
		if(msg == '') return false;

		var msgObject = {
			room: id,
			message: msg,
			user: userData,
		};

		madpadSocket.emit('chat', msgObject);
		$('#m').val('');
		var oldName = msgObject.user.name;
		msgObject.user.name = "me";
		madpadChat.appendChat(msgObject);
		msgObject.user.name = oldName;
		return false;
	});

	// functions to change icons in chat header
	var recentChatters = {
		clearOut: function(){
			// clear out chat header
			$('.avatar-list ul').empty();
		},
		createPersonNode: function(user){
			// create a person node in the chat header
			var li = document.createElement('li');
			li.className = 'tooltip';
			li.setAttribute('name', user.username);
			var img = document.createElement('img');
			user.picture = user.picture.replace('&amp;', '&');
			img.src = user.picture;
			img.className = 'avatar-user';
			if(user.color) img.style.backgroundColor = user.color;
			li.appendChild(img);
			$('.avatar-list ul').append(li);
		},
		createPlusNode: function(names){
			// if we have more than a certain amount of people create a +X chat header node
			var li = document.createElement('li');
			li.className = 'tooltip tooltips';
			li.setAttribute('name', names.join("\n"));
			var p = document.createElement('p');
			p.innerHTML = "+"+names.length;
			li.appendChild(p);
			$('.avatar-list ul').append(li);
		},
		createAllPeople: function(){
			// create all people nodes for chat header

			if(typeof this.formattedData !== 'object') return;

			this.clearOut();
			this.formatData();

			var peopleNumber = this.formattedData.length;
			var extraPeople = [];
			var extraPerson = [];

			for(var i=0; i < peopleNumber; i++){
				var singlePerson = this.formattedData[i];
				
				var animal, color, name;
				if(singlePerson.user && typeof singlePerson.user.name !== 'undefined'){
					animal = singlePerson.user.animal;
					color = singlePerson.user.color;
					name = singlePerson.user.name;
				}

				var userData = {
					username: name,
					picture: '/images/chat/animals/' + animal + '.png',
					color: color
				}
				extraPerson = userData;

				// we only want to allow 3 people in the chat header
				if(i < 3){
					this.createPersonNode(userData);
				}
				else{
					if(singlePerson.user.name && typeof singlePerson.user.name !== 'undefined'){
						extraPeople.push(singlePerson.user.name);
					}
				}

			}

			// if we only have one extra person add them
			if(extraPeople.length == 1){
				this.createPersonNode(extraPerson);
			}
			// if we have more do a +2 type node
			else if(extraPeople.length > 1){
				this.createPlusNode(extraPeople);
			}

		},
		people: [],
		formattedData: [],
		formatData: function(){
			// format data so that owner and self are first
			var tmpArray = [];
			var self = [];
			
			var getUniques = function(arr) {
		    var hash = {}, result = [];
		    for ( var i = 0, l = arr.length; i < l; ++i ) {
		    	var uniqueId = arr[i].user.id;
	        if ( !hash.hasOwnProperty(uniqueId) ) { //it works with objects! in FF, at least
            hash[uniqueId] = true;
            result.push(arr[i]);
	        }
		    }
		    return result;
			}

			var peopleCopy = this.people;

			for(var i=0; i<peopleCopy.length; i++){
				var p = peopleCopy[i];
				// push logged in self
				if(p.user.id && p.user.id == userData.id){
					self.push(p);
				}
				else{
					tmpArray.push(p);
				}
			}

			// filter out duplicates
			tmpArray = getUniques(tmpArray);

			// we want self to be first
			if(self[0]){
				tmpArray.unshift(self[0]);
			}

			this.formattedData = tmpArray;

		},
		addPerson: function(data){
			this.people.push({user: data.user, socketID: data.socketID});
		},
		removePerson: function(socketID){
			for(var i=0; i < this.people.length; i++){
				if(this.people[i].socketID == socketID){
					this.people.splice(i,1);
				}
			}
		},
	};

	// we initially joined chat and are seeing all the people in the chat room
	madpadSocket.on('chatPeople', function(data){
		recentChatters.people = data;
		recentChatters.createAllPeople();
	});

	// user joined chat
	madpadSocket.on('chatJoined', function(data){
		recentChatters.addPerson(data);
		recentChatters.createAllPeople();
	});

	// user left chat
	madpadSocket.on('chatLeft', function(data){
		recentChatters.removePerson(data);
		recentChatters.createAllPeople();
	});
	
	// receiving chat object from socket
	madpadSocket.on('chatSent', function(data){
		madpadChat.appendChat(data);
	});

});
