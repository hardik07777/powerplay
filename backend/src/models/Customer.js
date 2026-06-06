import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  company: String,
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;