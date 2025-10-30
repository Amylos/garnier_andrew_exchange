import mongoose from "mongoose";

const ExchangeSchema = new mongoose.Schema({
  "0point01": { type: Number, default: 0 },
  "0point02": { type: Number, default: 0 },
  "0point05": { type: Number, default: 0 },
  "0point10": { type: Number, default: 0 },
  "0point20": { type: Number, default: 0 },
  "0point50": { type: Number, default: 0 },
  1: { type: Number, default: 0 },
  2: { type: Number, default: 0 },
  5: { type: Number, default: 0 },
  10: { type: Number, default: 0 },
  20: { type: Number, default: 0 },
  50: { type: Number, default: 0 },
  100: { type: Number, default: 0 },
  200: { type: Number, default: 0 },
  500: { type: Number, default: 0 },
});

// export default mongoose.model("Exchange", ExchangeSchema);
export default ExchangeSchema;
