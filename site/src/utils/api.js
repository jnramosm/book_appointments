import config from "./config";

export const register = async (email) => {
  return await requestApi("/register", "POST", { email });
};

export const login = async (email) => {
  return await requestApi("/login", "POST", { email });
};

export const getSettings = async (email) => {
  return await requestApi("getsettings", "POST", { email });
};

export const setSettings = async (obj) => {
  return await requestApi("setsettings", "POST", obj);
};

const requestApi = async (
  path = "",
  method = "GET",
  data = null,
  headers = {},
  authorization = {}
) => {
  // Check if API URL has been set
  if (!config?.domains?.api) {
    throw new Error(
      `Error: Missing API Domain – Please add the API domain from your serverless Express.js back-end to this front-end application.  You can do this in the "./config.js" file.  Instructions are listed there and in the documentation.`
    );
  }

  // Prepare URL
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  const url = `${config.domains.api}${path}`;

  // Set headers
  headers = Object.assign({ "Content-Type": "application/json" }, headers);

  // Default options are marked with *
  const response = await fetch(url, {
    method: method.toUpperCase(),
    mode: "cors",
    cache: "no-cache",
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  if (response.status < 200 || response.status >= 300) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
};
