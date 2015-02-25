
setInterval(triggerStep, 500);

var step = 0;

function triggerStep(){
  console.log(step);

  var activeStepID = "#step"+step.toString();

  $(".counter").removeClass("counter-on");
  $(activeStepID).addClass("counter-on");

  step++;
  if (step > 15) {
    step = 0;
  }
};

$(".pad").click(function(){
  console.log("yoyoyo");
});

// $( ".pad" ).on( "click", function() {
//   console.log("hello");
// });