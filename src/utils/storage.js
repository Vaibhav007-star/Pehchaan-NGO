import { INITIAL_MEMBERS, INITIAL_DONATIONS } from '../data/ngoData';

const STORAGE_KEYS = {
  MEMBERS: 'pehchaan_members_v1',
  DONATIONS: 'pehchaan_donations_v1',
  EMAILS: 'pehchaan_emails_v1',
  SETTINGS: 'pehchaan_settings_v1'
};

// Initialize default storage data if absent
export function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.MEMBERS)) {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(INITIAL_DONATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EMAILS)) {
    localStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify([]));
  }
}

// Members / Volunteers / Interns CRUD
export function getMembers() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS)) || [];
  } catch (e) {
    return INITIAL_MEMBERS;
  }
}

export function registerMember(memberData) {
  const members = getMembers();
  const year = new Date().getFullYear();
  const count = members.length + 1;
  const prefixMap = {
    Volunteer: 'VOL',
    Intern: 'INT',
    Member: 'MEM'
  };
  const rolePrefix = prefixMap[memberData.role] || 'MBR';
  const newId = `PEH-${rolePrefix}-${year}-${String(count).padStart(3, '0')}`;
  
  const newMember = {
    ...memberData,
    id: newId,
    joinedDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    certificateIssued: false,
    certificateId: null,
    createdAt: new Date().toISOString()
  };

  members.unshift(newMember);
  localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));

  // Log automated confirmation email
  logSystemEmail({
    to: newMember.email,
    subject: `Welcome to Pehchaan NGO - Your Registration ID: ${newId}`,
    type: 'REGISTRATION_WELCOME',
    content: `Dear ${newMember.fullName}, thank you for registering as a ${newMember.role} at Pehchaan NGO. Your unique ID is ${newId}. You can verify your credentials online anytime.`
  });

  return newMember;
}

export function updateMember(id, updates) {
  const members = getMembers();
  const index = members.findIndex(m => m.id === id);
  if (index !== -1) {
    members[index] = { ...members[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    return members[index];
  }
  return null;
}

export function issueCertificate(memberId) {
  const members = getMembers();
  const member = members.find(m => m.id === memberId);
  if (!member) return null;

  const year = new Date().getFullYear();
  const certId = `CERT-${year}-${member.role.charAt(0)}${Math.floor(1000 + Math.random() * 9000)}`;

  const updated = updateMember(memberId, {
    certificateIssued: true,
    certificateId: certId,
    certificateDate: new Date().toISOString().split('T')[0]
  });

  logSystemEmail({
    to: member.email,
    subject: `Official Pehchaan NGO Certificate Issued: ${certId}`,
    type: 'CERTIFICATE_ISSUED',
    content: `Congratulations ${member.fullName}! Your official Certificate of Appreciation/Internship (${certId}) has been issued by Pehchaan NGO and authorized by MSW.`
  });

  return updated;
}

// Verification functions
export function verifyCredential(query) {
  if (!query) return null;
  const q = query.trim().toUpperCase();
  const members = getMembers();

  // Search by Member ID or Certificate ID or Phone or Email
  const matched = members.find(m => 
    (m.id && m.id.toUpperCase() === q) ||
    (m.certificateId && m.certificateId.toUpperCase() === q) ||
    (m.phone && m.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''))) ||
    (m.email && m.email.toUpperCase() === q)
  );

  return matched || null;
}

// Donations & 80G Receipts
export function getDonations() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS)) || [];
  } catch (e) {
    return INITIAL_DONATIONS;
  }
}

export function recordDonation(donationData) {
  const donations = getDonations();
  const year = new Date().getFullYear();
  const receiptCount = donations.length + 1;
  const receiptNumber = `80G-${year}-${String(receiptCount).padStart(4, '0')}`;
  const donId = `DON-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newDonation = {
    ...donationData,
    id: donId,
    receiptNumber: receiptNumber,
    date: new Date().toISOString().split('T')[0],
    status: 'Success',
    tax80GIssued: true,
    createdAt: new Date().toISOString()
  };

  donations.unshift(newDonation);
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));

  // Auto-send 80G tax receipt email
  logSystemEmail({
    to: newDonation.donorEmail,
    subject: `Pehchaan NGO Donation Receipt & 80G Tax Certificate: ${receiptNumber}`,
    type: 'DONATION_80G_RECEIPT',
    content: `Dear ${newDonation.donorName}, thank you for your generous contribution of ₹${newDonation.amount.toLocaleString('en-IN')}. Your official 80G Tax Exemption Receipt (${receiptNumber}) has been generated.`
  });

  return newDonation;
}

// Simulated System Emails
export function getSystemEmails() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EMAILS)) || [];
  } catch (e) {
    return [];
  }
}

export function logSystemEmail(emailRecord) {
  const emails = getSystemEmails();
  const record = {
    ...emailRecord,
    id: `MAIL-${Date.now()}`,
    timestamp: new Date().toLocaleString('en-IN')
  };
  emails.unshift(record);
  localStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify(emails.slice(0, 50)));
  return record;
}

