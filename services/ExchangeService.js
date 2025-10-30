import ExchangeSchema from "../models/ExchangeSchema.js";
import { mapExchange } from "../utils/mapperExchange.js";
import mongoose from "mongoose";

const Exchange = mongoose.model("Exchange", ExchangeSchema);

class ExchangeService {
  // Crée la caisse une seule fois si elle n'existe pas
  static async createExchange() {
    let exchange = await Exchange.findOne();
    if (!exchange) {
      // Intialise la caisse
      const initialCaisse = {
        "0point01": 100,
        "0point02": 100,
        "0point05": 100,
        "0point10": 50,
        "0point20": 50,
        "0point50": 50,
        1: 20,
        2: 20,
        5: 20,
        10: 10,
        20: 5,
        50: 2,
        100: 1,
        200: 1,
        500: 0,
      };

      exchange = new Exchange(initialCaisse);
      await exchange.save();
      console.info("✅ Caisse créée en base");
    }
    return exchange;
  }

  // 2️⃣ Récupère la caisse
  static async getExchange() {
    let exchange = await Exchange.findOne();
    if (!exchange) {
      exchange = await this.createExchange();
    }
    return exchange;
  }

  // 3️⃣ Calcule le total de l'exchange
  static getTotalExchange(exchange) {
    const obj = exchange.toObject ? exchange.toObject() : exchange;


    const total = Object.entries(obj).reduce((sum, [denom, qty]) => {
      if (["__v", "_id"].includes(denom)) return sum;
      return sum + (mapExchange[denom] || 0) * qty;
    }, 0);

    return +total.toFixed(2);
  }
}

export default ExchangeService;
