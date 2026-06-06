# Invoice Management Dashboard

A full-stack invoice management application built with React, Node.js, Express, MongoDB, and Mongoose.

---

## Features

### Dashboard

- Paginated invoice table
- Search invoices/customers
- Filter by:
  - Status
  - Tax Rate
  - Issue Date Range
  - Due Date Range
- Sort by:
  - Amount
  - Due Date
- Create Invoice
- Edit Invoice

### Summary Dashboard

- Total Revenue
- Total Tax Collected
- Total Customers
- Total Invoices
- Top 5 Customers by Revenue

### Customer Profile

- Customer information
- Company details
- Customer invoice history
- Total billed amount
- Total tax
- Outstanding amount
- Invoice count

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Data Models

### Customer

```js
{
  name: String,
  company: String,
  createdAt: Date
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
  dueDate: Date,

  createdAt: Date
}
```

---

## Data Modeling Rationale

Customers and invoices are modeled as separate collections.

### Why separate collections?

- One customer can have many invoices.
- Avoids duplicating customer information across invoices.
- Makes customer profile aggregation simpler.
- Supports invoice history and customer metrics efficiently.

### Why store customerName in Invoice?

Customer name is denormalized and stored in the invoice for:

- Faster invoice listing
- Easier searching
- Reduced joins for common queries

The customer ObjectId remains the source of truth.

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd powerplay
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run server

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Seed Script

The project includes a seed script for importing invoice/customer data into MongoDB.

Run:

```bash
npm run seed
```

The script reads data from:

```txt
seed-data.json
```

and inserts the generated customers and invoices into MongoDB.

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
GET    /api/customers
GET    /api/customers/:id
```

### Summary

```http
GET    /api/summary
```

---

## Assumptions

- Invoice IDs are generated automatically.
- Tax amount is calculated from amount and tax rate.
- Total = Amount + Tax.
- Customers may have multiple invoices.
- Customer names are stored in invoices for faster searching and listing.
- Pagination is performed server-side.
- Sorting is performed server-side.
- Filtering is performed server-side.

---

## Future Improvements

- Delete invoices
- Authentication
- Export invoices to PDF
- Advanced analytics
- Customer creation UI
- Dark mode

---

## Author

Hardik Goel
