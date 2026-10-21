# Pehchaan NGO - Digital Transformation & Management Platform
### Pro-Bono Academic Service-Learning Project

> **Live Local URL:** [http://localhost:5173/](http://localhost:5173/)  
> **Community Partner:** Pehchaan NGO (Pehchaan The Street School)  
> **Registration Act:** Societies Registration Act XXI of 1860 (Reg No: 1122/6164M, Renewed: R/GHA/17643/2020-2021)  
> **NITI Aayog Darpan ID:** UP/2017/0153557  
> **Section 80G Order No:** CIT(E)/80G/2020-21/GHA-10492  
> **Founder & General Secretary:** Dr. Neelesh Singh (+91 9457320905, ngo.pehchaan@gmail.com)  

---

## 🌟 Service-Learning Project Overview

This modern web platform was engineered **free of cost** for **Pehchaan NGO** as part of our college **Service-Learning** course requirements. 

### Problem Identification & Need Analysis
Prior to this project, Pehchaan NGO operated on a basic Google Sites template (`sites.google.com/view/pehchaanngo`) that suffered from:
1. Complete lack of dynamic database handling for their 1,500+ student interns and volunteers.
2. Inability to generate instant verifiable internship/volunteer certificates.
3. Lack of printable official ID badges with QR verification for field workers.
4. No automated Section 80G tax receipt generation for online donors.
5. Inability for universities, HR recruiters, and government bodies to verify volunteer credentials online.

---

## 📋 Owner Requirements Matrix (All 8 Needs Addressed)

Based on the direct specifications from the NGO leadership, the platform provides:

| # | Requested Feature | Implementation Details | Status |
|---|---|---|---|
| **1** | **Complete Dynamic Coding Based Website** | Built with React, Vite, and Tailwind CSS. Responsive on all devices with instant state management and offline resilience. | ✅ Complete |
| **2** | **Member, Volunteer, Intern Registration** | Dynamic self-service registration portal with automatic ID allocation (`PEH-VOL-2024-XXX`, `PEH-INT-2024-XXX`), center selection, and blood group logging. | ✅ Complete |
| **3** | **Donation & Crowdfunding Page** | Crowdfunding campaigns for *Gyan Jyoti Street School*, *Project Ankur Malnutrition Rescue*, and *Winter Clothes Drive* with progress tracking. | ✅ Complete |
| **4** | **Mail & Payment Gateway Integration** | Razorpay payment modal integration with simulated/live payment flows and automated confirmation emails logged to the system outbox. | ✅ Complete |
| **5** | **Generate Certificate (Member, Intern, Volunteer)** | 1-Click dynamic certificate generator with Dr. Neelesh Singh's signature, gold seal, MSW authorization, and verifiable QR code exportable as high-res PDF. | ✅ Complete |
| **6** | **Verify Member, Volunteer, Intern** | Real-time search verification portal by System ID or Certificate ID displaying verified badges for background checks. | ✅ Complete |
| **7** | **Verify Member, Intern Volunteer ID CARD** | Standard CR80 print-ready identity badges with member photo, center, blood group, barcode, and QR code downloadable as PDF. | ✅ Complete |
| **8** | **Auto Generate 80G Donation Receipt** | Instant Income Tax compliant Section 80G Tax Exemption receipt PDF generator with 80G approval number, donor PAN, amount in words, and digital signature. | ✅ Complete |

---

## 🚀 How to Run the Platform

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build optimized production bundle
npm run build
```

---

## 📁 Key File Structure

```
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                  # Responsive navigation & quick actions
│   │   ├── Footer.jsx                  # Legal disclaimers & contact network
│   │   ├── RegistrationModal.jsx       # Multi-role registration engine
│   │   ├── DonationGateway.jsx         # Crowdfunding & Razorpay 80G donation
│   │   ├── VerificationPortal.jsx      # Credential verification engine
│   │   ├── CertificateGenerator.jsx    # Certificate preview & PDF download
│   │   ├── IdCardGenerator.jsx         # CR80 badge generator & PDF download
│   │   ├── AdminDashboard.jsx          # Admin management console
│   │   └── ServiceLearningShowcase.jsx # Academic report modal
│   ├── data/
│   │   └── ngoData.js                  # Scraped authentic Pehchaan NGO content
│   ├── pages/
│   │   ├── Home.jsx                    # Hero, feature grid, story & quotes
│   │   ├── AboutUs.jsx                 # Legal history & Kalam inspiration
│   │   └── Projects.jsx                # Gyan Jyoti, Ankur, Power of Re-Use
│   ├── utils/
│   │   ├── pdfGenerator.js             # jsPDF engine for Certificates, ID Cards & 80G
│   │   └── storage.js                  # LocalStorage CRUD & email simulation
│   ├── App.jsx                         # Main controller
│   └── main.jsx                        # Entry point
```

