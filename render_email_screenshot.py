import os
from playwright.sync_api import sync_playwright

html = '''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #202124;
    background: #ffffff;
    margin: 0;
    padding: 36px 48px;
    width: 780px;
    box-sizing: border-box;
  }
  .header-logo {
    margin-bottom: 8px;
  }
  .header-logo img {
    height: 38px;
  }
  .divider-top {
    border-bottom: 1px solid #dadce0;
    margin-bottom: 20px;
  }
  .subject {
    font-size: 21px;
    font-weight: 700;
    color: #202124;
    margin-bottom: 4px;
    letter-spacing: -0.2px;
  }
  .msg-count {
    color: #5f6368;
    font-size: 13px;
    margin-bottom: 16px;
  }
  .divider-mid {
    border-bottom: 1px solid #dadce0;
    margin-bottom: 18px;
  }
  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 14px;
    margin-bottom: 4px;
  }
  .sender {
    font-weight: 700;
    color: #202124;
  }
  .sender-email {
    font-weight: normal;
    color: #5f6368;
  }
  .date {
    color: #202124;
    font-size: 13.5px;
  }
  .cc-row {
    font-size: 13px;
    color: #202124;
    margin-bottom: 24px;
  }
  .body-content {
    font-size: 14.5px;
    line-height: 1.6;
    color: #202124;
  }
  .body-content p {
    margin: 0 0 16px 0;
  }
  .student-list {
    margin: 12px 0 18px 0;
    padding-left: 0;
    list-style-type: none;
  }
  .student-list li {
    margin-bottom: 5px;
    font-weight: 500;
  }
  .sign-off {
    margin-top: 24px;
    font-size: 14.5px;
    line-height: 1.5;
  }
  .contact-info {
    margin-top: 16px;
    font-size: 13.5px;
    line-height: 1.5;
  }
  .contact-info a {
    color: #1a73e8;
    text-decoration: none;
  }
</style>
</head>
<body>
  <div class="header-logo">
    <img src="extracted_pdf_img_0.png" alt="Gmail Logo">
  </div>
  <div class="divider-top"></div>
  
  <div class="subject">Confirmation of Student Project Work with Pehchaan NGO</div>
  <div class="msg-count">1 message</div>
  <div class="divider-mid"></div>

  <div class="meta-row">
    <div class="sender">Pehchaan NGO <span class="sender-email">&lt;ngo.pehchaan@gmail.com&gt;</span></div>
    <div class="date">Fri, 2 Oct, 2026 at 11:49 pm</div>
  </div>
  <div class="cc-row">
    Cc: neha.saini@christuniversity.in, samarth.chaudhary@bscdsaih.christuniversity.in
  </div>

  <div class="body-content">
    <p>Respected Mam/Sir,</p>
    <p>I am writing to you on behalf of Pehchaan NGO to formally confirm that a group of your students is currently volunteering with our organization.</p>
    <p>The following students are actively working under our guidance to design and develop a website for our NGO, completely free of cost. We highly appreciate their initiative and the technical skills they are contributing to support our cause.</p>
    <p>The students involved in this project are:</p>
    <ul class="student-list">
      <li>* Samarth Chaudhary (Roll No: 24215221)</li>
      <li>* Vaibhav (Roll No: 24215227)</li>
      <li>* Divyansh (Roll No: 24215229)</li>
      <li>* Kunal (Roll No: 24215215)</li>
    </ul>
    <p>We are very grateful for their dedication and hard work. Please feel free to reach out if you require any further information or formal documentation regarding their association with Pehchaan NGO.</p>
    
    <div class="sign-off">
      Sincerely,<br><br>
      [<br><br>
      Thank You,<br><br>
      With regards,<br><br>
      <strong>Neelesh Singh</strong><br>
      MD / Treasurer<br>
      Pehchaan NGO
    </div>

    <div class="contact-info">
      Mob: +91 9457320905<br>
      Email: <a href="mailto:ngo.pehchaan@gmail.com">ngo.pehchaan@gmail.com</a><br><br>
      Head office: 274/06 Charan Singh Colony Sector 12 Pratap Vihar Ghaziabad ( UP ) Pin No 201009
    </div>
  </div>
</body>
</html>'''

with open('email_render.html', 'w', encoding='utf-8') as f:
    f.write(html)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 860, 'height': 1150}, device_scale_factor=2)
    page.goto('file:///' + os.path.abspath('email_render.html'))
    page.wait_for_timeout(500)
    page.screenshot(path='official_ngo_confirmation_email.png', full_page=True)
    browser.close()

print('Rendered official_ngo_confirmation_email.png successfully:', os.path.getsize('official_ngo_confirmation_email.png'))
