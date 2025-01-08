// src/components/ExportPDF.tsx
import React from 'react';
import jsPDF from 'jspdf';

interface Props {
  transactions: { description: string; category: string; amount: number; date: string }[];
}

const ExportPDF: React.FC<Props> = ({ transactions }) => {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Monthly Report', 10, 10);

    transactions.forEach((txn, index) => {
      doc.text(
        `${index + 1}. ${txn.description} - ${txn.category} - $${txn.amount} on ${txn.date}`,
        10,
        20 + index * 10
      );
    });

    doc.save('monthly-report.pdf');
  };

  return <button onClick={exportPDF}>Export to PDF</button>;
};

export default ExportPDF;
