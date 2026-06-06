# Invoice Management Dashboard

A full-stack Invoice Management Dashboard built using React, Node.js, Express, MongoDB, and Mongoose.

## Features

### Invoice Dashboard

* Paginated invoice table
* Search invoices and customers
* Filter invoices by:

  * Status
  * Tax Rate
  * Issue Date Range
  * Due Date Range
* Sort invoices by:

  * Amount
  * Due Date

### Invoice Management

* Create new invoices
* Edit existing invoices
* Automatic tax calculation
* Automatic total amount calculation

### Customer Profile

* Customer details
* Company information
* Complete invoice history
* Customer summary metrics:

  * Total billed
  * Total tax
  * Outstanding amount
  * Invoice count

### Summary Dashboard

* Total revenue
* Total tax collected
* Total invoices
* Total customers
* Top 5 customers by billed value

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd invoice-management-dashboard
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

Backend runs at:

```text
http://localhost:5000
```

---

## Seed Data

To populate the database with sample data:

```bash
cd backend
npm run seed
```

---

## API Endpoints

### Invoices

```http
GET    /api/invoices
GET    /api/invoices/:id
POST   /api/invoices
PUT    /api/invoices/:id
```

### Customers

```http
GET /api/customers
GET /api/customers/:id
```

### Summary

```http
GET /api/summary
```

---

## Data Models

### Customer

```js
{
  name: String,
  company: String
}
```

### Invoice

```js
{
  invoiceId: String,
  customer: ObjectId,
  customerName: String,
  amount: Number,
  taxRate: Number,
  tax: Number,
  total: Number,
  status: String,
  issueDate: Date,
  dueDate: Date
}
```

---

## Data Modeling Rationale

* Customer and Invoice are stored in separate collections.
* Invoices reference customers using MongoDB ObjectIds.
* customerName is stored inside invoices for easier searching and reporting.
* tax and total are stored instead of calculated during every query to improve read performance.
* Indexes are added on commonly queried fields such as status, amount, issueDate, and dueDate.

---

## Assumptions

* Supported tax rates are: 0%, 3%, 5%, 18%, and 28%.
* Every invoice belongs to exactly one customer.
* Search is case-insensitive.
* Pagination is enabled for invoice listings.
* Amounts are stored in INR (₹).

---

## Future Improvements

* Authentication & Authorization
* Export invoices as PDF
* Advanced analytics dashboard
* Customer management CRUD
* Dark mode support
