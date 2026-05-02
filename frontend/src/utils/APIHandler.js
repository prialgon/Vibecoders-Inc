"use client";
const API_BASE_URL = "http://localhost:8000/";

export const get = async (path, params, returnJSON = true) => {
  let url = `${API_BASE_URL}${path}`;

  if (params) {
    const urlSearchParams = new URLSearchParams(params);
    url = `${url}?${urlSearchParams.toString()}`;
  }

  const token = localStorage.getItem("access");
  let headers;

  if (token != null) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }
  try {
    const response = await fetch(url, { headers: headers });

    if (response.ok && returnJSON) return await response.json();
    else if (!returnJSON) return response;
    else console.error("An error occurred");
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const post = async (path, data, returnJSON = true) => {
  let url = `${API_BASE_URL}${path}`;
  const token = localStorage.getItem("access");
  let headers;
  if (token != null) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (response.ok && returnJSON) return await response.json();
    else if (!returnJSON) return response;
    else console.error("An error occurred");

    throw new Error("Error in POST request. Code: " + response.status);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const put = async (path, data, returnJSON = true) => {
  let url = `${API_BASE_URL}${path}`;
  const token = localStorage.getItem("access");
  let headers;
  if (token != null) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (response.ok && returnJSON) return await response.json();
    else if (!returnJSON) return response;
    else console.error("An error occurred");

    throw new Error("Error in POST request. Code: " + response.status);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const patch = async (path, data, returnJSON = true) => {
  let url = `${API_BASE_URL}${path}`;
  const token = localStorage.getItem("access");
  let headers;
  if (token != null) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (response.ok && returnJSON) return await response.json();
    else if (!returnJSON) return response;
    else console.error("An error occurred");

    throw new Error("Error in POST request. Code: " + response.status);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const del = async (path) => {
  let url = `${API_BASE_URL}${path}`;
  const token = localStorage.getItem("access");
  let headers;
  if (token != null) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (response.ok) {
      return;
    }
    throw new Error("Error in POST request. Code: " + response.status);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const testAccessToken = (access) => {
  const jwt = parseJwt(access);

  if (Date.now() / 1000 > jwt.exp) {
    return false;
  }
  return true;
};

export const refreshToken = async (refresh) => {
  let url = `${API_BASE_URL}api/auth/refresh/`;
  let headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ refresh: refresh }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return { access: responseData.access, refresh: responseData.refresh };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Source - https://stackoverflow.com/a/38552302
// Posted by Peheje, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-02, License - CC BY-SA 4.0

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}
