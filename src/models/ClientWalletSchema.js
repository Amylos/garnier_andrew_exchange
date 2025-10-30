import mongoose from "mongoose";
import ExchangeSchema from "./ExchangeSchema.js";

const ClientWalletSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  exchange: { type: ExchangeSchema, required: true },
  bigBills: { type: Boolean, default: false },
});

export default mongoose.model("ClientWallet", ClientWalletSchema);
