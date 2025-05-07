/**
 * Test Scenerio: Get Single User Details from 10 user.
 * Steps:
 * 1. Get Token form auth/token API
 * 2. Print 10 user from global secrch API.
 * 3. Get All Phone Number From 10 User.
 * 4. Find a single Phone Number from those Users.
 * 5. Get Expected user details Using Single User API. 
 **/


import test, { expect } from "@playwright/test";
import "dotenv/config";

test("Get Single User Details from 10 user", async ({ request }) => {

    //------------------------ Get token from this API (Token Handle Aproach-1) -------------------------------------//
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


//------------------------ Search User From The Global Search API -------------------------------------//
  const user_reponse = await request.get(
    `${process.env.BASE_URL2}/api/v9/global/search`,
    {
      params: {
        size: 10,
        q: "0188899900",
      },
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );
  const users = await user_reponse.json();


  const get_all_phone = users?.content?.map((user) => user?.phone);
  console.log(get_all_phone);

  const single_phone = get_all_phone.find((phn) => phn == "01888999007");
  console.log(single_phone);

  //------------------------ Get Single User Details From This Users API-------------------------------------//

  const get_single_user_res = await request.get(
    `${process.env.BASE_URL2}/api/v6/users/${single_phone}`,
    {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );
  const get_single_user_data = await get_single_user_res.json();

  console.log("Verifying user phone:", get_single_user_data.username);
  expect(get_single_user_data.username).toEqual(single_phone);
});
