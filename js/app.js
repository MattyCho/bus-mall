'use strict';

// Global Variables
const productSelectorElem = document.getElementById('threeProducts');
const leftImgElem = document.getElementById('leftProductImg');
const centerImgElem = document.getElementById('centerProductImg');
const rightImgElem = document.getElementById('rightProductImg');
const leftH3Elem = document.getElementById('leftProductH3');
const centerH3Elem = document.getElementById('centerProductH3');
const rightH3Elem = document.getElementById('rightProductH3');
const productUlElem = document.getElementById('productVotes');
let voteCounter = 0;
Product.allProducts = [];
let leftProduct = null;
let centerProduct = null;
let rightProduct = null;

// Constructor Function
function Product(name, image) {
  this.name = name;
  this.image = image;
  this.timesShown = 0;
  this.votes = 0;
  Product.allProducts.push(this);
}


// Prototype methods
Product.prototype.renderSingleProduct = function(imgPosition, h3Position) {
  imgPosition.src = this.image;
  h3Position.textContent = this.name;
}

// Global functions
function renderProducts() {
  let leftProductIndex = Math.floor(Math.random() * Product.allProducts.length);
  leftProduct = Product.allProducts[leftProductIndex];
  let centerProductIndex = Math.floor(Math.random() * Product.allProducts.length);
  centerProduct = Product.allProducts[centerProductIndex];
  let rightProductIndex = Math.floor(Math.random() * Product.allProducts.length);
  rightProduct = Product.allProducts[rightProductIndex];

  while (centerProduct === leftProduct ||centerProduct === rightProduct || rightProduct === leftProduct) {
    centerProductIndex = Math.floor(Math.random() * Product.allProducts.length);
    centerProduct = Product.allProducts[centerProductIndex];
    rightProductIndex = Math.floor(Math.random() * Product.allProducts.length);
    rightProduct = Product.allProducts[rightProductIndex];
  }

  leftProduct.renderSingleProduct(leftImgElem, leftH3Elem);
  centerProduct.renderSingleProduct(centerImgElem, centerH3Elem);
  rightProduct.renderSingleProduct(rightImgElem, rightH3Elem);
}

function renderResults() {
  productUlElem.innerHTML = '';
  let ulTitleElem = document.createElement('h2');
  ulTitleElem.textContent = 'Voting Results:'
  productUlElem.appendChild(ulTitleElem);
  for (let product of Product.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.votes}`;
    productUlElem.appendChild(liElem);
  }
}

function handleClick(event) {
  let id = event.target.id
  if (id === 'leftProductImg' || id === 'centerProductImg' || id === 'rightProductImg') {
    if (id === 'leftProductImg') {
      leftProduct.votes++;  
    } else if (id === 'centerProductImg') {
      centerProduct.votes++;
    } else {
      rightProduct.votes++;
    }
  } else {
    alert('Please click on a picture');
  }
  voteCounter++;
  renderProducts();
  if (voteCounter === 10) {
    renderResults();
    productSelectorElem.removeEventListener('click', handleClick);
  }
  console.log(voteCounter);
}

// Event Listener
productSelectorElem.addEventListener('click', handleClick);

// Call functions
new Product('R2D2 Travel Luggage', './img/bag.jpg');
new Product('Banana Slicer', './img/banana.jpg');
new Product('Bathroom Tablet Holder', './img/bathroom.jpg');
new Product('Open-toed Rainboots', './img/boots.jpg');
new Product('All-in-one Breakfast Machine', './img/breakfast.jpg');
new Product('Meatball Bubble Gum', './img/bubblegum.jpg');
new Product('Round Chair', './img/chair.jpg');
new Product('Cthulhu Action Figure', './img/cthulhu.jpg');
new Product('Duck Bill Dog Muzzle', './img/dog-duck.jpg');
new Product('Dragon Meat', './img/dragon.jpg');
new Product('Pen Utensil Attachments', './img/pen.jpg');
new Product('Pet Sweep', './img/pet-sweep.jpg');
new Product('Pizza Scissors', './img/scissors.jpg');
new Product('Shark Sleeping Bag', './img/shark.jpg');
new Product('Baby Sweeper', './img/sweep.png');
new Product('Tauntaun Sleeping Bag', './img/tauntaun.jpg');
new Product('Unicorn Meat', './img/unicorn.jpg');
new Product('Self Watering Can', './img/water-can.jpg');
new Product('Uncomfrotabl Wine Glass', './img/wine-glass.jpg');


renderProducts();