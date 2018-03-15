

//Form data template. Filled data will be saved to this object.
var loanForm = {
	"step1": {
		"credit_type": "",
		"loan_amount": "",
		"loan_term": ""
	},
	"step2": {
		"fname": "",
		"lname": "",
		"gender": ""
	},
	
	"step4": {
		"salary": ""
	},
	"step5": {
		"info": ""
	}	
};



var ctaBtn = document.getElementById('cta-loan');
var intro = document.querySelector('.small-loan__starter');
var form = document.querySelector('.small-loan__form')

//Intro/starter call to action button.
ctaBtn.addEventListener('click', ()=> {
	intro.style.display = "none";   //hide intro/starter block
	showQuestion(pageNo);           //call to questions paging function
	form.style.display = "block";   //form visibility from none changed to block
});


//select all questions in form
var formSteps = document.querySelectorAll('.small-loan__form__step');

//default paging number
var pageNo = 0;

//Paging function displays 1 question per page
function showQuestion(pageNo) {
	formSteps.forEach(step=> step.style.display = "none" );  //firstly hide all questions nodes
	formSteps[pageNo].style.display = "flex"                 //set display property flex to node referred by pageNo.
}


//Returns select value from select input
function getSelectValue(select) {
	return select[select.selectedIndex].value;
}

//Used for must to fill radio buttons to checks if user selected any option.
function validateRadio(radio) {
	var validation = false;
	radio.forEach(el=> {
		if (el.checked) {
			validation = true;      //in case user selected any option, validation set tu true.
			return
		}
	});
	!validation? showAlert("Please select radio button value") : null;  //Message to user in case validation is false
	return validation   //returns validation value
}


var alerAnchor = document.querySelector('.progress-bar');

//Display alert message text in web form.
function showAlert(msg) {
	var content = `<div class="errormsg">${msg}</div>`;
	alerAnchor.insertAdjacentHTML('afterend',content);  //insert alert message after anchor DOM element
}

//Removes alert message from web form
function removeAler() {
	var alert = document.querySelector('.errormsg');
	if (!alert) return;
	return alert.parentNode.removeChild(alert);
}

//returns radio inputs value which is selected by user
function getRadioValue(radio) {
	var value = '';
	radio.forEach(el=> {
		if (el.checked) {
			value = el.value;
			return
		}
	});
	return value
}

//checks if text inputs if filled (at least one character)
function required(item) {
	if (item.length === 0) {
		showAlert("The mandatory information is missing or incorrect!");
		return false
	}
	return true
}

//validates text input value. Text input must be letters and space only.
function validateText(input) {
	if (!input.match(/^[A-Za-z\s]*$/)) {
		showAlert("The mandatory information must be letters only!");   //Message to user in case validation is false
		return false;
	}
	return true
}

//validates text input value. Text input must be letters and numbers only.
function validateTextNumbers(input) {
	if (!input.match(/^[0-9a-zA-Z]+$/)) {
		showAlert("The mandatory information must be letters & numbers only!"); //Message to user in case validation is false
		return false;
	}
	return true
}

//validates number input value. Number must be >0 and max length 12.
function validateNumber(input) {
	if ((parseFloat(input) < 0) || (input.length > 12)) {
		showAlert("Please enter correct amount (from 0 to 12 digits)"); //Message to user in case validation is false
		return false;
	}
	return true
}



//Back button in the questions form
var buttonBack = document.querySelectorAll('.js-back');
buttonBack[0].style.visibility='hidden';        //button is hidden then in first question page
buttonBack.forEach(btn => {
	btn.addEventListener('click',()=> {
		removeAler();                           //removes all alerts from previous page
		progressBarOnBack(pageNo);              //Update progress bar
		
		if (pageNo>0) {
			pageNo--;                           //decrease page number value by 1
		}
		
		showQuestion(pageNo);                   //call paging function to display updated pageNo
	})
});

//first question forward button validation and controls
var applicationForwardBtn = document.getElementById('application-forward');
applicationForwardBtn.addEventListener('click', ()=>{
	removeAler();                                                   //removes all alerts
	var credit_type = document.getElementById('credit_type');
	if (!required(getSelectValue(credit_type))) return;             //validates input. If value not validated returns
	loanForm.step1.credit_type = getSelectValue(credit_type);
	
	var loan_amount = document.getElementById('loan_amount').value;
	if (!required(loan_amount) || !validateNumber(loan_amount)) return; //validates input. If value not validated returns
	loanForm.step1.loan_amount = loan_amount;
	
	var loan_term = document.getElementById('loan_term');
	if (!required(getSelectValue(loan_term))) return;               //validates input. If value not validated returns
	loanForm.step1.loan_term = getSelectValue(loan_term);
	
	pageNo++;                   //Increase page number value by 1
	showQuestion(pageNo);       //call paging function to display updated pageNo
	progressBar(pageNo);        //Update progress bar
});


//second question forward button validation and controls
var gender = document.getElementsByName('gender');
var contactsForwardBtn = document.getElementById('contacts-forward');
contactsForwardBtn.addEventListener('click', ()=>{
	removeAler();                                                   //removes all alerts
	var fname = document.getElementById('fname').value;
	if (!required(fname) || !validateText(fname) ) return;          //validates input. If value not validated returns
	loanForm.step2.fname = fname;
	
	var lname = document.getElementById('lname').value;
	if (!required(lname) || !validateText(lname) ) return;          //validates input. If value not validated returns
	loanForm.step2.lname = lname;
	
	var gender = document.getElementsByName('gender');
	if (!validateRadio(gender)) return;                             //validates input. If value not validated returns
	loanForm.step2.gender = getRadioValue(gender);
	
	var docNo = document.getElementById('docNo').value;
	if (!required(docNo) || !validateTextNumbers(docNo) ) return;   //validates input. If value not validated returns
	loanForm.step2.docNo = docNo;
	
	pageNo++;                   //Increase page number value by 1
	showQuestion(pageNo);       //call paging function to display updated pageNo
	progressBar(pageNo);        //Update progress bar
});

//third question forward button validation and controls. This question is not mandatory
var obligationForwardBtn = document.getElementById('obligation-forward');
obligationForwardBtn.addEventListener('click', ()=>{
	removeAler();                                                       //removes all alerts
	var oblType = document.getElementById('obligation-type');
	var oblFinancer = document.getElementById('obligation-financer');
	var oblTerm = document.getElementById('obligation-term').value;
	var oblAmount = document.getElementById('obligation-amount').value;
	var oblPayment = document.getElementById('obligation-monthly-payement').value;
	
	//if user fill in any input, all other become mandatory to fill as well
	if ( (getSelectValue(oblType) != "") || (getSelectValue(oblFinancer) != "") ||
		(oblTerm != "") || (oblAmount != "") || (oblPayment != "")) {
		if (!required(getSelectValue(oblType)))return;
		if (!required(getSelectValue(oblFinancer)))return;
		if (!required(oblTerm) || !validateNumber(oblTerm))return;
		if (!required(oblAmount) || !validateNumber(oblAmount))return;
		if (!required(oblPayment) || !validateNumber(oblPayment))return;
		
		//object property (new object) in form template is created
		if (!loanForm["step3"]){
			loanForm["step3"] = {};
		}
		
		//object properties to new object assigned
		loanForm.step3.oblType = getSelectValue(oblType);
		loanForm.step3.oblFinancer = getSelectValue(oblFinancer);
		loanForm.step3.oblTerm = oblTerm;
		loanForm.step3.oblAmount = oblAmount;
		loanForm.step3.oblPayment = oblPayment;
		
	} else if (loanForm["step3"]) delete loanForm.step3;            //step3 object property removed if user do not finish to fill in data
	
	pageNo++;                   //Increase page number value by 1
	showQuestion(pageNo);       //call paging function to display updated pageNo
	progressBar(pageNo);        //Update progress bar
});

//Fourth question forward button validation and controls.
var incomeForwardBtn = document.getElementById('income-forward');
incomeForwardBtn.addEventListener('click', ()=>{
	removeAler();                                                   //removes all alerts
	var salary = document.getElementById('salary').value;
	if (!required(salary) || !validateNumber(salary)) return;       //validates input. If value not validated returns
	loanForm.step4.salary = salary;
	
	//question is not mandatory
	var incomeOther = document.getElementById('income-other').value;
	if ((incomeOther !== "") && validateNumber(incomeOther)) {      //checks if any data entered and validates input.
		loanForm.step4.incomeOther = incomeOther;                   //creates new property in form data object, step4
	} else if (loanForm.step4["incomeOther"]) delete loanForm.step4.incomeOther;  //if validation fails property from form data object removed
	
	var employer = document.getElementById('selfEmployer');
	if (employer.checked) {
		loanForm.step4.employer = employer.value;
	} else {
		loanForm.step4.employer = "worker"
	};
	
	pageNo++;                   //Increase page number value by 1
	showQuestion(pageNo);       //call paging function to display updated pageNo
	progressBar(pageNo);        //Update progress bar
});

//Last question forward/confirm button validation and controls.
var confirmBtn = document.getElementById('confirm');
confirmBtn.addEventListener('click', ()=>{
	removeAler();                                                   //removes all alerts
	var info = document.getElementById('additional-info').value;
	//checks if any data entered
	if (info !== "") {
		loanForm.step5.info = info;
	} else {
		loanForm.step5.info = "No additional information";
	}
	
	
	form.style.display = "none";            //hide form block
	printOut();                             //call printout function to print entered data
	document.querySelector('.small-loan__results').style.display = 'block'; //results block element with printed data visibility
	
});

//tracking if incomes inputs values is updated
var allIncomes = document.querySelectorAll('.js-allIncomes');
allIncomes.forEach(income => {
	income.addEventListener('change', sumarize);
	income.addEventListener('keyup',sumarize);
});

//Calculates total incomes and show value in form
function sumarize() {
	var items = document.querySelectorAll('.js-allIncomes');
	var showTotIncome = document.getElementById('total-income');
	var sum = 0;
	items.forEach(item => {
		if (item.value) sum += parseFloat(item.value);
	});
	showTotIncome.textContent = `${sum} EUR`;
}

//reordering/sorting object properties
function sortObject(o) {
	return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}


var printContainer = document.querySelector('.print-out');
//print filled form data to selected block
function printOut() {
	var html = '';
	
	for (var step in sortObject(loanForm)){                                 //go through all properties in loanForm. Sort steps in case user filled not mandatory info
		html += `<h3 class="heading-tertiary">${printValues[step]}</h3>`;   //Printout question heading. Print value taken from printValues object
		
		//construct printout content for every step/question
		var content = '';
		for (var stepkey in loanForm[step]) {                               //go through all properties in step/question object
			
			//Questions print values is taken from printValues object
			//Answers: firstly check for values in printValues object (questions with predefined answers). Original text or number printed for text, number, textarea inputs.
			content += `
					<li class="small-loan__results__items">
						<span class="small-loan__results__key">${printValues[stepkey]}</span>
						<span class="small-loan__results__value">${ printValues[loanForm[step][stepkey]]? printValues[loanForm[step][stepkey]] : loanForm[step][stepkey]  }</span>
					</li>
			`;
		};
		
		//adds every step content
		html += `<ul class="small-loan__results__list">${content}</ul>`;
	}
	printContainer.innerHTML = html;
}

var filler = document.querySelector('.progress-bar__h-line--filler')
var progresBarBulbs = document.querySelectorAll('.progress-bar__item')

//progress bar functionality on forward
function progressBar(el) {
	progresBarBulbs[el].style.backgroundColor = "#ee7023";              //update color to current step in progress bar
	progresBarBulbs[el-1].innerHTML = '<i class="fa fa-check"></i>'     //change icon on previous step
	filler.style.width = `${el*25}%`                                    //update progress line/filler
}

//progress bar functionality on back
function progressBarOnBack(el) {
	progresBarBulbs[el].style.backgroundColor = "#fdc129";              //update color to current step in progress bar
	progresBarBulbs[el-1].innerHTML = `${el}`;                          //changes progress bulb content to step number
	filler.style.width = `${el*25}%`                                    //update progress line/filler
}

//object with printout values
var printValues = {
	"step1":"Loan details",
	"step2":"Contact information",
	"step3":"Obligation details",
	"step4":"Your income",
	"step5":"Additional information",
	"loan_amount":"Loan amount",
	"loan_term":"Loan term",
	"fname":"First name",
	"lname":"Last name",
	"gender":"Gender",
	"salary":"Main Income",
	"info":"Additional information",
	"personal_credit":"Personal credit",
	"familyHh_credit":"Family/household credit",
	"female":"Female",
	"male":"Male",
	"other":"Other",
	"oblType":"Type of obligation",
	"oblFinancer":"Obligation financer",
	"oblTerm":"Term (year)",
	"oblAmount":"Amount/limit",
	"oblPayment":"Monthly payment",
	"home_loan":"Home loan",
	"consumer_loan":"Consumer loan",
	"car_lease":"Car lease",
	"luminor":"Luminor Bank",
	"seb":"SEB Bank",
	"fast_credit":"Fast Credit",
	"incomeOther":"Other Incomes",
	"selfempl":"Self employee",
	"worker":"Worker",
	"employer":"Type of employment",
	"credit_type":"Type of Credit",
};