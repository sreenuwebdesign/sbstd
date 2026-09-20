import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DonationRecord } from '../types';
import { TEMPLE_INFO } from '../data/templeData';

/**
 * Generates and downloads the Official Donation Receipt as a PDF file.
 * Uses html2canvas for pixel-perfect document rendering of the styled receipt,
 * with an automated vector-based jsPDF fallback if DOM-capture is restricted.
 */
export async function downloadReceiptAsPdf(
  element: HTMLElement | null,
  receipt: DonationRecord,
  filename?: string
): Promise<boolean> {
  const actualFilename = filename || `Donation-Receipt-${receipt.receiptNumber}.pdf`;

  // Attempt DOM-to-Canvas high resolution capture
  if (element) {
    try {
      const canvas = await html2canvas(element, {
        scale: 2.5, // Crisp 300+ DPI output
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210; // A4 mm
      const pageHeight = 297; // A4 mm
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      if (contentHeight <= pageHeight - margin * 2) {
        // Fits comfortably on 1 page
        const yPos = Math.max(margin, (pageHeight - contentHeight) / 2);
        pdf.addImage(imgData, 'PNG', margin, yPos, contentWidth, contentHeight);
      } else {
        // Multi-page handling
        let heightLeft = contentHeight;
        let position = margin;

        pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - contentHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
          heightLeft -= pageHeight;
        }
      }

      pdf.save(actualFilename);
      return true;
    } catch (canvasErr) {
      console.warn('html2canvas rendering error, falling back to direct jsPDF vector generation:', canvasErr);
    }
  }

  // Fallback: Direct clean jsPDF vector document generation
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const primaryColor = [91, 16, 29]; // #5B101D
    const goldColor = [212, 175, 55]; // #D4AF37
    const darkTextColor = [40, 23, 20];
    const mutedColor = [115, 74, 18];

    // Double Border
    doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.setLineWidth(1.2);
    doc.rect(10, 10, 190, 277);

    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.6);
    doc.rect(13, 13, 184, 271);

    // Header Band
    doc.setFillColor(250, 246, 238);
    doc.rect(14, 14, 182, 45, 'F');

    // Temple Trust Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text(TEMPLE_INFO.trustNameEn.toUpperCase(), 105, 24, { align: 'center' });

    // Temple Name
    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(TEMPLE_INFO.nameEn, 105, 32, { align: 'center' });

    // Address & Contact
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text(TEMPLE_INFO.addressEn, 105, 39, { align: 'center' });
    doc.text(`Phone: ${TEMPLE_INFO.phone}  |  Email: ${TEMPLE_INFO.email}`, 105, 45, { align: 'center' });

    // Official Receipt Badge
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.roundedRect(65, 50, 80, 8, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('OFFICIAL DONATION RECEIPT', 105, 55.5, { align: 'center' });

    // Divider
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(18, 64, 192, 64);

    // Key Metadata Grid
    doc.setFontSize(9);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('RECEIPT NUMBER:', 20, 72);
    doc.text('DONATION DATE:', 130, 72);
    doc.text('TRANSACTION ID:', 20, 84);
    doc.text('PAYMENT METHOD:', 130, 84);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(receipt.receiptNumber, 20, 78);
    doc.text(new Date(receipt.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), 130, 78);
    
    doc.setFont('courier', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text(receipt.transactionId, 20, 90);
    doc.setFont('helvetica', 'bold');
    doc.text(receipt.paymentMethod, 130, 90);

    // Divider
    doc.setDrawColor(230, 220, 200);
    doc.line(18, 96, 192, 96);

    // Donor Details Box
    doc.setFillColor(255, 253, 249);
    doc.roundedRect(18, 100, 174, 52, 2, 2, 'F');
    doc.setDrawColor(220, 205, 175);
    doc.roundedRect(18, 100, 174, 52, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('DONOR DETAILS', 24, 108);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    
    doc.text('Name:', 24, 116);
    doc.setFont('helvetica', 'bold');
    doc.text(receipt.donorName, 60, 116);

    doc.setFont('helvetica', 'normal');
    doc.text('Mobile Number:', 24, 123);
    doc.text(receipt.mobile, 60, 123);

    doc.text('Email Address:', 24, 130);
    doc.text(receipt.email, 60, 130);

    doc.text('Address:', 24, 137);
    const fullAddress = `${receipt.address}, ${receipt.city}, ${receipt.state}, ${receipt.country}`;
    doc.text(fullAddress.length > 55 ? fullAddress.substring(0, 55) + '...' : fullAddress, 60, 137);

    if (receipt.panNumber) {
      doc.text('Donor PAN:', 24, 144);
      doc.setFont('helvetica', 'bold');
      doc.text(receipt.panNumber, 60, 144);
    }

    // Offering Details Box (Gold highlight)
    doc.setFillColor(250, 242, 225);
    doc.roundedRect(18, 158, 174, 30, 2, 2, 'F');
    doc.setDrawColor(212, 175, 55);
    doc.roundedRect(18, 158, 174, 30, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('DONATION PURPOSE / SEVA', 24, 168);
    doc.text('AMOUNT RECEIVED', 130, 168);

    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(receipt.purpose, 24, 177);

    doc.setFontSize(16);
    doc.text(`INR Rs. ${receipt.amount.toLocaleString('en-IN')}`, 130, 178);

    // Status Verification
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(46, 125, 50); // Green
    doc.text('[x] PAYMENT VERIFIED & CREDITED TO TEMPLE TRUST ACCOUNT', 105, 198, { align: 'center' });

    // Mandatory Legal / Trust Notes
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('"This receipt is generated electronically."', 105, 205, { align: 'center' });

    // Statutory Information Box
    doc.setFillColor(250, 246, 238);
    doc.rect(20, 212, 170, 22, 'F');
    doc.setDrawColor(230, 220, 200);
    doc.rect(20, 212, 170, 22, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('Trust & Statutory Information:', 24, 218);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text(`Temple Trust PAN: ${TEMPLE_INFO.panNumber}`, 24, 223);
    doc.text('Donations are accepted for religious, annadanam, and charitable purposes in accordance with the temple constitution and governing laws.', 24, 228);

    // Blessings Footer
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('May the divine grace and blessings of Lord Sri Venkateswara Swamy be with you and your family.', 105, 248, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
    doc.text('Sri Rastu - Subhamastu - Avighnamastu', 105, 254, { align: 'center' });
    doc.text(TEMPLE_INFO.trustNameEn, 105, 260, { align: 'center' });

    doc.save(actualFilename);
    return true;
  } catch (pdfErr) {
    console.error('Failed to generate PDF document:', pdfErr);
    return false;
  }
}
