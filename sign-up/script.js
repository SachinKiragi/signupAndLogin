const userNameEl = document.getElementById('username'),
      emailEl = document.getElementById('email'),
      genderEl = document.querySelectorAll('.radio'),
      phoneEl = document.getElementById('phone'),
      passwordEl = document.getElementById('password'),
      submitBtnEl = document.getElementById('submit-btn'),
      formEl = document.getElementById('form');

let emailValidityEl = document.getElementById('email-validity');
let phoneValidityEl = document.getElementById('phone-validity');
const passwordStrengthEl = document.getElementById('password-strength');

// console.log(userNameEl, emailEl, genderEl, phoneEl, passwordEl);

let user = {
    username: "",
    email: "",
    gender: "",
    phone: "",
    password: ""
};

function isEmailValid(email){
    let regex = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/g
    return email.match(regex)
}

emailEl.addEventListener('keyup', (e) => {


    if(e.target.value.length==0){
        emailValidityEl.style.display = "none";
    } else {
        emailValidityEl.style.display = "block";

        if(isEmailValid(e.target.value)){
            emailValidityEl.innerText = "Valid";
            emailValidityEl.style.color = "green";
        } else{
            emailValidityEl.innerText = "Invalid";
            emailValidityEl.style.color = "red";
        }
    }
});


function getGender(){
    let gender = -1;
    genderEl.forEach((el) => {
        console.log(el.checked);
        if(el.checked){
            gender = el.id;
        }
    });

    return gender;
}


function isPhoneNoValid(phoneNo){
    return phoneNo.length==10;
}

phoneEl.addEventListener('keyup', (e) => {
    e.preventDefault();

    console.log(phoneValidityEl);

    let phoneNo = e.target.value;
    if(phoneNo.length==0){
        phoneValidityEl.style.display = "none";
    } else {
        phoneValidityEl.style.display = "block";
        if(isPhoneNoValid(phoneNo)){
            phoneValidityEl.style.color = "green";
            phoneValidityEl.innerText = "Valid"
        } else{
            phoneValidityEl.style.color = "red";
            phoneValidityEl.innerText = "Invalid"
        }
    }
});


function getStrengthOfPasword(password){
    let weak = /[\@\.\_\$\#\!]|[a-zA-Z0-9]/g
    let normal = /[a-zA-Z0-9]*[\@\.\_\$\#\%!]+[a-zA-Z0-9]+/g;
    let strong = /[a-zA-Z0-9]*[\@\.\_\$\#\!]+[a-zA-Z0-9]*[\@\.\_\$\#\!]+[a-zA-Z0-9]*/g; 

    let strength = "";

    if(password.match(weak)){
        strength = "Weak";
    } 
    if(password.match(normal)){
        strength = "Normal";
    } 
    if(password.match(strong)){
        strength = "Strong";
    }

    return strength;

}


passwordEl.addEventListener('keyup', (e) => {
    e.preventDefault();
    let password = e.target.value;
    // console.log(password);

    let strength = getStrengthOfPasword(password);
    console.log(strength);
    passwordStrengthEl.style.display = "block";
    if(password==""){
        passwordStrengthEl.style.display = "none";
    } else if(strength=="Weak"){
        passwordStrengthEl.style.color = "red";
    } else if(strength=="Normal"){
        passwordStrengthEl.style.color = "orange"
    } else if(strength=="Strong"){
        passwordStrengthEl.style.color = "green"
    }

        passwordStrengthEl.innerText = strength;
});


function isFormValid(){
    if(emailValidityEl.innerText=="Valid" && phoneValidityEl.innerText=="Valid" && user.password && user.gender!=-1 && user.username){
        return 1;
    } else{
        return 0;
    }
}


function showUserNameError(){
    if(formEl.contains(document.querySelector('#error-msg'))){
        formEl.removeChild(document.querySelector('#error-msg'));
    }

    let spanEl = document.createElement('span');
    spanEl.id = 'error-msg';
    spanEl.innerText = "username already exists! plz choose some other name";
    formEl.insertBefore(spanEl, submitBtnEl);
   
}

function isUserNameUnique(username){
    for(let i=0; i<localStorage.length; i++){
        if(localStorage.key(i)==username){
            showUserNameError();
            return 0;
        }
    }
    return 1;
}

const eyeEl = document.querySelector('.eye');
eyeEl.addEventListener('click', (e) => {

    if(eyeEl.classList.contains('ri-eye-off-fill')){
        eyeEl.classList.add('ri-eye-fill')
        eyeEl.classList.remove('ri-eye-off-fill');
        formEl.password.type = "text";
    } else{
        eyeEl.classList.add('ri-eye-off-fill');
        eyeEl.classList.remove('ri-eye-fill')
        formEl.password.type = "password";

    }
});


const popUpEl = document.querySelector('#pop-up-submit');
const popMsgEle = document.querySelector('#done-msg');


function showPopUp(){
    popUpEl.classList.add('pop-up')
    setTimeout(()=>{
        popMsgEle.style.display = "block";
    },300)

}

function hidePopUp(){
    popUpEl.classList.remove('pop-up')
        popMsgEle.style.display = "none";  

}

submitBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    user.username = userNameEl.value;
    user.email = emailEl.value;
    user.gender = getGender();
    user.phone = phoneEl.value;
    user.password = passwordEl.value;
    console.log("=> ", user.password);

    if(!isUserNameUnique(user.username)){
        setTimeout(function(){
             formEl.removeChild(document.querySelector('#error-msg'));
        }, 3000);
    } else{
        if(isFormValid()){
            localStorage.setItem(user.username, JSON.stringify(user));
            // alert("signed up successfully");
            showPopUp();
            setTimeout(hidePopUp, 2000);
            setTimeout(() => {
                location.reload();
                window.location.href = '../log-in/index.html';
            }, 3000)
        } else{
            alert(`plz fill details correctly`);
        }
    }
});


// localStorage.clear();