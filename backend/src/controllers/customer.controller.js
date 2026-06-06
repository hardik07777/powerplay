import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";


export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getCustomerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const invoices = await Invoice.find({
      customer: id,
    }).sort({
      issueDate: -1,
    });

    const totalBilled = invoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0
    );

    const totalTax = invoices.reduce(
      (sum, invoice) => sum + invoice.tax,
      0
    );

    const outstanding = invoices
      .filter(
        (invoice) =>
          invoice.status === "Unpaid" ||
          invoice.status === "Overdue"
      )
      .reduce((sum, invoice) => sum + invoice.total, 0);

    res.json({
      customer,
      metrics: {
        totalBilled,
        totalTax,
        outstanding,
        invoiceCount: invoices.length,
      },
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};