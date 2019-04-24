
//configs firebase
var config = {
  apiKey: "AIzaSyA-XWhQDo80wcFDhqIUi_RCzpUNHCHEe9w",
  authDomain: "rps-game-f4b84.firebaseapp.com",
  databaseURL: "https://rps-game-f4b84.firebaseio.com",
  projectId: "rps-game-f4b84",
  storageBucket: "rps-game-f4b84.appspot.com",
  messagingSenderId: "867584416085"
};

firebase.initializeApp(config);
console.log(firebase);
var database = firebase.database();



//declares global varibles to firebase
var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";
//clock function in jumbotron
function updateTime(){

  var now = moment();
  var timeDisplay = now.format("hh:mm:ssA");
  clock.textContent = timeDisplay;

}


setInterval(updateTime, 1000);
updateTime();




//submit event listener

$("#submit").on("click", function(event) {

  event.preventDefault();

//takes values from form and saves as variable

  var trainName = $("#trainName").val().trim();
  var destination = $("#Destination").val().trim();
  var trainTime = $("#trainTime").val().trim();
  var frequency = $("#number").val().trim();




//pushes values to firebase
  database.ref().push({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  });


//firebase event listener
  database.ref().on("child_added", function(snapshot) {
//stores data from firebase as variable
  var sv = snapshot.val();

//stores frequencyrecived from user to variable
  var tFrequency = snapshot.val().frequency;

//stores train time recived from user to variable
  var firstTime = snapshot.val().trainTime;

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % tFrequency;


  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
  console.log("ARRIVAL TIME: " + nextTrain);








  var newRow = $('<tr><td>'+ snapshot.val().trainName+'</td><td>'+ snapshot.val().destination+'</td><td>'+ snapshot.val().frequency+'</td><td>'+ nextTrain +'</td><td>'+ tMinutesTillTrain +'</td></tr>');
  $("#set").append(newRow);


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });






});




// at load users are prompted to give their names
//after load enviorment is loaded enciorment includes: timer per round, message center,
// when game is played users have option of rock, papper, siccors
// when one player beats the other increment their score
//
