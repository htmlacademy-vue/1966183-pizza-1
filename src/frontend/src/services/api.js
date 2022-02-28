const backend = "http://localhost:3000";

function getUrl(address) {
  return new URL(`${backend}/${address}`);
}

async function getRequest({ address, token }) {
  const url = getUrl(address);
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const responseBody = await response.json();
  if (responseBody.error) {
    alert(responseBody.error.message);
    return null;
  }
  return responseBody;
}

async function postRequest({ address, body, token }) {
  const url = getUrl(address);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (response.statusText === "No Content" && response.ok) {
    return true;
  }
  const responseBody = await response.json();

  if (responseBody.error) {
    alert(responseBody.error.message);
    return null;
  }
  return responseBody;
}

async function putRequest({ address, body, token }) {
  const url = getUrl(address);
  const response = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (response.statusText === "No Content" && response.ok) {
    return true;
  }
  const responseBody = await response.json();

  if (responseBody.error) {
    alert(responseBody.error.message);
    return null;
  }
  return responseBody;
}

async function deleteRequest({ address, token }) {
  const url = getUrl(address);
  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (response.statusText === "No Content" && response.ok) {
    return true;
  }
  if (!response.ok) {
    console.log("error");
    return null;
  }
  return true;
}

export default { getRequest, postRequest, deleteRequest, putRequest };
