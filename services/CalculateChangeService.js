import ExchangeService from "./ExchangeService.js";
import { mapExchange } from "../utils/mapperExchange.js";

/**
 * Service pour calculer le rendu de monnaie au client
 */
class CalculateChangeService {
  /**
   * Calcule le rendu de monnaie
   * @param {number} amount - montant à payer
   * @param {object} clientExchange - ce que le client donne (mêmes clés que Exchange)
   * @param {boolean} bigBills - true = privilégier grosses coupures, false = petites coupures
   * @returns {object} { changeToGive, updatedCaisse }
   */
  static async calculateChange(amount, clientExchange, bigBills = true) {
    // 1️⃣ Récupère la caisse
    const caisseDoc = await ExchangeService.getExchange();
    const caisse = caisseDoc.toObject();

    // 2️⃣ Calcul du total donné par le client
    const totalGiven = ExchangeService.getTotalExchange(clientExchange);

    if (totalGiven < amount) {
      return {
        success: false,
        message: "Le client n'a pas donné assez d'argent !",
      };
    }

    // 3️⃣ Montant à rendre
    let changeToReturn = +(totalGiven - amount).toFixed(2);
    const changeToGive = {};

    // 4️⃣ Mettre l'argent du client dans la caisse
    for (const [denom, qty] of Object.entries(clientExchange)) {
      caisse[denom] = (caisse[denom] || 0) + qty;
    }

    // 5️⃣ Tri des coupures selon bigBills
    const sortedDenoms = Object.keys(caisse)
      .filter((k) => !["_id", "__v"].includes(k))
      .sort(
        (a, b) =>
          bigBills
            ? mapExchange[b] - mapExchange[a] // grosses d’abord
            : mapExchange[a] - mapExchange[b] // petites d’abord
      );

    // 6️⃣ Calcul du rendu
    for (const denom of sortedDenoms) {
      let value = mapExchange[denom];
      let needed = Math.floor(changeToReturn / value);
      let available = caisse[denom] || 0;
      let toGive = Math.min(needed, available);

      if (toGive > 0) {
        changeToGive[denom] = toGive;
        caisse[denom] -= toGive;
        changeToReturn = +(changeToReturn - value * toGive).toFixed(2);
      }
    }

    if (changeToReturn > 0) {
      return {
        success: false,
        message:
          "Impossible de rendre la monnaie exacte avec la caisse disponible !",
      };
    }

    // 7️⃣ Mettre à jour la caisse en base
    Object.assign(caisseDoc, caisse);

    return { success: true, changeToGive, updatedCaisse: caisse };
  }
}

export default CalculateChangeService;
