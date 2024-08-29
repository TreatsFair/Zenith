  function checkPasswordComplexity(password) {  
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;  
    return regex.test(password);  
}  

document.getElementById('signupForm').addEventListener('submit', function(event) {  
    event.preventDefault();  
  
    if (!document.getElementById('username').value ||  
        !document.getElementById('email').value ||  
        !document.getElementById('password').value ||  
        !document.getElementById('confirm-password').value ||  
        !document.querySelector('input[type="checkbox"]').checked) {  

        document.getElementById('error-message').style.display = 'block';  
        return; 
    }
    
    const password = document.getElementById('password').value;  
    if (!checkPasswordComplexity(password)) {  
         
        const passwordComplexityError = document.createElement('p');  
        passwordComplexityError.id = 'password-complexity-error';  
        passwordComplexityError.className = 'error';  
        passwordComplexityError.textContent = 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.';  
        document.getElementById('signupForm').appendChild(passwordComplexityError); 
        return; 
    }  
  
     
    if (document.getElementById('password').value !== document.getElementById('confirm-password').value) {  
        document.getElementById('password-error').style.display = 'block'; 
        return; 
    }  
  
      
    document.getElementById('error-message').style.display = 'none';  
    document.getElementById('password-error').style.display = 'none';  
    document.getElementById('success-message').style.display = 'block';  
  
    
    setTimeout(function() {  
        window.location.href = '../login/index.html';  
    }, 2000); 
});