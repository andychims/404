$( document ).ready(function() {

  setInterval(triggerStep, 500);

  var kick_element = document.getElementById("kick-sound");

  var step = 0;

  var kick_pattern = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  function triggerStep(){

    var activeStepID = "#step"+step.toString();

    $(".counter").removeClass("counter-on");
    $(activeStepID).addClass("counter-on");

    if(kick_pattern[step] == 1) {
      kick_element.currentTime = 0;
      kick_element.play();
    } else { 
      // console.log("no kick");
    }

    step++;
    if (step > 15) {
      step = 0;
    }
  };

  $(".pad").click(function(){
    $(this).find(".counter").toggleClass("pad-on");
    var pad_number = $(this).attr('rel');
    if (kick_pattern[pad_number] == 1) {
      kick_pattern[pad_number] = 0;
    } else {
      kick_pattern[pad_number] = 1;
    }
  });
});

// $( ".pad" ).on( "click", function() {
//   console.log("hello");
// });