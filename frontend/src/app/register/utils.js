const registerUrl = "http://localhost:8000/api/auth/register/";

const handleError = (response) => {
  let allErrors = "";
  for (let component in response) {
    allErrors += response[component][component] + "<br>";
  }
  return allErrors;
};

export const doRegister = async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);

  const password1 = data.get("password1");
  const password2 = data.get("password2");

  const registerPayload = {
    username: data.get("username"),
    email: data.get("email"),
    password: password1,
    password2: password2,
  };

  if (password1 !== password2) {
    document.getElementById("registerError").textContent =
      "Passwords do not match";
    return;
  }
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      body: JSON.stringify(registerPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      document.getElementById("registerError").textContent =
        handleError(responseData);
    }
  } catch (error) {
    document.getElementById("registerError").textContent =
      "Something went wrong";
  }
};
