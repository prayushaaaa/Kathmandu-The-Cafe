import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/"; // Ensure there's only one slash after the base URL

// GET APIs
export const getSales = async () =>
  axios.get(API_URL + "sales/").then((res) => res.data);
export const getItems = async () =>
  axios.get(API_URL + "items/").then((res) => res.data);
export const getCustomers = async () =>
  axios.get(API_URL + "customers/").then((res) => res.data);
export const getExpenses = async () =>
  axios.get(API_URL + "expenses/").then((res) => res.data);

// POST APIs
export const addSale = async (saleData) =>
  axios.post(API_URL + "sales/", saleData).then((res) => res.data);

export const addItem = async (itemData) =>
  axios.post(API_URL + "items/", itemData).then((res) => res.data);

export const addCustomer = async (customerData) =>
  axios.post(API_URL + "customers/", customerData).then((res) => res.data);

export const addExpense = async (expenseData) =>
  axios.post(API_URL + "expenses/", expenseData).then((res) => res.data);
