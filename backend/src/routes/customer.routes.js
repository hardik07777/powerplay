import express from "express";
import { getCustomers , getCustomerProfile } from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerProfile);

export default router;