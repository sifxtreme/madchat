$(document).ready(function(){
  
  if(!id){
    return;
  }

  if(!DetectRTC.isWebRTCSupported){
    $(".notSupported").show();
  }

  var comm = new Icecomm('Wj/UFNkQsiuxf0osF3O0xVVwVoSL8whHAvUCBk0pRu1PPPLL7a')

  var allVideos = [];

  var checkVideos = function(){
    var numberOfVideos = $("video").length;
    if(!numberOfVideos) return;
    
    $("video").css("margin-left", "0");
    $("video").css("margin-right", "0");

    if(isMobile){
      $("video").width("100%");
      return;
    }

    var vWidth = "50%";
    var vMargin = "25%";

    var mainImage = function(elem){
      elem.width(vWidth);
      elem.css("margin-left", vMargin);
      elem.css("margin-right", vMargin);
    }
    
    if(numberOfVideos == 1){
      $("video").width(vWidth);
      $("video").css("margin-left", vMargin);
      $("video").css("margin-right", vMargin);
    }
    else if(numberOfVideos == 2){
      $("video").width(vWidth);
    }
    else if(numberOfVideos == 3){
      $("video").each(function(index){
        $(this).width("25%");
        if(index == 0){
          mainImage($(this));
        }
        else if(index == 1){
          $(this).css("margin-left", "25%");
        }
      });      
    }
    else if(numberOfVideos == 4){
      $("video").each(function(index){
        $(this).width("25%");
        if(index == 0){
          mainImage($(this));
        }
        else if(index == 1){
          $(this).css("margin-left", "12.5%");
        }
      });  
    }
    else{
      $("video").each(function(index){
        $(this).width("33.33%");
        if(index == 0){
          mainImage($(this));
        }
      });
    }
  }

  $("#videos").on("click", "video", function(){
    return;
    if($("video").length){
      var _this = $(this)[0;
      var firstVideo = $("video").first()[0];

      console.log(_this);
      console.log(firstVideo);

      console.log(_this.src)
      console.log(_this.id)

      var tmpSrc = _this.src;
      var tmpID = _this.id;

      _this.src = firstVideo.src;
      _this.id = firstVideo.id;

      console.log(_this);
      console.log(firstVideo);
    }
    
  })

  var addVideo = function(options){
    console.log(options);
    $("#videos").append(options.video);
    checkVideos();
  }

  comm.connect(id, {audio: false})
  comm.on('local', function(options){
    addVideo(options);
  })
  comm.on('connected', function(options){
    addVideo(options);
  });

  comm.on('disconnect', function(options) {
    document.getElementById(options.callerID).remove();
    checkVideos();
  });

  comm.on('data', function(options){
    console.log(options);
  })


})