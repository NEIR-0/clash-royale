const { Card, User, Inventory, Coin, Order } = require("../models");
const app = require("../app");
const request = require("supertest");

beforeAll(async () => {
  try {
    await User.bulkCreate(
      [
        {
          username: "admin",
          email: "admin@gmail.com",
          password: "admin",
          role: "admin",
        },
        {
          username: "udin",
          email: "udin@gmail.com",
          password: "udin",
          role: "staff",
          wallet: 0,
        },
      ],
      {
        individualHooks: true,
      }
    );

    await Card.bulkCreate([
      {
        name: "Royal Ghost",
        elixir: 3,
        type: "Troop",
        rarity: "Legendary",
        description: "He drifts invisibly through the Arena until he's startled by an enemy... then he attacks! Then he's invisible again! Zzzz.",
        cardPrice: 20,
        createdAt: "2023-11-16T03:52:44.203Z",
        updatedAt: "2023-11-16T03:52:44.203Z",
        imgUrl: "https://api-assets.clashroyale.com/cards/300/3En2cz0ISQAaMTHY3hj3rTveFN2kJYq-H4VxvdJNvCM.png",
      },
      {
        name: "Ram Rider",
        elixir: 5,
        type: "Troop",
        rarity: "Legendary",
        description: "Together they charge through the Arena; snaring enemies, knocking down towers ... and chewing grass!?",
        cardPrice: 20,
        createdAt: "2023-11-16T03:52:44.203Z",
        updatedAt: "2023-11-16T03:52:44.203Z",
        imgUrl: "https://api-assets.clashroyale.com/cards/300/QaJyerT7f7oMyZ3Fv1glKymtLSvx7YUXisAulxl7zRI.png",
      },
      {
        name: "Zappies",
        elixir: 4,
        type: "Troop",
        rarity: "Rare",
        description: "Spawns a pack of miniature Zap machines. Who controls them...? Only the Master Builder knows.",
        cardPrice: 5,
        createdAt: "2023-11-16T03:52:44.203Z",
        updatedAt: "2023-11-16T03:52:44.203Z",
        imgUrl: "https://api-assets.clashroyale.com/cards/300/QZfHRpLRmutZbCr5fpLnTpIp89vLI6NrAwzGZ8tHEc4.png",
      },
      {
        name: "Rascals",
        elixir: 5,
        type: "Troop",
        rarity: "Common",
        description: "Spawns a mischievous trio of Rascals! The boy takes the lead, while the girls pelt enemies from behind... with slingshots full of Double Trouble Gum!",
        cardPrice: 3,
        createdAt: "2023-11-16T03:52:44.203Z",
        updatedAt: "2023-11-16T03:52:44.203Z",
        imgUrl: "https://api-assets.clashroyale.com/cards/300/KV48DfwVHKx9XCjzBdk3daT_Eb52Me4VgjVO7WctRc4.png",
      },
      {
        name: "Cannon Cart",
        elixir: 5,
        type: "Troop",
        rarity: "Epic",
        description: "A Cannon on wheels?! Bet they won't see that coming! Once you break its shield, it becomes a Cannon not on wheels.",
        cardPrice: 7,
        createdAt: "2023-11-16T03:52:44.203Z",
        updatedAt: "2023-11-16T03:52:44.203Z",
        imgUrl: "https://api-assets.clashroyale.com/cards/300/aqwxRz8HXzqlMCO4WMXNA1txynjXTsLinknqsgZLbok.png",
      },
    ]);

    await Inventory.bulkCreate([
      {
        id: 2,
        userId: 2,
        cardId: 2,
      },
    ]);

    await Coin.bulkCreate([
      {
        amount: 10,
        price: 10000,
      },
      {
        amount: 25,
        price: 20000,
      },
      {
        amount: 50,
        price: 48000,
      },
      {
        amount: 75,
        price: 70000,
      },
      {
        amount: 100,
        price: 98000,
      },
    ]);

    await Order.bulkCreate([
      {
        id: 1,
        status: false,
        userId: 1,
        coinId: 1,
      },
      {
        id: 2,
        status: false,
        userId: 1,
        coinId: 1,
      },
    ]);
  } catch (error) {
    console.log(error, "<<<<<<<<<<<<");
  }
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Card.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Inventory.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Coin.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await Order.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

let token;
describe("GET /", () => {
  test("get list card", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("type", expect.any(String));
    expect(response.body[0]).toHaveProperty("elixir", expect.any(String));
    expect(response.body[0]).toHaveProperty("rarity", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("cardPrice", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Card, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});

describe("GET /market", () => {
  test("get list market", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/market").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("type", expect.any(String));
    expect(response.body[0]).toHaveProperty("elixir", expect.any(String));
    expect(response.body[0]).toHaveProperty("rarity", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("cardPrice", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/market");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  test("length not 2", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/market").set("Authorization", `${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  test("not Bearer", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/market").set("Authorization", `udin ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  // invalidUser
  test("user not found", async () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwfQ.dHasOoUoT3nIg_32zuSeAUi5lLMo9AVrYeFr5FCsymA";
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/market").set("Authorization", `Bearer ${token}`);
    console.log(response.body, ">>>>>>>>>>");
    // expect(response.status).toBe(200);
    // expect(response.body).toBeInstanceOf(Object);
  });

  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Card, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/market").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});

describe("GET /card/:id", () => {
  test("get card by id", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/card/1").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("type", expect.any(String));
    expect(response.body).toHaveProperty("elixir", expect.any(String));
    expect(response.body).toHaveProperty("rarity", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body).toHaveProperty("cardPrice", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/card/1");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  test("not found", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/card/100").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Not Found");
  });

  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Card, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});

describe("DELETE /delete/:id", () => {
  test("get delete by id", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).delete("/delete/1").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "card with id: 1, has been removed");
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).delete("/delete/1");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  test("not found", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).delete("/delete/2000").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Not Found");
  });

  test("forbidden", async () => {
    const user = {
      email: "udin@gmail.com",
      password: "udin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).delete("/delete/2000").set("Authorization", `Bearer ${token}`);
    console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "forbidden");
  });
  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Card, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});

describe("GET /inventory", () => {
  test("get inventory", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/inventory").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("username", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("password", expect.any(String));
    expect(response.body).toHaveProperty("role", expect.any(String));
    expect(response.body).toHaveProperty("wallet", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body).toHaveProperty("Cards", expect.any(Array));
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/inventory");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });
  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(User, "findOne").mockRejectedValueOnce("simulasi gagal");

    const response = await request(app).get("/inventory").set("Authorization", `Bearer ${token}`);
    console.log(response.body, ">>>>>>>>>>");
    console.log(response.status, ">>>>>>>>>>");

    expect(response.status).toBe(500);
  });
});

describe("POST /inventory/:id", () => {
  test("get inventory by id", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).post("/inventory/2").set("Authorization", `Bearer ${token}`);
    // console.log(response.body.data.cardId, typeof response.body.data.cardId, ">>>>>>>>>>");
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data).toHaveProperty("userId", expect.any(Number));
    expect(response.body.data).toHaveProperty("cardId", expect.any(Number));
    expect(response.body.data).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body.data).toHaveProperty("createdAt", expect.any(String));
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).post("/inventory/1");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  test("not founds", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).post("/inventory/2000").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Not Found");
  });

  test("duplicate", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response1 = await request(app).post("/inventory/2").set("Authorization", `Bearer ${token}`);
    const response2 = await request(app).post("/inventory/2").set("Authorization", `Bearer ${token}`);
    // console.log(response2.body, ">>>>>>>>>>");
    expect(response2.status).toBe(400);
    expect(response2.body).toBeInstanceOf(Object);
    expect(response2.body).toHaveProperty("message", "you already have one");
  });

  test("not enough", async () => {
    const user = {
      email: "udin@gmail.com",
      password: "udin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).post("/inventory/3").set("Authorization", `Bearer ${token}`);
    console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "your coin its not enough. Please top up now!");
  });

  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Card, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});

describe("GET /coins", () => {
  test("get list coins", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/coins").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("amount", expect.any(Number));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/coins");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Coin, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/coins").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});

describe("GET /orders", () => {
  test("get list orders", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/orders").set("Authorization", `Bearer ${token}`);
    console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
    expect(response.body[0]).toHaveProperty("coinId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("userId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/orders");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Order, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/orders").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});

// aneh
describe("Post /orders/:coinId", () => {
  test.only("post orders by id", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    console.log(token, "<<<<<<<<<");

    const response = await request(app).post("/orders/3").set("Authorization", `Bearer ${token}`);
    console.log(response.body, ">>>>>>>>>>");
    // expect(response.status).toBe(201);
    // expect(response.body).toBeInstanceOf(Object);
    // expect(response.body).toHaveProperty("id", expect.any(Number));
    // expect(response.body).toHaveProperty("status", expect.any(String));
    // expect(response.body).toHaveProperty("coinId", expect.any(Number));
    // expect(response.body).toHaveProperty("userId", expect.any(Number));
    // expect(response.body).toHaveProperty("createdAt", expect.any(String));
    // expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).post("/orders/1");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  test("not found", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).post("/orders/100").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Not Found");
  });

  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Card, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});

describe("GET /users", () => {
  test("get list users", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/users").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("username", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("password", expect.any(String));
    expect(response.body).toHaveProperty("role", expect.any(String));
    expect(response.body).toHaveProperty("wallet", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).get("/users");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Card, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});

describe("PUT /users", () => {
  test("get list users", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).put("/users").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "user successfull updated");
  });

  test("authentications", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    const response = await request(app).put("/users");
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "invalid token");
  });

  // internal server error
  test("internal serber error", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const userToken = await request(app).post("/login").send(user);
    token = userToken.body.token;
    // console.log(token, "<<<<<<<<<");

    jest.spyOn(Card, "findAll").mockRejectedValueOnce("simulasi gagal");
    const response = await request(app).get("/").set("Authorization", `Bearer ${token}`);
    // console.log(response.body, ">>>>>>>>>>");
    expect(response.status).toBe(500);
  });
});
