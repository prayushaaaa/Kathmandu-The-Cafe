import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { getItems, getCustomers, addSale, addCustomer } from "../api";
import { LucideTrash } from "lucide-react";

function AddSaleForm() {
  const [formData, setFormData] = useState({
    customer_name: "",
    items: [{ id: "", quantity: 1, total_price: 0 }],
    payment_method: "cash",
  });

  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsData = await getItems();
        const customersData = await getCustomers();
        setItems(itemsData);
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };

    // Recalculate total price for the item if quantity changes or a new item is selected
    if (name === "quantity" || name === "id") {
      const selectedItem = items.find(
        (item) => item.id == updatedItems[index].id,
      );
      if (selectedItem) {
        updatedItems[index].total_price =
          selectedItem.price * updatedItems[index].quantity;
      }
    }

    setFormData({ ...formData, items: updatedItems });
  };

  const addItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: "", quantity: 1, total_price: 0 }],
    });
  };

  const removeItemRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the customer exists
      let customer = customers.find((c) => c.name === formData.customer_name);
      if (!customer) {
        customer = await addCustomer({ name: formData.customer_name });
      }

      // Prepare sale data with multiple items
      const saleData = {
        customer: customer.id,
        payment_method: formData.payment_method,
        // Send item data as an array of objects
        items: formData.items.map((item) => ({
          item: item.id, // Use 'id' instead of 'item_id'
          quantity: parseInt(item.quantity, 10),
          total_price: item.total_price,
        })),
      };
      console.log(saleData);
      // Send sale data to backend
      await addSale(saleData);
      alert("Sale added successfully!");

      // Reset form
      setFormData({
        customer_name: "",
        items: [{ id: "", quantity: 1, total_price: 0 }],
        payment_method: "cash",
      });
    } catch (error) {
      console.error("Error adding sale:", error);
      alert("Failed to add sale. Please try again.");
    }
  };

  // Calculate the total bill dynamically
  const calculateTotalBill = () => {
    return formData.items.reduce((total, item) => total + item.total_price, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md">
      <label className="block mt-3 mb-2">Customer Name:</label>
      <Input
        type="text"
        name="customer_name"
        placeholder="Customer name"
        value={formData.customer_name}
        onChange={(e) =>
          setFormData({ ...formData, customer_name: e.target.value })
        }
        className="mt-3"
        required
      />

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Food Item</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Price per Unit</th>
              <th className="px-4 py-2 border">Total Price</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">
                  <select
                    name="id" // Change name from 'item_id' to 'id'
                    value={item.id}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select an item</option>
                    {items.map((itemOption) => (
                      <option key={itemOption.id} value={itemOption.id}>
                        {itemOption.name} - Rs. {itemOption.price}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <Input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </td>
                <td className="px-4 py-2 border">
                  Rs. {items.find((i) => i.id == item.id)?.price || 0}{" "}
                  {/* Display price per unit */}
                </td>
                <td className="px-4 py-2 border">
                  Rs. {item.total_price}{" "}
                  {/* Display the total price for the item */}
                </td>
                <td className="px-4 py-2 border">
                  <Button
                    type="button"
                    onClick={() => removeItemRow(index)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <LucideTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button type="button" onClick={addItemRow} className="mt-4">
        Add Another Item
      </Button>

      <div className="mt-4">
        <span className="font-bold">
          Total Bill: Rs. {calculateTotalBill()}
        </span>
      </div>

      <p className="mt-3 mb-2 text-black">Choose a payment method</p>
      <RadioGroup
        value={formData.payment_method}
        onValueChange={(value) =>
          setFormData({ ...formData, payment_method: value })
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash">Cash</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="esewa" id="esewa" />
          <Label htmlFor="esewa">Esewa</Label>
        </div>
      </RadioGroup>

      <Button type="submit" className="mt-4 w-full">
        Submit Sale
      </Button>
    </form>
  );
}

export default AddSaleForm;
