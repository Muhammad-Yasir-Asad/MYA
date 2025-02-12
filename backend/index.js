require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pantryRoutes = require('./routes/pantryRoutes');

const authRoutes = require("./routes/authRoutes"); // 🔹 Add Authentication Routes
const errorHandler = require("./middleware/errorMiddleware");



const app = express();

// ✅ Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for frontend communication

// ✅ Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Force exit on DB connection failure
    });

// ✅ Routes
app.use("/api/auth", authRoutes); // 🔹 Add Authentication Routes
app.use("/api/pantry", pantryRoutes); // Pantry Item Routes

app.use(errorHandler);


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
