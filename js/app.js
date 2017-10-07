'use strict';

// store images
Bus.all = [];
Bus.allVotes = [];
Bus.allDisplayed = [];
Bus.allNames = [];
var random1, random2, random3;
var duplicateCheck = [];
var info = document.getElementById('information');
var totalClicks = 0; // eslint-disable-line
var localBusVotes, localBusDisplayed, localClicks;

if (!localStorage.busVotes) {
  localBusVotes = [];
} else {
  localBusVotes = JSON.parse(localStorage.busVotes);
}
if (!localStorage.totalClicks) {
  localClicks = 0;
} else {
  localClicks = parseInt(localStorage.totalClicks);
}

// image constructor
function Bus(name, fileName) {
  this.path = 'img/' + fileName;
  this.name = name;
  this.alt = fileName.split('.')[0] + (Bus.all.length);
  this.votes = 0;
  this.displayed = 0;
  Bus.all.push(this);
}

// new images
new Bus('Bag', 'bag.jpg');
new Bus('Banana', 'banana.jpg');
new Bus('Bathroom', 'bathroom.jpg');
new Bus('Boots', 'boots.jpg');
new Bus('Breakfast', 'breakfast.jpg');
new Bus('Bubblegum', 'bubblegum.jpg');
new Bus('Chair', 'chair.jpg');
new Bus('Cthulhu', 'cthulhu.jpg');
new Bus('Dog Duck', 'dog-duck.jpg');
new Bus('Dragon', 'dragon.jpg');
new Bus('Pen', 'pen.jpg');
new Bus('Pet Sweep', 'pet-sweep.jpg');
new Bus('Scissors', 'scissors.jpg');
new Bus('Shark', 'shark.jpg');
new Bus('Sweep', 'sweep.png');
new Bus('Taun Taun', 'tauntaun.jpg');
new Bus('Unicorn', 'unicorn.jpg');
new Bus('Usb', 'usb.gif');
new Bus('Water Can', 'water-can.jpg');
new Bus('Wine Glass', 'wine-glass.jpg');


function vote(event) { //
  for (var i = 0; i < Bus.all.length; i ++) {
    if (event.target.alt === Bus.all[i].alt) {
      break;
    }
  }
  addVote(i);
}

function addVote(selected) {
  totalClicks += 1;

  Bus.all[random1].displayed += 1; // adds a  +1 counter to each image that was shown
  Bus.all[random2].displayed += 1;
  Bus.all[random3].displayed += 1;

  Bus.all[selected].votes += 1; // adds vote to image selected

  console.log('name is ' + Bus.all[selected].name + ': ' + Bus.all[selected].votes); // console log for selected validation
  randomize(); // creates random image for all three sections
}

function buildData() { // eslint-disable-line
  for (var i = 0; i < Bus.all.length; i ++) { // cycles through images
    var ulEl = document.createElement('ul'); // creates unordered list

    var liEl = document.createElement('li'); // create list element
    liEl.textContent = Bus.all[i].name; // add the name for each image
    ulEl.appendChild(liEl); // adds the created name list to the unordered list
    liEl = document.createElement('li');
    liEl.textContent = Bus.all[i].votes + ' vote(s) for the ' + Bus.all[i].name; // adds votes for each image
    ulEl.appendChild(liEl);
    liEl = document.createElement('li');
    liEl.textContent = 'Displayed: ' + Bus.all[i].displayed; // adds times displayed
    ulEl.appendChild(liEl);
    liEl = document.createElement('li');
    liEl.textContent = 'Percentage: ' + ((Bus.all[i].votes / Bus.all[i].displayed) * 100).toFixed(2) + '%'; // adds percentage given from votes and times displayed
    ulEl.appendChild(liEl);

    info.prepend(ulEl); // attaches entire unorodered list created to 'information' ID
  }
}

function randomize() {
  if (totalClicks >= 25) { // when 25 cycles are met.
    info.removeChild(imagesDisplayed); // clears the images window
    console.log('pictures cleared'); // acknowledgement
    submitResults(); // creates lists for each picture responding name/votes/times displayed/and percentage.
  } else {

    do {
      random1 = Math.floor(Math.random() * Bus.all.length); // randomly geneerates number in the bus pictures array
    } while (duplicateCheck.includes(random1)); // checks if the number is a duplicate
    do {
      random2 = Math.floor(Math.random() * Bus.all.length);
    } while (duplicateCheck.includes(random2) || random2 === random1); // checks if the second random picture is that same as the first or is a duplicate
    do {
      random3 = Math.floor(Math.random() * Bus.all.length);
    } while (duplicateCheck.includes(random3) || random3 === random1 || random3 === random2); // dupliacte and newly created image comparison check

    duplicateCheck = []; // clears duplicate checker

    imgEl.src = Bus.all[random1].path; // changes the three source images to the newly generated ones
    imgEl2.src = Bus.all[random2].path;
    imgEl3.src = Bus.all[random3].path;
    imgEl.alt = Bus.all[random1].alt;
    imgEl2.alt = Bus.all[random2].alt;
    imgEl3.alt = Bus.all[random3].alt;

    duplicateCheck.push(random1); // adds picture chosen to an array so it won't be duplicated
    duplicateCheck.push(random2);
    duplicateCheck.push(random3);
  }
}

// event listeners
var imgEl = document.getElementById('random_image');
imgEl.addEventListener('click', vote);
var imgEl2 = document.getElementById('random_image_2');
imgEl2.addEventListener('click', vote);
var imgEl3 = document.getElementById('random_image_3');
imgEl3.addEventListener('click', vote);

randomize(); // runs starter images

function submitResults() {
  Bus.allVotes = [];
  Bus.allDisplayed = [];
  Bus.allNames = [];
  for (var i = 0; i < Bus.all.length; i ++){
    Bus.allVotes.push(Bus.all[i].votes);
    Bus.allDisplayed.push(Bus.all[i].displayed);
    Bus.allNames.push(Bus.all[i].name);

    if (isNaN(localBusVotes[i])) {
      localBusVotes[i] = 0 + Bus.all[i].votes;
    } else {
      localBusVotes[i] = localBusVotes[i] + Bus.all[i].votes;
    }
  };


  localClicks = localClicks + totalClicks;
  localStorage.totalClicks = JSON.stringify(localClicks);
  localStorage.busVotes = JSON.stringify(localBusVotes);

  document.getElementById('resultsChart').style.display = 'show'; // display chart
  document.getElementById('information').style.backgroundColor = '#fffbf5'; // set chart background color to white
  buildChart();
}

// run Chart
function buildChart() {
  var ctx = document.getElementById('resultsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Bus.allNames,
      datasets: [{
        label: 'Votes out of ' + localClicks,
        data: localBusVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      },
      {
        label: 'Times displayed out of ' + localClicks,
        data: localBusVotes,
        backgroundColor: [
        ],
        borderColor: [
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero:true,
          }
        }]
      }
    }
  });
}
