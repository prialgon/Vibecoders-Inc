let login_url = "http://localhost:8000/api/auth/login/";
let register_url = "http://localhost:8000/api/users/register/";

const loginForm = document.getElementById("login-form");

const registerForm = document.getElementById("register-form");

if (loginForm){
  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();
    let loginPayload = {
    "username": document.getElementById("email").value,
    "password": document.getElementById("password").value
  }

    let res = await fetch(login_url,{
      method: "POST",
      body: JSON.stringify(loginPayload),
      headers: {
        "Content-Type": "application/json",
      }
    })
  .then((res) => res.json())
    .catch((res) => console.log("Fuck"))
    .then((response) => {
      localStorage.setItem("access", response["access"]);
      localStorage.setItem("refresh", response["refresh"]);
    })
    })
}



