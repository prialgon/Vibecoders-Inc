const API_BASE_URL = "http://localhost:8000/";

export const get = async (path, params) => {
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

    if (response.ok) return await response.json();

    throw new Error("Error in request, code: " + response.status);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const post = async (path, data) => {
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

    if (response.ok) {
      return await response.json();
    }

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
