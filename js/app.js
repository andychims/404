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

  var tempo = 200;

  var Sound = function(name, element_id) {
    var self = this;
    self.pattern = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    self.name = name;
    self.sound_element = document.getElementById(element_id);
    sounds.push(self);
  }

  var kick = new Sound("kick", "kick-sound");
  var snare = new Sound("snare", "snare-sound");
  var lowTom = new Sound("low-tom", "low-tom-sound");
  var midTom = new Sound("mid-tom", "mid-tom-sound");
  var highTom = new Sound("high-tom", "high-tom-sound");
  var rimShot = new Sound("rimshot", "rimshot-sound");
  var clap = new Sound("clap", "clap-sound");
  var cowbell = new Sound("cowbell", "cowbell-sound");
  var cymbal = new Sound("cymbal", "cymbal-sound");
  var openHat = new Sound("open-hat", "open-hat-sound");
  var closedHat = new Sound("closed-hat", "closed-hat-sound");


  //
  // init
  //

  var intervalId;

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

  //play button
  $(".play-btn").click(function(){
    intervalId = setInterval(triggerStep, tempo);
  });

  //stop button
  $(".stop-btn").click(stopIt);

  function stopIt(){
    clearInterval(intervalId);
    step = 0;
    $(".counter-on").removeClass("counter-on");
  };

  //sequence pad click
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