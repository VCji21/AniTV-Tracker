// Express app configuration
import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/uploadRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import animeRoutes from "./routes/animeRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// create express app
const app = express();

// middlewares
app.use(cors()); // Connect backend with frontend
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", uploadRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/posts", postRoutes)

// test route
app.get("/", (req, res) => {
  res.json({ 
    message: "API is running 🚀" 
  });
});
  
export default app;

/*
BIG PICTURE:

              Middleware  
                 |
Request -> Route -> Controller -> Model -> Database
                       |
                    Response
              


*/