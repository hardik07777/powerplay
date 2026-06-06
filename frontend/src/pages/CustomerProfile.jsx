import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";

function CustomerProfile() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const res = await axios.get(`/customers/${id}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const paidCount = data.invoices.filter(
    (i) => i.status === "Paid"
  ).length;

  const unpaidCount = data.invoices.filter(
    (i) => i.status === "Unpaid"
  ).length;

  const overdueCount = data.invoices.filter(
    (i) => i.status === "Overdue"
  ).length;

  const draftCount = data.invoices.filter(
    (i) => i.status === "Draft"
  ).length;

  return (
    <div className="max-w-7xl mx-auto p-8">

      <Link
        to="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Dashboard
      </Link>

      <div className="bg-white border rounded-3xl p-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">

          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-semibold">
            {data.customer.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <h1 className="text-3xl font-semibold">
              {data.customer.name}
            </h1>

            <p className="text-gray-500">
              {data.customer.company}
            </p>
          </div>

        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500">
              Total billed
            </p>

            <h2 className="text-2xl font-bold mt-2">
              ₹{data.metrics.totalBilled.toFixed(2)}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500">
              Total tax
            </p>

            <h2 className="text-2xl font-bold mt-2">
              ₹{data.metrics.totalTax.toFixed(2)}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500">
              Outstanding
            </p>

            <h2 className="text-2xl font-bold mt-2">
              ₹{data.metrics.outstanding.toFixed(2)}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500">
              # Invoices
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {data.metrics.invoiceCount}
            </h2>
          </div>

        </div>

        {/* Status Chips */}
        <div className="flex flex-wrap gap-3 mb-8">

          <div className="px-4 py-2 bg-gray-100 rounded-full text-sm">
            Paid {paidCount}
          </div>

          <div className="px-4 py-2 bg-gray-100 rounded-full text-sm">
            Unpaid {unpaidCount}
          </div>

          <div className="px-4 py-2 bg-gray-100 rounded-full text-sm">
            Overdue {overdueCount}
          </div>

          <div className="px-4 py-2 bg-gray-100 rounded-full text-sm">
            Draft {draftCount}
          </div>

        </div>

        {/* Invoice History */}
        <h2 className="text-xl font-semibold mb-4">
          Invoice History
        </h2>

        <div className="border rounded-xl overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4">
                  Invoice
                </th>

                <th className="text-left p-4">
                  Total
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Issued
                </th>
              </tr>
            </thead>

            <tbody>

              {data.invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b last:border-b-0"
                >
                  <td className="p-4">
                    {invoice.invoiceId}
                  </td>

                  <td className="p-4">
                    ₹{invoice.total.toFixed(2)}
                  </td>

                  <td className="p-4">

                    <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                      {invoice.status}
                    </span>

                  </td>

                  <td className="p-4">
                    {new Date(
                      invoice.issueDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default CustomerProfile;