import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

async function main() {
  try {
    app.listen(PORT);
    await connectDB();
    console.log(`Listening on port http://localhost:${PORT}`);
  } catch (err) {}
}

main();
