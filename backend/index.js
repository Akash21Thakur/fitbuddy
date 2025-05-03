const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/aiRoutes"); // ✅ this line

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount the route
app.use("/api", aiRoutes);  // → maps /api/ask-ai

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
