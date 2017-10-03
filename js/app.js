'use strict';

// store images
BusPic.all = [];
var count = 0;

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
// new BusPic('Boots', 'boots.jpg');
// new BusPic('breakfast', 'breakfast.jpg');
// new BusPic('bubblegum', 'bubblegum.jpg');
// new BusPic('chair', 'chair.jpg');
// new BusPic('cthulhu', 'cthulhu.jpg');
// new BusPic('dog duck', 'dog-duck.jpg');
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
imgEl.addEventListener('click', randomize);
var imgEl2 = document.getElementById('random_image_2');
imgEl2.addEventListener('click', randomize);
var imgEl3 = document.getElementById('random_image_3');
imgEl3.addEventListener('click', randomize);
// imgEl3.addEventListener('click', test);




function randomize() {
  count += 1;
  var reset = [];
  var random1 = Math.floor(Math.random() * BusPic.all.length);
  // console.log('random 1: ' + random1);
  do {
    var random2 = Math.floor(Math.random() * BusPic.all.length);
    // console.log('random 2: ' + random2);
  } while (random2 === random1);
  do {
    var random3 = Math.floor(Math.random() * BusPic.all.length);
    // console.log('random 3: ' + random3);
  } while (random3 === random1 || random3 === random2);
  // console.log('1,2,3 - ' + random1 + random2 + random3);
  imgEl.src = BusPic.all[random1].path;
  imgEl.alt = BusPic.all[random1].name;
  imgEl2.src = BusPic.all[random2].path;
  imgEl3.src = BusPic.all[random3].path;

  console.log(BusPic.all[random1].name + (BusPic.all[random1].displayed + 1));
  BusPic.all[random1].displayed += 1;
}
