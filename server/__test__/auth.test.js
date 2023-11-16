const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

beforeAll(async () => {
  try {
    await User.bulkCreate(
      [
        {
          username: "admin",
          email: "admin@gmail.com",
          password: "admin",
        },
      ],
      {
        individualHooks: true,
      }
    );
  } catch (error) {
    console.log(error, "<<<<<<<<<<");
  }
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

let token;
describe("Post /login", () => {
  test("should return token", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const response = await request(app).post("/login").send(user);
    // console.log(response.body, "<<<<<<<<<<<<<<<<<<<");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("token", expect.any(String));

    token = response.body.token;
  });

  test("email invalid", async () => {
    const user = {
      email: "",
      password: "admin",
    };

    const response = await request(app).post("/login").send(user);
    // console.log(response.body, "<<<<<<<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "email cant empty");
  });

  test("password invalid", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "",
    };

    const response = await request(app).post("/login").send(user);
    // console.log(response.body, "<<<<<<<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "password cant empty");
  });

  test("password/email invalid", async () => {
    const user = {
      email: "bambang@gmail.com",
      password: "udin",
    };

    const response = await request(app).post("/login").send(user);
    console.log(response.body, "<<<<<<<<<<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "email/password invalid");
  });
});

describe("Post /register", () => {
  test("succes register", async () => {
    const register = {
      username: "udin",
      email: "udin@gmail.com",
      password: "udin",
    };

    const response = await request(app).post("/register").send(register);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    // console.log(response.body, "<<<<<<<<<<");
    expect(response.body.user).toHaveProperty("role", expect.any(String));
    expect(response.body.user).toHaveProperty("wallet", expect.any(Number));
    expect(response.body.user).toHaveProperty("id", expect.any(Number));
    expect(response.body.user).toHaveProperty("username", expect.any(String));
    expect(response.body.user).toHaveProperty("email", expect.any(String));
    expect(response.body.user).toHaveProperty("password", expect.any(String));
    expect(response.body.user).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body.user).toHaveProperty("createdAt", expect.any(String));
  });

  test("email invalid", async () => {
    const register = {
      username: "udin",
      email: "",
      password: "udin",
    };

    const response = await request(app).post("/register").send(register);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    // console.log(response.body, "<<<<<<<<<<");
    expect(response.body).toHaveProperty("message", "email cant empty");
  });

  test("password invalid", async () => {
    const register = {
      username: "udin",
      email: "udin@gmail.com",
      password: "",
    };

    const response = await request(app).post("/register").send(register);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    // console.log(response.body, "<<<<<<<<<<");
    expect(response.body).toHaveProperty("message", "password cant empty");
  });
});
