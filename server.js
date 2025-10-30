import app from "./index.js";
import { connectDb } from "./config/db.js";
import ExchangeService from "./services/ExchangeService.js";

await connectDb();
await ExchangeService.createExchange();

console.info(
  `Total de la caisse actuellement : ${ExchangeService.getTotalExchange(
    await ExchangeService.getExchange()
  )}`
);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
