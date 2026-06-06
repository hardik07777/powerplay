import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

function Summary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const { data } = await axios.get("/summary");
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!summary) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  const maxCustomerValue =
    summary.topCustomers?.[0]?.value || 1;

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-semibold mb-8">
        Summary / Analytics
      </h1>

      <div className="bg-white border rounded-2xl p-6">

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Total billed
            </p>

            <h2 className="text-2xl font-bold mt-2">
              ₹{summary.totalBilled.toFixed(2)}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Total tax
            </p>

            <h2 className="text-2xl font-bold mt-2">
              ₹{summary.totalTax.toFixed(2)}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              # Invoices
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {summary.totalInvoices}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              # Customers
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {summary.totalCustomers}
            </h2>
          </div>

        </div>

        {/* Top Customers */}
        <div className="border rounded-xl mt-8 p-5">

          <h2 className="text-xl font-semibold mb-6">
            Top customers by value
          </h2>

          <div className="space-y-4">

            {summary.topCustomers.map(
              (customer, index) => {
                const width =
                  (customer.value /
                    maxCustomerValue) *
                  100;

                return (
                  <div
                    key={customer._id}
                    className="flex items-center gap-4"
                  >
                    <div className="w-40 text-sm truncate">
                      #{index + 1} {customer._id}
                    </div>

                    <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                      <div
                        className="h-full bg-blue-100 rounded-full"
                        style={{
                          width: `${width}%`,
                        }}
                      />
                    </div>

                    <div className="w-28 text-right text-sm font-medium">
                      ₹{customer.value.toFixed(2)}
                    </div>
                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Summary;