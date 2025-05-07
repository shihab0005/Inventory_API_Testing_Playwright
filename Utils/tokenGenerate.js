import { expect } from "@playwright/test";

export async function getToken(request, baseURL, username, password) {
  //const requestContext = await request.newContext();
  const res = await request.get(`${baseURL}/oauth/token`, {
    params: {
      client_id: "client_id",
      client_secret: "client_secret",
      grant_type: "password",
      username,
      password,
    },
  });
  //  Few Assertion
  expect(res.status()).toBe(200);
  expect(res.ok()).toBeTruthy();
  expect(res.headers()["content-type"]).toContain("application/json");
  const data = await res.json();
  return data.access_token;
}
