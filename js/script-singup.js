// =======================================================================
// ========================== sign up page script ===========================
var userName = document.getElementById('user-name');
var userEmail = document.getElementById('user-email');
var userPassword = document.getElementById('user-password');
var emptyInputAlert = document.getElementById('empty-input-alert');
var existEmailAlert = document.getElementById('exist-email-alert');
var successAlert = document.getElementById('success-alert');
var signupBtn = document.getElementById('signup-btn');



var emptyAlertShow = 0;
var existAlertShow = 1;
var successAlertShow = 0;

// ------------------------------ start up 
if(localStorage.getItem('storedUsers') == null){
    var users = [];
}else{
    users = JSON.parse(localStorage.getItem('storedUsers'));
}

// ------------------ reset sign up  forms 
function resetSignup(){
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
}


// ---------------------- signup btn event 
signupBtn.addEventListener('click',function(){
    if(emptyInput() == true){
        if(existEmail() == false){
            
            successAlert.classList.replace('d-none','d-block');
            successAlertShow = 1;
            create();
            
        }
       
    }
    
   
});
// ---------------------------- signup function 
function create(){
    var user = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
    };
    users.push(user);
    localStorage.setItem('storedUsers',JSON.stringify(users));
    // console.log(users);
}
// ------------------------------ empty signup inputs validation
function emptyInput(){
    if(userName.value != '' & userEmail.value != '' & userPassword.value != ''){

        if(emptyAlertShow == 1){
            emptyInputAlert.classList.replace('d-block','d-none');
            emptyAlertShow = 0;
        }
        return true;
    }else{
        emptyInputAlert.classList.replace('d-none','d-block');
        existEmailAlert.classList.replace('d-block','d-none');
        emptyAlertShow = 1;
        return false;
    }
}
// --------------------- exist email at signup validation

function existEmail(){
    for(var i=0; i<users.length; i++){
        if(users[i].email == userEmail.value){
            
                existEmailAlert.classList.replace('d-none','d-block');
                successAlert.classList.replace('d-block','d-none');
                existAlertShow = 1;
                return true;
            
           
        }
    }

    if(emptyAlertShow == 1){
        existEmailAlert.classList.replace('d-block','d-none');
        existAlertShow = 0;
    }
    return false;
   
}


// ==============================================================
// ====================== login script =========================

var htmlDoc = document;
// --------------------- hold elements of login page 
var emailLogin = htmlDoc.getElementById('email');
var passwordLogin = htmlDoc.getElementById('password');
var loginBtn = htmlDoc.getElementById('login-btn');
var emptyValidationAlert = htmlDoc.getElementById('empty-validation-alert');
var errorAlert = htmlDoc.getElementById('error-alert');


var emptyValidationShow = 0;
var errorAlertShow = 1;

// ------------------ reset login input form
function resetLogin(){
    emailLogin.value = '';
    passwordLogin.value = '';
}

// -------------------------- login btn event 
var index;
var home = document.getElementById('home');
var logoutBtn = document.getElementById('logout-btn');
var h1Home = document.getElementById('h1-home');
loginBtn.addEventListener('click',function(){
   
    if(emptyInputsValidation() == true){
        if( errorValidation() == true){
            
            home.classList.replace('d-none','d-block');
            loginPage.classList.replace('d-block','d-none');
            h1Home.innerHTML = `Welcom ${users[index].name}`;
            resetLogin();



           
            // console.log(logoutBtn);
        }
       
    }
});
// ------------------------------ logout btn event  
var loginPage = document.getElementById('login-page');
logoutBtn.addEventListener('click',function(){
    console.log(users[index].name,'will be deleted');
    deleteAccount();
    // return to log in page 
    home.classList.replace('d-block','d-none');
    loginPage.classList.replace('d-none','d-block');
    

});




// -------------------- empty login input form validation 
function emptyInputsValidation(){
    if(emailLogin.value != '' & passwordLogin.value != ''){

        if(emptyValidationShow == 1){
            emptyValidationAlert.classList.replace('d-block','d-none');
            emptyValidationShow = 0;
        }
        return true;
    }else{
        emptyValidationAlert.classList.replace('d-none','d-block');

        if(errorAlertShow == 1){
            errorAlert.classList.replace('d-block','d-none');
            errorAlertShow = 0;
        }
        emptyValidationShow = 1;
        return false;
    }
}
// -------------------------- email and password validation at login page 

function errorValidation(){
    for(var i=0; i<users.length; i++){
        if(users[i].email == emailLogin.value && users[i].password == passwordLogin.value){

            if(errorAlertShow == 1){
                errorAlert.classList.replace('d-block','d-none');
                errorAlertShow = 0;
            }
            
          
            // console.log(users[i].name ,'exist');
            index = i;
            return true;
            
        }
    }
    
    
    errorAlert.classList.replace('d-none','d-block');
    errorAlertShow = 1;
   
    // console.log(users[i].name ,'not exist');
    return false;
    
}

// ----------------------------------------
// ------------ change from layers 
var loginAnchor = htmlDoc.getElementById('login-anchor');
var signupAnchor = htmlDoc.getElementById('signup-anchor');
var loginPage = htmlDoc.getElementById('login-page');
var signupPage = htmlDoc.getElementById('signup-page');
// ----------------------------- events 
// ================= change between login and sign up pages using click event at span element 
loginAnchor.addEventListener('click',function(){
    signupPage.classList.replace('d-none','d-block');
    loginPage.classList.replace('d-block','d-none');
    
    if(emptyAlertShow == 1){
        existEmailAlert.classList.replace('d-block','d-none');
        existAlertShow = 0;
    }
    
        if(emptyAlertShow == 1){
            emptyInputAlert.classList.replace('d-block','d-none');
            emptyAlertShow = 0;
        }
        if(successAlertShow == 1){
            successAlert.classList.replace('d-block','d-none');
            successAlertShow = 0;
        }
});
// ------------------------------------------------
signupAnchor.addEventListener('click',function(){
    signupPage.classList.replace('d-block','d-none');
    resetSignup();
    loginPage.classList.replace('d-none','d-block');
    
    if(errorAlertShow == 1){
        errorAlert.classList.replace('d-block','d-none');
        errorAlertShow = 0;
    }
    
    if(emptyValidationShow == 1){
        emptyValidationAlert.classList.replace('d-block','d-none');
        emptyValidationShow = 0;
    }
    
});


// ============================ deleteAccount function

function deleteAccount(){
    users.splice(index,1);
    localStorage.setItem('storedUsers',JSON.stringify(users));
}


