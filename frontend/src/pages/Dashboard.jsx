import { useEffect, useState } from "react";
import axios from "../api/axios";
import InvoiceModal from "../components/InvoiceModal";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

function Dashboard() {
  const [invoices, setInvoices] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
const [issueDateFrom, setIssueDateFrom] = useState("");
const [issueDateTo, setIssueDateTo] = useState("");

const [dueDateFrom, setDueDateFrom] = useState("");
const [dueDateTo, setDueDateTo] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInvoices = async () => {
    try {
    const { data } = await axios.get(
  `/invoices?page=${page}&search=${search}&status=${status}&taxRate=${taxRate}&issueDateFrom=${issueDateFrom}&issueDateTo=${issueDateTo}&dueDateFrom=${dueDateFrom}&dueDateTo=${dueDateTo}&sortBy=${sortBy}&sortOrder=${sortOrder}`
);
      console.log(data.invoices[0]);


      setInvoices(data.invoices);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  fetchInvoices();
}, [
  page,
  search,
  status,
  taxRate,
  issueDateFrom,
  issueDateTo,
  dueDateFrom,
  dueDateTo,
  sortBy,
  sortOrder,
]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow border">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
        
          <h1 className="text-2xl font-semibold">
            Invoices
          </h1>
        
          <div className="flex items-center gap-3">
        
            <Link
              to="/summary"
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Summary
            </Link>
        
            <button
              onClick={() => {
                setEditInvoice(null);
                setShowModal(true);
              }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              New Invoice
            </button>
        
          </div>
        
        </div>
        <InvoiceModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          fetchInvoices={fetchInvoices}
          editInvoice={editInvoice}
        />
       
        {/* Filters */}
<div className="p-4 border-b flex gap-3 items-center flex-wrap">

  <input
    type="text"
    placeholder="Search invoice / customer"
    value={search}
    onChange={(e) => {
      setPage(1);
      setSearch(e.target.value);
    }}
    className="flex-1 max-w-[700px] border rounded-xl px-4 py-3"
  />


  <select
    value={status}
    onChange={(e) => {
      setPage(1);
      setStatus(e.target.value);
    }}
    className="border rounded-xl px-4 py-3"
  >
    <option value="">Status</option>
    <option value="Paid">Paid</option>
    <option value="Unpaid">Unpaid</option>
    <option value="Overdue">Overdue</option>
    <option value="Draft">Draft</option>
    <option value="Sent">Sent</option>
    <option value="Void">Void</option>
  </select>

  <select
    value={taxRate}
    onChange={(e) => {
      setPage(1);
      setTaxRate(e.target.value);
    }}
    className="border rounded-xl px-4 py-3"
  >
    <option value="">Tax Rate</option>
    <option value="0">0%</option>
    <option value="3">3%</option>
    <option value="5">5%</option>
    <option value="18">18%</option>
    <option value="28">28%</option>
  </select>

 
<input
  type="date"
  value={dueDateFrom}
  onChange={(e) => {
    setPage(1);
    setDueDateFrom(e.target.value);
  }}
  className="border rounded-xl px-4 py-3 w-[180px]"
/>

</div>

          
          

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

<thead>
  <tr className="bg-[#f8f8f8] border-y text-gray-600 text-sm">

    <th className="text-left p-4 font-medium">
      Invoice
    </th>

    <th className="text-left p-4 font-medium">
      Customer
    </th>

    <th
      className="text-left p-4 font-medium cursor-pointer"
      onClick={() => {
        setSortBy("amount");
        setSortOrder(
          sortOrder === "asc" ? "desc" : "asc"
        );
      }}
    >
      Amount {sortBy === "amount" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
    </th>

    <th className="text-left p-4 font-medium">
      Tax%
    </th>

    <th className="text-left p-4 font-medium">
      Tax
    </th>

    <th className="text-left p-4 font-medium">
      Total
    </th>

    <th className="text-left p-4 font-medium">
      Status
    </th>

    <th
      className="text-left p-4 font-medium cursor-pointer"
      onClick={() => {
        setSortBy("dueDate");
        setSortOrder(
          sortOrder === "asc" ? "desc" : "asc"
        );
      }}
    >
      Due Date {sortBy === "dueDate" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"} 
    </th>

    <th className="text-left p-4 font-medium">
      Actions
    </th>

  </tr>
</thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    {invoice.invoiceId}
                  </td>

                 <td className="p-3">
                   <Link
                     to={`/customers/${invoice.customer._id}`}
                     onClick={() => console.log("LINK ID:", invoice.customer._id)}
                     className="text-blue-600 hover:underline"
                   >
                     {invoice.customerName}
                   </Link>
                 </td>

                  <td className="p-3">
                    ₹{invoice.amount}
                  </td>

                  <td className="p-3">
                    {invoice.taxRate}%
                  </td>

                  <td className="p-3">
                    ₹{invoice.tax}
                  </td>

                  <td className="px-3 py-2 font-semibold">
                    ₹{invoice.total}
                  </td>

                 <td className="p-3">
                   <span
                     className={`px-3 py-1 rounded-full text-xs font-medium ${
                       invoice.status === "Paid"
                         ? "bg-green-100 text-green-700"
                         : invoice.status === "Unpaid"
                         ? "bg-yellow-100 text-yellow-700"
                         : invoice.status === "Overdue"
                         ? "bg-red-100 text-red-700"
                         : invoice.status === "Sent"
                         ? "bg-blue-100 text-blue-700"
                         : invoice.status === "Draft"
                         ? "bg-gray-100 text-gray-700"
                         : "bg-slate-100 text-slate-700"
                     }`}
                   >
                     {invoice.status}
                   </span>
                 </td>

                  <td className="p-3">
                  {new Date(
                    invoice.dueDate
                  ).toLocaleDateString()}
                </td>
                
                <td className="p-3">
                  <button
                    onClick={() => {
                      setEditInvoice(invoice);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <Pagination
           page={page}
           totalPages={totalPages}
           setPage={setPage}
         />
        

      </div>
    </div>
  );
}

export default Dashboard;