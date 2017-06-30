var app = angular.module('myApp', []);

app.controller('ExchangeController', ExchangeController);

function ExchangeController($interval) {

  // variables
  const vm = this;
  const STARTPRICE = 5;
  const ROUNDTIME = 3000;
  const ROUNDS = 30;
  vm.cash = 100;
  vm.objectArray = [];
  vm.roundsLeft = ROUNDS;
  vm.buttonShow = true;

  function timer() {
    $interval(() => {
      vm.roundsLeft--;
    }, ROUNDTIME, ROUNDS);
  }

  class Item {

    constructor(name, src) {
      this.name = name;
      this.price = STARTPRICE + Number(((Math.random() * (100) - 50) / 100).toFixed(2));
      this.imageSrc = src;
      this.inventory = 0;
      this.pricesPaid = [];
      this.avgPricePaid = 0;
    } // end constructor

    priceChange() {
      $interval(() => {
        let change = Number(((Math.random() * (100) - 50) / 100).toFixed(2));
        if ((this.price + change) < 0.5) {
          this.price += Math.abs(change);
        } else if ((this.price + change) > 9.99) {
          this.price -= Math.abs(change);
        } else {
          this.price += change;
        }
        if(this.avgPricePaid == 0) {
          this.sellNow = false;
        } else if (this.avgPricePaid > this.price) {
          this.sellNow = false;
        } else {
          this.sellNow = true;
        }
      }, ROUNDTIME, ROUNDS); // end $interval
    } // end priceChange

    getAvg() {
      return this.pricesPaid.reduce(function(p, c) {
        return p + c;
      }) / this.pricesPaid.length;
    } // end getAvg

    buy() {
      if (vm.cash - this.price < 0) {
        alert('INSUFFICIENT FUNDS');
      } else {
        this.inventory++;
        this.pricesPaid.push(this.price);
        this.avgPricePaid = this.getAvg();
        vm.cash -= this.price;
        console.log(this.sellNow);
      }
    } // end buy method

    sell() {
      if (this.inventory == 0) {
        alert("You ain't got none to sell, yo!");
      } else {
        this.inventory--;
        vm.cash += this.price;
      }
    } // end sell method

  } // end item Class

  class Fruit extends Item {
    constructor(name, src) {
      super(name, src);
      this.perishCount = 10;
    }
    priceChange() {
      $interval(() => {
        if (this.perishCount == 0) {
          this.inventory = 0;
          this.perishCount = 10;
        } else {
          this.perishCount--;
        }

        let change = Number(((Math.random() * (150) - 75) / 100).toFixed(2));
        if ((this.price + change) < 0.5) {
          this.price += Math.abs(change);
        } else if ((this.price + change) > 9.99) {
          this.price -= Math.abs(change);
        } else {
          this.price += change;
        }
        if(this.avgPricePaid == 0) {
          this.sellNow = false;
        } else if (this.avgPricePaid > this.price) {
          this.sellNow = false;
        } else {
          this.sellNow = true;
        }
      }, ROUNDTIME, ROUNDS); // end $interval
    } // end priceChange
  }


  let nonFruitArray = [
    ['Batman', '/images/001-batman.png'],
    ['Wine', '/images/002-wine.png'],
    ['Diamond', '/images/003-diamond.png'],
    ['Teddy Bear', '/images/004-teddy-bear.png'],
    ['BluRay', '/images/005-dvd.png'],
    ['Alarm Clock', '/images/006-alarm-clock.png'],
    ['Lamp', '/images/007-lamp.png'],
    ['Toaster', '/images/008-toaster.png']
  ]; // end nonFruitArray

  let fruitArray = [
    ['Banana', '/images/009-bananas.png'],
    ['Orange', '/images/010-orange.png'],
    ['Grape', '/images/011-grapes.png'],
    ['Apple', '/images/012-apple.png']
  ]; // end fruitArray

  vm.startGame = () => {
    vm.objectArray = [];
    vm.buttonShow = false;

    for (let item of nonFruitArray) {
      let x = (new Item(...item));
      x.priceChange();
      vm.objectArray.push(x);
    } // fill objectArray with Items from nonFruitArray
    // better one using ES6 'for of loop'
    for (let item of fruitArray) {
      let x = (new Fruit(...item));
      x.priceChange();
      vm.objectArray.push(x);
    } // fill objectArray with Items from fruitArray

    timer();
  }; // end startGame


} // end exchangeController
