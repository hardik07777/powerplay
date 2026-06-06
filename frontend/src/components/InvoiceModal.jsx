import { useEffect, useState } from "react";
import axios from "../api/axios";

function InvoiceModal({
  isOpen,
  onClose,
  fetchInvoices,
  editInvoice = null,
}) {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    customerId: "",
    amount: "",
    taxRate: 18,
    status: "Draft",
    issueDate: "",
    dueDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchCustomers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editInvoice) {
      setFormData({
        customerId:
          typeof editInvoice.customer === "object"
            ? editInvoice.customer._id
            : editInvoice.customer,
        amount: editInvoice.amount,
        taxRate: editInvoice.taxRate,
        status: editInvoice.status,
        issueDate: editInvoice.issueDate?.split("T")[0],
        dueDate: editInvoice.dueDate?.split("T")[0],
      });
    }
  }, [editInvoice]);

  const fetchCustomers = async () => {
    const { data } = await axios.get("/customers");
    setCustomers(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const selectedCustomer = customers.find(
    (c) => c._id === formData.customerId
  );

  const tax =
    (Number(formData.amount) * Number(formData.taxRate)) /
    100;

  const total =
    Number(formData.amount || 0) + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editInvoice) {
        await axios.put(
          `/invoices/${editInvoice._id}`,
          formData
        );
      } else {
        await axios.post("/invoices", formData);
      }

      await fetchInvoices();
      onClose();

      setFormData({
        customerId: "",
        amount: "",
        taxRate: 18,
        status: "Draft",
        issueDate: "",
        dueDate: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center p-4 z-50">

      <div className="bg-white w-full max-w-2xl rounded-3xl p-8">

        <h2 className="text-3xl font-semibold mb-8">
          {editInvoice ? "Edit Invoice" : "New Invoice"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Customer */}
          <div>
            <label className="block mb-2 text-gray-600">
              Customer
            </label>

            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value="">
                Select customer
              </option>

              {customers.map((customer) => (
                <option
                  key={customer._id}
                  value={customer._id}
                >
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="block mb-2 text-gray-600">
              Company (auto-filled)
            </label>

            <input
              value={selectedCustomer?.company || ""}
              disabled
              className="w-full border rounded-xl p-3 bg-gray-50"
            />
          </div>

          {/* Amount + Tax */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-gray-600">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-600">
                Tax Rate
              </label>

              <select
                name="taxRate"
                value={formData.taxRate}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="0">0%</option>
                <option value="3">3%</option>
                <option value="5">5%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>

          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-gray-600">
                Issue Date
              </label>

              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-600">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 text-gray-600">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
              <option value="Void">Void</option>
            </select>
          </div>

          {/* Tax + Total */}
          <div className="bg-gray-50 rounded-xl p-4 text-gray-700">
            Tax ₹{tax.toFixed(2)}
            <span className="mx-2">·</span>
            Total ₹{total.toFixed(2)}
            <span className="text-sm text-gray-500">
              {" "}
              (computed)
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl border border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Save Invoice
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default InvoiceModal;