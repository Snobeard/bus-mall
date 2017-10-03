'use strict';

// store images
BusPic.all = [];
var random1, random2, random3;
var duplicateCheck = [];

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
new BusPic('breakfast', 'breakfast.jpg');
new BusPic('bubblegum', 'bubblegum.jpg');
new BusPic('chair', 'chair.jpg');
new BusPic('cthulhu', 'cthulhu.jpg');
new BusPic('dog duck', 'dog-duck.jpg');
// new BusPic('dragon', 'dragon.jpg');
// new BusPic('pen', 'pen.jpg');
// new BusPic('pet sweep', 'pet-sweep.jpg');
// new BusPic('scissors', 'scissors.jpg');
// new BusPic('shark', 'shark.jpg');
// new BusPic('sweep', 'sweep.png');
// new BusPic('taun taun', 'tauntaun.jpg');
// new BusPic('unicorn', 'unicorn.jpg');
// new BusPic('usb', 'usb.gif');
// new BusPic('water can', 'water-can.jpg');
// new BusPic('wine glass', 'wine-glass.jpg');

// listener
var imgEl = document.getElementById('random_image');
imgEl.addEventListener('click', count1);
var imgEl2 = document.getElementById('random_image_2');
imgEl2.addEventListener('click', count2);
var imgEl3 = document.getElementById('random_image_3');
imgEl3.addEventListener('click', count3);


function count1() {
  BusPic.all[random1].votes += 1;
  randomize();
}
function count2() {
  BusPic.all[random2].votes += 1;
  randomize();
}
function count3() {
  BusPic.all[random3].votes += 1;
  console.log('name is ' + BusPic.all[random3].name + ': ' + BusPic.all[random3].votes);
  randomize();
}

function randomize() {
  do {
    random1 = Math.floor(Math.random() * BusPic.all.length);
    console.log('random 1 trying to compute: ' + random1);
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

  console.log(BusPic.all[random1].name + (BusPic.all[random1].displayed + 1));
  BusPic.all[random1].displayed += 1;
  BusPic.all[random2].displayed += 1;
  BusPic.all[random3].displayed += 1;

  duplicateCheck.push(random1);
  duplicateCheck.push(random2);
  duplicateCheck.push(random3);
}

randomize();
