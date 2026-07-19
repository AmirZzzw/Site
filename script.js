/* ===== script.js ===== */
/* فقط تغییر رنگ تم روشن - بقیه دست‌نخورده */

const SITE_URL = "https://sidkashop.qzz.io";
const SPAM_TIME = 60 * 1000;
const FETCH_TIMEOUT = 120000;
const MAX_RETRIES = 3;

function generateTrackingCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getCurrentTheme() {
  return document.body.classList.contains('dark') ? 'dark' : 'light';
}

function openPaymentPage(productName, price) {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  const trackingCode = generateTrackingCode();
  const theme = getCurrentTheme();

  w.document.open();
  w.document.write(`<!DOCTYPE html>
<html lang="fa" dir="rtl" class="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>پرداخت | ${productName}</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f7f5f2;
      --card: #ffffff;
      --soft: #f0ebe5;
      --text: #1e1a17;
      --muted: #4f4640;
      --light: #7a6e64;
      --border: #e9e3db;
      --border-dark: #d6cdc1;
      --accent: #b68b7c;
      --accent-glow: #c9a063;
      --accent-light: #d4c4b8;
      --btn-bg: #1e1a17;
      --btn-text: #f5f2ed;
      --success: #3FA9A0;
      --error: #c0392b;
      --warning: #b68b7c;
      --shadow: 0 4px 24px rgba(0,0,0,0.06);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.08);
    }

    html.dark {
      --bg: #0A0D12;
      --card: #12161D;
      --soft: #1A2029;
      --text: #ECE9E2;
      --muted: #99A1AF;
      --light: #5C6472;
      --border: #262D3A;
      --border-dark: #262D3A;
      --accent: #C9A063;
      --accent-glow: #D9B47C;
      --accent-light: #D9B47C;
      --btn-bg: #C9A063;
      --btn-text: #14110A;
      --success: #3FA9A0;
      --error: #e74c3c;
      --warning: #D9B47C;
      --shadow: 0 20px 60px rgba(0,0,0,.4);
      --shadow-lg: 0 20px 60px rgba(0,0,0,.4);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; outline: none !important; -webkit-tap-highlight-color: transparent !important; }

    body {
      font-family: 'Vazirmatn', sans-serif;
      background: var(--bg);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: var(--text);
      transition: background 0.3s, color 0.3s;
    }

    .card {
      width: 100%;
      max-width: 460px;
      background: var(--card);
      padding: 30px 25px;
      border-radius: 20px;
      box-shadow: var(--shadow-lg), 0 0 0 1px var(--border);
      transition: background 0.3s, box-shadow 0.3s;
    }

    h3 { text-align: center; margin: 0 0 5px; color: var(--text); font-size: 18px; }

    .price {
      text-align: center;
      margin: 8px 0 20px;
      font-size: 26px;
      color: var(--accent);
      font-weight: bold;
      font-family: 'JetBrains Mono', monospace;
    }

    .price span { font-size: 13px; color: var(--muted); font-weight: normal; font-family: 'Vazirmatn', sans-serif; }

    .vpn-notice {
      background: linear-gradient(135deg, rgba(182,139,124,.12), rgba(182,139,124,.06));
      border: 1px solid rgba(182,139,124,.25);
      border-radius: 12px;
      padding: 12px 16px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 12px;
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      animation: glow 2s ease-in-out infinite;
    }

    html.dark .vpn-notice {
      background: linear-gradient(135deg, rgba(201,160,99,.15), rgba(140,116,74,.12));
      border: 1px solid rgba(201,160,99,.3);
      color: var(--accent-glow);
    }

    .vpn-notice .icon {
      font-size: 20px;
      animation: bounce 1s ease-in-out infinite;
    }

    .vpn-notice .text {
      line-height: 1.6;
    }

    .vpn-notice .highlight {
      color: var(--accent);
      font-weight: bold;
      background: rgba(182,139,124,.15);
      padding: 2px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }

    html.dark .vpn-notice .highlight {
      background: rgba(201,160,99,.2);
    }

    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px rgba(182,139,124,.15), 0 0 10px rgba(182,139,124,.08); }
      50% { box-shadow: 0 0 15px rgba(182,139,124,.3), 0 0 25px rgba(182,139,124,.15); }
    }

    html.dark { 
      --glow-1: rgba(201,160,99,.2);
      --glow-2: rgba(201,160,99,.1);
      --glow-3: rgba(201,160,99,.4);
      --glow-4: rgba(201,160,99,.2);
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .bank {
      background: var(--soft);
      padding: 15px;
      border-radius: 14px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 12px;
      color: var(--muted);
      line-height: 2;
      border: 1px solid var(--border);
      border-right: 3px solid var(--accent);
      transition: background 0.3s;
    }

    .card-number {
      font-size: 18px;
      color: var(--text);
      letter-spacing: 2px;
      font-family: 'JetBrains Mono', monospace;
      direction: ltr;
      display: inline-block;
      background: var(--bg);
      padding: 6px 14px;
      border-radius: 8px;
      margin: 6px 0;
    }

    .upload-area {
      border: 2px dashed var(--border-dark);
      border-radius: 14px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      margin-bottom: 15px;
      transition: all .3s;
      background: var(--soft);
      min-height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }

    .upload-area:hover { border-color: var(--accent); }

    .upload-area.has-file {
      border-color: var(--success);
      border-style: solid;
      background: rgba(63, 169, 160, 0.06);
    }

    .upload-icon { font-size: 32px; transition: transform 0.3s; }
    .upload-area:hover .upload-icon { transform: translateY(-3px); }
    .upload-text { font-size: 13px; color: var(--muted); }
    .file-name { font-size: 11px; color: var(--accent); word-break: break-all; font-weight: 500; }
    .file-size { font-size: 10px; color: var(--muted); }

    .upload-area input { display: none; }

    input, textarea {
      width: 100%;
      margin-top: 10px;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1.5px solid var(--border-dark);
      font-family: 'Vazirmatn', sans-serif;
      font-size: 13px;
      background: var(--card);
      color: var(--text);
      transition: all 0.2s;
    }

    html.dark input, html.dark textarea {
      background: var(--soft);
    }

    input::placeholder, textarea::placeholder { color: var(--light); }
    input:focus, textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(182,139,124,.08); }
    html.dark input:focus, html.dark textarea:focus { box-shadow: 0 0 0 3px rgba(201,160,99,.1); }
    textarea { resize: none; height: 70px; }

    .send-btn {
      width: 100%;
      margin-top: 18px;
      padding: 14px;
      border: none;
      border-radius: 14px;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 15px;
      font-weight: bold;
      background: var(--btn-bg);
      color: var(--btn-text);
      cursor: pointer;
      transition: all .3s;
    }

    html.dark .send-btn {
      background: linear-gradient(135deg, var(--accent), var(--accent-glow));
    }

    .send-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(182,139,124, 0.25); }
    html.dark .send-btn:hover:not(:disabled) { box-shadow: 0 6px 20px rgba(201, 160, 99, 0.3); }
    .send-btn:disabled { opacity: 0.7; cursor: not-allowed; }

    .progress-container {
      margin-top: 15px;
      display: none;
      background: var(--soft);
      padding: 15px;
      border-radius: 12px;
      border: 1px solid var(--border);
      transition: background 0.3s;
    }

    .progress-container.active { display: block; animation: slideDown 0.3s ease; }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 11px;
    }

    .progress-percent { color: var(--accent); font-weight: bold; font-size: 16px; font-family: 'JetBrains Mono', monospace; }
    .progress-info { color: var(--muted); font-size: 12px; }

    .progress-bar-outer {
      height: 6px;
      background: var(--card);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    html.dark .progress-bar-outer {
      background: var(--bg);
    }

    .progress-bar-inner {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), var(--accent-light));
      border-radius: 10px;
      width: 0%;
      transition: width 0.3s;
      position: relative;
    }

    html.dark .progress-bar-inner {
      background: linear-gradient(90deg, var(--accent), var(--accent-glow));
    }

    .progress-bar-inner::after {
      content: '';
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 20px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      filter: blur(4px);
    }

    .progress-details {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: var(--muted);
      flex-wrap: wrap;
      gap: 4px;
    }

    #status {
      text-align: center;
      margin-top: 12px;
      font-size: 12px;
      min-height: 18px;
      color: var(--muted);
    }

    #status.error { color: var(--error); }
    #status.warning { color: var(--warning); }
    #status.success { color: var(--success); }

    .retry-info {
      background: rgba(192, 57, 43, 0.08);
      border: 1px solid rgba(192, 57, 43, 0.25);
      border-radius: 10px;
      padding: 10px 14px;
      margin-top: 10px;
      font-size: 11px;
      color: var(--error);
      text-align: center;
      line-height: 1.8;
      display: none;
      animation: slideDown 0.3s ease;
    }

    html.dark .retry-info {
      background: rgba(231, 76, 60, 0.1);
      border: 1px solid rgba(231, 76, 60, 0.3);
      color: #e74c3c;
    }

    .retry-info.show { display: block; }
    .retry-info b { color: var(--accent); }

    /* Success Page */
    .success-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
      overflow: hidden;
    }

    html.dark .success-overlay {
      background: linear-gradient(135deg, #0A0D12 0%, #12161D 50%, #0A0D12 100%);
    }

    .success-particles {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .success-card {
      position: relative;
      z-index: 1;
      background: var(--card);
      width: 100%;
      max-width: 440px;
      padding: 40px 30px;
      border-radius: 24px;
      text-align: center;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
      animation: cp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes cp {
      from { opacity: 0; transform: scale(.8) translateY(40px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .success-icon-wrap {
      position: relative;
      width: 90px;
      height: 90px;
      margin: 0 auto 25px;
    }

    .success-ripple {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: rgba(63, 169, 160, 0.1);
      animation: ri 2s ease-out infinite;
    }

    .success-ripple:nth-child(1) { width: 90px; height: 90px; }
    .success-ripple:nth-child(2) { width: 70px; height: 70px; animation-delay: 0.5s; background: rgba(63, 169, 160, 0.15); }

    @keyframes ri {
      0% { width: 60px; height: 60px; opacity: 1; }
      100% { width: 120px; height: 120px; opacity: 0; }
    }

    .success-icon-inner {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background: rgba(63, 169, 160, 0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: si 0.6s ease 0.3s both;
    }

    @keyframes si {
      from { transform: translate(-50%, -50%) scale(0); }
      to { transform: translate(-50%, -50%) scale(1); }
    }

    .success-title {
      color: var(--text);
      margin: 0 0 6px;
      font-size: 24px;
      animation: fu 0.6s ease 0.5s both;
    }

    .success-sub {
      color: var(--muted);
      margin: 0 0 20px;
      font-size: 13px;
      animation: fu 0.6s ease 0.6s both;
    }

    @keyframes fu {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .tracking-box {
      background: var(--soft);
      padding: 18px;
      border-radius: 14px;
      margin-bottom: 18px;
      border: 1px solid var(--border);
      animation: fu 0.6s ease 0.65s both;
    }

    html.dark .tracking-box {
      background: linear-gradient(135deg, rgba(201,160,99,.15), rgba(201,160,99,.05));
      border: 1px solid rgba(201,160,99,.3);
    }

    .tracking-label {
      font-size: 10px;
      color: var(--muted);
      margin-bottom: 6px;
    }

    .tracking-code {
      font-size: 32px;
      color: var(--accent);
      font-weight: bold;
      letter-spacing: 6px;
      font-family: 'JetBrains Mono', monospace;
      direction: ltr;
    }

    .tracking-hint {
      font-size: 10px;
      color: var(--muted);
      margin-top: 4px;
    }

    .amount-box {
      background: var(--soft);
      padding: 16px;
      border-radius: 14px;
      margin-bottom: 18px;
      border: 1px solid var(--border);
      animation: fu 0.6s ease 0.7s both;
    }

    .amount-label {
      font-size: 11px;
      color: var(--muted);
      margin-bottom: 4px;
    }

    .amount-value {
      font-size: 28px;
      color: var(--accent);
      font-weight: bold;
      font-family: 'JetBrains Mono', monospace;
    }

    .amount-currency {
      font-size: 12px;
      color: var(--muted);
    }

    .support-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-bottom: 18px;
      color: var(--muted);
      font-size: 12px;
      animation: fu 0.6s ease 0.8s both;
    }

    .countdown-wrap {
      animation: fu 0.6s ease 0.9s both;
    }

    .countdown-bar-outer {
      height: 5px;
      background: var(--soft);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 10px;
    }

    .countdown-bar-inner {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), var(--accent-light));
      border-radius: 8px;
      animation: cb 15s linear forwards;
    }

    html.dark .countdown-bar-inner {
      background: linear-gradient(90deg, #C9A063, #D9B47C);
    }

    @keyframes cb {
      from { width: 100%; }
      to { width: 0%; }
    }

    .countdown-text {
      font-size: 12px;
      color: var(--light);
      margin: 0;
    }

    .countdown-num {
      color: var(--accent);
      font-weight: bold;
      font-size: 15px;
    }

    .back-btn {
      margin-top: 18px;
      padding: 10px 30px;
      background: var(--soft);
      color: var(--accent);
      border: 1px solid var(--border-dark);
      border-radius: 40px;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 13px;
      cursor: pointer;
      transition: all .3s;
      animation: fu 0.6s ease 1s both;
    }

    html.dark .back-btn {
      background: rgba(201,160,99,.1);
      color: #C9A063;
      border: 1px solid rgba(201,160,99,.3);
    }

    .back-btn:hover {
      background: var(--border);
      border-color: var(--accent);
    }

    html.dark .back-btn:hover {
      background: rgba(201,160,99,.2);
      border-color: #C9A063;
    }

    /* Particles */
    .particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0.5;
    }

    @keyframes fa {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    @keyframes fb {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-15px) scale(1.5); }
    }

    @keyframes fc {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(10px, -20px); }
      66% { transform: translate(-10px, -10px); }
    }

    @keyframes dc {
      to { stroke-dashoffset: 0; }
    }

    @keyframes dp {
      to { stroke-dashoffset: 0; }
    }

    /* Responsive */
    @media (max-width: 500px) {
      .card { padding: 20px 18px; border-radius: 16px; }
      .success-card { padding: 30px 20px; }
      .tracking-code { font-size: 24px; letter-spacing: 4px; }
      .amount-value { font-size: 22px; }
    }
  </style>
</head>
<body>
  <div class="card" id="mainCard">
    <h3>${productName}</h3>
    <div class="price">${price.toLocaleString()} <span>تومان</span></div>

    <div class="vpn-notice">
      <span class="icon">🔐</span>
      <span class="text">⚠️ روشن بودن <span class="highlight">VPN</span> جهت ارسال رسید <b>الزامی</b> میباشد</span>
    </div>

    <div class="bank">
      <div>📱 شماره کارت جهت واریز</div>
      <div class="card-number">6219 8614 5364 0772</div>
      <div>به نام: <b style="color:var(--text);">امیرمحمد یوسفی</b></div>
    </div>

    <div class="upload-area" id="uploadArea">
      <div class="upload-icon" id="uploadIcon">📁</div>
      <div class="upload-text" id="uploadText">برای آپلود تصویر رسید کلیک کنید</div>
      <div class="file-name" id="fileName"></div>
      <div class="file-size" id="fileSize"></div>
      <input type="file" id="receiptImage" accept="image/*">
    </div>

    <input type="text" id="telegramId" placeholder="✈️ آیدی تلگرام (مثال: @username)">
    <input type="tel" id="phoneNumber" placeholder="📞 شماره تماس">
    <textarea id="description" placeholder="📝 توضیحات (اختیاری)"></textarea>

    <button class="send-btn" id="sendBtn">📨 ارسال رسید</button>

    <div class="progress-container" id="progressContainer">
      <div class="progress-header">
        <span class="progress-percent" id="progressPercent">0%</span>
        <span class="progress-info" id="progressInfo">در حال آماده‌سازی...</span>
      </div>
      <div class="progress-bar-outer">
        <div class="progress-bar-inner" id="progressBar"></div>
      </div>
      <div class="progress-details">
        <span id="progressUploaded">📤 0 KB</span>
        <span id="progressTotal">کل: 0 KB</span>
      </div>
    </div>

    <div class="retry-info" id="retryInfo">
      🔄 در حال تلاش مجدد... (<span id="retryCount">1</span>/${MAX_RETRIES})
      <br>⚠️ لطفاً <b>VPN</b> خود را بررسی کنید
    </div>

    <div id="status"></div>
  </div>

  <script>
    var imgInput = document.getElementById("receiptImage");
    var uploadArea = document.getElementById("uploadArea");
    var uploadIcon = document.getElementById("uploadIcon");
    var uploadText = document.getElementById("uploadText");
    var fileNameEl = document.getElementById("fileName");
    var fileSizeEl = document.getElementById("fileSize");
    var sendBtn = document.getElementById("sendBtn");
    var statusDiv = document.getElementById("status");
    var tgInput = document.getElementById("telegramId");
    var phoneInput = document.getElementById("phoneNumber");
    var descInput = document.getElementById("description");
    var progressContainer = document.getElementById("progressContainer");
    var progressPercent = document.getElementById("progressPercent");
    var progressInfo = document.getElementById("progressInfo");
    var progressBar = document.getElementById("progressBar");
    var progressUploaded = document.getElementById("progressUploaded");
    var progressTotal = document.getElementById("progressTotal");
    var retryInfo = document.getElementById("retryInfo");
    var retryCount = document.getElementById("retryCount");
    var selectedFile = null;
    var retryAttempt = 0;
    var trackingCode = "${trackingCode}";

    function formatSize(bytes) {
      if (bytes === 0) return '0 B';
      var k = 1024;
      var sizes = ['B', 'KB', 'MB', 'GB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    uploadArea.onclick = function() { imgInput.click(); };
    uploadArea.ondragover = function(e) { e.preventDefault(); uploadArea.style.borderColor = 'var(--accent)'; };
    uploadArea.ondragleave = function() { uploadArea.style.borderColor = selectedFile ? 'var(--success)' : 'var(--border-dark)'; };
    uploadArea.ondrop = function(e) {
      e.preventDefault();
      uploadArea.style.borderColor = selectedFile ? 'var(--success)' : 'var(--border-dark)';
      if (e.dataTransfer.files.length > 0) { imgInput.files = e.dataTransfer.files; handleFileSelect(); }
    };
    imgInput.onchange = handleFileSelect;

    function handleFileSelect() {
      if (imgInput.files && imgInput.files[0]) {
        selectedFile = imgInput.files[0];
        fileNameEl.innerText = selectedFile.name;
        fileSizeEl.innerText = 'حجم: ' + formatSize(selectedFile.size);
        uploadIcon.innerText = '✅';
        uploadText.innerText = 'تصویر انتخاب شد';
        uploadArea.classList.add('has-file');
      } else {
        selectedFile = null;
        fileNameEl.innerText = '';
        fileSizeEl.innerText = '';
        uploadIcon.innerText = '📁';
        uploadText.innerText = 'برای آپلود تصویر رسید کلیک کنید';
        uploadArea.classList.remove('has-file');
      }
    }

    function resetProgress() {
      progressContainer.classList.remove('active');
      progressBar.style.width = '0%';
      progressPercent.innerText = '0%';
      progressInfo.innerText = 'در حال آماده‌سازی...';
      progressUploaded.innerText = '📤 0 KB';
      progressTotal.innerText = 'کل: 0 KB';
      retryInfo.classList.remove('show');
    }

    function updateProgress(loaded, total) {
      var percent = Math.round((loaded / total) * 100);
      progressBar.style.width = percent + '%';
      progressPercent.innerText = percent + '%';
      progressUploaded.innerText = '📤 ' + formatSize(loaded);
      progressTotal.innerText = 'کل: ' + formatSize(total);
      if (percent >= 100) progressInfo.innerText = '✅ ارسال شد! در حال تأیید...';
      else if (percent > 0) progressInfo.innerText = '📤 در حال ارسال... ' + percent + '%';
    }

    sendBtn.onclick = function() {
      var now = Date.now();
      var lastSent = parseInt(localStorage.getItem("lastSentTime") || "0");
      var timeDiff = now - lastSent;
      if (timeDiff < ${SPAM_TIME}) {
        var waitSeconds = Math.ceil((${SPAM_TIME} - timeDiff) / 1000);
        statusDiv.innerText = "⏳ لطفاً " + waitSeconds + " ثانیه دیگر صبر کنید...";
        statusDiv.className = 'warning';
        return;
      }
      if (!selectedFile) { statusDiv.innerText = "❌ لطفاً تصویر رسید را آپلود کنید."; statusDiv.className = 'error'; return; }
      if (!tgInput.value.trim()) { statusDiv.innerText = "❌ لطفاً آیدی تلگرام خود را وارد کنید."; statusDiv.className = 'error'; return; }
      if (!phoneInput.value.trim()) { statusDiv.innerText = "❌ لطفاً شماره تماس خود را وارد کنید."; statusDiv.className = 'error'; return; }

      sendBtn.disabled = true;
      sendBtn.innerText = "⏳ در حال ارسال...";
      statusDiv.innerText = "";
      statusDiv.className = '';
      retryInfo.classList.remove('show');
      resetProgress();
      progressContainer.classList.add('active');
      progressInfo.innerText = '📤 در حال ارسال...';
      retryAttempt = 0;
      sendToTelegram(selectedFile);
    };

    function sendToTelegram(file) {
      var captionText = "🔢 کد پیگیری: " + trackingCode + "\\n📦 محصول: ${productName}\\n💵 مبلغ: ${price.toLocaleString()} تومان\\n👤 تلگرام: " + tgInput.value.trim() + "\\n📞 شماره: " + phoneInput.value.trim() + "\\n📝 توضیحات: " + (descInput.value.trim() || "ندارد");
      var formData = new FormData();
      formData.append("photo", file);
      formData.append("caption", captionText);
      var xhr = new XMLHttpRequest();
      var timeoutId = setTimeout(function() { xhr.abort(); retryOrFail('timeout'); }, ${FETCH_TIMEOUT});

      xhr.upload.onprogress = function(e) { if (e.lengthComputable) updateProgress(e.loaded, e.total); };
      xhr.onload = function() {
        clearTimeout(timeoutId);
        if (xhr.status === 200) {
          try {
            var data = JSON.parse(xhr.responseText);
            if (data.ok) {
              localStorage.setItem("lastSentTime", Date.now().toString());
              progressInfo.innerText = '✅ ارسال موفق!';
              progressPercent.innerText = '100%';
              progressBar.style.width = '100%';
              progressUploaded.innerText = '✅ ارسال کامل';
              retryInfo.classList.remove('show');
              setTimeout(function() { showSuccessPage(${price}, trackingCode); }, 200);
            } else { retryOrFail(data.description || 'خطای سرور'); }
          } catch(e) { retryOrFail('خطا در پردازش پاسخ'); }
        } else { retryOrFail('خطای HTTP: ' + xhr.status); }
      };
      xhr.onerror = function() { clearTimeout(timeoutId); retryOrFail('network'); };
      xhr.onabort = function() { retryOrFail('abort'); };
      xhr.open("POST", "https://api-sidkashop.amirsidka.workers.dev");
      xhr.send(formData);
    }

    function retryOrFail(errorType) {
      retryAttempt++;
      if (retryAttempt < ${MAX_RETRIES}) {
        retryInfo.classList.add('show');
        retryCount.innerText = retryAttempt;
        progressInfo.innerText = '🔄 تلاش مجدد ' + retryAttempt + ' از ' + ${MAX_RETRIES} + '...';
        setTimeout(function() { sendToTelegram(selectedFile); }, 2000);
      } else {
        retryInfo.classList.remove('show');
        progressContainer.classList.remove('active');
        sendBtn.disabled = false;
        sendBtn.innerText = "📨 ارسال مجدد";
        statusDiv.innerText = errorType === 'timeout' || errorType === 'abort' ? "⏰ زمان ارسال طولانی شد. VPN و اینترنت خود را بررسی کنید." : "❌ خطا در ارسال. لطفاً دوباره تلاش کنید.";
        statusDiv.className = 'error';
      }
    }

    function showSuccessPage(price, code) {
      var countdown = 15;
      var siteUrl = '${SITE_URL}';
      document.body.innerHTML = '';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';

      var overlay = document.createElement('div');
      overlay.className = 'success-overlay';

      var particles = document.createElement('div');
      particles.className = 'success-particles';
      particles.innerHTML = 
        '<div class="particle" style="top:10%;left:10%;width:8px;height:8px;background:var(--accent);animation:fa 3s ease-in-out infinite;"></div>' +
        '<div class="particle" style="top:20%;right:15%;width:12px;height:12px;background:var(--success);animation:fb 4s ease-in-out infinite;opacity:0.4;"></div>' +
        '<div class="particle" style="bottom:30%;left:20%;width:6px;height:6px;background:var(--accent-light);animation:fc 3.5s ease-in-out infinite;opacity:0.7;"></div>' +
        '<div class="particle" style="top:60%;right:10%;width:10px;height:10px;background:var(--success);animation:fa 2.8s ease-in-out infinite;opacity:0.5;"></div>' +
        '<div class="particle" style="bottom:15%;right:25%;width:7px;height:7px;background:var(--accent-light);animation:fb 4.2s ease-in-out infinite;opacity:0.6;"></div>' +
        '<div class="particle" style="top:40%;left:5%;width:5px;height:5px;background:var(--text);animation:fc 3.2s ease-in-out infinite;opacity:0.3;"></div>' +
        '<div class="particle" style="top:75%;left:30%;width:9px;height:9px;background:var(--accent);animation:fa 3.7s ease-in-out infinite;opacity:0.5;"></div>' +
        '<div class="particle" style="bottom:40%;right:5%;width:11px;height:11px;background:var(--success);animation:fb 3.1s ease-in-out infinite;opacity:0.4;"></div>';

      var card = document.createElement('div');
      card.className = 'success-card';
      card.innerHTML = 
        '<div class="success-icon-wrap">' +
          '<div class="success-ripple"></div>' +
          '<div class="success-ripple"></div>' +
          '<div class="success-icon-inner">' +
            '<svg width="32" height="32" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="var(--success)" stroke-width="3" stroke-dasharray="151" stroke-dashoffset="151" style="animation:dc 0.4s ease 0.3s forwards;"/><path d="M15 27 L23 36 L38 17" fill="none" stroke="var(--success)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="35" stroke-dashoffset="35" style="animation:dp 0.3s ease 0.7s forwards;"/></svg>' +
          '</div>' +
        '</div>' +
        '<h2 class="success-title">🎉 پرداخت موفق!</h2>' +
        '<p class="success-sub">رسید شما با موفقیت ثبت شد</p>' +
        '<div class="tracking-box">' +
          '<div class="tracking-label">🔢 کد پیگیری</div>' +
          '<div class="tracking-code">' + code + '</div>' +
          '<div class="tracking-hint">این کد را نزد خود نگه دارید</div>' +
        '</div>' +
        '<div class="amount-box">' +
          '<div class="amount-label">💰 مبلغ پرداختی</div>' +
          '<div class="amount-value">' + price.toLocaleString() + '</div>' +
          '<div class="amount-currency">تومان</div>' +
        '</div>' +
        '<div class="support-text"><span>📞</span><span>تیم پشتیبانی به زودی با شما تماس میگیرد</span></div>' +
        '<div class="countdown-wrap">' +
          '<div class="countdown-bar-outer"><div class="countdown-bar-inner"></div></div>' +
          '<p class="countdown-text">🔄 بازگشت خودکار در <span class="countdown-num" id="timer">' + countdown + '</span> ثانیه</p>' +
        '</div>' +
        '<button class="back-btn" id="backBtn">🏠 بازگشت به سایت</button>';

      overlay.appendChild(particles);
      overlay.appendChild(card);
      document.body.appendChild(overlay);

      document.getElementById('backBtn').onclick = function() {
        window.opener ? window.close() : window.location.href = siteUrl;
      };

      var timeLeft = countdown;
      var timerInterval = setInterval(function() {
        timeLeft--;
        var timerEl = document.getElementById("timer");
        if (timerEl) {
          timerEl.innerText = timeLeft;
          if (timeLeft <= 5) timerEl.style.color = 'var(--error)';
        }
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          window.location.href = siteUrl;
        }
      }, 1000);
    }
  <\/script>
</body>
</html>`);
  w.document.close();
}

function openFeaturesPage() {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  const theme = getCurrentTheme();

  w.document.open();
  w.document.write(`<!DOCTYPE html>
<html lang="fa" dir="rtl" class="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>قابلیت‌های سلف تلگرام</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f7f5f2;
      --card: #ffffff;
      --soft: #f0ebe5;
      --text: #1e1a17;
      --muted: #4f4640;
      --light: #7a6e64;
      --border: #e9e3db;
      --accent: #b68b7c;
      --accent-glow: #c9a063;
      --success: #3FA9A0;
      --shadow: 0 15px 40px rgba(0,0,0,.08);
    }
    html.dark {
      --bg: #0A0D12;
      --card: #12161D;
      --soft: #1A2029;
      --text: #ECE9E2;
      --muted: #99A1AF;
      --light: #5C6472;
      --border: #262D3A;
      --accent: #C9A063;
      --accent-glow: #D9B47C;
      --success: #3FA9A0;
      --shadow: 0 15px 40px rgba(0,0,0,.6);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; outline: none !important; -webkit-tap-highlight-color: transparent !important; }
    body {
      font-family: 'Vazirmatn', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.8;
      padding: 30px 20px;
      display: flex;
      justify-content: center;
      transition: background 0.3s, color 0.3s;
    }
    .container {
      width: 100%;
      max-width: 700px;
      background: var(--card);
      border-radius: 24px;
      padding: 35px 30px;
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
    }
    h2 { text-align: center; margin-bottom: 30px; color: var(--accent); font-size: 26px; }
    .command-group { margin-bottom: 25px; background: var(--soft); border-radius: 16px; padding: 18px; border: 1px solid var(--border); }
    .command-group h3 { color: var(--success); margin-bottom: 10px; font-size: 17px; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
    .command-group ul { list-style: none; padding: 0; }
    .command-group li { margin: 8px 0; font-size: 13px; background: var(--card); padding: 10px 14px; border-radius: 10px; border-right: 3px solid var(--accent); }
    .command-group code { background: var(--soft); color: var(--accent); padding: 2px 8px; border-radius: 6px; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
    .back-btn {
      display: block; width: fit-content; margin: 30px auto 0; padding: 12px 40px;
      background: var(--accent); color: #fff; border: none; border-radius: 50px;
      font-family: 'Vazirmatn', sans-serif; font-size: 15px; font-weight: bold; cursor: pointer; transition: .3s;
    }
    .back-btn:hover { opacity: 0.85; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(182,139,124,.3); }
    html.dark .back-btn { color: #14110A; }
    html.dark .back-btn:hover { box-shadow: 0 6px 20px rgba(201,160,99,.5); }
    @media (max-width: 500px) { .container { padding: 20px 15px; } }
  </style>
</head>
<body>
  <div class="container">
    <h2>✨ قابلیت‌های سلف تلگرام ✨</h2>
    <div class="command-group"><h3>🕒 ساعت و بیو</h3><ul><li><code>.تایم روشن</code> : فعال کردن نمایش ساعت در اسم.</li><li><code>.تایم خاموش</code> : غیرفعال کردن ساعت.</li><li><code>.بیو روشن</code> : قرار دادن ساعت داخل بیو.</li><li><code>.بیو خاموش</code> : حذف ساعت از بیو.</li></ul></div>
    <div class="command-group"><h3>🎨 فونت و زیبایی</h3><ul><li><code>.فونت ها</code> : نمایش لیست فونت‌ها.</li><li><code>.تنظیم فونت n</code> : تنظیم فونت.</li><li><code>.لایک اسم مورد نظر</code> : ساخت لایک.</li><li><code>.بیو رندوم</code> : تولید بیوی تصادفی.</li></ul></div>
    <div class="command-group"><h3>📢 بنر و گروه‌ها</h3><ul><li><code>.بنر</code> : ارسال پیام به گروه‌ها.</li><li><code>.بنر غیرفعال</code> : توقف ارسال.</li><li><code>.حذف بنر</code> : حذف گروه از لیست.</li><li><code>.حذف بنر غیرفعال</code> : بازگرداندن گروه.</li></ul></div>
    <div class="command-group"><h3>🧑‍💻 وضعیت آنلاین</h3><ul><li><code>.برجسته فعال</code> / <code>غیرفعال</code></li><li><code>.آنلاین فعال</code> / <code>خاموش</code></li><li><code>.کج فعال</code> / <code>غیرفعال</code></li><li><code>.تکی فعال</code> / <code>غیرفعال</code></li></ul></div>
    <div class="command-group"><h3>🔒 جوین اجباری</h3><ul><li><code>.معاف جوین اجباری [ایدی]</code></li><li><code>.حذف معاف جوین اجباری [ایدی]</code></li><li><code>.پیوی قفل</code> / <code>.پیوی باز</code></li><li><code>.قفل ایدی چنل</code> / <code>.حذف قفل ایدی چنل</code></li></ul></div>
    <div class="command-group"><h3>👥 مدیریت کاربران</h3><ul><li><code>.سکوت</code> / <code>.حذف سکوت</code></li><li><code>.دشمن</code> / <code>.حذف دشمن</code></li><li><code>.آیدی</code> : نمایش اطلاعات.</li></ul></div>
    <div class="command-group"><h3>📄 ذخیره‌سازی</h3><ul><li><code>.تنظیم ریلم</code> / <code>.حذف ریلم</code></li><li><code>.پشتیبانگیری از چت ها</code></li><li><code>.پشتیبانگیری از چت</code></li></ul></div>
    <div class="command-group"><h3>🚫 فیلتر کلمات</h3><ul><li><code>.فیلتر کلمه کلمه1، کلمه2</code></li><li><code>.حذف کلمه فیلتر کلمه1</code></li><li><code>.لیست کلمات فیلتر شده</code></li></ul></div>
    <div class="command-group"><h3>🛠️ متفرقه</h3><ul><li><code>.ارز</code> <code>.فال</code> <code>.سرعت</code> <code>.بگو text</code> <code>.انقضا</code> <code>.تاریخ</code> <code>.حساب 2+2</code> <code>.ترجمه test</code></li></ul></div>
    <div class="command-group"><h3>🎉 فان</h3><ul><li><code>.دوست دارم</code> <code>.جوک</code> <code>.خنده</code> <code>.قلب</code> <code>.فاک</code> <code>.گل</code> <code>.دختر</code></li></ul></div>
    <button class="back-btn" onclick="if(window.opener)window.close();else location.href='${SITE_URL}';">🔙 بازگشت به سایت</button>
  </div>
</body>
</html>`);
  w.document.close();
}
