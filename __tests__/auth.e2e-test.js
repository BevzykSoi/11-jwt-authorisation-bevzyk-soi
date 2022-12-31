const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../src/app");

describe("/auth", () => {
  jest.setTimeout(15000);

  let mongod;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  describe("POST /auth/register", () => {
    test("should register user", async () => {
      const userData = {
        username: "john_doe",
        password: "12345",
        age: 109,
        description: "Excepteur eu tempor.",
      };
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("user");

      const { password, ...userWithoutPassword } = userData;
      expect(response.body.user).toMatchObject(userWithoutPassword);
      expect(response.body.user.password).not.toBe(password);
    });

    test("should return 403 with duplicate username", async () => {
      const userData = {
        username: "john_doe",
        password: "12345",
        age: 109,
        description: "Excepteur eu tempor.",
      };
      await request(app).post("/api/v1/auth/register").send(userData);

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(response.statusCode).toBe(403);
    });
  });

  describe("POST /auth/login", () => {
    test("should login user", async () => {
      const userData = {
        username: "john_doe",
        password: "12345",
        age: 109,
        description: "Excepteur eu tempor.",
      };
      await request(app).post("/api/v1/auth/register").send(userData);

      const response = await request(app).post("/api/v1/auth/login").send({
        username: userData.username,
        password: userData.password,
      });

      expect(response.body.user.username).toBe(userData.username);
      expect(response.body.token).toBeDefined();
    });

    test("should fail login user", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        username: "non-existing username",
        password: "empty password",
      });

      expect(response.status).toBe(403);
    });

    test("should return 422 without credentials", async () => {
      const response = await request(app).post("/api/v1/auth/login");
      expect(response.status).toBe(422);
    });
  });

  describe("GET /auth/profile", () => {
    test("should authorize user", async () => {
      const userData = {
        username: "john_doe",
        password: "12345",
        age: 109,
        description: "Excepteur eu tempor.",
      };
      const registerResponse = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      const authToken = registerResponse.body.token;
      const response = await request(app)
        .get("/api/v1/auth/profile")
        .auth(authToken, { type: "bearer" });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    test("should return unauthorized error", async () => {
      const authToken = "invalid token";
      const response = await request(app)
        .get("/api/v1/auth/profile")
        .auth(authToken, { type: "bearer" });

      expect(response.status).toBe(401);
    });
  });
});
