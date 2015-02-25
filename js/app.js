$( document ).ready(function() {


  // var Car = function(name) {
  //   var self = this;
  //   self.speed = 0;
  //   self.name = name;

  //   self.beep = function(){
  //     console.log(self.name + " says beep");
  //   }
  // }

  var Sound = function(name, element_id) {
    var self = this;
    self.pattern = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    self.name = name;
    self.sound_element = document.getElementById(element_id);
  }

  var kick = new Sound("kick", "kick-sound");
  var snare = new Sound("snare", "snare-sound");

  //
  // init
  //

  setInterval(triggerStep, 500);

  var activeSound = kick
  var activePattern = kick.pattern;

  var step = 0;

  //
  //behavior every beat
  //

  function triggerStep(){

    var activeStepID = "#step"+step.toString();

    $(".counter").removeClass("counter-on");
    $(activeStepID).addClass("counter-on");

    if(kick.pattern[step] == 1) {
      kick.sound_element.currentTime = 0;
      kick.sound_element.play();
    } 

    if(snare.pattern[step] == 1) {
      snare.sound_element.currentTime = 0;
      snare.sound_element.play();
    }     

    step++;
    if (step > 15) {
      step = 0;
    }
  };

  //
  // ui linking
  //

  //pad click
  $(".pad").click(function(){
    $(this).find(".counter").toggleClass("pad-on");
    var pad_number = $(this).attr('rel');

    if (activeSound.pattern[pad_number] == 1) {
      activeSound.pattern[pad_number] = 0;
    } else {
      activeSound.pattern[pad_number] = 1;
    }

  });

  //switch sound
  $('#sound-selector').change(function(){
    // $('a[rel="nofollow self"]')

    selectValue = $(this).val();
    if (selectValue == 'kick') {
      activeSound = kick;
    } else if (selectValue == 'snare') {
      activeSound = snare;
    }

    //update ui
    $(".counter").removeClass('pad-on');
    for(var i = 0; i < activeSound.pattern.length; i++) {
      if (activeSound.pattern[i] == 1) {
        var stepId = "#step" + i.toString();
        console.log(stepId);
        $(stepId).addClass("pad-on");
      }
    }

  });



});