async function signupFormHandler(event) {
    event.preventDefault();

    // getting data from the form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const loginLink = document.querySelector("#login-link")
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            username,
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        }); 
        
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        loginLink.innerHTML= "Login instead"
      }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler); 