// INTEREST CONTROLLER
let interestController = (() => {
	var calculateInterest = function (total, years, ratePercent, roundToPlaces) {
		var interestRate = ratePercent / 100 + 1;
		return (total * Math.pow(interestRate, years)).toFixed(roundToPlaces);
	};

	var answer = calculateInterest(915, 13, 2, 2);
})();

// UI CONTROLLER
let UIController = (() => {
	let DOMstrings = {
		inputAmount: 'input__amount',
		inputDuration: 'input__duration',
		inputPaybackDate: 'input__payback-date',
		balanceLabel: 'balance__label',
	};

	return {
		getInput: () => {
			return {};
		},

		getDOMstrings: () => {
			return DOMstrings;
		},
	};
})();

// GLOBAL CONTROLLER
let controller = ((interestCtrl, UICtrl) => {
	let setupEventListeners = () => {
		let DOM = UICtrl.getDOMstrings();
	};
	return {
		init: () => {
			console.log('App has started.');
		},
	};
})(interestController, UIController);

controller.init();
