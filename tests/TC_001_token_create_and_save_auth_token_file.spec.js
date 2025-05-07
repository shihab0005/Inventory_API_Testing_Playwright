import test, { expect } from "@playwright/test";
import "dotenv/config";
import fs from "fs/promises";

test("Create Token and Save auth-token.txt file for reuse", async ({
  request,
}) => {
  //------------------------ Get token from this API (Token Handle Aproach-2) Save in txt file and reuse-------------------------------------//

  const res = await request.get(`${process.env.BASE_URL2}/oauth/token`, {
    params: {
      client_id: "client_id",
      client_secret: "client_secret",
      grant_type: "password",
      username: `${process.env.USER_NAME}`,
      password: `${process.env.PASSWORD}`,
    },
  });
  const data = await res.json();
  const token = data.access_token;

  //  Few Assertion
  expect(res.status()).toBe(200);
  expect(res.ok()).toBeTruthy();
  expect(res.headers()["content-type"]).toContain("application/json");

  await fs.writeFile("auth-token.txt", token); // save token on auth-token.txt file
  console.log("Token: " + token);
});
