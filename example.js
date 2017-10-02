'use strict';

// array to store objects
Goat.allGoats = [];

// make object
function Goat(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  Goat.allGoats.push(this);
};

// Make new image instances
new Goat('Cruisin Goat', 'img/cruisin-goat.jpg');
new Goat('Kissing Goat', 'img/kissing-goat.jpg')
new Goat('Sassy Goat', 'img/sassy-goat.jpg')
new Goat('Smiling Goat', 'img/smiling-goat.jpg')
new Goat('Sweater Goat', 'img/sweater-goat.jpg')




// listener, 'click' element
var imgEl = document.getElementById('goat-pic');
imgEl.addEventListener('click', randomImage);


// randomly display picture
function randomImage() {
  var randomIndex = Math.floor(Math.random() * Goat.allGoats.length);

  imgEl.src = Goat.allGoats[randomIndex].filePath;
}
