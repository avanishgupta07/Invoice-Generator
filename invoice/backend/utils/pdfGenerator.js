const PDFDocument = require('pdfkit');

function generateInvoicePDF(invoiceData, res) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Stream the PDF to the response
    doc.pipe(res);

    // Add seller and buyer details here...

    // Table headers
    const startX = 50; // Starting X position
    const startY = 200; // Starting Y position
    const colWidths = {
        description: 180,  // Reduced width to make space for other columns
        unitPrice: 80,
        quantity: 50,
        discount: 50,
        total: 80
    };

    // Table header section
    doc
        .fontSize(12)
        .text('Description', startX, startY, { width: colWidths.description, align: 'left' })
        .text('Unit Price', startX + colWidths.description, startY, { width: colWidths.unitPrice, align: 'right' })
        .text('Quantity', startX + colWidths.description + colWidths.unitPrice, startY, { width: colWidths.quantity, align: 'right' })
        .text('Discount', startX + colWidths.description + colWidths.unitPrice + colWidths.quantity, startY, { width: colWidths.discount, align: 'right' })
        .text('Net Amount', startX + colWidths.description + colWidths.unitPrice + colWidths.quantity + colWidths.discount, startY, { width: colWidths.total, align: 'right' });

    // Add line under headers for clarity
    doc.moveTo(startX, startY + 20).lineTo(550, startY + 20).stroke();

    // Add items
    let itemY = startY + 30; // Start a bit lower than headers
    invoiceData.items.forEach(item => {
        const total = (item.unitPrice * item.quantity) - item.discount;

        // Add multi-line description if necessary
        const descriptionHeight = doc.heightOfString(item.description, {
            width: colWidths.description,
            align: 'left'
        });

        // Add item row data, wrapping the description
        doc
            .fontSize(10)
            .text(item.description, startX, itemY, { width: colWidths.description, align: 'left' })
            .text(item.unitPrice.toFixed(2), startX + colWidths.description, itemY, { width: colWidths.unitPrice, align: 'right' })
            .text(item.quantity, startX + colWidths.description + colWidths.unitPrice, itemY, { width: colWidths.quantity, align: 'right' })
            .text(item.discount.toFixed(2), startX + colWidths.description + colWidths.unitPrice + colWidths.quantity, itemY, { width: colWidths.discount, align: 'right' })
            .text(total.toFixed(2), startX + colWidths.description + colWidths.unitPrice + colWidths.quantity + colWidths.discount, itemY, { width: colWidths.total, align: 'right' });

        // Update `itemY` to move below the current item row (adjust based on description height)
        itemY += Math.max(20, descriptionHeight) + 10;
    });

    // Add subtotal, taxes, etc.
    doc.fontSize(12).text(`Subtotal: ${invoiceData.subtotal}`, startX, itemY);

    // Finalize the PDF and send
    doc.end();
}

module.exports = { generateInvoicePDF };
