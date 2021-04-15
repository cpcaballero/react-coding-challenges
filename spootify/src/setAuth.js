import config from "./config";
const setAuth = async () => {
  const b64Auth = btoa(config.api.clientId + ":" + config.api.clientSecret);
  const result = await fetch(config.api.authUrl, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: "Basic " + b64Auth,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => res.json());

  localStorage.setItem("access_token", result.access_token);
  localStorage.setItem("token_type", result.token_type);

  return {
    accessToken: result.access_token,
    tokenType: result.token_type,
  };
};

export default setAuth;
