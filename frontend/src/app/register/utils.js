import { redirect } from "next/navigation";
import { post } from "@/utils/APIHandler.js";
const registerPath = "api/users/register/";

const handleError = (response) => {
  let allErrors = "";
  console.log(Object.values(response));
  for (let component in response) {
    if (Array.isArray(component)) allErrors += response.component[0] + "\n";
    else allErrors += response[component][component] + "\n";
  }
  return allErrors;
};

const findErrorsString = (errors) => {
  switch (errors.constructor) {
    case String:
      return errors;
    case Object:
      let objChildError = Object.keys(errors).map((key) => errors[key]);
      return objChildError.map(findErrorsString);
    case Array:
      return errors.map(findErrorsString);

    default:
      return "";
  }
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
  let success = false;
  try {
    const response = await post(registerPath, registerPayload, false);
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      document.getElementById("registerError").innerHTML =
        findErrorsString(responseData).join("\r\n<br />");
      return;
    }
    success = true;
  } catch (error) {
    document.getElementById("registerError").textContent =
      "Something went wrong";
    console.error(error);
  }

  if (success) {
    redirect("/login");
  }
};
