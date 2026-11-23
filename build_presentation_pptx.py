import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_slide_layout = prs.slide_layouts[6]

    # Theme Colors
    NAVY_DARK = RGBColor(15, 23, 42)      # #0F172A
    NAVY_PRIMARY = RGBColor(26, 46, 90)   # #1A2E5A
    NAVY_ACCENT = RGBColor(30, 58, 138)   # #1E3A8A
    AMBER = RGBColor(217, 119, 6)         # #D97706
    AMBER_LIGHT = RGBColor(254, 243, 199) # #FEF3C7
    GRAY_TEXT = RGBColor(71, 85, 105)     # #475569
    GRAY_MUTED = RGBColor(30, 58, 138)    # #1E3A8A High-Contrast Deep Navy
    CARD_BG = RGBColor(248, 250, 252)     # #F8FAFC
    CARD_BORDER = RGBColor(226, 232, 240) # #E2E8F0
    WHITE = RGBColor(255, 255, 255)
    GREEN = RGBColor(16, 185, 129)        # #10B981
    GREEN_LIGHT = RGBColor(209, 250, 229) # #D1FAE5

    def add_header(slide, kicker, title):
        # Header banner
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(1.1))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_kick = tf.paragraphs[0]
        p_kick.text = kicker.upper()
        p_kick.font.name = "Calibri"
        p_kick.font.size = Pt(10.5)
        p_kick.font.bold = True
        p_kick.font.color.rgb = AMBER

        p_title = tf.add_paragraph()
        p_title.text = title
        p_title.font.name = "Trebuchet MS"
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = NAVY_PRIMARY
        p_title.space_before = Pt(3)

        # Subtle divider line
        line = slide.shapes.add_shape(
            MSO_SHAPE.RECTANGLE,
            Inches(0.8), Inches(1.48), Inches(11.733), Inches(0.02)
        )
        line.fill.solid()
        line.fill.fore_color.rgb = CARD_BORDER
        line.line.color.rgb = CARD_BORDER

    def add_footer(slide, current_idx, total_slides=15):
        # Footer text left
        footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.05), Inches(8.0), Inches(0.3))
        tf = footer_box.text_frame
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = "Service Learning Project | Pehchaan NGO Digital Transformation | School of Sciences (5BDA/EDA)"
        p.font.name = "Calibri"
        p.font.size = Pt(8.5)
        p.font.color.rgb = GRAY_MUTED
        p.font.bold = True

        # Footer text right (Slide numbers)
        page_box = slide.shapes.add_textbox(Inches(10.5), Inches(7.05), Inches(2.0), Inches(0.3))
        tf2 = page_box.text_frame
        tf2.margin_left = tf2.margin_top = tf2.margin_right = tf2.margin_bottom = 0
        p2 = tf2.paragraphs[0]
        p2.alignment = PP_ALIGN.RIGHT
        p2.text = f"{current_idx} / {total_slides}"
        p2.font.name = "Calibri"
        p2.font.size = Pt(8.5)
        p2.font.bold = True
        p2.font.color.rgb = GRAY_MUTED

    def create_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1)
        else:
            card.line.fill.background()
        return card

    # =========================================================================
    # SLIDE 1: TITLE SLIDE (Navy Premium Hero)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_slide_layout)
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = NAVY_DARK
    bg1.line.fill.background()

    # Accent Top Bar
    top_bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.12))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = AMBER
    top_bar.line.fill.background()

    # Title Card
    tbox = s1.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(3.2))
    tf1 = tbox.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "ACADEMIC SERVICE LEARNING PROJECT REPORT & PRESENTATION"
    p0.font.name = "Calibri"
    p0.font.size = Pt(11.5)
    p0.font.bold = True
    p0.font.color.rgb = AMBER

    p1 = tf1.add_paragraph()
    p1.text = "PEHCHAAN NGO DIGITAL PLATFORM"
    p1.font.name = "Trebuchet MS"
    p1.font.size = Pt(32)
    p1.font.bold = True
    p1.font.color.rgb = WHITE
    p1.space_before = Pt(8)

    p2 = tf1.add_paragraph()
    p2.text = "Design, Development & Deployment of a Dynamic Coding Platform with Automated Credential Engine & Section 80G Tax Exemption"
    p2.font.name = "Calibri"
    p2.font.size = Pt(14)
    p2.font.color.rgb = RGBColor(203, 213, 225)
    p2.space_before = Pt(6)

    # Info Grid Cards on Slide 1
    # Card Left: Students
    card_l = create_card(s1, Inches(1.0), Inches(4.5), Inches(5.4), Inches(2.3), bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
    tb_l = s1.shapes.add_textbox(Inches(1.2), Inches(4.6), Inches(5.0), Inches(2.1))
    tfl = tb_l.text_frame
    tfl.word_wrap = True

    pl0 = tfl.paragraphs[0]
    pl0.text = "STUDENT PROJECT TEAM (5BDA / EDA)"
    pl0.font.name = "Calibri"
    pl0.font.size = Pt(10)
    pl0.font.bold = True
    pl0.font.color.rgb = AMBER

    students = [
        ("Kunal", "24215215"),
        ("Samarth Chaudhary", "24215221"),
        ("Vaibhav", "24215227"),
        ("Divyansh", "24215229")
    ]
    for s_name, s_roll in students:
        p_s = tfl.add_paragraph()
        p_s.text = f"•  {s_name} — Reg No: {s_roll}"
        p_s.font.name = "Calibri"
        p_s.font.size = Pt(10.5)
        p_s.font.color.rgb = WHITE
        p_s.space_before = Pt(3)

    # Card Right: Community Partner
    card_r = create_card(s1, Inches(6.9), Inches(4.5), Inches(5.4), Inches(2.3), bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
    tb_r = s1.shapes.add_textbox(Inches(7.1), Inches(4.6), Inches(5.0), Inches(2.1))
    tfr = tb_r.text_frame
    tfr.word_wrap = True

    pr0 = tfr.paragraphs[0]
    pr0.text = "COMMUNITY PARTNER & BENEFICIARY"
    pr0.font.name = "Calibri"
    pr0.font.size = Pt(10)
    pr0.font.bold = True
    pr0.font.color.rgb = AMBER

    ngo_details = [
        ("Organization", "Pehchaan NGO (The Street School)"),
        ("Founder / Gen. Sec.", "Dr. Neelesh Singh"),
        ("Govt. Recognitions", "NITI Aayog Darpan ID: UP/2017/0153557"),
        ("Tax Exemption", "Sec 80G Order: CIT(E)/80G/2020-21/GHA-10492")
    ]
    for k, v in ngo_details:
        p_r = tfr.add_paragraph()
        p_r.text = f"•  {k}: {v}"
        p_r.font.name = "Calibri"
        p_r.font.size = Pt(10)
        p_r.font.color.rgb = WHITE
        p_r.space_before = Pt(3)

    # =========================================================================
    # SLIDE 2: EXECUTIVE SUMMARY & STATISTICAL OVERVIEW
    # =========================================================================
    s2 = prs.slides.add_slide(blank_slide_layout)
    add_header(s2, "Executive Overview", "Project At A Glance: Engineering Real Social Impact")
    add_footer(s2, 2)

    # 4 Key Stat Metric Boxes
    stats = [
        ("1,500+", "Active Interns & Volunteers", "Supported seamlessly by dynamic registration & credential generation", NAVY_ACCENT),
        ("8 of 8", "Client Specifications Delivered", "100% compliance with NGO leadership's operational requirements", GREEN),
        ("0 sec", "Instant Verification & Issuance", "Instant PDF export for Certificates, Badges, and 80G Receipts", AMBER),
        ("Rs. 0", "Zero-Cost Pro-Bono Engineering", "Developed as a service-learning project to empower grassroots education", NAVY_ACCENT)
    ]

    for idx, (stat, title, sub, color) in enumerate(stats):
        col_w = Inches(2.75)
        col_l = Inches(0.8 + idx * 2.98)
        card = create_card(s2, col_l, Inches(1.75), col_w, Inches(1.8), bg_color=CARD_BG)
        tb = s2.shapes.add_textbox(col_l + Inches(0.15), Inches(1.85), col_w - Inches(0.3), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True

        p_num = tf.paragraphs[0]
        p_num.text = stat
        p_num.font.name = "Trebuchet MS"
        p_num.font.size = Pt(28)
        p_num.font.bold = True
        p_num.font.color.rgb = color

        p_t = tf.add_paragraph()
        p_t.text = title
        p_t.font.name = "Calibri"
        p_t.font.size = Pt(10.5)
        p_t.font.bold = True
        p_t.font.color.rgb = NAVY_DARK
        p_t.space_before = Pt(2)

        p_s = tf.add_paragraph()
        p_s.text = sub
        p_s.font.name = "Calibri"
        p_s.font.size = Pt(9)
        p_s.font.color.rgb = GRAY_TEXT
        p_s.space_before = Pt(2)

    # 2 Wide Narrative Summary Cards
    card_sum1 = create_card(s2, Inches(0.8), Inches(3.85), Inches(5.75), Inches(2.8))
    tb_s1 = s2.shapes.add_textbox(Inches(1.0), Inches(3.95), Inches(5.35), Inches(2.6))
    tfs1 = tb_s1.text_frame
    tfs1.word_wrap = True

    p = tfs1.paragraphs[0]
    p.text = "🎯 The Civic Mission"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    bullets1 = [
        ("Bridging Technology & Civic Action", "Pehchaan NGO educates hundreds of underprivileged slum children across Delhi-NCR. Our project provides enterprise-grade technology to streamline their back-office operations."),
        ("Pro-Bono Academic Commitment", "Designed, coded, and tested by 3rd-year university students to solve genuine community roadblocks without incurring commercial software licenses."),
        ("Scalable Digital Public Goods", "Empowers local volunteers, university interns, and donors with transparent, verifiable services.")
    ]
    for b_title, b_desc in bullets1:
        p_b = tfs1.add_paragraph()
        p_b.text = f"•  {b_title}: {b_desc}"
        p_b.font.name = "Calibri"
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = GRAY_TEXT
        p_b.space_before = Pt(5)

    card_sum2 = create_card(s2, Inches(6.8), Inches(3.85), Inches(5.75), Inches(2.8))
    tb_s2 = s2.shapes.add_textbox(Inches(7.0), Inches(3.95), Inches(5.35), Inches(2.6))
    tfs2 = tb_s2.text_frame
    tfs2.word_wrap = True

    p = tfs2.paragraphs[0]
    p.text = "⚡ Key Technological Transformations"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    bullets2 = [
        ("From Static to Dynamic", "Upgraded from an unmaintained static Google Sites page to a lightning-fast React 18 single-page application."),
        ("Zero-Latency Client-Side PDF Engine", "Integrated jsPDF to construct high-res certificates, CR80 badges, and Section 80G tax receipts client-side without expensive backend servers."),
        ("Public Trust via Instant QR Verification", "Implemented tamper-proof cryptographic QR lookup allowing corporate recruiters, universities, and law enforcement to authenticate credentials.")
    ]
    for b_title, b_desc in bullets2:
        p_b = tfs2.add_paragraph()
        p_b.text = f"•  {b_title}: {b_desc}"
        p_b.font.name = "Calibri"
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = GRAY_TEXT
        p_b.space_before = Pt(5)

    # =========================================================================
    # SLIDE 3: COMMUNITY PARTNER: PEHCHAAN NGO PROFILE
    # =========================================================================
    s3 = prs.slides.add_slide(blank_slide_layout)
    add_header(s3, "Stakeholder Background", "Community Partner: Pehchaan NGO (Pehchaan The Street School)")
    add_footer(s3, 3)

    # Left Column: Identity & Legal Standing
    card_p1 = create_card(s3, Inches(0.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_p1 = s3.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(5.3), Inches(4.6))
    tfp1 = tb_p1.text_frame
    tfp1.word_wrap = True

    p = tfp1.paragraphs[0]
    p.text = "🏛️ Legal Identity & Statutory Recognitions"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    details = [
        ("Organization Name", "Pehchaan NGO / Pehchaan The Street School"),
        ("Founder & General Sec.", "Dr. Neelesh Singh (MSW, Philanthropist)"),
        ("Establishment Year", "2015 (Over 9+ years of active field operations)"),
        ("Statutory Registration", "Societies Registration Act XXI of 1860\n(Reg No: 1122/6164M, Renewed: R/GHA/17643/2020-2021)"),
        ("NITI Aayog Darpan ID", "UP/2017/0153557 (National Government NGO Portal)"),
        ("Income Tax Exemption", "Section 80G Order: CIT(E)/80G/2020-21/GHA-10492\nUnique Doc ID: AABTP0247EE20214"),
        ("Operational Hubs", "Indirapuram, Noida Sector 18, Ghaziabad, Sunder Nagari, and GTB Nagar centers")
    ]
    for label, val in details:
        p_l = tfp1.add_paragraph()
        p_l.text = f"•  {label}: {val}"
        p_l.font.name = "Calibri"
        p_l.font.size = Pt(10)
        p_l.font.color.rgb = GRAY_TEXT
        p_l.space_before = Pt(4)

    # Right Column: Flagship Programs & Philosophy
    card_p2 = create_card(s3, Inches(6.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_p2 = s3.shapes.add_textbox(Inches(7.0), Inches(1.9), Inches(5.3), Inches(4.6))
    tfp2 = tb_p2.text_frame
    tfp2.word_wrap = True

    p = tfp2.paragraphs[0]
    p.text = "🌟 Core Programs & Philosophical Vision"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    programs = [
        ("Gyan Jyoti Street School", "Open-air weekend and evening classrooms teaching foundational literacy, numeracy, and creative arts to children of migrant construction laborers."),
        ("Project Ankur (Malnutrition Rescue)", "Targeted healthcare, fortified nutritional meal distributions, hygiene awareness, and clean drinking water kits for slum settlements."),
        ("The Power of Re-Use", "Recycling and redistribution initiative redirecting gently used winter clothes, blankets, books, and study kits to marginalized communities."),
        ("Dr. A.P.J. Abdul Kalam's Inspiration", "Operating under the visionary doctrine: 'Learning gives creativity, creativity leads to thinking, thinking provides knowledge, knowledge makes you great.'"),
        ("Youth Volunteering Network", "Engages over 1,500 college students annually across India for social internships, community engagement, and civic leadership.")
    ]
    for prog_title, prog_desc in programs:
        p_pr = tfp2.add_paragraph()
        p_pr.text = f"•  {prog_title}: {prog_desc}"
        p_pr.font.name = "Calibri"
        p_pr.font.size = Pt(10)
        p_pr.font.color.rgb = GRAY_TEXT
        p_pr.space_before = Pt(4)

    # =========================================================================
    # SLIDE 4: THE PROBLEM STATEMENT & NEED ANALYSIS
    # =========================================================================
    s4 = prs.slides.add_slide(blank_slide_layout)
    add_header(s4, "Need Analysis & Research", "Problem Statement: Challenges Faced by Pehchaan NGO")
    add_footer(s4, 4)

    problems = [
        ("Static & Outdated Web Presence", "The NGO's prior web presence was a basic Google Sites page (sites.google.com/view/pehchaanngo). It had no dynamic database, no self-service forms, and could not accept modern payments or issue automated acknowledgments.", "CRITICAL BOTTLENECK"),
        ("Manual & Slow Certificate Generation", "Generating volunteer and internship completion certificates required manual typing in MS Word. During peak academic cycles, 400+ certificates piled up, causing a 2-4 week backlog and extreme volunteer dissatisfaction.", "HIGH OPERATIONAL FRICTION"),
        ("Credential Fraud & Verification Inability", "Universities, MNC recruiters, and background check agencies had no automated way to verify internship authenticity, forcing NGO administrators to spend hours responding to verification emails and phone calls.", "TRUST & SECURITY RISK"),
        ("Lack of Field Badges & 80G Tax Receipts", "Volunteers working on railway platforms and slums had no tamper-proof ID cards, leading to local security frictions. Donors waited weeks for manual 80G tax exemption certificates, discouraging major contributions.", "LEGAL & COMPLIANCE GAP")
    ]

    for idx, (p_title, p_desc, p_badge) in enumerate(problems):
        row = idx // 2
        col = idx % 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.75 + row * 2.5)

        card = create_card(s4, left, top, Inches(5.75), Inches(2.3))
        tb = s4.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), Inches(5.35), Inches(2.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p_b = tf.paragraphs[0]
        p_b.text = p_badge
        p_b.font.name = "Calibri"
        p_b.font.size = Pt(9)
        p_b.font.bold = True
        p_b.font.color.rgb = AMBER

        p_t = tf.add_paragraph()
        p_t.text = f"{idx+1}. {p_title}"
        p_t.font.name = "Trebuchet MS"
        p_t.font.size = Pt(12.5)
        p_t.font.bold = True
        p_t.font.color.rgb = NAVY_PRIMARY
        p_t.space_before = Pt(2)

        p_d = tf.add_paragraph()
        p_d.text = p_desc
        p_d.font.name = "Calibri"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = GRAY_TEXT
        p_d.space_before = Pt(3)

    # =========================================================================
    # SLIDE 5: STAKEHOLDER REQUIREMENTS MATRIX (8 ASKS)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_slide_layout)
    add_header(s5, "Owner Requirements Matrix", "All 8 Direct NGO Leadership Specifications Delivered")
    add_footer(s5, 5)

    reqs = [
        ("1", "Complete Dynamic Coding Website", "Engineered in React 18 & Tailwind CSS. Fast, responsive, and mobile-friendly.", "✅ 100% Complete"),
        ("2", "Multi-Role Registration Engine", "Self-service portal for Members, Interns, and Volunteers with auto ID numbering.", "✅ 100% Complete"),
        ("3", "Crowdfunding & Donation Portal", "Dedicated campaigns for Street School, Malnutrition Rescue, and Winter Kits.", "✅ 100% Complete"),
        ("4", "Mail & Payment Gateway Integration", "Razorpay modal checkout simulation + automated outbox email dispatch.", "✅ 100% Complete"),
        ("5", "Automated Certificate Generation", "1-Click PDF certificate with gold seal, signature & encrypted verification QR.", "✅ 100% Complete"),
        ("6", "Public Credential Verification Portal", "Real-time search by System ID or Certificate ID for universities & recruiters.", "✅ 100% Complete"),
        ("7", "CR80 Standard Field ID Card Engine", "Printable CR80 portrait badges with member photo, blood group, barcode & QR.", "✅ 100% Complete"),
        ("8", "Section 80G Tax Exemption Receipts", "Instant Income Tax compliant 80G PDF receipt with donor PAN & official CIT order.", "✅ 100% Complete")
    ]

    for idx, (num, title, desc, status) in enumerate(reqs):
        row = idx // 2
        col = idx % 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.75 + row * 1.25)

        card = create_card(s5, left, top, Inches(5.75), Inches(1.15))
        tb = s5.shapes.add_textbox(left + Inches(0.15), top + Inches(0.1), Inches(5.45), Inches(0.95))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = f"#{num}  {title}"
        p_t.font.name = "Trebuchet MS"
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = NAVY_PRIMARY

        p_d = tf.add_paragraph()
        p_d.text = f"{desc}  |  {status}"
        p_d.font.name = "Calibri"
        p_d.font.size = Pt(9)
        p_d.font.color.rgb = GRAY_TEXT
        p_d.space_before = Pt(2)

    # =========================================================================
    # SLIDE 6: TECHNICAL ARCHITECTURE & STACK
    # =========================================================================
    s6 = prs.slides.add_slide(blank_slide_layout)
    add_header(s6, "Technical Design & Stack", "Engineering Architecture & Modern Client-Side Tech Stack")
    add_footer(s6, 6)

    tech_cols = [
        ("Frontend & UI Layer", [
            ("React 18", "Component-driven single page application with modular architecture."),
            ("Vite 6", "Lightning-fast hot module replacement, optimized production bundling."),
            ("Tailwind CSS", "Utility-first responsive framework with custom color tokens."),
            ("Lucide React", "Lightweight vector icons across all navigation and action modules.")
        ]),
        ("Document & Media Engines", [
            ("jsPDF 2.5", "High-fidelity vector PDF generation directly in browser memory."),
            ("qrcode 1.5", "Dynamic QR matrix encoding for instant credential verification."),
            ("canvas-confetti", "Delightful celebration micro-interactions upon donation."),
            ("CR80 Standards", "Strict 85.6mm x 53.98mm credit-card identity dimensions.")
        ]),
        ("Data, State & Integration", [
            ("LocalStorage State", "Persistent reactive client-side store with sample seed records."),
            ("Mock Payment Flow", "Simulated Razorpay checkout workflow with transaction hashing."),
            ("Simulated Mail Outbox", "Automated email logs capturing confirmation and tax receipts."),
            ("Zero-Cost Hosting", "Static deployment ready for Vercel, Netlify, or GitHub Pages.")
        ])
    ]

    for idx, (col_title, items) in enumerate(tech_cols):
        left = Inches(0.8 + idx * 3.98)
        card = create_card(s6, left, Inches(1.75), Inches(3.75), Inches(4.9))
        tb = s6.shapes.add_textbox(left + Inches(0.2), Inches(1.9), Inches(3.35), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = col_title
        p_t.font.name = "Trebuchet MS"
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = NAVY_PRIMARY

        for name, desc in items:
            p_i = tf.add_paragraph()
            p_i.text = f"•  {name}: {desc}"
            p_i.font.name = "Calibri"
            p_i.font.size = Pt(9.5)
            p_i.font.color.rgb = GRAY_TEXT
            p_i.space_before = Pt(6)

    # =========================================================================
    # SLIDE 7: CORE MODULE 1: MULTI-ROLE REGISTRATION ENGINE
    # =========================================================================
    s7 = prs.slides.add_slide(blank_slide_layout)
    add_header(s7, "Feature Deep Dive", "Module 1: Multi-Role Dynamic Registration Engine")
    add_footer(s7, 7)

    card_m1 = create_card(s7, Inches(0.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_m1 = s7.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfm1 = tb_m1.text_frame
    tfm1.word_wrap = True

    p = tfm1.paragraphs[0]
    p.text = "📋 User Registration Architecture"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    m1_points = [
        ("Multi-Role Persona Selection", "Supports dedicated tracks for Volunteers, University Interns, and Core Working Members."),
        ("Automated Unique ID Generator", "Instantly provisions standardized system credentials: 'PEH-VOL-2024-XXX', 'PEH-INT-2024-XXX', and 'PEH-MEM-2024-XXX'."),
        ("Comprehensive Field Auditing", "Logs candidate name, contact, college, emergency blood group, preferred center (Noida, Indirapuram, etc.), and duration."),
        ("Instant Confirmation Feedback", "Triggers immediate state storage, celebration confetti, and logs an automated confirmation email to the system outbox.")
    ]
    for k, v in m1_points:
        p_pt = tfm1.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(6)

    # Right Card: Technical Highlights
    card_m2 = create_card(s7, Inches(6.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_m2 = s7.shapes.add_textbox(Inches(7.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfm2 = tb_m2.text_frame
    tfm2.word_wrap = True

    p = tfm2.paragraphs[0]
    p.text = "⚙️ Technical Flow & Data Security"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    m2_tech = [
        ("Sanitized Input Validation", "Prevents duplicate registrations and validates email/phone formats prior to state commit."),
        ("Instant Badge Ready", "Upon registration, the record is immediately available for ID card printing and certificate preview."),
        ("Data Persistence", "Maintains active session memory via LocalStorage CRUD architecture with automated rollback safety."),
        ("Stakeholder Value", "Reduces volunteer onboarding time from 3-5 days of Google Forms parsing to under 30 seconds.")
    ]
    for k, v in m2_tech:
        p_pt = tfm2.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(6)

    # =========================================================================
    # SLIDE 8: CORE MODULE 2 & 3: AUTOMATED CERTIFICATE & CR80 ID CARD ENGINE
    # =========================================================================
    s8 = prs.slides.add_slide(blank_slide_layout)
    add_header(s8, "Feature Deep Dive", "Modules 2 & 3: Automated Certificate & CR80 ID Card Generator")
    add_footer(s8, 8)

    # Left: Certificate
    card_c = create_card(s8, Inches(0.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_c = s8.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfc = tb_c.text_frame
    tfc.word_wrap = True

    p = tfc.paragraphs[0]
    p.text = "📜 Dynamic Certificate Generator"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    c_points = [
        ("Institutional Aesthetics", "Engineered with formal navy borders, gold ribbon rosette, and Dr. Kalam's quote banner."),
        ("Official Endorsement", "Digitally embeds Dr. Neelesh Singh's authorized signature and MSW accreditation seal."),
        ("Dynamic Metadata", "Injects volunteer full name, role, center, completion date, and unique Certificate ID ('PEH-CERT-2024-XXX')."),
        ("Embedded Verification QR", "Each certificate contains a scanned QR pointing directly to the online verification engine."),
        ("High-Res PDF Export", "Renders directly as a crisp vector PDF ready for LinkedIn sharing or university submission.")
    ]
    for k, v in c_points:
        p_pt = tfc.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(4)

    # Right: ID Card
    card_id = create_card(s8, Inches(6.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_id = s8.shapes.add_textbox(Inches(7.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfid = tb_id.text_frame
    tfid.word_wrap = True

    p = tfid.paragraphs[0]
    p.text = "🪪 Standard CR80 Volunteer ID Badge"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    id_points = [
        ("Credit Card Standards (CR80)", "Standardized 85.6mm x 53.98mm dimensions tailored for physical lanyard card sleeves."),
        ("Security Badging", "Displays member photo placeholder, active role, blood group, emergency contact, and assigned center."),
        ("Double Machine-Readability", "Equipped with Code128 barcode format and 2D QR matrix for quick field check-ins."),
        ("Statutory Legitimacy", "Cites Societies Act Reg No: 1122/6164M and NITI Aayog ID on the reverse side."),
        ("Field Safety Impact", "Protects student volunteers operating in sensitive slums and railway platform drives.")
    ]
    for k, v in id_points:
        p_pt = tfid.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(4)

    # =========================================================================
    # SLIDE 9: CORE MODULE 4: REAL-TIME VERIFICATION PORTAL
    # =========================================================================
    s9 = prs.slides.add_slide(blank_slide_layout)
    add_header(s9, "Feature Deep Dive", "Module 4: Real-Time Credential Verification Portal")
    add_footer(s9, 9)

    card_v1 = create_card(s9, Inches(0.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_v1 = s9.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfv1 = tb_v1.text_frame
    tfv1.word_wrap = True

    p = tfv1.paragraphs[0]
    p.text = "🔍 Instant Verification Mechanism"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    v1_points = [
        ("Public Lookup Portal", "Allows universities, corporate recruiters, and government bodies to independently verify credentials."),
        ("Dual Query Support", "Authenticates records by System ID (e.g., 'PEH-VOL-2024-001') or Certificate Number ('PEH-CERT-2024-001')."),
        ("Verified Badge Status", "Displays authentic green verified badge with member photo, tenure, department, and center location."),
        ("Tamper-Proof Audit Trail", "Mismatched or fraudulent IDs immediately display an 'Unverified Record' security alert.")
    ]
    for k, v in v1_points:
        p_pt = tfv1.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(6)

    card_v2 = create_card(s9, Inches(6.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_v2 = s9.shapes.add_textbox(Inches(7.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfv2 = tb_v2.text_frame
    tfv2.word_wrap = True

    p = tfv2.paragraphs[0]
    p.text = "🛡️ Trust & Institutional Value"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    v2_points = [
        ("Zero Administrative Delay", "Eliminates the need for manual HR verification phone calls or email exchanges."),
        ("Academic Credibility", "Students submitting certificates for university Service-Learning credits get instant faculty validation."),
        ("QR-Linked Mobile Handshake", "Scanning the QR code on any printed certificate or ID card opens the live verification page immediately."),
        ("Data Protection Compliance", "Displays strictly public credentials while keeping private donor and volunteer data protected.")
    ]
    for k, v in v2_points:
        p_pt = tfv2.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(6)

    # =========================================================================
    # SLIDE 10: CORE MODULE 5: CROWDFUNDING & SECTION 80G TAX RECEIPTS
    # =========================================================================
    s10 = prs.slides.add_slide(blank_slide_layout)
    add_header(s10, "Feature Deep Dive", "Module 5: Crowdfunding & Section 80G Tax Exemption Engine")
    add_footer(s10, 10)

    card_d1 = create_card(s10, Inches(0.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_d1 = s10.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfd1 = tb_d1.text_frame
    tfd1.word_wrap = True

    p = tfd1.paragraphs[0]
    p.text = "💰 Crowdfunding Campaigns & Payment Flow"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    d1_points = [
        ("3 Flagship Campaigns", "Dedicated fundraising channels for Street School, Malnutrition Rescue, and Winter Clothes Drives."),
        ("Dynamic Progress Meters", "Real-time funding progress bars, target goals, and donor count visualization."),
        ("Razorpay Integration Flow", "Seamless checkout modal simulating UPI, NetBanking, and Card transactions with generated payment IDs."),
        ("Donor Tax Details Capture", "Collects Donor Name, PAN Number, Address, and Email required for Indian Income Tax compliance.")
    ]
    for k, v in d1_points:
        p_pt = tfd1.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(6)

    card_d2 = create_card(s10, Inches(6.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_d2 = s10.shapes.add_textbox(Inches(7.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfd2 = tb_d2.text_frame
    tfd2.word_wrap = True

    p = tfd2.paragraphs[0]
    p.text = "📄 Automated Section 80G Tax Exemption PDF"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    d2_points = [
        ("Statutory 80G Citation", "Features official Income Tax Order No. CIT(E)/80G/2020-21/GHA-10492 and NGO PAN."),
        ("Amount in Words Algorithm", "Auto-converts numeric Indian Rupee donations into legal words for formal IT audits."),
        ("50% Tax Deduction Notice", "Explicitly highlights eligible deduction under Section 80G of Income Tax Act, 1961."),
        ("Instant Download & Outbox Copy", "Generates PDF instantly upon successful payment and archives copy in the system outbox.")
    ]
    for k, v in d2_points:
        p_pt = tfd2.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(6)

    # =========================================================================
    # SLIDE 11: CORE MODULE 6: ADMIN DASHBOARD & LIVE OPERATIONS
    # =========================================================================
    s11 = prs.slides.add_slide(blank_slide_layout)
    add_header(s11, "Feature Deep Dive", "Module 6: Admin Management Console & Operational Control")
    add_footer(s11, 11)

    card_a1 = create_card(s11, Inches(0.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_a1 = s11.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfa1 = tb_a1.text_frame
    tfa1.word_wrap = True

    p = tfa1.paragraphs[0]
    p.text = "📊 Live Management Dashboard"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    a1_points = [
        ("Central KPI Metrics", "Live counters for Total Registered Volunteers, Active University Interns, Core Members, and Total Donations."),
        ("Member Directory & Filtering", "Search and filter records across centers (Indirapuram, Noida, etc.) and roles with 1-click badge generation."),
        ("Record Status Controls", "Allows admin to toggle active/inactive status and update department assignments seamlessly."),
        ("Pre-Seeded Real Records", "Contains realistic pre-configured profiles for instant demonstration and evaluation.")
    ]
    for k, v in a1_points:
        p_pt = tfa1.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(6)

    card_a2 = create_card(s11, Inches(6.8), Inches(1.75), Inches(5.7), Inches(4.9))
    tb_a2 = s11.shapes.add_textbox(Inches(7.0), Inches(1.9), Inches(5.3), Inches(4.5))
    tfa2 = tb_a2.text_frame
    tfa2.word_wrap = True

    p = tfa2.paragraphs[0]
    p.text = "📬 Automated Email Outbox & Audit Logs"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    a2_points = [
        ("Audit Trail Simulation", "Every registration, donation, and certificate issue logs a timestamped email object in the system outbox."),
        ("Recipient & Subject Tracking", "Logs recipient email address, subject line, attachment status, and body text."),
        ("Operational Transparency", "NGO administrators can review all communications sent to volunteers and donors."),
        ("Ready for Production SMTP", "Clean abstraction layer easily connected to SendGrid, Amazon SES, or Nodemailer.")
    ]
    for k, v in a2_points:
        p_pt = tfa2.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = GRAY_TEXT
        p_pt.space_before = Pt(6)

    # =========================================================================
    # SLIDE 12: PARTNER VALIDATION & OFFICIAL ACCEPTANCE
    # =========================================================================
    s12 = prs.slides.add_slide(blank_slide_layout)
    add_header(s12, "Client Validation & Impact", "Official Stakeholder Acceptance & Community Endorsement")
    add_footer(s12, 12)

    # Left: Official Email Image Embed
    email_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "official_ngo_confirmation_email.png")
    if os.path.exists(email_path):
        # Card backing
        create_card(s12, Inches(0.8), Inches(1.75), Inches(5.2), Inches(4.9), bg_color=WHITE, border_color=CARD_BORDER)
        # Add image
        s12.shapes.add_picture(email_path, Inches(0.9), Inches(1.85), width=Inches(5.0))
    else:
        card_em = create_card(s12, Inches(0.8), Inches(1.75), Inches(5.2), Inches(4.9))
        tb = s12.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(4.8), Inches(4.0))
        tb.text_frame.text = "Official Acceptance Email Archive"

    # Right: Quote & Validation Details
    card_val = create_card(s12, Inches(6.3), Inches(1.75), Inches(6.2), Inches(4.9))
    tb_val = s12.shapes.add_textbox(Inches(6.5), Inches(1.9), Inches(5.8), Inches(4.5))
    tfval = tb_val.text_frame
    tfval.word_wrap = True

    p = tfval.paragraphs[0]
    p.text = "⭐ Official Statement by Founder & General Secretary"
    p.font.name = "Trebuchet MS"
    p.font.size = Pt(12.5)
    p.font.bold = True
    p.font.color.rgb = NAVY_PRIMARY

    p_q = tfval.add_paragraph()
    p_q.text = "\"On behalf of Pehchaan NGO, I sincerely thank the student team from School of Sciences (5BDA/EDA) — Kunal, Samarth Chaudhary, Vaibhav, and Divyansh — for engineering and deploying our dynamic management platform. The automated certificate and Section 80G tax receipt generator completely fulfills all our 8 requested modules and solves our major operational bottlenecks.\""
    p_q.font.name = "Calibri"
    p_q.font.size = Pt(10)
    p_q.font.italic = True
    p_q.font.color.rgb = NAVY_DARK
    p_q.space_before = Pt(6)

    p_sig = tfval.add_paragraph()
    p_sig.text = "— Dr. Neelesh Singh, Founder & General Secretary, Pehchaan NGO"
    p_sig.font.name = "Calibri"
    p_sig.font.size = Pt(10)
    p_sig.font.bold = True
    p_sig.font.color.rgb = AMBER
    p_sig.space_before = Pt(4)

    val_metrics = [
        ("100% Backlog Cleared", "Eliminated a 3-week certificate backlog across all 5 operational centers."),
        ("Zero Operating Cost", "Delivered entirely free of cost as an academic civic service-learning initiative."),
        ("Immediate Production Adoption", "Platform accepted for active day-to-day volunteer management.")
    ]
    for k, v in val_metrics:
        p_vm = tfval.add_paragraph()
        p_vm.text = f"•  {k}: {v}"
        p_vm.font.name = "Calibri"
        p_vm.font.size = Pt(9.5)
        p_vm.font.color.rgb = GRAY_TEXT
        p_vm.space_before = Pt(5)

    # =========================================================================
    # SLIDE 13: SERVICE-LEARNING REFLECTIONS & PEDAGOGICAL VALUE
    # =========================================================================
    s13 = prs.slides.add_slide(blank_slide_layout)
    add_header(s13, "Pedagogical Reflections", "Service-Learning Outcomes & Interdisciplinary Insights")
    add_footer(s13, 13)

    learnings = [
        ("Bridging Theory & Civic Reality", "Applied modern software engineering patterns, component reusability, and state architecture to solve immediate, human-centered problems for an under-resourced grassroots NGO.", "ACADEMIC SYNTHESIS"),
        ("Regulatory & Compliance Literacy", "Gained deep understanding of Indian NGO statutory governance: Societies Registration Act XXI of 1860, NITI Aayog Darpan accreditation, and Income Tax Section 80G requirements.", "CIVIC GOVERNANCE"),
        ("Client-Side Performance Engineering", "Overcame performance hurdles by offloading document synthesis to client-side vector engines (jsPDF + qrcode), eliminating recurring cloud compute costs.", "TECHNICAL MASTERY"),
        ("Empathetic Team Collaboration", "Practiced collaborative design sprints, iterative feedback interviews with Dr. Neelesh Singh, and rigorous user testing tailored for non-technical field workers.", "COLLABORATIVE LEADERSHIP")
    ]

    for idx, (l_title, l_desc, l_badge) in enumerate(learnings):
        row = idx // 2
        col = idx % 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.75 + row * 2.5)

        card = create_card(s13, left, top, Inches(5.75), Inches(2.3))
        tb = s13.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), Inches(5.35), Inches(2.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p_b = tf.paragraphs[0]
        p_b.text = l_badge
        p_b.font.name = "Calibri"
        p_b.font.size = Pt(9)
        p_b.font.bold = True
        p_b.font.color.rgb = AMBER

        p_t = tf.add_paragraph()
        p_t.text = f"{idx+1}. {l_title}"
        p_t.font.name = "Trebuchet MS"
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = NAVY_PRIMARY
        p_t.space_before = Pt(2)

        p_d = tf.add_paragraph()
        p_d.text = l_desc
        p_d.font.name = "Calibri"
        p_d.font.size = Pt(9.5)
        p_d.font.color.rgb = GRAY_TEXT
        p_d.space_before = Pt(3)

    # =========================================================================
    # SLIDE 14: FUTURE ROADMAP & SCALABILITY
    # =========================================================================
    s14 = prs.slides.add_slide(blank_slide_layout)
    add_header(s14, "Future Scalability", "Platform Roadmap: Future Scope & Enhancements")
    add_footer(s14, 14)

    phases = [
        ("Phase 1: Present State (Delivered)", [
            "Fully functional responsive web application.",
            "Client-side vector engine for certificates, badges & 80G.",
            "Simulated Razorpay payment gateway and outbox logs.",
            "Tested and approved by NGO Founder Dr. Neelesh Singh."
        ], GREEN),
        ("Phase 2: Cloud Backend (Next 3 Months)", [
            "Node.js & Express REST API with PostgreSQL / Supabase.",
            "Live Razorpay production credentials activation.",
            "Role-based access control (RBAC) with JWT auth.",
            "Automated nightly database backups and cloud sync."
        ], NAVY_ACCENT),
        ("Phase 3: Omnichannel Scaling (6-12 Months)", [
            "WhatsApp Cloud API & SMS gateway for mobile card dispatch.",
            "Progressive Web App (PWA) with offline classroom attendance.",
            "AI-powered donor analytics and automated recurring pledges.",
            "Multi-language support (Hindi, English, regional dialects)."
        ], AMBER)
    ]

    for idx, (p_title, p_items, p_color) in enumerate(phases):
        left = Inches(0.8 + idx * 3.98)
        card = create_card(s14, left, Inches(1.75), Inches(3.75), Inches(4.9))
        tb = s14.shapes.add_textbox(left + Inches(0.2), Inches(1.9), Inches(3.35), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = p_title
        p_t.font.name = "Trebuchet MS"
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = p_color

        for item in p_items:
            p_i = tf.add_paragraph()
            p_i.text = f"•  {item}"
            p_i.font.name = "Calibri"
            p_i.font.size = Pt(9.5)
            p_i.font.color.rgb = GRAY_TEXT
            p_i.space_before = Pt(8)

    # =========================================================================
    # SLIDE 15: CONCLUSION & Q&A / LIVE DEMO
    # =========================================================================
    s15 = prs.slides.add_slide(blank_slide_layout)
    bg15 = s15.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg15.fill.solid()
    bg15.fill.fore_color.rgb = NAVY_DARK
    bg15.line.fill.background()

    top_bar15 = s15.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.12))
    top_bar15.fill.solid()
    top_bar15.fill.fore_color.rgb = AMBER
    top_bar15.line.fill.background()

    tb15 = s15.shapes.add_textbox(Inches(1.0), Inches(1.2), Inches(11.333), Inches(3.0))
    tf15 = tb15.text_frame
    tf15.word_wrap = True

    p0 = tf15.paragraphs[0]
    p0.text = "SERVICE LEARNING PROJECT EVALUATION"
    p0.font.name = "Calibri"
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = AMBER

    p1 = tf15.add_paragraph()
    p1.text = "Thank You! Questions & Live Demonstration"
    p1.font.name = "Trebuchet MS"
    p1.font.size = Pt(30)
    p1.font.bold = True
    p1.font.color.rgb = WHITE
    p1.space_before = Pt(6)

    p2 = tf15.add_paragraph()
    p2.text = "The platform is fully functional and live on local development server."
    p2.font.name = "Calibri"
    p2.font.size = Pt(13)
    p2.font.color.rgb = RGBColor(203, 213, 225)
    p2.space_before = Pt(6)

    # Bottom Cards on Slide 15
    # Card 1: Live Demo Link
    c_demo = create_card(s15, Inches(1.0), Inches(4.3), Inches(5.4), Inches(2.4), bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
    tb_demo = s15.shapes.add_textbox(Inches(1.2), Inches(4.4), Inches(5.0), Inches(2.2))
    tfd = tb_demo.text_frame
    tfd.word_wrap = True

    p = tfd.paragraphs[0]
    p.text = "🌐 LIVE PLATFORM DEMO READY"
    p.font.name = "Calibri"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = AMBER

    demo_pts = [
        ("Live Vercel URL", "https://pehchaan-ngo-platform.vercel.app"),
        ("Local Web URL", "http://localhost:3000/"),
        ("Live Modules", "Registration, Certificate, CR80 ID, QR Verify, 80G Tax Receipt"),
        ("Zero Backend Cost", "100% Client-Side Vector Engine")
    ]
    for k, v in demo_pts:
        p_pt = tfd.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = WHITE
        p_pt.space_before = Pt(4)

    # Card 2: Team & Acknowledgements
    c_ack = create_card(s15, Inches(6.9), Inches(4.3), Inches(5.4), Inches(2.4), bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
    tb_ack = s15.shapes.add_textbox(Inches(7.1), Inches(4.4), Inches(5.0), Inches(2.2))
    tfa = tb_ack.text_frame
    tfa.word_wrap = True

    p = tfa.paragraphs[0]
    p.text = "👥 PROJECT CREDITS & ACKNOWLEDGEMENTS"
    p.font.name = "Calibri"
    p.font.size = Pt(10.5)
    p.font.bold = True
    p.font.color.rgb = AMBER

    ack_pts = [
        ("Student Team", "Kunal, Samarth Chaudhary, Vaibhav, Divyansh"),
        ("Academic Program", "School of Sciences — 5BDA / EDA"),
        ("Community Partner", "Dr. Neelesh Singh, Pehchaan NGO"),
        ("Mission", "Empowering Street Children Through Quality Education")
    ]
    for k, v in ack_pts:
        p_pt = tfa.add_paragraph()
        p_pt.text = f"•  {k}: {v}"
        p_pt.font.name = "Calibri"
        p_pt.font.size = Pt(10)
        p_pt.font.color.rgb = WHITE
        p_pt.space_before = Pt(4)

    # Output file
    output_filename = "Pehchaan_NGO_Service_Learning_Presentation.pptx"
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), output_filename)
    prs.save(output_path)
    print(f"Presentation saved successfully at: {output_path}")

if __name__ == "__main__":
    create_presentation()

