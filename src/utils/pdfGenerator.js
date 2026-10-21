import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { NGO_INFO } from '../data/ngoData';

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

  const certId = member.certificateId || `CERT-${new Date().getFullYear()}-${member.role.charAt(0)}${Math.floor(1000 + Math.random() * 9000)}`;
  const verifyUrl = `https://pehchaan-ngo.org/verify?id=${certId}`;
  const qrDataUrl = await generateQrCode(verifyUrl);

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Outer Gold Border
  doc.setDrawColor(217, 119, 6); // Amber
  doc.setLineWidth(3);
  doc.rect(8, 8, width - 16, height - 16);

  // Inner Navy Border
  doc.setDrawColor(30, 58, 138); // Deep Navy
  doc.setLineWidth(1.5);
  doc.rect(12, 12, width - 24, height - 24);

  // Header - NGO Name
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.setFontSize(26);
  doc.text('PEHCHAAN NGO', width / 2, 28, { align: 'center' });

  // Tagline & Reg Details
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('The Power of Re-Use & Education for All | Reg No: 1122/6164M (Societies Act XXI 1860)', width / 2, 34, { align: 'center' });
  doc.text(`NITI Aayog Darpan ID: ${NGO_INFO.nitiAayogDarpanId} | Head Office: Ghaziabad, UP`, width / 2, 39, { align: 'center' });

  // Certificate Title Ribbon
  doc.setFillColor(30, 58, 138);
  doc.roundedRect(width / 2 - 70, 46, 140, 14, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const certTitle = member.role === 'Intern' 
    ? 'CERTIFICATE OF INTERNSHIP' 
    : (member.role === 'Volunteer' ? 'CERTIFICATE OF APPRECIATION' : 'MEMBERSHIP CREDENTIAL');
  doc.text(certTitle, width / 2, 55, { align: 'center' });

  // Presentation Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  doc.text('This is proudly and formally conferred upon', width / 2, 72, { align: 'center' });

  // Candidate Name
  doc.setFont('times', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(217, 119, 6);
  doc.text(member.fullName.toUpperCase(), width / 2, 85, { align: 'center' });

  // Underline
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.line(width / 2 - 60, 88, width / 2 + 60, 88);

  // Body Paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);
  const collegeMention = member.college ? `representing ${member.college}, ` : '';
  const bodyText = `in sincere recognition of exemplary dedication, selfless commitment, and valuable service rendered as an active ${member.role.toUpperCase()} with Pehchaan NGO. During this tenure at our ${member.center || 'Ghaziabad Street Education Center'}, they actively contributed toward grassroots teaching in Gyan Jyoti Street School, child nutrition monitoring in Project Ankur, and community drives under 'The Power of Re-Use'.`;
  
  const splitBody = doc.splitTextToSize(bodyText, width - 60);
  doc.text(splitBody, width / 2, 98, { align: 'center', lineHeightFactor: 1.4 });

  // Authorized Note
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Authorized by MSW (Master in Social Work) Faculty & verified under Government / NGO community development guidelines.', width / 2, 134, { align: 'center' });

  // QR Code on bottom left
  if (qrDataUrl) {
    doc.addImage(qrDataUrl, 'PNG', 20, 142, 32, 32);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text('Scan to Verify Genuine', 20, 178);
    doc.text(`ID: ${certId}`, 20, 182);
  }

  // Official Gold Seal graphic in middle
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(1);
  doc.circle(width / 2, 158, 14);
  doc.circle(width / 2, 158, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(217, 119, 6);
  doc.text('PEHCHAAN NGO', width / 2, 156, { align: 'center' });
  doc.text('OFFICIAL SEAL', width / 2, 160, { align: 'center' });
  doc.text('ESTD 2016', width / 2, 164, { align: 'center' });

  // Signatures on right
  doc.setFont('times', 'italic');
  doc.setFontSize(15);
  doc.setTextColor(30, 58, 138);
  doc.text('Dr. Neelesh Singh', width - 50, 160, { align: 'center' });

  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.5);
  doc.line(width - 75, 164, width - 25, 164);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 58, 138);
  doc.text('Dr. Neelesh Singh', width - 50, 169, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Founder & General Secretary', width - 50, 173, { align: 'center' });
  doc.text(`Issue Date: ${member.certificateDate || new Date().toISOString().split('T')[0]}`, width - 50, 178, { align: 'center' });

  // Save the PDF
  doc.save(`Pehchaan_Certificate_${certId}_${member.fullName.replace(/\s+/g, '_')}.pdf`);
}

// 2. OFFICIAL ID CARD BADGE PDF DOWNLOAD
export async function downloadIdCardPdf(member) {
  // CR80 format: 85.6mm x 53.98mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [54, 86]
  });

  const verifyUrl = `https://pehchaan-ngo.org/verify?id=${member.id}`;
  const qrDataUrl = await generateQrCode(verifyUrl);

  // Background Header
  doc.setFillColor(30, 58, 138); // Navy
  doc.rect(0, 0, 54, 20, 'F');

  // Orange stripe
  doc.setFillColor(217, 119, 6);
  doc.rect(0, 20, 54, 2, 'F');

  // NGO Name on ID Card
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('PEHCHAAN NGO', 27, 7, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.text('The Power of Re-Use & Education', 27, 11, { align: 'center' });
  doc.text('Reg No: 1122/6164M | NITI: UP/2017/0153557', 27, 15, { align: 'center' });

  // Photo Placeholder / Box
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(17, 24, 20, 24, 1, 1, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text('PHOTO', 27, 37, { align: 'center' });

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 58, 138);
  doc.text(member.fullName.toUpperCase(), 27, 52, { align: 'center' });

  // Role Pill
  doc.setFillColor(217, 119, 6);
  doc.roundedRect(12, 54, 30, 4.5, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text(member.role.toUpperCase(), 27, 57.2, { align: 'center' });

  // Member Details Grid
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(71, 85, 105);

  doc.text('ID NO:', 5, 62);
  doc.setFont('helvetica', 'normal');
  doc.text(member.id, 16, 62);

  doc.setFont('helvetica', 'bold');
  doc.text('CENTER:', 5, 65.5);
  doc.setFont('helvetica', 'normal');
  doc.text((member.center || 'Ghaziabad Head Office').substring(0, 24), 16, 65.5);

  doc.setFont('helvetica', 'bold');
  doc.text('JOINED:', 5, 69);
  doc.setFont('helvetica', 'normal');
  doc.text(member.joinedDate || '2024-01-01', 16, 69);

  doc.setFont('helvetica', 'bold');
  doc.text('BLOOD:', 5, 72.5);
  doc.setFont('helvetica', 'normal');
  doc.text(member.bloodGroup || 'O+', 16, 72.5);

  // QR Code on bottom right
  if (qrDataUrl) {
    doc.addImage(qrDataUrl, 'PNG', 38, 68, 12, 12);
  }

  // Footer banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 81, 54, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(4);
  doc.text('Helpline: +91 9457320905 | Verify at pehchaanngo.org', 27, 84.5, { align: 'center' });

  doc.save(`Pehchaan_ID_Badge_${member.id}.pdf`);
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

