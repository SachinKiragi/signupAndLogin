const formEl = document.getElementById('form');
const submitBtnEl = document.getElementById('submit-btn');
const eyeEl = document.querySelector('.eye');
let user = {
    username: "",
    password: ""
};

submitBtnEl.addEventListener('click', (e) => {
    e.preventDefault();
    user.username = formEl.username.value;
    user.password = formEl.password.value;
    
    console.log(user);
   
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

    }
});

