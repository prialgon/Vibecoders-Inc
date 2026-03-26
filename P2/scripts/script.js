let login_url = "http://localhost:8000/api/auth/login";
let register_url = "http://localhost:8000/api/users/register";

const loginForm = document.getElementById("login-form");

const registerForm = document.getElementById("register-form");

if (loginForm){
  let loginPayload = {
    "username": document.getElementById("email").value,
    "password": document.getElementById("password").value
  }
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let res = await fetch(login_url,{
      method: "POST",
      body: JSON.stringify(loginPayload),
      headers: {
        "Content-Type": "application/json",
      }
    })
  }).then((res) => res.json())
    .catch((res) => console.log("Fuck"))
    .then((response) => {
      localStorage.setItem("access", res["access"]);
      localStorage.setItem("refresh", res["refresh"]);
    })
}



