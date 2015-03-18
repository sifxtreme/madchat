$(document).ready(function(){
  var comm = new Icecomm('Wj/UFNkQsiuxf0osF3O0xVVwVoSL8whHAvUCBk0pRu1PPPLL7a')

  var allVideos = [];

  var checkVideos = function(){
    var numberOfVideos = $("video").length;
    if(!numberOfVideos) return;
    
    $("video").css("margin-left", "0");
    $("video").css("margin-right", "0");

    var mainImage = function(elem){
      elem.width("50%");
      elem.css("margin-left", "25%");
      elem.css("margin-right", "25%");
    }
    
    if(numberOfVideos == 1){
      $("video").width("50%");
      $("video").css("margin-left", "25%");
    }
    else if(numberOfVideos == 2){
      $("video").width("50%");
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

  // 380 X 284

  var addVideo = function(options){
    console.log(options);
    $("#videos").append(options.video);
    checkVideos();
  }

  comm.connect(id)
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


})