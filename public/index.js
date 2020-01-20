'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}
, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

// STEP 1 : EURO-KILOMETERS
for (var i = rentals.length - 1; i >= 0; i--) {
	for (var j = cars.length - 1; j >= 0; j--) {
		if(rentals[i].carId == cars[j].id)
		{
			var datePickUp = new Date(rentals[i].pickupDate);
			var dateReturn = new Date(rentals[i].returnDate);
			var length = (dateReturn - datePickUp)/(1000*60*60*24) + 1;
			rentals[i].price = (cars[j].pricePerKm * rentals[i].distance) + (cars[j].pricePerDay * length);
		}
	}
}

// STEP 2 : Drive more, pay less
for (var i = rentals.length - 1; i >= 0; i--) {
	var datePickUp = new Date(rentals[i].pickupDate);
	var dateReturn = new Date(rentals[i].returnDate);
	var length = (dateReturn - datePickUp)/(1000*60*60*24) + 1;

	if(length > 1 && length <= 4){
		rentals[i].price *= 0.9;
	} 
	else if(length > 4 && length <= 10){
		rentals[i].price *= 0.7;
	}
	else if(length > 10){
		rentals[i].price *= 0.5;
	}
}

// STEP 3 : Give me all your money
for (var i = rentals.length - 1; i >= 0; i--) {
	var datePickUp = new Date(rentals[i].pickupDate);
	var dateReturn = new Date(rentals[i].returnDate);
	var length = (dateReturn - datePickUp)/(1000*60*60*24) + 1;

	var commission = 0.30 * rentals[i].price;

	rentals[i].insurance = 0.50 * commission;
	rentals[i].treasury = length;
	rentals[i].virtuo = 0.50 * commission - length;
}

// STEP 4 : The famous deductible
for (var i = rentals.length - 1; i >= 0; i--) {
	if(rentals[i].options.deductibleReduction == true)
	{
		var datePickUp = new Date(rentals[i].pickupDate);
		var dateReturn = new Date(rentals[i].returnDate);
		var length = (dateReturn - datePickUp)/(1000*60*60*24) + 1;

		var deductibleRed = 4*length;

		// add the deductible reduction charge to the price
		rentals[i].price += deductibleRed;
		// add the deductible reduction option charge to the money virtuo takes
		rentals[i].virtuo += deductibleRed;
	}
}

// STEP 5 : Pay the actors
for (var i = actors.length - 1; i >= 0; i--) {
	for (var j = rentals.length - 1; j >= 0; j--) {
		if(rentals[j].id == actors[i].rentalId){
			actors[i].payment[0].amount = rentals[j].price; // the price now include the deductible reduction if taken 

			var com = rentals[j].insurance + rentals[j].treasury + rentals[j].virtuo;
			actors[i].payment[1].amount = rentals[j].price - com;

			actors[i].payment[2].amount = rentals[j].insurance;

			actors[i].payment[3].amount = rentals[j].treasury;

			actors[i].payment[4].amount = rentals[j].virtuo;
		}
	}
}

console.log(cars);
console.log(rentals);
console.log(actors);
