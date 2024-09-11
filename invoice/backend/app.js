const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const path = require('path');

const app = express();
const port = 5000;

// Use CORS middleware to allow requests from your frontend
app.use(cors());
app.use(bodyParser.json());

app.post('/generate-invoice', (req, res) => {
  const invoiceData = req.body;
  
  // Create a new PDF document
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  // Set headers for downloading the PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');

  // Pipe the PDF into the response
  doc.pipe(res);

  // Add a company logo
  const logoPath = path.join(__dirname, 'company-logo.png');
  doc.image(logoPath, { fit: [100, 100], align: 'center', valign: 'center' });

  // Add company details
  doc.fontSize(18).text('Amazing Company Inc.', { align: 'center' });
  doc.fontSize(12).text(`123 Business Rd.`, { align: 'center' });
  doc.text(`Suite 456`, { align: 'center' });
  doc.text(`Cityville, ST 78901`, { align: 'center' });
  doc.text(`GST Number: 12ABC3456D`, { align: 'center' });
  doc.text(`Phone: (123) 456-7890`, { align: 'center' });
  doc.moveDown();

  // Add invoice title
  doc.fontSize(25).text('Invoice', { align: 'center' });
  doc.moveDown();

  // Add invoice details
  doc.fontSize(12).text(`Seller: ${invoiceData.sellerName}`);
  doc.text(`Address: ${invoiceData.sellerAddress}`);
  doc.text(`GST Number: ${invoiceData.sellerGST}`);
  doc.moveDown();
  
  doc.text(`Billing Name: ${invoiceData.billingName}`);
  doc.text(`Billing Address: ${invoiceData.billingAddress}`);
  doc.moveDown();
  
  doc.text(`Shipping Name: ${invoiceData.shippingName}`);
  doc.text(`Shipping Address: ${invoiceData.shippingAddress}`);
  doc.moveDown();
  
  doc.text(`Order No: ${invoiceData.orderNo}`);
  doc.text(`Order Date: ${invoiceData.orderDate}`);
  doc.moveDown();
  
  doc.text(`Invoice No: ${invoiceData.invoiceNo}`);
  doc.text(`Invoice Date: ${invoiceData.invoiceDate}`);
  doc.moveDown();

  // Add items in a table format
  doc.fontSize(14).text('Items:', { underline: true });
  doc.moveDown();
  
  const tableTop = doc.y;
  const columnLeft = 50; // Starting position for the first column
  const columnWidth = 100; // Width for each column (adjust as needed)
  const rowHeight = 20; // Height for each row
  
  doc.fontSize(12).text('Description', columnLeft, tableTop);
  doc.text('Unit Price', columnLeft + columnWidth, tableTop);
  doc.text('Quantity', columnLeft + 2 * columnWidth, tableTop);
  doc.text('Discount', columnLeft + 3 * columnWidth, tableTop);
  doc.text('Net Amount', columnLeft + 4 * columnWidth, tableTop);
  
  doc.moveDown();

  let y = tableTop + rowHeight;
  
  invoiceData.items.forEach(item => {
    const unitPrice = parseFloat(item.unitPrice);
    const quantity = parseInt(item.quantity, 10);
    const discount = parseFloat(item.discount);
    const netAmount = (unitPrice * quantity - discount).toFixed(2);

    doc.fontSize(12).text(item.description, columnLeft, y);
    doc.text(unitPrice.toFixed(2), columnLeft + columnWidth, y);
    doc.text(quantity, columnLeft + 2 * columnWidth, y);
    doc.text(discount.toFixed(2), columnLeft + 3 * columnWidth, y);
    doc.text(netAmount, columnLeft + 4 * columnWidth, y);

    y += rowHeight; // Move to the next row
  });

  // Add total and footer
  doc.moveDown();
  const subtotal = invoiceData.items.reduce((sum, item) => sum + (parseFloat(item.unitPrice) * parseInt(item.quantity, 10) - parseFloat(item.discount)), 0).toFixed(2);
  const taxTotal = invoiceData.items.reduce((sum, item) => sum + (parseFloat(item.unitPrice) * parseInt(item.quantity, 10) - parseFloat(item.discount)) * (item.taxRate / 100), 0).toFixed(2);
  const totalAmount = (parseFloat(subtotal) + parseFloat(taxTotal)).toFixed(2);
  
  doc.text(`Subtotal: ${subtotal}`, { align: 'right' });
  doc.text(`Tax Total: ${taxTotal}`, { align: 'right' });
  doc.text(`Total Amount: ${totalAmount}`, { align: 'right' });
  doc.moveDown();

  // Add footer with additional information
  doc.text('Thank you for your business!', { align: 'center' });
  doc.text('If You Have any Queries Please Contact Us ', { align: 'center' });

  // Finalize the PDF
  doc.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
