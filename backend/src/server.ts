import app from "./app.ts";

import ENV from "./config/ENV.ts";
import connectDB from "../src/config/db.ts";

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  connectDB();
});
