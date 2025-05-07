import test, { expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../Utils/config";
import fs from "fs/promises";
import { getToken } from "../Utils/tokenGenerate";

test("Create Token and Save auth-token.txt file for reuse", async ({
  request,
}) => {
  //------------------------ Get token from this API (Token Handle Aproach-2) Save in txt file and reuse-------------------------------------//

  //   const res = await request.get(`${BASE_URL}/oauth/token`, {
  //     params: {
  //       client_id: "client_id",
  //       client_secret: "client_secret",
  //       grant_type: "password",
  //       username: `${USERNAME}`,
  //       password: `${PASSWORD}`,
  //     },
  //   });
  //   const data = await res.json();
  //   const token = data.access_token;
  const token = await getToken(request, BASE_URL, USERNAME, PASSWORD);

  await fs.writeFile("auth-token.txt", token); // save token on auth-token.txt file
  console.log("Token: " + token);
});
