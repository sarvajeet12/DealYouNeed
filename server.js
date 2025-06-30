import dotenv from 'dotenv';
dotenv.config({});

import express from "express";
import { connectDB } from "./config/database.js";

const app = express()
const port = 3000;

// Routers
import dealRouter from "./router/deal.js"

// Adding middleware
app.use(express.json())


// Route
app.use("/api/deals", dealRouter)


// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running at port no: ${port}`);
  });
};

startServer();