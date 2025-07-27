const fullname = document.getElementById("name");
const email = document.getElementById("email");
const num = document.getElementById("phoneNumber");
const reason = document.getElementById("contactReason");
const notes = document.getElementById("notes");
const notesLabel = document.getElementById("commentsLabel");
const maxChar = 50;
const error = document.getElementById("error");
const form = document.querySelector("form");
const errors = document.getElementById("errors");

const nameState = fullname.validity;
const emailState = email.validity;
const numState = num.validity;
const reasonState = reason.validity;

let nameError = {"Field": "Fullname", wrongLength: 0, missingValue: 0, invalidChar: 0};
let emailError = {"Field": "Email",invalidInput:0, missingValue:0};
let phoneError = {"Field": "Phone Number",wrongLength:0, missingValue: 0, invalidChar: 0};
let reasonError = {"Field": "Contact Reason",wrongLength: 0, missingValue: 0, invalidChar: 0};
let commentError = {"Field": "Comments",tooLong: 0};

form_errors = [];
form_errors.push(nameError, emailError, phoneError, reasonError, commentError);

function hide(){
            error.style.visibility = "hidden";
            error.textContent = "";
        }
fullname.addEventListener("input", () => {
    if(nameState.patternMismatch){
        let currentVal = fullname.value;
        fullname.value = currentVal.replace(/[^a-zA-z]/g,'');
        fullname.style.backgroundColor = "red";
        function flash(){
            fullname.style.backgroundColor = "white";
        }
        setTimeout(flash, 200);

        error.textContent = "Illegal Character typed in Fullname field, only alphabetic characters allowed";
        error.style.visibility = "visible";
        setTimeout(hide, 3000);

        form_errors[0][`invalidChar`] += 1;

    }
    
    if(!fullname.checkValidity()){
        if(nameState.valueMissing){
            fullname.setCustomValidity("Error: Missing Name");
            form_errors[0][`missingValue`] += 1;
        }
        else if(nameState.tooShort){
            fullname.setCustomValidity("Error: minimum length of 2 is required");
            form_errors[0][`wrongLength`] += 1;
        }
        else if(nameState.patternMismatch){
            fullname.setCustomValidity("Error: Only alphabetic characters allowed");
            form_errors[0][`invalidChar`] += 1;
        }
        else{
            fullname.setCustomValidity("");
        }
    }
});
email.addEventListener("input", (event) =>{
    if (!email.checkValidity()){
        if(emailState.valueMissing){
            email.setCustomValidity("Error: Missing an email")
            form_errors[1][`missingValue`] += 1;
        }
        else if(emailState.typeMismatch){
            email.setCustomValidity("Error: Invalid Email");
            form_errors[1][`invalidInput`] += 1;
        }
        else{
            email.setCustomValidity("");
        }
        
    }
});
num.addEventListener("input", (event) => {

    if(numState.patternMismatch){
        let currentVal = num.value;
        num.value = currentVal.replace(/[^\d\-\(\)]/g,'');
        num.style.backgroundColor = "red";
        function flash(){
            num.style.backgroundColor = "white";
        }
        setTimeout(flash, 200);

        error.textContent = "Illegal Character typed in Phone Number field, only numbers, - and () allowed";
        error.style.visibility = "visible";
        setTimeout(hide, 3000);
        form_errors[2][`invalidChar`] += 1;

    }

    if(!num.checkValidity()){
        if(numState.valueMissing){
            num.setCustomValidity("Error: Missing Phone number");
            form_errors[2][`missingValue`] += 1;
        }
        else if(numState.tooShort){
            num.setCustomValidity("Error: Minimun length is 7");
            form_errors[2][`wrongLength`] += 1;
        }
        else if(numState.patternMismatch){
            num.setCustomValidity("Error: Phone number can only have numbers, -, and ()");
            form_errors[2][`invalidChar`] += 1;
        }
        else{
            num.setCustomValidity("");
        }
    }
});
reason.addEventListener("input", (event) => {

    if(reasonState.patternMismatch){
        let currentVal = reason.value;
        reason.value = currentVal.replace(/[^a-zA-z]/g,'');
        reason.style.backgroundColor = "red";
        function flash(){
            reason.style.backgroundColor = "white";
        }
        setTimeout(flash, 200);

        error.textContent = "Illegal Character typed in Contact Reason field, only alphabetic characters allowed";
        error.style.visibility = "visible";
        setTimeout(hide, 3000);
        form_errors[3][`invalidChar`] += 1;

    }

    if(!reason.checkValidity()){
        if(reasonState.valueMissing){
            reason.setCustomValidity("Error: Missing contact reason");
            form_errors[0][`missingValue`] += 1;
        }
        else if(reasonState.tooShort){
            reason.setCustomValidity("Error: Min length of 5");
            form_errors[3][`wrongLength`] += 1;
        }
        else if(reasonState.patternMismatch){
            reason.setCustomValidity("Error: Only alphabetic characers allowed");
            form_errors[3][`invalidChar`] += 1;
        }
        else{
            reason.setCustomValidity("");
        }
    }
});

notes.addEventListener("input", (event) => {
    const curLen = notes.value.length;
    const remainLen = maxChar - curLen;

    notesLabel.textContent = `Comments: ${remainLen} out of ${maxChar} characters left`;

    if(remainLen < 10){
        notes.style.backgroundColor = "yellow";
        if(remainLen < 0){
            form_errors[4][`tooLong`] += 1;
        }
    }
    else{
        notes.style.backgroundColor = "white";
    }
});

form.addEventListener("submit", (event) => {
    errors.value = JSON.stringify(form_errors);
});

