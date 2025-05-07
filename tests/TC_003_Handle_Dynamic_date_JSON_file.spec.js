/**
 *
 *
 **/

import test from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../Utils/config";
import fs from "fs/promises";

import month_datas from "../TestData/ci_month_data.json";

test("Handle Dynamic data from JSON file", async ({ request }) => {
  const get_token = await fs.readFile("auth-token.txt", "utf-8"); // get token from auth-token.txt file

  // ------------------------ Get January to April data By Using Date Range form JSON file -----------------------------//

  for (let month_data of month_datas) {
    const res_data = await request.get(
      `${BASE_URL}/api/v1/ci-dashboard/overview`,
      {
        headers: {
          Authorization: `Bearer ${get_token}`,
        },
        params: {
          companyId: 57383,
          fromDate: `${month_data.fromDate}`,
          toDate: `${month_data.toDate}`,
        },
      }
    );
    const dashboard_data = await res_data.json();
    console.log(dashboard_data);
  }

  //------------------------------------ Get Payment details from last 4 month -------------------------------//

  for (let payments of month_datas) {
    const res_data = await request.get(
      `${BASE_URL}/api/v1/ci-dashboard/payment-overview`,
      {
        headers: {
          Authorization: `Bearer ${get_token}`,
        },
        params: {
          companyId: 57383,
          fromDate: `${payments.fromDate}`,
          toDate: `${payments.toDate}`,
        },
      }
    );
    const payment_details = await res_data.json();
    console.log(payment_details);
  }
});
