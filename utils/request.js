export const request = async (endpoint, jsonBody) => {
  const response = await fetch(endpoint, {
    method: "post",
    body: JSON.stringify(jsonBody),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const json = await response.json();
    return json;
  } else {
    // TODO: Get a proper error message to set
    return {error: true};
  }
};
