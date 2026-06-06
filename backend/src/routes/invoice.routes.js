import express from "express";

import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.get("/", getInvoices);

router.get("/:id", getInvoiceById);

router.post("/", createInvoice);

router.put("/:id", updateInvoice);

export default router;