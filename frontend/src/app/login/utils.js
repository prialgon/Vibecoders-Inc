let login_url = "http://localhost:8000/api/auth/login/";

const handleError = (response) => {
  let allErrors = "";
  for (let component in response) {
    allErrors += response[component][component] + "<br>";
  }
  return allErrors;
};

export const doLogin = async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);

  const loginPayload = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    let response = await fetch(login_url, {
      method: "POST",
      body: JSON.stringify(loginPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      document.getElementById("loginError").textContent =
        handleError(responseData);
      return;
    }

    localStorage.setItem("access", responseData?.access ?? "");
    localStorage.setItem("refresh", responseData?.refresh ?? "");
  } catch {
    document.getElementById("loginError").textContent =
      "Username or password incorrect";
  }
};
