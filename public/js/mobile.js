$(document).ready(function(){

	var window_size = function() {
		var height = $(window).height();
		var chatMessageHeight = height - 162;
		$('#messages').css('height', chatMessageHeight);
		$('.pad-list-modal').css('height', height);
	}();


	var socialIcons = function(){
		var fbShare = $("#share-facebook");
		if(fbShare.length){
			var fbURL = fbShare.attr("href").replace(/www\.madchat\.me/g, encodeURIComponent(window.location.host + "/" + window.location.pathname));
			fbShare.attr("href", fbURL);			
		}
		var twitterShare = $("#share-twitter");
		if(twitterShare.length){
			var twitterURL = twitterShare.attr("href").replace(/www\.madchat\.me/g, encodeURIComponent(window.location.host + "/" + window.location.pathname));
			twitterShare.attr("href", twitterURL);
		}
		var emailShare = $("share-email");
		if(emailShare.length){
			var emailURL = emailShare.attr("href").replace(/www\.madchat\.me/g, encodeURIComponent(window.location.host + "/" + window.location.pathname));
			emailShare.attr("href", emailURL);
		}
		$("#share-share").click(function(){
			window.prompt("Copy to Clipboard", document.URL);
		});
	}();

	var mobileTabs = function(){

		activateVideo = function(){
			$('.m-pad').addClass('active');
			$('.m-chat').removeClass('active');
			$('.m-share').removeClass('active');
			$('.m-pad-content').show();
			$('.m-chat-content').hide();
			$('.m-share-content').hide();
		}

		$('.m-pad').click(function(){
			activateVideo();
		});	

		activateChat = function(){
			$('.m-chat').addClass('active');
			$('.m-pad').removeClass('active');
			$('.m-share').removeClass('active');
			$('.m-chat-content').show();
			$('.m-pad-content').hide();
			$('.m-share-content').hide();
		}


		$('.m-chat').click(function(){
			activateChat();
		});

		activateShare = function(){
			$(this).addClass('active');
			$('.m-pad').removeClass('active');
			$('.m-chat').removeClass('active');
			$('.m-share-content').show();
			$('.m-pad-content').hide();
			$('.m-chat-content').hide();
		}


		$('.m-share').click(function(){
			activateShare();
		});
		
	}();

	if(!DetectRTC.isWebRTCSupported){
		$(".m-pad").remove();
		$(".m-pad-content").remove();
		$(".tab").width("50%");
		activateChat();
	}
	

});
