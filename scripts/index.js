const emailIn = document.getElementById("email")
const passwordIn = document.getElementById("password")
const loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = emailIn.value
    const password = passwordIn.value
    fetch('https://reqres.in/api/login',{
        method: 'POST',
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(data => {
        if(data.token){
            console.log(data)
            localStorage.setItem("token", data.token)
            window.location.href = "./html/employee.html"
        }
        else{
            alert("Login Failed. Check your credentials.")
        }
    })
    .catch(err => {
        console.error(`Error in Login ${err}`)
        alert('An error occured during login')
    })
})