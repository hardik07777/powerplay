import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";



export const getInvoices = async (req, res) => {
  const { customer } = req.query;
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status,
      taxRate,
      issueDateFrom,
      issueDateTo,
      dueDateFrom,
      dueDateTo,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        {
          invoiceId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customerName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    if (customer) {
  query.customerName = {
    $regex: customer,
    $options: "i",
  };
}

    if (status) {
      query.status = status;
    }

    if (taxRate) {
      query.taxRate = Number(taxRate);
    }

    if (issueDateFrom || issueDateTo) {
      query.issueDate = {};

      if (issueDateFrom)
        query.issueDate.$gte = new Date(issueDateFrom);

      if (issueDateTo)
        query.issueDate.$lte = new Date(issueDateTo);
    }

    if (dueDateFrom || dueDateTo) {
      query.dueDate = {};

      if (dueDateFrom)
        query.dueDate.$gte = new Date(dueDateFrom);

      if (dueDateTo)
        query.dueDate.$lte = new Date(dueDateTo);
    }

   let sort = {};

if (sortBy) {
  sort[sortBy] =
    sortOrder === "asc" ? 1 : -1;
} else {
  sort = {
    createdAt: -1,
  };
}

    const invoices = await Invoice.find(query)
      .populate("customer")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Invoice.countDocuments(query);

    res.status(200).json({
      invoices,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const createInvoice = async (req, res) => {
  try {
    const {
      customerId,
      amount,
      taxRate,
      status,
      issueDate,
      dueDate,
    } = req.body;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const tax = Number(
      ((amount * taxRate) / 100).toFixed(2)
    );

    const total = Number(
      (Number(amount) + tax).toFixed(2)
    );

    const invoice = await Invoice.create({
      invoiceId:
        "INV-" +
        Math.floor(
          1000000 + Math.random() * 9000000
        ),

      customer: customer._id,

      customerName: customer.name,

      amount,
      taxRate,

      tax,
      total,

      status,

      issueDate,
      dueDate,
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(
      req.params.id
    );

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    const {
      amount,
      taxRate,
      status,
      issueDate,
      dueDate,
    } = req.body;

    const tax = Number(
      ((amount * taxRate) / 100).toFixed(2)
    );

    const total = Number(
      (Number(amount) + tax).toFixed(2)
    );

    invoice.amount = amount;
    invoice.taxRate = taxRate;

    invoice.tax = tax;
    invoice.total = total;

    invoice.status = status;

    invoice.issueDate = issueDate;
    invoice.dueDate = dueDate;

    await invoice.save();

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getInvoiceById = async (
  req,
  res
) => {
  try {
    const invoice = await Invoice.findById(
      req.params.id
    );

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};