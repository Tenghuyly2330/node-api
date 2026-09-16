const request = require("supertest");
const app = require("../src/app.js");

describe("Health API", () => {
  it("GET /health should return API status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      status: "UP",
      message: "Node.js API is running",
    });
  });
});