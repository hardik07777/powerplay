import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";

export const getSummary = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    const totalBilled = invoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0
    );

    const totalTax = invoices.reduce(
      (sum, invoice) => sum + invoice.tax,
      0
    );

    const totalInvoices = invoices.length;

    const totalCustomers =
      await Customer.countDocuments();

    const topCustomers = await Invoice.aggregate([
      {
        $group: {
          _id: "$customerName",
          value: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: {
          value: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.json({
      totalBilled,
      totalTax,
      totalInvoices,
      totalCustomers,
      topCustomers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};