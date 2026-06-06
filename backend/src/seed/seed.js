import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";

import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo Connected");

    const rawData = fs.readFileSync("./seed-data.json", "utf8");
    const invoices = JSON.parse(rawData);

    await Customer.deleteMany();
    await Invoice.deleteMany();

    const customerMap = {};

    for (const invoice of invoices) {
      if (!customerMap[invoice.customer]) {
        const customer = await Customer.create({
          name: invoice.customer,
          company: invoice.company,
        });

        customerMap[invoice.customer] = customer._id;
      }
    }

const invoiceDocs = invoices.map((invoice) => ({
  invoiceId: invoice.invoiceId,

  customer: customerMap[invoice.customer],

  customerName: invoice.customer,

  amount: invoice.amount,

  taxRate: invoice.taxRate,
  tax: invoice.tax,
  total: invoice.total,

  status: invoice.status,

  issueDate: new Date(invoice.issueDate),
  dueDate: new Date(invoice.dueDate),
}));

    await Invoice.insertMany(invoiceDocs);

    console.log(`Customers: ${Object.keys(customerMap).length}`);
    console.log(`Invoices: ${invoiceDocs.length}`);
    console.log("Seed completed");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();