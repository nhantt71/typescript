import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async () => {
  const cvElement = document.getElementById('cv-preview');
  if (!cvElement) return;

  try {
    // Create canvas from CV element
    const canvas = await html2canvas(cvElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add image to PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      position,
      imgWidth,
      imgHeight
    );

    // If content exceeds one page, create additional pages
    while (imgHeight > pageHeight) {
      position = position - pageHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight
      );
    }

    // Save the PDF
    pdf.save('cv.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};