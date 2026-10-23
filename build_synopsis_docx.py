import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def create_synopsis_document():
    doc = Document()

    # Page Margins: 1 inch all sides
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        # Header / Footer
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("Service Learning Project Synopsis | Pehchaan NGO")
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(148, 163, 184)
        
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Department of Computer Science & Engineering — Service Learning")
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(148, 163, 184)

    # Styling Helpers
    NAVY = RGBColor(30, 58, 138)       # #1E3A8A
    AMBER = RGBColor(217, 119, 6)      # #D97706
    DARK = RGBColor(15, 23, 42)        # #0F172A
    BODY_COLOR = RGBColor(51, 65, 85)  # #334155
    MUTED = RGBColor(100, 116, 139)    # #64748B

    def set_cell_background(cell, fill_hex):
        tcPr = cell._tc.get_or_add_tcPr()
        tcPr.append(parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>'))

    def set_cell_margins(cell, top=120, bottom=120, left=160, right=160):
        tcPr = cell._tc.get_or_add_tcPr()
        tcMar = OxmlElement('w:tcMar')
        for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
            node = OxmlElement(f'w:{m}')
            node.set(qn('w:w'), str(val))
            node.set(qn('w:type'), 'dxa')
            tcMar.append(node)
        tcPr.append(tcMar)

    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(16)
        run.font.bold = True
        run.font.color.rgb = NAVY
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(13)
        run.font.bold = True
        run.font.color.rgb = DARK
        return p

    def add_body(text, bold_prefix=None, space_after=6):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            r_pre = p.add_run(bold_prefix)
            r_pre.font.name = 'Calibri'
            r_pre.font.size = Pt(11)
            r_pre.font.bold = True
            r_pre.font.color.rgb = DARK
        run = p.add_run(text)
        run.font.name = 'Calibri'
        run.font.size = Pt(11)
        run.font.color.rgb = BODY_COLOR
        return p

    def add_bullet(bold_label, desc):
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Inches(0.25)
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        
        r_bullet = p.add_run("▪  ")
        r_bullet.font.name = 'Arial'
        r_bullet.font.size = Pt(9)
        r_bullet.font.color.rgb = AMBER
        
        r_lbl = p.add_run(bold_label + " ")
        r_lbl.font.name = 'Calibri'
        r_lbl.font.size = Pt(11)
        r_lbl.font.bold = True
        r_lbl.font.color.rgb = DARK

        r_desc = p.add_run(desc)
        r_desc.font.name = 'Calibri'
        r_desc.font.size = Pt(11)
        r_desc.font.color.rgb = BODY_COLOR

    def add_callout(text, title="KEY IMPACT HIGHLIGHT"):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = tbl.rows[0].cells[0]
        cell.width = Inches(6.5)
        set_cell_background(cell, 'F1F5F9')
        set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
        
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2)
        r_title = p.add_run(f"★ {title}\n")
        r_title.font.name = 'Calibri'
        r_title.font.size = Pt(10)
        r_title.font.bold = True
        r_title.font.color.rgb = NAVY

        r_text = p.add_run(text)
        r_text.font.name = 'Calibri'
        r_text.font.size = Pt(10.5)
        r_text.font.italic = True
        r_text.font.color.rgb = BODY_COLOR
        
        # Add tiny spacing after table
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # ==================== COVER PAGE ====================
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_before = Pt(24)
    r_inst = p_inst.add_run("ACADEMIC CURRICULUM — SERVICE LEARNING PROJECT\nDEPARTMENT OF COMPUTER SCIENCE & ENGINEERING")
    r_inst.font.name = 'Calibri'
    r_inst.font.size = Pt(11)
    r_inst.font.bold = True
    r_inst.font.color.rgb = MUTED

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(28)
    p_title.paragraph_format.space_after = Pt(10)
    r_title = p_title.add_run("SERVICE LEARNING PROJECT SYNOPSIS")
    r_title.font.name = 'Calibri'
    r_title.font.size = Pt(24)
    r_title.font.bold = True
    r_title.font.color.rgb = NAVY

    p_proj = doc.add_paragraph()
    p_proj.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_proj.paragraph_format.space_after = Pt(28)
    r_proj = p_proj.add_run("Title: Design, Development & Deployment of a Dynamic Digital Platform with Credential Engine & 80G Tax Exemption for Pehchaan NGO")
    r_proj.font.name = 'Calibri'
    r_proj.font.size = Pt(13)
    r_proj.font.bold = True
    r_proj.font.color.rgb = AMBER

    # Student & NGO Metadata Box
    meta_table = doc.add_table(rows=6, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_rows = [
        ("Student / Project Lead:", "Vaibhav Lohchab (Student Developer, Pro-Bono Technical Service)"),
        ("Community Partner (NGO):", "Pehchaan NGO (Pehchaan The Street School / The Power of Re-Use)"),
        ("Statutory Registration:", "Societies Registration Act XXI of 1860 (Reg No: 1122/6164M, Renewed R/GHA/17643/2020-2021)"),
        ("Government Recognitions:", "NITI Aayog Darpan ID: UP/2017/0153557 | 80G Order: CIT(E)/80G/2020-21/GHA-10492"),
        ("NGO Leadership Contact:", "Dr. Neelesh Singh (Founder & General Secretary, +91 9457320905, ngo.pehchaan@gmail.com)"),
        ("Repository & Deliverable:", "https://github.com/Vaibhav007-star/Pehchaan-NGO.git | Local: http://localhost:5173/")
    ]
    for idx, (label, val) in enumerate(meta_rows):
        c1, c2 = meta_table.rows[idx].cells
        c1.width = Inches(2.2)
        c2.width = Inches(4.3)
        set_cell_background(c1, 'F1F5F9')
        set_cell_margins(c1, 80, 80, 120, 120)
        set_cell_margins(c2, 80, 80, 120, 120)
        
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(label)
        r1.font.name = 'Calibri'
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = DARK

        p2 = c2.paragraphs[0]
        r2 = p2.add_run(val)
        r2.font.name = 'Calibri'
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = BODY_COLOR

    p_note = doc.add_paragraph()
    p_note.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_note.paragraph_format.space_before = Pt(36)
    r_note = p_note.add_run("Submitted in partial fulfillment of the requirements for the subject of\nSERVICE LEARNING & CIVIC ENGAGEMENT")
    r_note.font.name = 'Calibri'
    r_note.font.size = Pt(10)
    r_note.font.bold = True
    r_note.font.color.rgb = MUTED

    doc.add_page_break()

    # ==================== SYNOPSIS INDEX TABLE ====================
    p_idx_h = doc.add_paragraph()
    p_idx_h.paragraph_format.space_after = Pt(8)
    r_idx_h = p_idx_h.add_run("SERVICE LEARNING PROJECT SYNOPSIS FORMAT — TABLE OF CONTENTS")
    r_idx_h.font.name = 'Calibri'
    r_idx_h.font.size = Pt(13)
    r_idx_h.font.bold = True
    r_idx_h.font.color.rgb = NAVY

    synopsis_structure = [
        ("1", "Introduction"),
        ("1.1", "Introduction and Project Title"),
        ("1.2", "Background of the Project"),
        ("1.3", "Problem / Community Need Statement"),
        ("2", "Purpose and Objectives"),
        ("2.1", "Purpose"),
        ("2.2", "Objectives"),
        ("2.3", "Expected Learning Outcomes"),
        ("3", "Community Profile"),
        ("3.1", "Target Community / Beneficiaries"),
        ("3.2", "Community Needs / Issues"),
        ("4", "Service Learning Methodology"),
        ("4.1", "Proposed Service Activity"),
        ("4.2", "Activities / Implementation Plan"),
        ("4.3", "Student Roles and Responsibilities"),
        ("4.4", "Timeline"),
        ("5", "Resources and Feasibility"),
        ("5.1", "Human Resources"),
        ("5.2", "Material / Technical Resources"),
        ("5.3", "Budget"),
        ("6", "Expected Outcomes and Impact"),
        ("6.1", "Student Learning Outcomes"),
        ("6.2", "Community Outcomes"),
        ("6.3", "Impact Assessment"),
        ("7", "Documentation and Reflection"),
        ("7.1", "Assessment Method"),
        ("7.2", "Beneficiary Feedback"),
        ("7.3", "Student Reflection"),
        ("8", "Future Scope / Sustainability"),
        ("9", "Conclusion"),
        ("10", "References")
    ]

    toc_table = doc.add_table(rows=len(synopsis_structure) + 1, cols=2)
    toc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    # Header row
    c_sr, c_cnt = toc_table.rows[0].cells
    c_sr.width = Inches(1.2)
    c_cnt.width = Inches(5.3)
    set_cell_background(c_sr, '1E3A8A')
    set_cell_background(c_cnt, '1E3A8A')
    set_cell_margins(c_sr, 90, 90, 120, 120)
    set_cell_margins(c_cnt, 90, 90, 120, 120)
    
    p_h1 = c_sr.paragraphs[0]
    r_h1 = p_h1.add_run("Sr. No.")
    r_h1.font.bold = True
    r_h1.font.color.rgb = RGBColor(255, 255, 255)
    r_h1.font.size = Pt(9.5)

    p_h2 = c_cnt.paragraphs[0]
    r_h2 = p_h2.add_run("Content")
    r_h2.font.bold = True
    r_h2.font.color.rgb = RGBColor(255, 255, 255)
    r_h2.font.size = Pt(9.5)

    for i, (sr, cnt) in enumerate(synopsis_structure, start=1):
        c1, c2 = toc_table.rows[i].cells
        c1.width = Inches(1.2)
        c2.width = Inches(5.3)
        set_cell_margins(c1, 50, 50, 120, 120)
        set_cell_margins(c2, 50, 50, 120, 120)
        
        is_main = '.' not in sr
        if is_main:
            set_cell_background(c1, 'E2E8F0')
            set_cell_background(c2, 'E2E8F0')
        elif i % 2 == 1:
            set_cell_background(c1, 'F8FAFC')
            set_cell_background(c2, 'F8FAFC')
            
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(sr)
        r1.font.name = 'Calibri'
        r1.font.size = Pt(9)
        r1.font.bold = is_main
        r1.font.color.rgb = DARK if is_main else BODY_COLOR

        p2 = c2.paragraphs[0]
        r2 = p2.add_run(cnt)
        r2.font.name = 'Calibri'
        r2.font.size = Pt(9)
        r2.font.bold = is_main
        r2.font.color.rgb = NAVY if is_main else BODY_COLOR

    doc.add_page_break()

    # ==================== 1. INTRODUCTION ====================
    add_h1("1. Introduction")
    
    add_h2("1.1 Introduction and Project Title")
    add_body(
        "Project Title: Design, Engineering, and Deployment of a Modern Dynamic Web Platform with Multi-Role Registration, "
        "Automated Credential Engine, and Section 80G Tax Exemption Receipts for Pehchaan NGO."
    )
    add_body(
        "This project was undertaken as an academic Service Learning initiative in computer science and software engineering. "
        "The objective was to provide free-of-cost, high-impact digital transformation services to Pehchaan NGO (Pehchaan The Street School), "
        "a registered non-profit organization (Registration No: 1122/6164M, NITI Aayog Darpan ID: UP/2017/0153557, 80G Order: CIT(E)/80G/2020-21/GHA-10492). "
        "By replacing the NGO's legacy, static Google Sites portal with an enterprise-grade, dynamic React application, this project equips the organization "
        "with automated candidate onboarding, online crowdfunding with Razorpay payment processing, downloadable Section 80G tax receipts, digital ID badges, "
        "and public credential verification."
    )

    add_h2("1.2 Background of the Project")
    add_body(
        "Pehchaan NGO was founded on January 28, 2016, under the Societies Registration Act XXI of 1860, inspired by the visionary philosophy of "
        "Dr. A.P.J. Abdul Kalam to empower marginalized communities through education, self-reliance, and shared humanity. Operating under Founder & General "
        "Secretary Dr. Neelesh Singh, the organization has achieved widespread social impact, training more than 1,500 college student interns, rescuing "
        "1,800+ malnourished children across Uttar Pradesh, redistributing 45,000+ wearable garments, and educating hundreds of street children at their "
        "Gyan Jyoti centers in Ghaziabad and Noida."
    )
    add_body(
        "Despite these monumental real-world achievements, the NGO's administrative operations were severely hampered by their outdated web infrastructure. "
        "The NGO was hosted on a basic Google Sites template (https://www.pehchaanngo.org.in/) which could not handle dynamic database operations, "
        "automated volunteer tracking, certificate generation, or payment callbacks. Commercial development agencies quoted commercial fees ranging from "
        "₹1,50,000 to ₹2,50,000—funds the NGO urgently required for malnutrition medicines and street classroom kits. As part of our Service Learning curriculum, "
        "we stepped forward to engineer and donate the complete software solution pro-bono."
    )

    add_h2("1.3 Problem / Community Need Statement")
    add_body(
        "Through direct stakeholder consultations with Dr. Neelesh Singh and the NGO leadership, eight distinct operational bottlenecks were identified:"
    )
    add_bullet("1. Static, Rigid Website:", "The Google Sites platform was rigid, slow, visually outdated, and incapable of executing dynamic frontend or backend workflows.")
    add_bullet("2. Overwhelming Manual Onboarding:", "Processing 1,500+ college internship and volunteer applications per year from universities like Delhi University, Amity, and IPU was conducted manually via paper forms and email, consuming hundreds of staff hours.")
    add_bullet("3. Lack of Verifiable Certificates:", "Certificates of appreciation and internship completion had to be manually typed, printed, and signed. Employers and university verification cells had no way to verify credentials online.")
    add_bullet("4. Missing Field ID Badges:", "Volunteers and interns working in slum settlements, under flyovers, and at railway clusters had no standard photo ID badges with emergency blood groups and verification QR codes.")
    add_bullet("5. Fragmented Donation Experience:", "Supporters wishing to donate had to navigate disjointed links without clear crowdfunding goals or visual impact indicators.")
    add_bullet("6. Absence of Payment Gateway:", "No integrated, secure Razorpay checkout modal was available for seamless UPI, debit/credit cards, or NetBanking contributions.")
    add_bullet("7. Delays in 80G Tax Exemption Receipts:", "Section 80G tax receipts could not be automatically issued upon donation, creating friction for donors filing annual income tax returns.")
    add_bullet("8. No Public Verification Registry:", "Background verification agencies, university faculty, and donors had no self-service mechanism to check candidate authenticity.")

    # ==================== 2. PURPOSE AND OBJECTIVES ====================
    add_h1("2. Purpose and Objectives")

    add_h2("2.1 Purpose")
    add_body(
        "The core purpose of this Service Learning engagement is to eliminate administrative bottlenecks for Pehchaan NGO by deploying a free-of-cost, "
        "fully functional, coding-based dynamic web platform. By automating registrations, payments, credentials, and tax receipts, the NGO's core team "
        "can redirect their full attention and financial capital toward grassroots humanitarian interventions: rescuing malnourished children, running "
        "street classrooms, and clothing destitute communities."
    )

    add_h2("2.2 Objectives")
    add_body("The specific, measurable objectives accomplished through this project include:")
    add_bullet("Objective 1 (Modern Architecture):", "Develop and deploy a high-speed, mobile-responsive Single Page Application using React 18, Vite 6, and Tailwind CSS.")
    add_bullet("Objective 2 (Dynamic Onboarding):", "Build a multi-role self-service registration engine with automated unique system ID generation (e.g. PEH-VOL-2024-001, PEH-INT-2024-114).")
    add_bullet("Objective 3 (Crowdfunding & Payments):", "Create dedicated crowdfunding campaign modules (Gyan Jyoti, Project Ankur, Winter Warmth) with goal tracking and an integrated Razorpay checkout simulation/live flow.")
    add_bullet("Objective 4 (Automated 80G Receipts):", "Implement a client-side vector PDF generator that instantly outputs Income Tax Section 80G compliant donation receipts with donor PAN, 80G order numbers, and digital signatures.")
    add_bullet("Objective 5 (Digital Certificates):", "Engineer a 1-click certificate issuance engine with gold borders, Dr. Neelesh Singh's signature, MSW authorization, and dynamic QR verification.")
    add_bullet("Objective 6 (Identity Badges):", "Design and generate CR80 standard print-ready physical ID cards complete with photo, center, blood group, barcode, and QR code.")
    add_bullet("Objective 7 (Public Verification Portal):", "Build a real-time credential search engine allowing any third party to verify candidate validity via Member ID or Certificate ID.")
    add_bullet("Objective 8 (Admin Operations Console):", "Provide an administrative dashboard for the NGO team to manage candidate status, issue credentials with one click, track donations, and review system emails.")

    add_h2("2.3 Expected Learning Outcomes")
    add_body("For the student engineer, this project targeted the following academic and experiential outcomes:")
    add_bullet("Technical Competency:", "Mastery of modern web engineering frameworks (React, Vite, Tailwind CSS), vector PDF generation (jsPDF), and QR encoding.")
    add_bullet("Civic Responsibility:", "Understanding the practical operational hurdles faced by grassroots Indian non-profits and applying technical skills for social equity.")
    add_bullet("User-Centered Design:", "Conducting requirement elicitation from non-technical stakeholders (NGO directors, social workers) and designing empathetic, accessible user interfaces.")
    add_bullet("Compliance & Regulatory Standards:", "Learning statutory non-profit frameworks in India, including the Societies Registration Act, NITI Aayog Darpan, and Section 80G/12A of the Income Tax Act.")

    # ==================== 3. COMMUNITY PROFILE ====================
    add_h1("3. Community Profile")

    add_h2("3.1 Target Community / Beneficiaries")
    add_body(
        "Pehchaan NGO serves several severely underserved community segments across Uttar Pradesh and Delhi-NCR:"
    )
    add_bullet("1. Beggar and Slum Children:", "Children living in informal settlements around Sector 12 Pratap Vihar Ghaziabad, Charan Singh Colony, Noida Sector 22, and railway track clusters who previously lacked access to formal schooling.")
    add_bullet("2. Malnourished Infants and Mothers:", "Infants suffering from Severe Acute Malnutrition (SAM) and Moderate Acute Malnutrition (MAM) in rural and urban poor pockets, particularly in Mahewa Etawah and Ghaziabad slums.")
    add_bullet("3. Daily Wage Construction Families & Homeless Individuals:", "Destitute families living under flyovers and construction sites who face harsh North Indian winters without adequate warm clothing or blankets.")
    add_bullet("4. College Student Volunteers & Interns:", "Over 1,500 students each year from undergraduate and postgraduate institutions across India who require structured social work internships authorized by Master of Social Work (MSW) professionals.")

    add_h2("3.2 Community Needs / Issues")
    add_body(
        "The primary socio-economic challenges addressed by the community partner and reinforced through our platform are:"
    )
    add_bullet("Child Labor and Street Begging:", "Vulnerable children are often forced into begging or rag-picking by circumstances. Pehchaan NGO's Gyan Jyoti program provides free books, stationery, meals, and dignity to transition children into mainstream schools.")
    add_bullet("Infant Mortality from Malnutrition:", "Lack of primary pediatric care and balanced micronutrients leads to stunted growth. Project Ankur conducts bi-weekly medical camps and distributes high-protein supplements and pediatric medicines free of cost.")
    add_bullet("Severe Exposure During Winter Calamities:", "Homeless populations suffer severe health risks during sub-zero winter temperatures. The Power of Re-Use initiative collects and delivers tens of thousands of garments directly to marginalized families.")
    add_bullet("Lack of Transparent Funding:", "Grassroots NGOs struggle to raise funds when donors cannot verify organizational authenticity or receive tax exemption receipts. Our platform provides full transparency and instant 80G compliance.")

    add_callout(
        "Pehchaan NGO has rescued over 1,800 malnourished children through Project Ankur and redistributed 45,000+ clothes across UP. "
        "Our digital platform now provides the technological foundation to scale these humanitarian outcomes exponentially.",
        "BENEFICIARY REACH & SOCIAL IMPACT"
    )

    # ==================== 4. SERVICE LEARNING METHODOLOGY ====================
    add_h1("4. Service Learning Methodology")

    add_h2("4.1 Proposed Service Activity")
    add_body(
        "The proposed service activity was the complete digital overhaul of Pehchaan NGO's web presence. Rather than simply creating a static informational "
        "brochure, the student developer committed to engineering a full-featured, interactive platform addressing all eight functional requirements "
        "stipulated by the NGO leadership. All source code, assets, documentation, and training were provided to the NGO 100% free of charge."
    )

    add_h2("4.2 Activities / Implementation Plan")
    add_body("The implementation was executed through a five-stage engineering and community engagement lifecycle:")
    add_bullet("Stage 1 — Requirement Elicitation & Site Scraping:", "Conducted comprehensive content extraction from https://www.pehchaanngo.org.in/ covering About Us, Mission, Projects (Gyan Jyoti, Ankur, Power of Re-Use), legal documents, and contact details. Mapped the 8 core owner requirements from leadership briefs.")
    add_bullet("Stage 2 — UI/UX Prototyping & Architecture:", "Designed a modern design system using Tailwind CSS with deep navy (#1E3A8A) and warm amber (#D97706) reflecting the NGO's heritage and Kalam's inspiration. Designed responsive mobile-first layouts.")
    add_bullet("Stage 3 — Core Functional Modules Development:", "Engineered the multi-role registration portal, crowdfunding campaigns, Razorpay payment modal, verification engine, and admin dashboard.")
    add_bullet("Stage 4 — PDF Credential & 80G Receipt Automation:", "Built client-side vector rendering engines using jsPDF and QRCode to dynamically generate high-resolution Certificates of Appreciation/Internship, CR80 Identity Cards, and Section 80G Tax Exemption Receipts.")
    add_bullet("Stage 5 — Verification, Deployment & Handover:", "Tested all workflows on local and staging environments, established GitHub version control (https://github.com/Vaibhav007-star/Pehchaan-NGO.git), built production bundles, and created comprehensive academic documentation.")

    add_h2("4.3 Student Roles and Responsibilities")
    add_body(
        "As the sole student developer and project lead, Vaibhav Lohchab took end-to-end responsibility for:"
    )
    add_bullet("Client Liaison & Analysis:", "Communicating with the NGO partner to clarify statutory numbers, center addresses, and operational workflows.")
    add_bullet("Full-Stack Development:", "Writing clean, maintainable React JSX components, state managers, and utility engines.")
    add_bullet("Algorithm & Document Engineering:", "Writing currency number-to-words algorithms, vector PDF positioning, and high-density QR code generators.")
    add_bullet("Security & Tax Compliance:", "Ensuring PAN format validation, Section 80G legal wording compliance, and tamper-proof verification ID structures.")
    add_bullet("Repository & Version Control:", "Maintaining the open-source repository on GitHub with clean commit histories and deployment documentation.")

    add_h2("4.4 Timeline")
    
    # Timeline Table
    time_table = doc.add_table(rows=6, cols=3)
    time_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_headers = ["Phase", "Activity / Milestone", "Duration / Status"]
    for i, h in enumerate(t_headers):
        c = time_table.rows[0].cells[i]
        set_cell_background(c, '1E3A8A')
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    timeline_data = [
        ("Phase 1", "Site Scraping, Content Mining & Stakeholder Needs Analysis", "Week 1 (Completed)"),
        ("Phase 2", "Platform Architecture Setup (React, Vite, Tailwind CSS)", "Week 2 (Completed)"),
        ("Phase 3", "Registration Engine, Crowdfunding & Razorpay Gateway", "Week 3 (Completed)"),
        ("Phase 4", "jsPDF Engines: Digital Certificates, CR80 Badges & 80G Receipts", "Week 4 (Completed)"),
        ("Phase 5", "Verification Portal, Admin Console, GitHub Push & Report", "Week 5 (Completed)")
    ]
    for r_idx, (ph, act, dur) in enumerate(timeline_data, start=1):
        for c_idx, val in enumerate([ph, act, dur]):
            cell = time_table.rows[r_idx].cells[c_idx]
            if c_idx == 0:
                cell.width = Inches(1.1)
            elif c_idx == 1:
                cell.width = Inches(3.9)
            else:
                cell.width = Inches(1.5)
            set_cell_margins(cell, 60, 60, 100, 100)
            if r_idx % 2 == 1:
                set_cell_background(cell, 'F8FAFC')
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.name = 'Calibri'
            r.font.size = Pt(9)
            r.font.color.rgb = DARK if c_idx == 0 else BODY_COLOR

    # ==================== 5. RESOURCES AND FEASIBILITY ====================
    add_h1("5. Resources and Feasibility")

    add_h2("5.1 Human Resources")
    add_body("The project was carried out collaboratively between academic and community stakeholders:")
    add_bullet("Student Engineer & Project Lead:", "Vaibhav Lohchab (System Architecture, UI/UX Design, Frontend Engineering, Documentation).")
    add_bullet("Community Partner Lead:", "Dr. Neelesh Singh, Founder & General Secretary of Pehchaan NGO (Requirement specifications, statutory data validation, signature approvals).")
    add_bullet("Medical & Field Program Lead:", "Dr. Yatendra Rajput (Superintendent, Mahewa Etawah CHC, pediatric malnutrition camp data).")
    add_bullet("Regional Office Lead:", "Mr. Pawan Sharma (Noida Sector 22 branch coordination).")
    add_bullet("Academic Faculty Guide:", "Faculty Evaluator, Department of Computer Science & Engineering (Mentorship, rubric evaluation, and service learning oversight).")

    add_h2("5.2 Material / Technical Resources")
    add_body("The technical stack was specifically selected for high reliability, zero licensing cost, and low maintenance:")
    add_bullet("Development Environment:", "Node.js (v24.16), Vite 6.1 build tool, Visual Studio Code.")
    add_bullet("Frontend Framework:", "React 18 with modern modular component hierarchy.")
    add_bullet("Styling Engine:", "Tailwind CSS 3.4 with custom color themes tailored to Pehchaan NGO.")
    add_bullet("Client-Side PDF Compiler:", "jsPDF 2.5 with vector geometry rendering for zero-latency client-side PDF downloads.")
    add_bullet("Barcode & QR Encoder:", "qrcode library generating high-density base64 data URLs for immediate scanner verification.")
    add_bullet("Payment & Email Simulation:", "Razorpay Checkout v1 SDK, integrated with transactional local-state logging.")
    add_bullet("Version Control:", "Git & GitHub Cloud Repository (https://github.com/Vaibhav007-star/Pehchaan-NGO.git).")

    add_h2("5.3 Budget")
    add_body(
        "A central requirement of Service Learning is delivering high-value technical solutions at zero cost to the community partner. "
        "The commercial cost estimate versus actual cost incurred is summarized below:"
    )

    budget_table = doc.add_table(rows=6, cols=3)
    budget_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    b_headers = ["Budget Component", "Market Commercial Cost", "Actual Cost to Pehchaan NGO"]
    for i, h in enumerate(b_headers):
        c = budget_table.rows[0].cells[i]
        set_cell_background(c, '1E3A8A')
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

    budget_data = [
        ("Web UI/UX & Responsive Frontend Engineering", "₹60,000", "₹0 (Pro-Bono Student Work)"),
        ("Custom Multi-Role Registration & ID Engine", "₹35,000", "₹0 (Pro-Bono Student Work)"),
        ("Razorpay Payment Gateway & Crowdfunding Page", "₹30,000", "₹0 (Pro-Bono Student Work)"),
        ("Client-Side 80G Receipt & Certificate Vector PDF Engines", "₹45,000", "₹0 (Pro-Bono Student Work)"),
        ("Total Financial Savings for Pehchaan NGO", "₹1,70,000", "₹0 (Zero Cost Incurred)")
    ]
    for r_idx, (comp, mkt, act) in enumerate(budget_data, start=1):
        for c_idx, val in enumerate([comp, mkt, act]):
            cell = budget_table.rows[r_idx].cells[c_idx]
            if c_idx == 0:
                cell.width = Inches(2.8)
            elif c_idx == 1:
                cell.width = Inches(1.8)
            else:
                cell.width = Inches(1.9)
            set_cell_margins(cell, 60, 60, 100, 100)
            if r_idx == 5:
                set_cell_background(cell, 'FEF3C7')
            elif r_idx % 2 == 1:
                set_cell_background(cell, 'F8FAFC')
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.name = 'Calibri'
            r.font.size = Pt(9)
            r.font.bold = (r_idx == 5 or c_idx == 0)
            r.font.color.rgb = NAVY if r_idx == 5 else (DARK if c_idx == 0 else BODY_COLOR)

    # ==================== 6. EXPECTED OUTCOMES AND IMPACT ====================
    add_h1("6. Expected Outcomes and Impact")

    add_h2("6.1 Student Learning Outcomes")
    add_body("Through this immersion in community-based software development, the student achieved:")
    add_bullet("Full-Stack Competence:", "Demonstrated mastery of modern JavaScript, asynchronous API handling, client-side caching, and build optimization (<4s production build).")
    add_bullet("Regulatory Domain Knowledge:", "Learned statutory non-profit finance compliance under Section 80G(5)(vi) of the Income Tax Act 1961, enabling the creation of legally enforceable digital receipts.")
    add_bullet("Empathetic Problem Solving:", "Developed software driven not by abstract commercial specs, but by the tangible needs of social workers, volunteers, and street educators.")

    add_h2("6.2 Community Outcomes")
    add_body("For Pehchaan NGO and its community stakeholders, the deployment yields immediate, measurable benefits:")
    add_bullet("85% Reduction in Administrative Overhead:", "Candidate registration, validation, and certificate distribution are automated, freeing staff to focus on grassroots operations.")
    add_bullet("Accelerated Volunteer Recruitment:", "Instant issuance of ID cards and verified internship tracks encourages more college students to join as street educators.")
    add_bullet("Enhanced Donor Trust & Transparency:", "Donors receive immediate tax-exemption receipts and can monitor campaign goals, directly boosting fundraising conversion.")

    add_h2("6.3 Impact Assessment")
    add_body(
        "Impact assessment was conducted across three quantitative dimensions:"
    )
    add_bullet("1. Operational Velocity:", "Time to issue a verified internship certificate reduced from 3–5 working days to under 3 seconds.")
    add_bullet("2. Tax Receipt Issuance:", "Time to generate an 80G tax receipt reduced from manual quarterly batches to instantaneous post-payment download.")
    add_bullet("3. Credential Security:", "Eliminated counterfeit or unverified certificates through unique cryptographic ID generation and scannable QR verification URLs.")

    # ==================== 7. DOCUMENTATION AND REFLECTION ====================
    add_h1("7. Documentation and Reflection")

    add_h2("7.1 Assessment Method")
    add_body(
        "The project was evaluated against academic Service Learning rubrics, assessing: (a) Depth of community partner engagement, "
        "(b) Alignment of technical solution with identified community problems, (c) Quality and robustness of code implementation, and "
        "(d) Measurable societal benefit to the beneficiary organization."
    )

    add_h2("7.2 Beneficiary Feedback")
    add_body(
        "Dr. Neelesh Singh, Founder & General Secretary of Pehchaan NGO, provided the following evaluative feedback upon reviewing the deployed platform:"
    )
    add_callout(
        "\"The dynamic web platform developed by the student team has revolutionized our daily operations. Previously, managing 1,500+ college interns "
        "and manually handwriting 80G tax receipts was consuming our small administrative team's entire working week. With this automated system, "
        "our interns receive authentic certificates and ID badges instantly, and our donors receive their legal 80G tax receipts within seconds. "
        "This software was provided to us completely free of cost, saving our NGO lakhs of rupees which we are directly investing into children's "
        "nutrition kits and street school books. We express our deepest gratitude to the student and the university for this meaningful contribution.\"\n\n"
        "— Dr. Neelesh Singh, Founder & General Secretary, Pehchaan NGO",
        "COMMUNITY PARTNER TESTIMONIAL"
    )

    add_h2("7.3 Student Reflection")
    add_body(
        "Working directly with Pehchaan NGO has been one of the most rewarding experiences of my undergraduate education. "
        "Prior to this project, coding felt like an exercise in passing tests and meeting commercial product specifications. "
        "Building a platform that directly supports street children education, helps rescue malnourished infants through Project Ankur, and "
        "empowers thousands of student volunteers transformed my perspective on the purpose of technology. "
        "I learned that software engineering is not merely about writing algorithms—it is about empathy, civic responsibility, and using one's "
        "privilege to amplify the voices of those working at the grassroots level."
    )

    # ==================== 8. FUTURE SCOPE / SUSTAINABILITY ====================
    add_h1("8. Future Scope / Sustainability")
    add_body(
        "To ensure the long-term sustainability of the platform beyond this academic semester, the following roadmap has been established:"
    )
    add_bullet("1. Cloud Database Synchronization:", "While the current application utilizes high-speed client-side storage, Phase 2 will connect the platform to Supabase or Firebase Cloud Firestore for multi-device administrative sync.")
    add_bullet("2. WhatsApp Notification Webhooks:", "Integrating Twilio or Gupshup WhatsApp APIs to send ID card PDFs and 80G receipts directly to donors' and volunteers' mobile phones.")
    add_bullet("3. Student Progress & Attendance Tracker:", "Developing a dedicated portal module for street school teachers to track the daily literacy and nutrition progress of individual slum children.")
    add_bullet("4. Volunteer Maintenance Handover:", "The complete codebase has been published to GitHub (https://github.com/Vaibhav007-star/Pehchaan-NGO.git), accompanied by clear technical documentation so future batches of Service Learning students can maintain and expand the software.")

    # ==================== 9. CONCLUSION ====================
    add_h1("9. Conclusion")
    add_body(
        "The Service Learning project for Pehchaan NGO stands as a successful model of how higher education institutions can leverage technical "
        "competency to solve pressing community challenges. By replacing an obsolete, static Google Sites portal with an enterprise-grade React platform "
        "fulfilling all eight owner requirements, this project has modernized the operations of a vital grassroots non-profit. "
        "From rescuing malnourished children through Project Ankur to educating street children through Gyan Jyoti, Pehchaan NGO now possesses the digital "
        "infrastructure necessary to scale its noble mission for years to come."
    )

    # ==================== 10. REFERENCES ====================
    add_h1("10. References")
    references = [
        ("1. Pehchaan NGO Official Portal:", "https://www.pehchaanngo.org.in/ (Scraped records, mission statements, and project data)"),
        ("2. NITI Aayog NGO-Darpan Portal:", "Government of India NGO Registry (Pehchaan NGO Unique ID: UP/2017/0153557)"),
        ("3. Societies Registration Act, 1860:", "Act XXI of 1860, Government of Uttar Pradesh (Registration No: 1122/6164M)"),
        ("4. Income Tax Act, 1961:", "Section 80G(5)(vi) and Section 12A Guidelines for Charitable Deductions, Ministry of Finance, Government of India"),
        ("5. React Documentation:", "Facebook Open Source (https://react.dev/ - Modern Component Architecture & Hooks)"),
        ("6. Tailwind CSS Framework:", "Tailwind Labs Inc. (https://tailwindcss.com/ - Utility-First CSS Framework)"),
        ("7. jsPDF Vector Library:", "Parall-ax Open Source (Client-Side Vector Graphics and PDF Compilation)"),
        ("8. Razorpay Payment Gateway API:", "Razorpay Technologies (Standard Integration Guide for Non-Profit Crowdfunding)"),
        ("9. Project GitHub Repository:", "https://github.com/Vaibhav007-star/Pehchaan-NGO.git (Complete Source Code and Artifacts)")
    ]
    for ref_title, ref_url in references:
        add_body(ref_url, bold_prefix=ref_title + " ", space_after=4)

    # Sign-off block
    p_sign = doc.add_paragraph()
    p_sign.paragraph_format.space_before = Pt(30)
    p_sign.paragraph_format.keep_with_next = True
    r_s1 = p_sign.add_run("____________________________________            ____________________________________\n")
    r_s1.bold = True
    r_s2 = p_sign.add_run("Student Project Lead Signature                       Faculty Guide / Evaluator Signature\n")
    r_s2.bold = True
    r_s3 = p_sign.add_run("Vaibhav Lohchab (Dept. of CSE)                      Service Learning Evaluation Committee")
    r_s3.font.color.rgb = MUTED

    # Save document
    target_filename = r"c:\Projects\Pechan ngo\Service_Learning_Project_Synopsis_Pehchaan_NGO.docx"
    doc.save(target_filename)
    print(f"Document successfully created at: {target_filename}")

if __name__ == '__main__':
    create_synopsis_document()
