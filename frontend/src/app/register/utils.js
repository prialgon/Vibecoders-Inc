import { redirect } from "next/navigation";
import { post } from "@/utils/APIHandler.js";
const registerPath = "api/users/register/";

const handleError = (response) => {
  let allErrors = "";
  for (let component in response) {
    allErrors += response[component][component];
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
  let success = false;
  try {
    const responseData = await post(registerPath, registerPayload);
    if (responseData == null) {
      document.getElementById("registerError").textContent =
        "An error has occurred.";
      return;
    }
    success = true;
  } catch (error) {
    document.getElementById("registerError").textContent =
      "Something went wrong";
  }

  if (success) {
    redirect("/login");
  }
};
