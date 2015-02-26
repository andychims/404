$( document ).ready(function() {


  // var Car = function(name) {
  //   var self = this;
  //   self.speed = 0;
  //   self.name = name;

  //   self.beep = function(){
  //     console.log(self.name + " says beep");
  //   }
  // }



  //
  // init
  //


  var sounds = [];

  var tempo = 120;

  var playing;

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

  function playIt(){
    playing = true;
    setTempo(tempo);
  };
  
  function stopIt(){
    clearInterval(intervalId);
    step = 0;
    $(".counter-on").removeClass("counter-on");
    playing = false;
  };

  var intervalId;

  var activeSound = kick;

  var step = 0;

  var preset1 = [[1,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
                  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
                  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1]
                ];

  var preset2 = [[0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0],
                  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
                  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0]
                ];

  var presets = [preset1, preset2];
  var currentPreset = presets[0];

  function loadPreset(currentPreset){
    for(var i = 0; i < sounds.length; i++) {
      sounds[i].pattern = currentPreset[i];
    }
    updatePadUi();
  };

  loadPreset(currentPreset);

  // change preset 
  $('#preset-selector').change(function(){
    var selectValue = $(this).val();
    currentPreset = presets[selectValue];
    loadPreset(currentPreset);
  });


  //start playing on startup
  playIt();

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

  // clear pattern
  $(".clear-pattern").click(function(){
    for(var i = 0; i < sounds.length; i++) {
      sounds[i].pattern = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    $(".pad-on").removeClass("pad-on");
  });

  // start-stop button
  $(".start-stop-btn").click(function(){
    if(playing == true){
      stopIt();
      $(".start-stop-btn").removeClass("playing");
    } else {
      playIt();
      $(".start-stop-btn").addClass("playing");
    }
  });


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


  function setTempo(tempo) {
    timeout = 30000/tempo;
    clearInterval(intervalId);
    if (playing == true) {
      intervalId = setInterval(triggerStep, timeout);
    };
  }

  // tempo dial
  $(".dial").knob({
    'release' : function (v) { 
      tempo = v;
      setTempo(tempo);
    }
  });


  //update pad ui
  function updatePadUi(){
    $(".counter").removeClass('pad-on');

    for(var i = 0; i < activeSound.pattern.length; i++) {
      if (activeSound.pattern[i] == 1) {
        var stepId = "#step" + i.toString();
        $(stepId).addClass("pad-on");
      }
    }
  }

  //switch sound

  $("#sound-selector > button").click(function(){
  // $('#sound-selector').change(function(){

    selectValue = $(this).attr('class');
    $(".sound-selected").removeClass("sound-selected");
    $(this).addClass("sound-selected")
    // selectValue = $(this).val();


    for(var i = 0; i < sounds.length; i++) {
      sound = sounds[i];
      if(sound.name == selectValue) {
        activeSound = sound;
      }
    };

    updatePadUi();

  });



});