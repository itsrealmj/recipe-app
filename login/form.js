let formContainer = document.querySelector('.form-container')
const loginBtn = document.querySelector('.loginBtn')
const signupBtn = document.querySelector('.signupBtn')

signupBtn.addEventListener('click', () => formContainer.classList.add('active') )
loginBtn.addEventListener('click', () => formContainer.classList.remove('active') )

