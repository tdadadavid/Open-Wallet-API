const PDFDocument = require('pdfkit');
const path = require('path');

const generatePDF = (inputs, callback, endCallback) => {

    const doc = new PDFDocument();

    doc.on('data', callback);
    doc.on('end', endCallback);

    doc.moveDown()
    doc.text(inputs);

    doc.end();
}

module.exports = {
    generatePDF,
}