'use strict';

// store images
BusPic.all = [];
var random1, random2, random3;
var duplicateCheck = [];
var info = document.getElementById('information');
var totalClicks = 0; // eslint-disable-line


// image constructor
function BusPic(name, fileName) {
  this.path = 'img/' + fileName;
  this.name = name;
  this.alt = fileName.split('.')[0] + (BusPic.all.length);
  this.votes = 0;
  this.displayed = 0;
  BusPic.all.push(this);
}

// new images
new BusPic('Bag', 'bag.jpg');
new BusPic('Banana', 'banana.jpg');
new BusPic('Bathroom', 'bathroom.jpg');
new BusPic('Boots', 'boots.jpg');
new BusPic('Breakfast', 'breakfast.jpg');
new BusPic('Bubblegum', 'bubblegum.jpg');
new BusPic('Chair', 'chair.jpg');
new BusPic('Cthulhu', 'cthulhu.jpg');
new BusPic('Dog Duck', 'dog-duck.jpg');
new BusPic('Dragon', 'dragon.jpg');
new BusPic('Pen', 'pen.jpg');
new BusPic('Pet Sweep', 'pet-sweep.jpg');
new BusPic('Scissors', 'scissors.jpg');
new BusPic('Shark', 'shark.jpg');
new BusPic('Sweep', 'sweep.png');
new BusPic('Taun Taun', 'tauntaun.jpg');
new BusPic('Unicorn', 'unicorn.jpg');
new BusPic('Usb', 'usb.gif');
new BusPic('Water Can', 'water-can.jpg');
new BusPic('Wine Glass', 'wine-glass.jpg');



function vote(event) { //
  for (var i = 0; i < BusPic.all.length; i ++) {
    if (event.target.alt === BusPic.all[i].alt) {
      console.log(BusPic.all[i] + ' is the event');
      break;
    }
  }
  addVote(i);
}

function addVote(selected) {
  totalClicks += 1;

  BusPic.all[random1].displayed += 1; // adds a  +1 counter to each image that was shown
  BusPic.all[random2].displayed += 1;
  BusPic.all[random3].displayed += 1;

  BusPic.all[selected].votes += 1; // adds vote to image selected

  console.log('name is ' + BusPic.all[selected].name + ': ' + BusPic.all[selected].votes); // console log for selected validation
  randomize(); // creates random image for all three sections
}

function buildData() {
  for (var i = 0; i < BusPic.all.length; i ++) { // cycles through images
    var ulEl = document.createElement('ul'); // creates unordered list

    var liEl = document.createElement('li'); // create list element
    liEl.textContent = BusPic.all[i].name; // add the name for each image
    ulEl.appendChild(liEl); // adds the created name list to the unordered list
    liEl = document.createElement('li');
    liEl.textContent = BusPic.all[i].votes + ' vote(s) for the ' + BusPic.all[i].name; // adds votes for each image
    ulEl.appendChild(liEl);
    liEl = document.createElement('li');
    liEl.textContent = 'Displayed: ' + BusPic.all[i].displayed; // adds times displayed
    ulEl.appendChild(liEl);
    liEl = document.createElement('li');
    liEl.textContent = 'Percentage: ' + ((BusPic.all[i].votes / BusPic.all[i].displayed) * 100).toFixed(2) + '%'; // adds percentage given from votes and times displayed
    ulEl.appendChild(liEl);


    info.appendChild(ulEl); // attaches entire unorodered list created to 'information' ID
  }
}

function randomize() {
  if (totalClicks >= 5) { // when 25 cycles are met.
    info.innerHTML = ''; // clears the images window
    console.log('pictures cleared'); // acknowledgement
    buildData(); // creates lists for each picture responding name/votes/times displayed/and percentage.
  }
  do {
    random1 = Math.floor(Math.random() * BusPic.all.length); // randomly geneerates number in the bus pictures array
  } while (duplicateCheck.includes(random1)); // checks if the number is a duplicate
  do {
    random2 = Math.floor(Math.random() * BusPic.all.length);
  } while (duplicateCheck.includes(random2) || random2 === random1); // checks if the second random picture is that same as the first or is a duplicate
  do {
    random3 = Math.floor(Math.random() * BusPic.all.length);
  } while (duplicateCheck.includes(random3) || random3 === random1 || random3 === random2); // dupliacte and newly created image comparison check

  duplicateCheck = []; // clears duplicate checker

  imgEl.src = BusPic.all[random1].path; // changes the three source images to the newly generated ones
  imgEl2.src = BusPic.all[random2].path;
  imgEl3.src = BusPic.all[random3].path;
  imgEl.alt = BusPic.all[random1].alt;
  imgEl2.alt = BusPic.all[random2].alt;
  imgEl3.alt = BusPic.all[random3].alt;

  duplicateCheck.push(random1); // adds picture chosen to an array so it won't be duplicated
  duplicateCheck.push(random2);
  duplicateCheck.push(random3);
}

// event listeners
var imgEl = document.getElementById('random_image');
imgEl.addEventListener('click', vote);
var imgEl2 = document.getElementById('random_image_2');
imgEl2.addEventListener('click', vote);
var imgEl3 = document.getElementById('random_image_3');
imgEl3.addEventListener('click', vote);

randomize(); // runs starter images
