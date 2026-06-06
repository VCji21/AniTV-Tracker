// Setting Server
import dotenv from "dotenv";
dotenv.config(); // Loads env variables

import connectDB from "./config/db.js"; 
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); // Connects DB

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
};
 
startServer(); // Starts server 