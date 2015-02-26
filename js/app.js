$( document ).ready(function() {


  // var Car = function(name) {
  //   var self = this;
  //   self.speed = 0;
  //   self.name = name;

  //   self.beep = function(){
  //     console.log(self.name + " says beep");
  //   }
  // }

  var sounds = [];

  var Sound = function(name, element_id) {
    var self = this;
    self.pattern = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    self.name = name;
    self.sound_element = document.getElementById(element_id);
    sounds.push(self);
  }

  var kick = new Sound("kick", "kick-sound");
  var snare = new Sound("snare", "snare-sound");
  var hihat = new Sound("hihat", "hihat-sound");

  //
  // init
  //

  setInterval(triggerStep, 500);

  var activeSound = kick;

  var step = 0;

  //
  //behavior every beat
  //

  function triggerStep(){

    var activeStepID = "#step"+step.toString();

    $(".counter").removeClass("counter-on");
    $(activeStepID).addClass("counter-on");


    for (var i=0; i < sounds.length; i++) {
      sound = sounds[i];
      if(sound.pattern[step] == 1) {
        sound.sound_element.currentTime = 0;
        sound.sound_element.play();
      } 
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


    $(".counter").removeClass('pad-on');

    for(var i = 0; i < sounds.length; i++) {
      sound = sounds[i];
      if(sound.name == selectValue) {
        activeSound = sound;
      }
    }

    //update ui
    for(var i = 0; i < activeSound.pattern.length; i++) {
      if (activeSound.pattern[i] == 1) {
        var stepId = "#step" + i.toString();
        $(stepId).addClass("pad-on");
      }
    }


  });



});