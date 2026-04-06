let login_url = "http://localhost:8000/api/auth/login/";
let register_url = "http://localhost:8000/api/users/register/";

const loginForm = document.getElementById("login-form");

const registerForm = document.getElementById("register-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let data = new FormData(loginForm);
    document.getElementById("error-text").textContent = "";

    let loginPayload = {
      username: data.get("username"),
      password: data.get("password"),
    };
    try {
      let res = await fetch(login_url, {
        method: "POST",
        body: JSON.stringify(loginPayload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let response_data = res.json();

      if (!res.ok) {
        document.getElementById("error-text").innerHTML =
          handleError(response_data);
      }

      localStorage.setItem("access", response["access"]);
      localStorage.setItem("refresh", response["refresh"]);
    } catch {
      document.getElementById("error-text").textContent =
        "Username or password incorrect";
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById("error-text").textContent = "";
    let data = new FormData(registerForm);

    let password1 = data.get("password1");
    let password2 = data.get("password2");

    let registerPayload = {
      username: data.get("username"),
      email: data.get("email"),
      password: password1,
      password2: password2,
    };

    if (password1 !== password2)
      document.getElementById("error-text").textContent =
        "Passwords do not match";
    else {
      try {
        let res = await fetch(register_url, {
          method: "POST",
          body: JSON.stringify(registerPayload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let dataResponse = await res.json();
        if (!res.ok) {
          document.getElementById("error-text").innerHTML =
            handleError(dataResponse);
        }
      } catch (error) {
        document.getElementById("error-text").textContent =
          "Something went wrong";
      }
    }
  });
}

const handleError = (response) => {
  let allErrors = "";
  for (let component in response) {
    allErrors += response[component][component] + "<br>";
  }
  return allErrors;
};
