//Basic math operation functions
function add(a,b){
	return (parseFloat(a)+parseFloat(b)).toFixed(2);
}

function subtract(a,b){
	return (parseFloat(a)-parseFloat(b)).toFixed(2);
}

function multiply(a,b){
	return (parseFloat(a)*parseFloat(b)).toFixed(2);
}

function divide(a,b){
	return (parseFloat(a)/parseFloat(b)).toFixed(2);
}


//function to update the display when buttons are pressed
const displayValue = document.querySelector("#display");
const numButtons = document.querySelectorAll(".numButton");
const decimalButton = document.querySelector("#decimalButton");
let isOperatorDone = false;

const updateDisplay = function(){
	if(displayValue.innerHTML == 0 || isOperatorDone){
		displayValue.innerHTML = this.innerHTML;
	} else {
		displayValue.innerHTML += this.innerHTML;
	}
	isOperatorDone = false;
}

numButtons.forEach(numButton => {
	numButton.addEventListener("click", updateDisplay);	
})

decimalButton.addEventListener("click", function(){
	if(displayValue.innerHTML == 0 || isOperatorDone){
		displayValue.innerHTML =  this.innerHTML;
	} else {
		displayValue.innerHTML += this.innerHTML;
	}
	this.disabled = true;
	isOperatorDone = false;
});	



//function to perform operation
let previousValues = [];
let previousOperators = [];
let calculatedValue = 0;

const pressOperator =  function(){
	if (displayValue.innerHTML == Infinity || displayValue == NaN){
		clear();
	}
	previousValues.push(parseFloat(displayValue.innerHTML).toFixed(4));
	previousOperators.push(this.id);		
	displayValue.innerHTML = '';
	decimalButton.disabled = false;
	isOperatorDone = true;
}

const operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach(operatorButton => {
	operatorButton.addEventListener("click", pressOperator);
})

function operate(){
	previousValues.push(parseFloat(displayValue.innerHTML).toFixed(4));
	for (let i=0; i<previousValues.length-1; i++){
		switch (previousOperators[i]){
			case "+":
				if (i==0){
				calculatedValue = add(previousValues[i], previousValues[i+1]);			
				} else {
					calculatedValue = add(calculatedValue, previousValues[i+1]);
				}
				break;
			case "-":
				if (i==0){
				calculatedValue = subtract(previousValues[i], previousValues[i+1]);	
				} else {
					calculatedValue = subtract(calculatedValue, previousValues[i+1]);
				}
				break;
			case "*":
				if (i==0){
				calculatedValue = multiply(previousValues[i], previousValues[i+1]);	
				} else {
					calculatedValue = multiply(calculatedValue, previousValues[i+1]);
				}
				break;
			case "/":
				if (i==0){
				calculatedValue = divide(previousValues[i], previousValues[i+1]);		
				} else {
					calculatedValue = divide(calculatedValue, previousValues[i+1]);
				}
				break;
		}
	}
	
	displayValue.innerHTML = calculatedValue;
	previousValues = [];
	previousOperators = [];
	decimalButton.disabled = false;
	isOperatorDone = true;
}

const calculateButton = document.querySelector("#calculateButton");
calculateButton.addEventListener("click", operate);


//function to utilize 'Clear' button
const clearButton = document.querySelector("#clearButton");
function clear(){
	displayValue.innerHTML = 0;
	previousValues = [];
	previousOperators = [];	
	calculatedValue = 0;
	decimalButton.disabled = false;
	isOperatorDone = false;
};

clearButton.addEventListener("click", clear);


// Keyboard Support
window.addEventListener("keydown", function(e){
	console.log(e);
	if (e.key == "1" ||
		e.key == "2" ||
		e.key == "3" ||
		e.key == "4" ||
		e.key == "5" ||
		e.key == "6" ||
		e.key == "7" ||
		e.key == "8" ||
		e.key == "9" ||
		e.key == "0"){
		if (displayValue.innerHTML == 0){
			displayValue.innerHTML = parseInt(e.key);
		} else {
			displayValue.innerHTML += parseInt(e.key);
		}		
	} else if (e.key == "+" ||
				 e.key == "-" ||
				 e.key == "*" ||
				 e.key == "/"){
		if (displayValue.innerHTML == Infinity || displayValue == NaN){
			clear();
		}
		previousValues.push(parseFloat(displayValue.innerHTML).toFixed(4));
		previousOperators.push(e.key);		
		displayValue.innerHTML = 0;
	} else if (e.key == "Enter"){
		operate();
	} else if (e.key == "Escape"){
		clear();
	}
})










