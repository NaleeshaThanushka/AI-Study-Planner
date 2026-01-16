const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const app = express(); // ✅ INITIALIZE APP FIRST

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/protected", require("./routes/protectedRoutes"));
app.use("/api/plans", require("./routes/studyPlanRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// Error handler (MUST be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
