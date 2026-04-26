import { put } from "@/utils/APIHandler";
import { redirect } from "next/navigation";

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

export const handleUserDataSubmit = async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);

  const userPayload = {
    username: data.get("username"),
    email: data.get("email"),
  };

  let success = false;
  try {
    const response = await put("api/users/profile/", userPayload, false);
    const responseData = await response.json();

    if (!response.ok) {
      const errorElement = document.getElementById("userError");
      if (errorElement) {
        errorElement.innerHTML = findErrorsString(responseData).join(
          "\r\n<br />"
        );
      }
      return;
    }

    success = true;
  } catch (error) {
    console.error(error);
  }
  if (success) {
    redirect("/home");
  }
};

export const handlePasswordChange = async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);

  const pwdPayload = {
    old_password: data.get("oldpassword"),
    password: data.get("password1"),
    password2: data.get("password2"),
  };

  if (pwdPayload.password !== pwdPayload.password2) {
    document.getElementById("passwordErr").textContent =
      "Passwords do not match";
    return;
  }

  let success = false;
  try {
    const response = await put(
      "api/users/profile/password/",
      pwdPayload,
      false
    );
    const responseData = await response.json();

    if (!response.ok) {
      const errorElement = document.getElementById("passwordErr");
      if (errorElement) {
        errorElement.innerHTML = findErrorsString(responseData).join(
          "\r\n<br />"
        );
      }
      return;
    }
    success = true;
  } catch (error) {
    console.error(error);
  }
  if (success) {
    redirect("/home");
  }
};
