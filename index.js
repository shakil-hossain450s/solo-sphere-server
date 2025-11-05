require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 4000;
const connectDB = require("./config/database");

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
})