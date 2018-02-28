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
}



var ctaBtn = document.getElementById('cta-loan');
var intro = document.querySelector('.small-loan__starter');
var form = document.querySelector('.small-loan__form')

ctaBtn.addEventListener('click', ()=> {
	intro.style.display = "none";
	showQuestion(pageNo);
	form.style.display = "block";
});


var formSteps = document.querySelectorAll('.small-loan__form__step');
var pageNo = 0;

function showQuestion(pageNo) {
	formSteps.forEach(step=> step.style.display = "none" );
	formSteps[pageNo].style.display = "flex"
}





function getSelectValue(select) {
	return select[select.selectedIndex].value;
}

function validateRadio(radio) {
	var validation = false;
	radio.forEach(el=> {
		if (el.checked) {
			validation = true;
			return
		}
	});
	!validation? showAlert("Please select radio button value") : null;
	return validation
}


var alerAnchor = document.querySelector('.progress-bar')
function showAlert(msg) {
	var content = `<div class="errormsg">${msg}</div>`
	alerAnchor.insertAdjacentHTML('afterend',content)
}

function removeAler() {
	var alert = document.querySelector('.errormsg')
	if (!alert) return;
	return alert.parentNode.removeChild(alert);
}

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

function required(item) {
	if (item.length === 0) {
		showAlert("The mandatory information is missing or incorrect!");
		return false
	}
	return true
}

function validateText(input) {
	if (!input.match(/^[A-Za-z\s]*$/)) {
		showAlert("The mandatory information must be letters only!");
		return false;
	}
	return true
}

function validateTextNumbers(input) {
	if (!input.match(/^[0-9a-zA-Z]+$/)) {
		showAlert("The mandatory information must be letters & numbers only!");
		return false;
	}
	return true
}

function validateNumber(input) {
	
	if ((parseFloat(input) < 0) || (input.length > 12)) {
		showAlert("Please enter correct amount (from 0 to 12 digits)");
		return false;
	}
	return true
}





var buttonBack = document.querySelectorAll('.js-back');
buttonBack[0].style.visibility='hidden';
buttonBack.forEach(btn => {
	btn.addEventListener('click',()=> {
		removeAler();
		progressBarOnBack(pageNo);
		
		if (pageNo>0) {
			pageNo--;
		}
		
		showQuestion(pageNo);
	})
});


var applicationForwardBtn = document.getElementById('application-forward');
applicationForwardBtn.addEventListener('click', ()=>{
	removeAler();
	var credit_type = document.getElementById('credit_type');
	if (!required(getSelectValue(credit_type))) return;
	loanForm.step1.credit_type = getSelectValue(credit_type);
	
	var loan_amount = document.getElementById('loan_amount').value;
	if (!required(loan_amount) || !validateNumber(loan_amount)) return;
	loanForm.step1.loan_amount = loan_amount;
	
	var loan_term = document.getElementById('loan_term');
	if (!required(getSelectValue(loan_term))) return;
	loanForm.step1.loan_term = getSelectValue(loan_term);
	
	pageNo++;
	showQuestion(pageNo);
	progressBar(pageNo);
});



var gender = document.getElementsByName('gender');
var contactsForwardBtn = document.getElementById('contacts-forward');
contactsForwardBtn.addEventListener('click', ()=>{
	removeAler();
	var fname = document.getElementById('fname').value;
	if (!required(fname) || !validateText(fname) ) return;
	loanForm.step2.fname = fname;
	
	var lname = document.getElementById('lname').value;
	if (!required(lname) || !validateText(lname) ) return;
	loanForm.step2.lname = lname;
	
	var gender = document.getElementsByName('gender');
	if (!validateRadio(gender)) return;
	loanForm.step2.gender = getRadioValue(gender);
	
	var docNo = document.getElementById('docNo').value;
	if (!required(docNo) || !validateTextNumbers(docNo) ) return;
	loanForm.step2.docNo = docNo;
	
	pageNo++;
	showQuestion(pageNo);
	progressBar(pageNo);
});


var obligationForwardBtn = document.getElementById('obligation-forward');
obligationForwardBtn.addEventListener('click', ()=>{
	removeAler();
	var oblType = document.getElementById('obligation-type');
	var oblFinancer = document.getElementById('obligation-financer');
	var oblTerm = document.getElementById('obligation-term').value;
	var oblAmount = document.getElementById('obligation-amount').value;
	var oblPayment = document.getElementById('obligation-monthly-payement').value;
	
	
	if ( (getSelectValue(oblType) != "") || (getSelectValue(oblFinancer) != "") ||
		(oblTerm != "") || (oblAmount != "") || (oblPayment != "")) {
		if (!required(getSelectValue(oblType)))return;
		if (!required(getSelectValue(oblFinancer)))return;
		if (!required(oblTerm) || !validateNumber(oblTerm))return;
		if (!required(oblAmount) || !validateNumber(oblAmount))return;
		if (!required(oblPayment) || !validateNumber(oblPayment))return;
		
		if (!loanForm["step3"]){
			loanForm["step3"] = {};
		}
		
		loanForm.step3.oblType = getSelectValue(oblType);
		loanForm.step3.oblFinancer = getSelectValue(oblFinancer);
		loanForm.step3.oblTerm = oblTerm;
		loanForm.step3.oblAmount = oblAmount;
		loanForm.step3.oblPayment = oblPayment;
		
	} else if (loanForm["step3"]) delete loanForm.step3;
	
	pageNo++;
	showQuestion(pageNo);
	progressBar(pageNo);
});


var incomeForwardBtn = document.getElementById('income-forward');
incomeForwardBtn.addEventListener('click', ()=>{
	removeAler();
	var salary = document.getElementById('salary').value;
	if (!required(salary) || !validateNumber(salary)) return;
	loanForm.step4.salary = salary;
	
	var incomeOther = document.getElementById('income-other').value;
	if ((incomeOther !== "") && validateNumber(incomeOther)) {
		loanForm.step4.incomeOther = incomeOther;
	} else if (loanForm.step4["incomeOther"]) delete loanForm.step4.incomeOther;
	
	var employer = document.getElementById('selfEmployer');
	if (employer.checked) {
		loanForm.step4.employer = employer.value;
	} else {
		loanForm.step4.employer = "worker"
	};
	
	pageNo++;
	showQuestion(pageNo);
	progressBar(pageNo);
});


var confirmBtn = document.getElementById('confirm');
confirmBtn.addEventListener('click', ()=>{
	removeAler();
	var info = document.getElementById('additional-info').value;
	if (info !== "") {
		loanForm.step5.info = info;
	} else {
		loanForm.step5.info = "No additional information";
	}
	
	console.log(loanForm)
	form.style.display = "none";
	printOut();
	document.querySelector('.small-loan__results').style.display = 'block'
	
});


var allIncomes = document.querySelectorAll('.js-allIncomes');
allIncomes.forEach(income => {
	income.addEventListener('change', sumarize);
	income.addEventListener('keyup',sumarize);
});


function sumarize() {
	var items = document.querySelectorAll('.js-allIncomes');
	var showTotIncome = document.getElementById('total-income');
	var sum = 0;
	items.forEach(item => {
		if (item.value) sum += parseFloat(item.value);
	});
	showTotIncome.textContent = `${sum} EUR`;
}


function sortObject(o) {
	return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}


var printContainer = document.querySelector('.print-out')
function printOut() {
	var html = '';
	
	for (var step in sortObject(loanForm)){
		html += `<h3 class="heading-tertiary">${printValues[step]}</h3>`;
		
		var content = '';
		for (var stepkey in loanForm[step]) {
			content += `
					<li class="small-loan__results__items">
						<span class="small-loan__results__key">${printValues[stepkey]}</span>
						<span class="small-loan__results__value">${ printValues[loanForm[step][stepkey]]? printValues[loanForm[step][stepkey]] : loanForm[step][stepkey]  }</span>
					</li>
			`;
		};
		
		html += `<ul class="small-loan__results__list">${content}</ul>`;
	}
	printContainer.innerHTML = html;
}

var filler = document.querySelector('.progress-bar__h-line--filler')
var progresBarBulbs = document.querySelectorAll('.progress-bar__item')

function progressBar(el) {
	progresBarBulbs[el].style.backgroundColor = "#ee7023";
	progresBarBulbs[el-1].innerHTML = '<i class="fa fa-check"></i>'
	filler.style.width = `${el*25}%`
}

function progressBarOnBack(el) {
	progresBarBulbs[el].style.backgroundColor = "#fdc129";
	progresBarBulbs[el-1].innerHTML = `${el}`;
	filler.style.width = `${el*25}%`
}


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