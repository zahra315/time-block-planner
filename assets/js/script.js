var timeDisplayEl = document.getElementById("time-display");


// Date and Time
displayTime = () => {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.innerHTML = rightNow;
  }
  setInterval(displayTime, 1000);


