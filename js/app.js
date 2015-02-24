
setInterval(triggerStep, 500);

var step = 0;

function triggerStep(){
  console.log(step);
  step++;
  if (step > 15) {
    step = 0;
  }
}