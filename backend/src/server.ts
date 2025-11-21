import app from "./app";

import ENV from "./config/ENV";
import connectDB from "./config/db";

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  connectDB();
});
