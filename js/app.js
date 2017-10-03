'use strict';

// store images
BusPic.all = [];
var random1, random2, random3, counter = 0;
var duplicateCheck = [];
var info = document.getElementById('information');

// image constructor
function BusPic(name, fileName) {
  this.path = 'img/' + fileName;
  this.name = name;
  this.id = fileName.split('.')[0] + (BusPic.all.length);
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

// listener
var imgEl = document.getElementById('random_image');
imgEl.addEventListener('click', vote1);
var imgEl2 = document.getElementById('random_image_2');
imgEl2.addEventListener('click', vote2);
var imgEl3 = document.getElementById('random_image_3');
imgEl3.addEventListener('click', vote3);


function vote1() {
  BusPic.all[random1].votes += 1;
  console.log('name is ' + BusPic.all[random1].name + ': ' + BusPic.all[random1].votes);
  randomize();
}
function vote2() {
  BusPic.all[random2].votes += 1;
  console.log('name is ' + BusPic.all[random2].name + ': ' + BusPic.all[random2].votes);
  randomize();
}
function vote3() {
  BusPic.all[random3].votes += 1;
  console.log('name is ' + BusPic.all[random3].name + ': ' + BusPic.all[random3].votes);
  randomize();
}

function buildData() {
  for (var i = 0; i < BusPic.all.length; i ++) {
    var ulEl = document.createElement('ul');

    var liEl = document.createElement('li');
    liEl.textContent = BusPic.all[i].name;
    ulEl.appendChild(liEl);
    liEl = document.createElement('li');
    liEl.textContent = 'Votes: ' + BusPic.all[i].votes;
    ulEl.appendChild(liEl);
    liEl = document.createElement('li');
    liEl.textContent = 'Displayed: ' + BusPic.all[i].displayed;
    ulEl.appendChild(liEl);
    liEl = document.createElement('li');
    liEl.textContent = 'Percentage: ' + (BusPic.all[i].votes / BusPic.all[i].displayed);
    ulEl.appendChild(liEl);


    info.appendChild(ulEl);
  }
}

function randomize() {
  counter += 1;
  if (counter > 25) {
    info.innerHTML = '';
    console.log('pictures cleared');
    buildData();
  }
  do {
    random1 = Math.floor(Math.random() * BusPic.all.length);
  } while (duplicateCheck.includes(random1));
  do {
    random2 = Math.floor(Math.random() * BusPic.all.length);
  } while (duplicateCheck.includes(random2) || random2 === random1);
  do {
    random3 = Math.floor(Math.random() * BusPic.all.length);
  } while (duplicateCheck.includes(random3) || random3 === random1 || random3 === random2);

  duplicateCheck = [];

  imgEl.src = BusPic.all[random1].path;
  imgEl2.src = BusPic.all[random2].path;
  imgEl3.src = BusPic.all[random3].path;

  BusPic.all[random1].displayed += 1;
  BusPic.all[random2].displayed += 1;
  BusPic.all[random3].displayed += 1;

  duplicateCheck.push(random1);
  duplicateCheck.push(random2);
  duplicateCheck.push(random3);
}

randomize();
