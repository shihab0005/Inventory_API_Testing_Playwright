// require("dotenv").config();
import "dotenv/config";
export const testDir = "tests";
export const timeout = 70000;
export const retries = 0;
// export const reporter = [
//   ["html"],
//   ["junit", { outputFile: "results.xml" }],
//   ["allure-playwright"],
// ];
export const projects = [
  {
    name: `Chrome`,
    use: {
      browserName: `chromium`,
      channel: `chrome`,
      headless: false,
      viewport: { width: 1920, height: 1080 },
      screenshot: `only-on-failure`,
      video: `retain-on-failure`,
      trace: `retain-on-failure`,
      // baseURL: process.env.BASE_URL2,
      // baseURL: "https://restful-booker.herokuapp.com",
      extraHTTPHeaders: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      launchOptions: {
        slowMo: 600,
      },
    },
  },
];
