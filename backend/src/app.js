import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import invoiceRoutes from "./routes/invoice.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import summaryRoutes from "./routes/summary.routes.js";
import cors from "cors";





dotenv.config();

const app = express();
app.use(cors());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
  app.use(express.json());
  app.use("/api/invoices", invoiceRoutes);
  app.use("/api/summary", summaryRoutes);
  app.use("/api/customers", customerRoutes);
  app.get("/", (req, res) => {
  res.send("API Running");
});



app.listen(5000, () => {
  console.log("Server Running");
});