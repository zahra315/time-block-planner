var timeDisplayEl = document.getElementById("time-display");
var currentTime = parseInt(moment().format("H"));
var savedEvents = [];

// Date and Time
displayTime = () => {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.innerHTML = rightNow;
  }
  setInterval(displayTime, 1000);

  var loadSavedEvents = () => {
    savedEvents = JSON.parse(localStorage.getItem("events")) || [];
  
}; 

// work grid
for (var i = 9; i <= 17; i++) {

  var timeRowEl = $("<div>").addClass("row time-block");
  var timeObj = moment().hour(i);
  var timeText = moment(timeObj).format("dddd hA");    
  if (i == 17) {
      var timeBlockEl =  $("<div>").addClass("col-2 col-md-1 hour").attr("style", "border-bottom: 1px dashed #000000").text(timeText);
  } else {
      var timeBlockEl = $("<div>").addClass("col-2 col-md-1 hour").text(timeText);
  }


  (i < currentTime) ? highlightClass = "past" : (i == currentTime) ? highlightClass = "present" : highlightClass = "future";
  
  var eventBlock = $("<textarea>").addClass("col-8 col-md-10 description eventBlock " + highlightClass);

  
  loadSavedEvents();
  $.each(savedEvents, (index, savedEventItem) =>{
      (savedEventItem.time == timeText) ? eventBlock.text(savedEventItem.event) : "";
      });

  var saveBtn = $("<div>").addClass("col-2 col-md-1 saveBtn p-4").html('<i class="far fa-save"></i>');

  timeRowEl.append(timeBlockEl, eventBlock, saveBtn);

  $(".container").append(timeRowEl);
};


// Save Button Event
$(".saveBtn").hover(() =>{
  $(this).html('<i class="fas fa-save"></i>');},
  () =>{$(this).html('<i class="far fa-save"></i>');
  },
);


$(".saveBtn").on("click", function() {

  var text = $(this).siblings(".description").val().trim();
  var eventTime = $(this).siblings(".hour").text();
  eventObj = {
      time: eventTime,
      event: text
  };
  for (var i = 0; i < savedEvents.length; i++) {
      if (savedEvents[i].time == eventTime) {
          savedEvents.splice(i, 1);
      };
  };
  savedEvents.push(eventObj);
  saveEvents();
});


var saveEvents = () =>{
  localStorage.setItem("events", JSON.stringify(savedEvents));
};



loadSavedEvents(); 