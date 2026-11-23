import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { NGO_INFO } from '../data/ngoData';
import { LOGO_PNG_BASE64, SIGNATURE_PNG_BASE64 } from '../data/assetsBase64';

// Generate QR Code as Data URL
export async function generateQrCode(text) {
  try {
    return await QRCode.toDataURL(text, {
      width: 180,
      margin: 1,
      color: {
        dark: '#1E3A8A',
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Error generating QR code', err);
    return null;
  }
}

// Convert numbers to words for 80G receipts
export function numberToWords(num) {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if ((num = num.toString()).length > 9) return 'overflow';
  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees Only' : 'Rupees Only';
  return str;
}

// 1. OFFICIAL CERTIFICATE PDF DOWNLOAD
export async function downloadCertificatePdf(member) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const certId = member.certificateId || `PWS/2024-25/${Math.floor(1100 + Math.random() * 800)}`;
  const verifyUrl = `https://pehchaan-ngo.org/verify?id=${certId}`;
  const qrDataUrl = await generateQrCode(verifyUrl);

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Outer Gold Border
  doc.setDrawColor(217, 119, 6); // Amber Gold
  doc.setLineWidth(2.5);
  doc.rect(8, 8, width - 16, height - 16);

  // Inner Red Border
  doc.setDrawColor(229, 37, 32); // Red
  doc.setLineWidth(1);
  doc.rect(11, 11, width - 22, height - 22);

  // Top Left: Ref Number
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138);
  doc.text(`Ref. ${certId}`, 18, 22);

  // Top Right: Reg & Mobile
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Reg. 1122/6164M', width - 18, 20, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.text('Mob +91 9457320905', width - 18, 25, { align: 'right' });

  // Top Center: Official Logo
  try {
    doc.addImage(LOGO_PNG_BASE64, 'PNG', width / 2 - 35, 14, 70, 20);
  } catch (e) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(229, 37, 32);
    doc.text('Pehchaan Welfare Society (Pehchaan NGO)', width / 2, 24, { align: 'center' });
  }

  // Address line below logo
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('H.O.- Pehchaan NGO, BH 1/85 KA Block Sector-12, Pratap Vihar, Ghaziabad, UP-201009', width / 2, 38, { align: 'center' });

  // Certificate Title
  doc.setFont('times', 'italic');
  doc.setFontSize(32);
  doc.setTextColor(185, 28, 28); // Deep Crimson Red
  doc.text('Certificate of Achievement', width / 2, 58, { align: 'center' });

  // Presentation text
  doc.setFont('times', 'italic');
  doc.setFontSize(15);
  doc.setTextColor(51, 65, 85);
  doc.text('This Certificate of Appreciation is presented to', width / 2, 75, { align: 'center' });

  // Recipient Name in BOLD RED/BLUE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(185, 28, 28);
  doc.text(member.fullName.toUpperCase(), width / 2, 92, { align: 'center' });

  // Underline
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.line(width / 2 - 60, 95, width / 2 + 60, 95);

  // Body
  doc.setFont('times', 'italic');
  doc.setFontSize(13.5);
  doc.setTextColor(51, 65, 85);
  const bodyText = `for their valuable contribution as a ${member.role.toLowerCase()} in Pehchaan Welfare Society (Pehchaan NGO) dedicated towards the Upliftment of the Underprivileged Community.`;
  const splitBody = doc.splitTextToSize(bodyText, width - 60);
  doc.text(splitBody, width / 2, 108, { align: 'center', lineHeightFactor: 1.4 });

  // Bottom Left: Mr Neelesh Singh
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Mr Neelesh Singh', 48, 160, { align: 'center' });
  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Treasurer & MSW', 48, 166, { align: 'center' });
  doc.text('(Pehchaan Welfare Society)', 48, 171, { align: 'center' });

  // Bottom Center: Gold Seal / QR
  if (qrDataUrl) {
    doc.addImage(qrDataUrl, 'PNG', width / 2 - 12, 150, 24, 24);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Verify: ${certId}`, width / 2, 178, { align: 'center' });
  }

  // Bottom Right: Mr Ved Prakash Singh
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Mr Ved Prakash Singh', width - 48, 160, { align: 'center' });
  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Director', width - 48, 166, { align: 'center' });
  doc.text('(Pehchaan Welfare Society)', width - 48, 171, { align: 'center' });

  // Bottom watermark/reference
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(certId, 18, height - 12);
  doc.text('version 2.0', width - 18, height - 12, { align: 'right' });

  // Save the PDF
  doc.save(`Pehchaan_Certificate_${member.fullName.replace(/\s+/g, '_')}.pdf`);
}

// 2. OFFICIAL ID CARD BADGE PDF DOWNLOAD (AUTHENTIC 2-SIDED PEHCHAAN WELFARE SOCIETY)
export async function downloadIdCardPdf(member) {
  // CR80 format: 54mm x 86mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [54, 86]
  });

  // ==================== PAGE 1: FRONT SIDE ====================
  // 1. Subtle light grid background
  doc.setDrawColor(241, 245, 249);
  doc.setLineWidth(0.15);
  for (let x = 0; x <= 54; x += 3) {
    doc.line(x, 0, x, 86);
  }
  for (let y = 0; y <= 86; y += 3) {
    doc.line(0, y, 54, y);
  }

  // 2. Top-Right Yellow Geometric Band
  doc.setFillColor(255, 184, 0);
  doc.lines([
    [24, 0],
    [0, 26],
    [-24, -10]
  ], 30, 0, [1, 1], 'F', true);

  // 3. Right Edge Solid Red Banner
  doc.setFillColor(229, 37, 32);
  doc.rect(41, 0, 13, 86, 'F');

  // Vertical text in Red Banner: "PEHCHAAN NGO"
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  const verticalLetters = ['P','E','H','C','H','A','A','N',' ','N','G','O'];
  verticalLetters.forEach((char, idx) => {
    if (char !== ' ') {
      doc.text(char, 47.5, 18 + idx * 4.6, { align: 'center' });
    }
  });

  // 4. Top-Left & Bottom-Left Pixel Blocks
  doc.setFillColor(255, 184, 0);
  doc.rect(2, 2, 3, 3, 'F');
  doc.setFillColor(229, 37, 32);
  doc.rect(4.5, 4.5, 3, 3, 'F');

  doc.setFillColor(255, 184, 0);
  doc.rect(2, 80, 2.5, 2.5, 'F');
  doc.setFillColor(229, 37, 32);
  doc.rect(4.2, 81.5, 2.5, 2.5, 'F');

  // 5. Official Logo at Top Left/Center
  try {
    doc.addImage(LOGO_PNG_BASE64, 'PNG', 3, 3, 34, 10);
  } catch (e) {
    doc.setTextColor(229, 37, 32);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('PEHCHAAN NGO', 20, 8, { align: 'center' });
  }

  // 6. Circular Photo Frame with Red Border
  const photoCenterX = 20;
  const photoCenterY = 24.5;
  const photoRadius = 9;

  // Background circle
  doc.setFillColor(248, 250, 252);
  doc.circle(photoCenterX, photoCenterY, photoRadius, 'F');

  // Draw Photo or Initials Placeholder
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(229, 37, 32);
  const initials = member.fullName.split(' ').map(n => n[0]).join('').slice(0, 2);
  doc.text(initials, photoCenterX, photoCenterY + 3, { align: 'center' });

  // Outer red ring border
  doc.setDrawColor(229, 37, 32);
  doc.setLineWidth(1.1);
  doc.circle(photoCenterX, photoCenterY, photoRadius, 'S');

  // 7. Member Name in BOLD RED UPPERCASE
  doc.setTextColor(229, 37, 32);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(member.fullName.toUpperCase(), photoCenterX, 38, { align: 'center' });

  // 8. Designation in Red
  doc.setFontSize(6.2);
  doc.text(member.role, photoCenterX, 41.5, { align: 'center' });

  // 9. Details Table (Clean Aligned Key-Value with Colons)
  const detailStartY = 47;
  const rowHeight = 4.8;
  const details = [
    ['ID No', member.id],
    ['Email', member.email || 'N/A'],
    ['Phone', member.phone],
    ['Location', member.location || 'ALL India'],
    ['Valid', member.validTill || '31 March 2028']
  ];

  details.forEach(([key, val], idx) => {
    const y = detailStartY + idx * rowHeight;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(0, 0, 0);
    doc.text(key, 4, y);
    doc.text(':', 14, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    const displayVal = val.length > 22 ? val.substring(0, 21) + '..' : val;
    doc.text(displayVal, 16, y);
  });

  // ==================== PAGE 2: BACK SIDE (TERMS) ====================
  doc.addPage([54, 86], 'portrait');

  // 1. Subtle light grid background
  doc.setDrawColor(241, 245, 249);
  doc.setLineWidth(0.15);
  for (let x = 0; x <= 54; x += 3) {
    doc.line(x, 0, x, 86);
  }
  for (let y = 0; y <= 86; y += 3) {
    doc.line(0, y, 54, y);
  }

  // 2. Left Edge Solid Red Stripe
  doc.setFillColor(229, 37, 32);
  doc.rect(0, 0, 7, 86, 'F');

  // 3. Top Yellow Geometric Band
  doc.setFillColor(255, 184, 0);
  doc.lines([
    [24, 0],
    [-18, 22],
    [-6, -22]
  ], 6, 0, [1, 1], 'F', true);

  // 4. Top-Right & Bottom-Right Pixel Blocks
  doc.setFillColor(229, 37, 32);
  doc.rect(48, 2, 3, 3, 'F');
  doc.setFillColor(255, 184, 0);
  doc.rect(45.5, 4.5, 3, 3, 'F');

  doc.setFillColor(255, 184, 0);
  doc.rect(46, 78, 2.5, 2.5, 'F');
  doc.setFillColor(229, 37, 32);
  doc.rect(48, 80, 2.5, 2.5, 'F');

  // 5. Title: TERMS & CONDITIONS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(0, 0, 0);
  doc.text('TERMS & CONDITIONS', 11, 16);

  // 6. Clauses
  doc.setFontSize(4.6);
  doc.setFont('helvetica', 'normal');

  const terms = [
    { bold: 'Identification: ', text: 'The card holder must keep this ID card visible or present it when required for identification..' },
    { bold: 'Proper Use: ', text: 'This ID card is issued only for official work and must not be shared, copied, or misused.' },
    { bold: 'Security: ', text: 'If this card is lost or stolen, it must be reported to the organization immediately.' },
    { bold: 'Note: ', text: 'The organization reserves the right to cancel this ID card at any time.' }
  ];

  let currentY = 21;
  terms.forEach(t => {
    doc.setFont('helvetica', 'bold');
    doc.text(t.bold, 11, currentY);
    const boldWidth = doc.getTextWidth(t.bold);
    
    doc.setFont('helvetica', 'normal');
    const remainingText = doc.splitTextToSize(t.text, 38 - boldWidth);
    doc.text(remainingText[0] || '', 11 + boldWidth, currentY);

    if (remainingText.length > 1) {
      for (let r = 1; r < remainingText.length; r++) {
        currentY += 2.8;
        doc.text(remainingText[r], 11, currentY);
      }
    }
    currentY += 4.2;
  });

  // 7. ID Number & Valid
  currentY += 1;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.2);
  doc.text(`ID Number: : ${member.id}`, 11, currentY);
  currentY += 3.4;
  doc.text(`ID Valid: : ${member.validTill || '31 March 2028'}`, 11, currentY);

  // 8. Signature & Authorized By
  try {
    doc.addImage(SIGNATURE_PNG_BASE64, 'PNG', 10, currentY + 3, 16, 8.5);
  } catch (e) {
    // fallback
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.text('Authorized By:', 11, currentY + 14);
  doc.setFontSize(5.6);
  doc.text('Pehchaan NGO', 11, currentY + 17);

  doc.save(`Pehchaan_Official_ID_${member.id}.pdf`);
}

// 3. OFFICIAL 80G TAX EXEMPTION DONATION RECEIPT
export async function download80GReceiptPdf(donation) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  const verifyUrl = `https://pehchaan-ngo.org/verify-donation?receipt=${donation.receiptNumber}`;
  const qrDataUrl = await generateQrCode(verifyUrl);

  // Outer Border
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, width - 20, 277);

  // Inner border
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, width - 24, 273);

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 58, 138);
  doc.text('PEHCHAAN NGO', width / 2, 24, { align: 'center' });

  // Tagline & Societies Act
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Registered under the Societies Registration Act XXI of 1860', width / 2, 29, { align: 'center' });
  doc.text('Registration No: 1122/6164M (Renewed: R/GHA/17643/2020-2021) | NITI Aayog: UP/2017/0153557', width / 2, 33, { align: 'center' });
  doc.text('Head Office: BH 1/85 FF KA Block, Sector 12, Pratap Vihar, Ghaziabad, UP 201009', width / 2, 37, { align: 'center' });
  doc.text('Phone: +91 9457320905 | Email: ngo.pehchaan@gmail.com | Web: www.pehchaanngo.org.in', width / 2, 41, { align: 'center' });

  // Divider
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(0.8);
  doc.line(16, 44, width - 16, 44);

  // Receipt Badge
  doc.setFillColor(30, 58, 138);
  doc.roundedRect(width / 2 - 50, 48, 100, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('OFFICIAL DONATION RECEIPT', width / 2, 54.5, { align: 'center' });

  // Tax Exemption Notice
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(180, 83, 9);
  doc.text('EXEMPTION UNDER SECTION 80G OF THE INCOME TAX ACT, 1961', width / 2, 64, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`80G Order No: ${NGO_INFO.taxExemption80G} | 12A Reg No: ${NGO_INFO.taxExemption12A}`, width / 2, 68, { align: 'center' });

  // Meta Table: Receipt No & Date
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(16, 73, width - 32, 16, 1, 1, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 58, 138);
  doc.text(`Receipt No: ${donation.receiptNumber}`, 20, 81);
  doc.text(`Date of Issue: ${donation.date || new Date().toISOString().split('T')[0]}`, width - 75, 81);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Transaction ID: ${donation.transactionId || 'pay_online_live'}`, 20, 86);
  doc.text(`Payment Mode: ${donation.paymentMethod || 'Razorpay Gateway'}`, width - 75, 86);

  // Donor Information Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(16, 94, width - 32, 42, 1, 1, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138);
  doc.text('DONOR DETAILS (FOR TAX EXEMPTION CLAIM)', 20, 102);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  doc.text('Donor Full Name:', 20, 110);
  doc.setFont('helvetica', 'normal');
  doc.text(donation.donorName.toUpperCase(), 60, 110);

  doc.setFont('helvetica', 'bold');
  doc.text('Permanent Account No (PAN):', 20, 117);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 83, 9);
  doc.text(donation.panNumber ? donation.panNumber.toUpperCase() : 'NOT PROVIDED / AWAITED', 72, 117);
  doc.setTextColor(51, 65, 85);

  doc.setFont('helvetica', 'bold');
  doc.text('Email Address:', 20, 124);
  doc.setFont('helvetica', 'normal');
  doc.text(donation.donorEmail, 60, 124);

  doc.setFont('helvetica', 'bold');
  doc.text('Phone Number:', 20, 131);
  doc.setFont('helvetica', 'normal');
  doc.text(donation.donorPhone || '+91 - Not Specified', 60, 131);

  // Donation Specifics Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(16, 142, width - 32, 54, 1, 1, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138);
  doc.text('DONATION PARTICULARS', 20, 150);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  doc.text('Program / Purpose:', 20, 158);
  doc.setFont('helvetica', 'normal');
  doc.text(donation.campaignTitle || 'Gyan Jyoti Street Education & Child Nutrition', 60, 158);

  doc.setFont('helvetica', 'bold');
  doc.text('Donation Amount (INR):', 20, 166);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(5, 150, 105);
  doc.text(`INR ${donation.amount.toLocaleString('en-IN')}/-`, 65, 166.5);
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(9);

  doc.setFont('helvetica', 'bold');
  doc.text('Amount in Words:', 20, 175);
  doc.setFont('helvetica', 'italic');
  doc.text(numberToWords(donation.amount), 60, 175);

  doc.setFont('helvetica', 'bold');
  doc.text('Tax Relief Eligibility:', 20, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('50% deduction allowable under Section 80G(5)(vi) of Income Tax Act 1961', 60, 184);

  // Statutory Declarations
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  const declaration = "Declaration: We hereby confirm that the donation received will be utilized solely for charitable purposes including street school education, malnutrition treatment, and cloth redistribution as mandated by our registered constitution. No commercial or private benefit has been provided to the donor in return for this contribution.";
  const splitDec = doc.splitTextToSize(declaration, width - 36);
  doc.text(splitDec, 18, 204);

  // QR Code on bottom left
  if (qrDataUrl) {
    doc.addImage(qrDataUrl, 'PNG', 20, 222, 28, 28);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text('Scan to Verify Receipt', 20, 253);
    doc.text(donation.receiptNumber, 20, 257);
  }

  // Official NGO Seal
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.circle(width / 2, 235, 13);
  doc.circle(width / 2, 235, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(217, 119, 6);
  doc.text('PEHCHAAN NGO', width / 2, 233, { align: 'center' });
  doc.text('80G AUDITED', width / 2, 237, { align: 'center' });
  doc.text('UTTAR PRADESH', width / 2, 241, { align: 'center' });

  // Signature on Right
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 138);
  doc.text('Dr. Neelesh Singh', width - 45, 236, { align: 'center' });

  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.4);
  doc.line(width - 65, 239, width - 25, 239);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 58, 138);
  doc.text('Authorized Signatory', width - 45, 244, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('For Pehchaan NGO (Regd.)', width - 45, 248, { align: 'center' });

  // Bottom Notice
  doc.setFillColor(30, 58, 138);
  doc.rect(12, 268, width - 24, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('This is a computer-generated tax exemption certificate and does not require physical stamp.', width / 2, 274, { align: 'center' });
  doc.text('Keep this receipt for filing your Annual Income Tax Return (ITR). For queries: ngo.pehchaan@gmail.com', width / 2, 279, { align: 'center' });

  doc.save(`Pehchaan_80G_Receipt_${donation.receiptNumber}.pdf`);
}

