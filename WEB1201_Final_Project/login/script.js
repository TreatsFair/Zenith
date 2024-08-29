document.getElementById('loginForm').addEventListener('submit', function(event) {  
    event.preventDefault(); 
    
   
    const username = document.getElementById('username').value;  
    const password = document.getElementById('password').value;  
  
    if (username.trim() === '' || password.trim() === '') {  
        alert('Username and password cannot be empty!');  
        return;  
    }  
    
    
    console.log('Username:', username);  
    console.log('Password:', password); 
    
   
    alert('Login successful!');  

    window.location.href = '../home.html';  
});