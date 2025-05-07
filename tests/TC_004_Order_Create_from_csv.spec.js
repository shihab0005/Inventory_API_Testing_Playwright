import test, { expect } from "@playwright/test";
import { BASE_URL } from "../Utils/config";
import fs1 from "fs/promises";
import fs from "fs";
import { parse } from "csv-parse/sync";

const order_data = parse(fs.readFileSync("TestData/create_order.csv"), {
  columns: true,
  skip_empty_lines: true,
});

test("Inventory Order Create form CSV", async ({ request }) => {
  const get_token = await fs1.readFile("auth-token.txt", "utf-8");

  let create_order;
  for (let data of order_data) {
    create_order = await request.post(`${BASE_URL}/api/v1/order-stock/create`, {
      headers: {
        Authorization: `Bearer ${get_token}`,
      },
      data: {
        delivery_eta: `${data.delivery_eta}`,
        order_date: `${data.order_date}`,
        order_status: "IN_PROGRESS",
        order_stock_items: [
          {
            item_id: `${data.Item_id_1}`,
            net_quantity: 100,
            quantity: 100,
            stock_unit_type: "BOX",
          },
          {
            item_id: `${data.Item_id_2}`,
            net_quantity: 100,
            quantity: 100,
            stock_unit_type: "BOX",
          },
        ],
        received_date: `${data.received_date}`,
        supplier_id: `${data.supplier_id}`,
      },
    });
    const res = await create_order.json();
    // few assertion
    expect(create_order.status()).toBe(200);
    expect(create_order.ok()).toBeTruthy();
    expect(create_order.headers()["content-type"]).toContain(
      "application/json"
    );
    expect(res.order_number).not.toBeNull();
    console.log("Order Number:" + res.order_number);
    console.log("Order ID:" + res.id);
  }
});
