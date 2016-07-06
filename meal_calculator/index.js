var _ = require('lodash');

var TAX_PCT = 0.1;
var TIP_PCT = 0.2;

var Diner = function (name) {
  this.name = name;
  this.dishes = [];
}

Diner.prototype.addDish = function (name, cost) {
  var existingDish = _.find(this.dishes, {name: name});
  if (existingDish) {
    existingDish.quantity += 1;
  } else {
    this.dishes = this.dishes.concat({
      name: name,
      quantity: 1,
      cost: cost,
    });
  }
}

Diner.prototype.calcTotalOwed = function () {
  var sum = 0;
  for (var i = 0; i < this.dishes.length; i++) {
    sum += (this.dishes[i].quantity * this.dishes[i].cost);
  }
  return sum;
}

var Meal = function() {
  this.diners = [];
}

Meal.prototype.addDiner = function (diner) {
  this.diners = this.diners.concat(diner);
}

Meal.prototype.getBaseBill = function () {
  var sum = 0;
  for (var i = 0; i < this.diners.length; i++) {
    var foo = this.diners[i].calcTotalOwed();
    sum += foo;
  }
  return sum;
}

Meal.prototype.getTaxAmount = function () {
  return TAX_PCT * this.getBaseBill();
}

Meal.prototype.getTipAmount = function () {
  return TIP_PCT * this.getBaseBill();
}

Meal.prototype.getTotalBill = function () {
  var base = this.getBaseBill();
  var tax = this.getTaxAmount();
  var tip = this.getTipAmount();
  console.log('The total bill is $' + (base + tax + tip).toFixed(2) + '.');
  console.log('($' + tax.toFixed(2) + ' for tax, $' + tip.toFixed(2) + ' for tip.)');
}

Meal.prototype.getPriceBreakdown = function () {
  var tipAmount = this.getTipAmount();
  var tipOwed = tipAmount / this.diners.length;
  for (var i = 0; i< this.diners.length; i++) {
    // Each diner should pay the tax on their own food
    var baseOwed = this.diners[i].calcTotalOwed();
    var taxOwed = TAX_PCT * baseOwed;
    var totalOwed = baseOwed + tipOwed + taxOwed;
    console.log(this.diners[i].name + ' owes $' + totalOwed.toFixed(2));
  }
}

var sally = new Diner('Sally');
var megan = new Diner('Megan');
var peter = new Diner('Peter');

sally.addDish('pizza', 7);
sally.addDish('beer', 4);
megan.addDish('salad', 12);
megan.addDish('soda', 2);
peter.addDish('fries', 6);
peter.addDish('burger', 10);
peter.addDish('beer', 4);

var lunch = new Meal();
lunch.addDiner(sally);
lunch.addDiner(megan);
lunch.addDiner(peter);

lunch.getTotalBill();
lunch.getPriceBreakdown();
