import ExchangeService from "../services/ExchangeService.js";
// import ExchangeSchema from "../models/ExchangeSchema.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { mapExchange } from "../utils/mapperExchange.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("ExchangeService", () => {
  it("crée une caisse avec des valeurs initiales", async () => {
    const caisse = await ExchangeService.createExchange();
    expect(caisse).toBeDefined();
    // Vérifie qu'il y a bien 10 billets de 10€
    expect(caisse[10]).toBe(10);
  });

  it("récupère la caisse existante sans en recréer", async () => {
    const first = await ExchangeService.getExchange();
    const second = await ExchangeService.createExchange();
    expect(second._id.toString()).toBe(first._id.toString());
  });

  it("calcule correctement le total de la caisse", async () => {
    const caisse = await ExchangeService.getExchange();
    const total = ExchangeService.getTotalExchange(caisse);
    expect(typeof total).toBe("number");
    expect(total).toBeGreaterThan(0);
  });
});
