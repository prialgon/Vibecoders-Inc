import { redirect } from "next/navigation";
import { post } from "@/utils/APIHandler.js";
const loginPath = "api/auth/login/";

const handleError = (response) => {
  let allErrors = "";
  for (let component in response) {
    allErrors += response[component] + "\n";
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
  let success = false;
  try {
    const response = await post(loginPath, loginPayload, false);

    const responseData = await response.json();

    if (!response.ok)
      document.getElementById("loginError").textContent =
        handleError(responseData);
    else {
      localStorage.setItem("access", responseData?.access ?? "");
      localStorage.setItem("refresh", responseData?.refresh ?? "");
      success = true;
    }
  } catch (error) {
    document.getElementById("loginError").textContent =
      "Username or password incorrect";
    console.error(error);
  }
  if (success) {
    redirect("/home");
  }
};
