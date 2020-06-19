// INTEREST CONTROLLER
let interestController = (() => {
	return {
		calculateInterest: (principal, months) => {
			// 13/100 * principal * 1/12 (1 Month)
			let ratePercent = 0.13;
			let interest = principal * ratePercent * (months / 12);
			return interest;
		},
	};
})();

// UI CONTROLLER
let UIController = (() => {
	let DOMstrings = {
		inputAmount: '.input__amount',
		inputDuration: '.input__duration',
		inputPaybackDate: '.input__payback-date',
		balanceLabel: '.balance__label',
		calculateBtn: '.calculate',
	};

	let formatNumber = (num) => {
		let numSplit, int, dec;

		// absolute number
		num = Math.abs(num);
		// decimal points
		num = num.toFixed(2);
		// comma separating the thousands
		// split the number into decimal part and integer part using split() on the string
		numSplit = num.split('.');

		int = numSplit[0];
		if (int.length > 3) {
			int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
		}

		dec = numSplit[1];
		return int + '.' + dec;
	};

	return {
		getInput: () => {
			return {
				principal: parseFloat(
					document.querySelector(DOMstrings.inputAmount).value
				),
				duration: document.querySelector(DOMstrings.inputDuration).value,
			};
		},

		getDOMstrings: () => {
			return DOMstrings;
		},

		clearFields: () => {
			let fields, fieldsArr;

			fields = document.querySelectorAll(
				DOMstrings.inputAmount + ', ' + DOMstrings.inputDuration
			);

			// we cannot call array methods on a list
			// instead we call the slice method using the call method and pass the fields variable into it so that it becomes the this variable. slice() Array prototype
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach((current) => {
				current.value = '';
			});

			fieldsArr[0].focus();
		},

		displayDate: () => {
			let today = new Date();
			let date =
				today.getFullYear() +
				'-' +
				(today.getMonth() >= 10
					? today.getMonth() + 1
					: '0' + (today.getMonth() + 1)) +
				'-' +
				today.getDate();
			document.querySelector(DOMstrings.inputPaybackDate).value = date;
		},

		displayBalance: (balance) => {
			document.querySelector(
				DOMstrings.balanceLabel
			).textContent = formatNumber(balance);
		},
	};
})();

// GLOBAL CONTROLLER
let controller = ((interestCtrl, UICtrl) => {
	let setupEventListeners = () => {
		let DOM = UICtrl.getDOMstrings();

		document
			.querySelector(DOM.calculateBtn)
			.addEventListener('click', ctrlCalculateInterest);
	};

	let ctrlCalculateInterest = (event) => {
		event.preventDefault();
		// Get input
		let input = UICtrl.getInput();

		// Add input to interest controller
		let interest = interestCtrl.calculateInterest(
			input.principal,
			input.duration
		);

		let totalBalance = interest + input.principal;
		// Clear Inputs
		UICtrl.clearFields();

		// Add interest to UI
		UICtrl.displayBalance(totalBalance);
	};

	return {
		init: () => {
			console.log('Application has started.');
			UICtrl.displayDate();
			setupEventListeners();
		},
	};
})(interestController, UIController);

controller.init();
