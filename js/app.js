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
const maxVote = 10;

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
  this.timesShown++;
}

// Global functions
// function getRandomNumber() {
//   return Math.floor(Math.random() * Product.allProducts.length);
// }

function renderProducts() {
  // let previousProducts = [leftProduct, centerProduct, rightProduct];

  // while (previousProducts.includes(leftProduct)) {
  //   let randomIndex = getRandomNumber();
  //   leftProduct = Product.allProducts[randomIndex];
  // }
  // previousProducts.push(leftProduct);

  // while (previousProducts.includes(centerProduct)) {
  //   let randomIndex = getRandomNumber();
  //   centerProduct = Product.allProducts[randomIndex];
  // }
  // previousProducts.push(centerProduct);

  // while (previousProducts.includes(rightProduct)) {
  //   let randomIndex = getRandomNumber();
  //   rightProduct = Product.allProducts[randomIndex];
  // }



// ------------- Old code - Chooses three products that are not the same.
// ------------- Does not check to see if a product a has been used the round before.
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
    liElem.textContent = `${product.name}: ${product.votes} Times shown: ${product.timesShown}`;
    productUlElem.appendChild(liElem);
  }
}

function handleClick(event) {
  let id = event.target.id
  if (id === 'leftProductImg') {
    leftProduct.votes++;  
    voteCounter++;
  } else if (id === 'centerProductImg') {
    centerProduct.votes++;
    voteCounter++;
  } else if (id === 'rightProductImg') {
    rightProduct.votes++;
    voteCounter++;
  } else {
    alert('Please click on a picture');
  }
  renderProducts();
  if (voteCounter === maxVote) {
    productSelectorElem.innerHTML = '';
    renderResults();
    renderChart();
    productSelectorElem.removeEventListener('click', handleClick);
  }
  console.log(voteCounter);
}

// // Chart Stuff
// function renderChart() {
//   const productNameArray = [];
//   const productVotesArray = [];
//   const productTimesShownArray = [];

//   for (let product of Product.allProducts) {
//     productNameArray.push(product.name);
//     productVotesArray.push(product.votes);
//     productTimesShownArray.push(product.timesShown);
//   }

//   const ctx = document.getElementById('productChart').getContext('2d');

//     const productChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//           labels: productNameArray,
//           datasets: [{
//               label: '# of Votes',
//               data: productVotesArray,
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(255, 99, 132, 0.2)',
                  
//               ],
//               borderColor: [
//                   'rgba(255, 99, 132, 1)',
//                   'rgba(54, 162, 235, 1)',
//                   'rgba(255, 99, 132, 1)',
//                   'rgba(54, 162, 235, 1)',
//                   'rgba(255, 99, 132, 1)',
//                   'rgba(54, 162, 235, 1)',
//                   'rgba(255, 99, 132, 1)',
//                   'rgba(54, 162, 235, 1)'
//               ],
//               borderWidth: 1
//           }, {
//             label: '# of Times Shown',
//             data: productTimesShownArray,
//             backgroundColor: [
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(54, 162, 235, 0.2)'
                
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)'
//             ],
//             borderWidth: 1
//         }]
//       },
//       options: {
//           scales: {
//               y: {
//                   beginAtZero: true
//               }
//           }
//       }
//     });
// }

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
new Product('Uncomfortable Wine Glass', './img/wine-glass.jpg');


renderProducts();