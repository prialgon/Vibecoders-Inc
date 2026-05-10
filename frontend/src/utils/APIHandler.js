"use client";
const API_BASE_URL = "http://localhost:8000/";

const handleResponse = async (response, returnJSON = true) => {
  if (!returnJSON) return response;

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    return {
      ok: false,
      data: null,
      error: {
        status: response.status,
        message:
          data?.detail ||
          data?.message ||
          data?.error ||
          `Request failed with status ${response.status}`,
        details: data,
      },
    };
  }

  return data;
};

const errorResponse = (error) => {
  console.error(error);
  return {
    ok: false,
    data: null,
    error: {
      status: null,
      message: "Could not connect to backend",
      details: error,
    },
  };
};

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

    return await handleResponse(response, returnJSON);
  } catch (error) {
    return errorResponse(error);
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

    return await handleResponse(response, returnJSON);
  } catch (error) {
    return errorResponse(error);
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

    return await handleResponse(response, returnJSON);
  } catch (error) {
    return errorResponse(error);
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

    return await handleResponse(response, returnJSON);
  } catch (error) {
    return errorResponse(error);
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

    return await handleResponse(response, false);
  } catch (error) {
    return errorResponse(error);
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

    const responseData = await handleResponse(response);

    if (responseData && responseData.ok !== false) {
      return { access: responseData.access, refresh: responseData.refresh };
    }
    return null;
  } catch (error) {
    return errorResponse(error);
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
