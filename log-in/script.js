const formEl = document.getElementById('form');
const submitBtnEl = document.getElementById('submit-btn');
const eyeEl = document.querySelector('.eye');
let user = {
    username: "",
    password: ""
};



function showLogInError(){
    if(formEl.contains(document.querySelector('#error-msg'))){
        formEl.removeChild(document.querySelector('#error-msg'));
    }
    
    let spanEl = document.createElement('span');
    spanEl.id = 'error-msg';
    spanEl.innerText = "incorrect username or password";
    formEl.insertBefore(spanEl, submitBtnEl);
}


function isDataValid(){
    let userinDb = localStorage.getItem(user.username);
    let valid = 0;
    userinDb = JSON.parse(userinDb);
    if(userinDb){
        if(userinDb.password == user.password){
            valid = 1;
        }
    }
    
    if(!valid){
        showLogInError();
    }
    return valid;
}

submitBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    user.username = formEl.username.value;
    user.password = formEl.password.value;
    if(!user.username || !user.password){
        alert("plz fill all details");
    } else{
        if(!isDataValid()){
            setTimeout(()=>{
                formEl.removeChild(document.querySelector('#error-msg'));
            }, 3000);
        } else{
            alert("logged in successfully");
            location.reload();
        }
    }
   
});

eyeEl.addEventListener('click', (e) => {

    if(eyeEl.classList.contains('ri-eye-off-fill')){
        eyeEl.classList.add('ri-eye-fill')
        eyeEl.classList.remove('ri-eye-off-fill');
        formEl.password.type = "text";
    } else{
        eyeEl.classList.add('ri-eye-off-fill');
        eyeEl.classList.remove('ri-eye-fill')
        formEl.password.type = "password";
        console.log(formEl.password);
    }
});



// localStorage.clear()