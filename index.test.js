const { execSync } = require("child_process");
execSync("npm install");
const request = require("supertest");
const app = require("./src/app.js");
const db = require("./db/connection.js");
const {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
} = require("@jest/globals");

describe("GET /restaurants", () => {
  beforeEach(() => {
    execSync("npm run seed");
  });

  it("GET /restaurants should return a status code of 200", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toBe(200);
  });

  it("GET /restaurants should return array", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET /restaurants should return correct number of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body).toHaveLength(3);
  });

  it("GET /restaurants should return correct restaurant data", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        name: "AppleBees",
        location: "Texas",
        cuisine: "FastFood",
      })
    );
    expect(response.body[2]).toEqual(
      expect.objectContaining({
        name: "Spice Grill",
        location: "Houston",
        cuisine: "Indian",
      })
    );
  });

  it("GET /restaurants/:id should return correct restaurant data", async () => {
    const response = await request(app).get("/restaurants/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "AppleBees",
        location: "Texas",
        cuisine: "FastFood",
      })
    );
  });

  it("POST /restaurants should return restaurants array updated with new value", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Chipotleee",
      location: "Denver",
      cuisine: "Mexican",
    });
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(4);
    expect(response.body[response.body.length - 1]).toEqual(
      expect.objectContaining({
        name: "Chipotleee",
        location: "Denver",
        cuisine: "Mexican",
      })
    );
  });

  it("POST /restaurants should throw errors if body contains empty fields", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Chipotle",
      location: "",
      cuisine: "Mexican",
    });
    const response2 = await request(app).post("/restaurants").send({
      name: "",
      location: "Denver",
      cuisine: "Mexican",
    });
    const response3 = await request(app).post("/restaurants").send({
      name: "Chipotle",
      location: "Denver",
      cuisine: "",
    });
    expect(response.body.error[0].msg).toBe("location cannot be empty");
    expect(response2.body.error[0].msg).toBe("name cannot be empty");
    expect(response3.body.error[0].msg).toBe("cuisine cannot be empty");
  });

  it("POST /restaurants should throw errors if name field is not within 10-30 characters", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Chip",
      location: "Denver",
      cuisine: "Mexican",
    });
    const response2 = await request(app).post("/restaurants").send({
      name: "Chipotleyeahwoahportionsarequitesmallnowadays",
      location: "Denver",
      cuisine: "Mexican",
    });
    expect(response.body.error[0].msg).toBe("name must be within 10-30 characters long");
    expect(response2.body.error[0].msg).toBe("name must be within 10-30 characters long");
  });

  it("PUT /restaurants/:id should return return restaurants array updated with new value", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Chipotleee",
      location: "Denver",
      cuisine: "Mexican",
    });
    await request(app).put("/restaurants/4").send({
      name: "Texas Roadhouse",
      location: "Dallas",
      cuisine: "Steak",
    });
    const restaurants = await request(app).get("/restaurants");
    expect(restaurants.body[3]).toEqual(
      expect.objectContaining({
        name: "Texas Roadhouse",
        location: "Dallas",
        cuisine: "Steak",
      })
    );
  });

  it("DELETE /restaurants/:id should delete restaurant by id", async () => {
    await request(app).post("/restaurants").send({
      name: "Chipotle",
      location: "Denver",
      cuisine: "Mexican",
    });
    await request(app).delete("/restaurants/4");
    const restaurants = await request(app).get("/restaurants");
    expect(restaurants.body[3]).toBeUndefined();
  });
});
