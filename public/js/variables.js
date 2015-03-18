$(document).ready(function(){
	var isMobile = (document.getElementById("mpIsMobile")) ? document.getElementById("mpIsMobile").value : "";
	id = (document.getElementById("mpID")) ? document.getElementById("mpID").value : "";
	id = id.toLowerCase();

	if(document.getElementById("variables")){
		document.getElementById("variables").remove();
	}

	chatOptions = {
		colorArray: ["#be3333", "#be336e", "#be339f", "#ac33be", "#7e33be", "#4d33be", "#334dbe", "#3385be", "#33acbe", "#33beaf", "#33be85", "#33be47", "#78be33", "#9cbe33", "#bcbe33", "#be9f33", "#be7b33", "#be5733"],
		animalArray: ["panda", "tiger", "cheetah", "gorilla", "monkey", "robin", "toucan", "elephant", "chimp", "sheep", "rooster", "dog", "cow", "chicken", "rabbit", "pig", "horse", "duck", "parrot", "mouse", "puppy", "cat", "lynx", "hamster", "ferret", "warthog", "wolf", "eagle", "owl", "bear", "hedgehog", "fox", "moose", "squirrel"],
		descriptions: ["ancient", "friendly", "cuddly", "malicious", "cute", "mean", "smelly", "adorable", "burly", "clumsy", "bitter", "diligent", "electric", "hopeful", "honored", "innocent", "jumbo", "mysterious", "neglected", "plump", "striking", "vivacious", "playful", "feisty", "messy", "loud", "nosy", "sassy", "curious", "tenacious", "fierce", "stubborn", "lazy", "bossy", "candid", "grumpy", "picky", "energetic", "loving", "smart", "noisy", "vicious", "helpful", "jealous"],
		randomize: function(){
			var description = this.descriptions[Math.floor(Math.random() * this.descriptions.length)];
			var animal = this.animalArray[Math.floor(Math.random() * this.animalArray.length)];
			return {
				id: Math.random(),
				color: this.colorArray[Math.floor(Math.random() * this.colorArray.length)],
				animal: animal,
				name: description+"-"+animal
			}
		}
	}

	userData = chatOptions.randomize();

	// global socket object
	madpadSocket = io();
	madpadSocket.emit('room', {room: id, user: userData});

});
