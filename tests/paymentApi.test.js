import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ExchangeService from "../services/ExchangeService.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
  await mongoose.connect(process.env.MONGO_URI);
  await ExchangeService.createExchange();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /api/payment", () => {
  it("devrait renvoyer un succès et un rendu de monnaie", async () => {
    const res = await request(app)
      .post("/api/payment")
      .send({
        amount: 18,
        exchange: { 10: 2 }, // paie avec 20€
        bigBills: false,
      })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.changeToGive).toBeDefined();
  });
});
