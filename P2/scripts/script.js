let login_url = "http://localhost:8000/api/auth/login/";
let register_url = "http://localhost:8000/api/users/register/";

const loginForm = document.getElementById("login-form");

const registerForm = document.getElementById("register-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let loginPayload = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    let res = await fetch(login_url, {
      method: "POST",
      body: JSON.stringify(loginPayload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch(
        (error) =>
          (document.getElementById("error-text").textContent =
            "Username or password incorrect"),
      )
      .then((response) => {
        localStorage.setItem("access", response["access"]);
        localStorage.setItem("refresh", response["refresh"]);
      });
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById("error-text").textContent = "";

    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;

    let registerPayload = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password1: document.getElementById("password1").value,
      password2: document.getElementById("password2").value,
    };

    if (password1 !== password2)
      document.getElementById("error-text").textContent =
        "Passwords do not match";
    else {
      let res = await fetch(register_url, {
        method: "POST",
        body: JSON.stringify(registerPayload),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch(
          (error) =>
            (document.getElementById("error-text").textContent =
              "Something went wrong"),
        )
        .then((response) => {});
    }
  });
}
