import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    taxRate: {
      type: Number,
      enum: [0, 3, 5, 18, 28],
      required: true,
    },

    tax: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Sent",
        "Unpaid",
        "Overdue",
        "Paid",
        "Void",
        "Draft",
      ],
      required: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },
    customerName: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

invoiceSchema.index({ status: 1 });
invoiceSchema.index({ dueDate: 1 });
invoiceSchema.index({ issueDate: 1 });
invoiceSchema.index({ amount: 1 });

export default mongoose.model("Invoice", invoiceSchema);