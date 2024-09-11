import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const InvoiceForm = () => {
    const [formData, setFormData] = useState({
        sellerName: '',
        sellerAddress: '',
        sellerGST: '',
        billingName: '',
        billingAddress: '',
        shippingName: '',
        shippingAddress: '',
        placeOfSupply: '',
        placeOfDelivery: '',
        orderNo: '',
        orderDate: '',
        invoiceNo: '',
        invoiceDate: '',
        reverseCharge: 'No',
        items: [],
    });

    const [items, setItems] = useState([
        { description: '', unitPrice: '', quantity: '', discount: '', taxRate: 18 },
    ]);

    const handleItemChange = (index, event) => {
        const newItems = [...items];
        newItems[index][event.target.name] = event.target.value;
        setItems(newItems);
    };

    const handleAddItem = () => {
        setItems([...items, { description: '', unitPrice: '', quantity: '', discount: '', taxRate: 18 }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { ...formData, items };
        try {
            const response = await axios.post('http://localhost:5000/generate-invoice', data, {
                responseType: 'blob', // Get the response as a binary file
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'invoice.pdf'); // Set the filename
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error generating invoice:', error);
        }
    };

    return (
        <div className="invoice-form">
            <h2>Create Invoice</h2>
            
            <form onSubmit={handleSubmit}>
                <h3>Seller Details</h3>
                <input
                    type="text"
                    name="sellerName"
                    placeholder="Seller Name"
                    onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                />
                <input
                    type="text"
                    name="sellerAddress"
                    placeholder="Seller Address"
                    onChange={(e) => setFormData({ ...formData, sellerAddress: e.target.value })}
                />
                <input
                    type="text"
                    name="sellerGST"
                    placeholder="Seller GST Number"
                    onChange={(e) => setFormData({ ...formData, sellerGST: e.target.value })}
                />

                <h3>Billing Details</h3>
                <input
                    type="text"
                    name="billingName"
                    placeholder="Billing Name"
                    onChange={(e) => setFormData({ ...formData, billingName: e.target.value })}
                />
                <input
                    type="text"
                    name="billingAddress"
                    placeholder="Billing Address"
                    onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                />

                <h3>Shipping Details</h3>
                <input
                    type="text"
                    name="shippingName"
                    placeholder="Shipping Name"
                    onChange={(e) => setFormData({ ...formData, shippingName: e.target.value })}
                />
                <input
                    type="text"
                    name="shippingAddress"
                    placeholder="Shipping Address"
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                />

                <h3>Order Details</h3>
                <input
                    type="text"
                    name="orderNo"
                    placeholder="Order Number"
                    onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
                />
                <input
                    type="date"
                    name="orderDate"
                    onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                />

                <h3>Invoice Details</h3>
                <input
                    type="text"
                    name="invoiceNo"
                    placeholder="Invoice Number"
                    onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
                />
                <input
                    type="date"
                    name="invoiceDate"
                    onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                />

<h3>Items</h3>
{items.map((item, index) => (
    <div className="item-row" key={index}>
        <input
            type="text"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(index, e)}
        />
        <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={(e) => handleItemChange(index, e)}
        />
        <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
        />
        <input
            type="number"
            name="discount"
            placeholder="Discount"
            value={item.discount}
            onChange={(e) => handleItemChange(index, e)}
        />
    </div>
))}

                <button type="button" onClick={handleAddItem}>Add Item</button>
                &nbsp;

                <button type="submit">Generate Invoice</button>
            </form>
        </div>
    );
};

export default InvoiceForm;
