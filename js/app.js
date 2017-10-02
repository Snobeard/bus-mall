'use strict';

BusPic.all = [];

function BusPic(fileName) {
  this.path = 'img/' + fileName;
  this.name =
  this.id = fileName.split('.')[0] + (Bus.all.length);
  this.votes = 0;
  this.displayed = 0;
  BusPic.all.push(this);
}

new BusPic('Bag', 'bag.jpg');
new BusPic('Banana', 'banana.jpg');
new BusPic('Bathroom', 'bathroom.jpg');
new BusPic('Boots', 'boots.jpg');
new BusPic('breakfast', 'breakfast.jpg');
new BusPic('bubblegum', 'bubblegum.jpg');
new BusPic('chair', 'chair.jpg');
new BusPic('cthulhu', 'cthulhu.jpg');
new BusPic('dog duck', 'dog-duck.jpg');
new BusPic('dragon', 'dragon.jpg');
new BusPic('pen', 'pen.jpg');
new BusPic('pet sweep', 'pet-sweep.jpg');
new BusPic('scissors', 'scissors.jpg');
new BusPic('shark', 'shark.jpg');
new BusPic('sweep', 'sweep.png');
new BusPic('taun taun', 'tauntaun.jpg');
new BusPic('unicorn', 'unicorn.jpg');
new BusPic('usb', 'usb.gif');
new BusPic('water can', 'water-can.jpg');
new BusPic('wine glass', 'wine-glass.jpg');
