/* ===== script.js ===== */
/* تمام رنگ‌ها و تم‌ها هماهنگ با صفحه اصلی - روشن و دارک */

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
      --hover: #fcfaf8;
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
      --success: #5a9e96;
      --error: #c0392b;
      --warning: #b68b7c;
      --shadow: 0 4px 24px rgba(0,0,0,0.04);
      --shadow-lg: 0 12px 40px rgba(0,0,0,0.06);
    }

    html.dark {
      --bg: #141210;
      --card: #1f1b18;
      --soft: #26211d;
      --hover: #2c2722;
      --text: #ece6df;
      --muted: #b5a89a;
      --light: #8f8278;
      --border: #2f2924;
      --border-dark: #3b352f;
      --accent: #c9b09f;
      --accent-glow: #c9b09f;
      --accent-light: #a89080;
      --btn-bg: #ece6df;
      --btn-text: #1e1a17;
      --success: #6bbcb5;
      --error: #e74c3c;
      --warning: #d4a574;
      --shadow: 0 4px 24px rgba(0,0,0,0.3);
      --shadow-lg: 0 12px 40px rgba(0,0,0,0.5);
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
      max-width: 480px;
      background: var(--card);
      padding: 32px 28px;
      border-radius: 32px;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent), var(--accent-light), var(--accent));
      opacity: 0.5;
    }

    .eyebrow {
      display: inline-block;
      background: var(--soft);
      color: var(--light);
      padding: 0.3rem 1.2rem;
      border-radius: 50px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      margin-bottom: 0.8rem;
    }

    .product-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.3rem;
      color: var(--text);
    }

    .price-tag {
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--text);
      line-height: 1;
      margin-bottom: 0.2rem;
      letter-spacing: -0.02em;
      font-family: 'JetBrains Mono', monospace;
    }

    .price-tag .currency {
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--muted);
      font-family: 'Vazirmatn', sans-serif;
      margin-right: 0.3rem;
    }

    .vpn-alert {
      background: linear-gradient(135deg, rgba(182,139,124,0.08), rgba(182,139,124,0.04));
      border: 1px solid rgba(182,139,124,0.2);
      border-radius: 16px;
      padding: 1rem 1.2rem;
      margin: 1.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 0.82rem;
      color: var(--muted);
      animation: glow 2s ease-in-out infinite;
    }

    html.dark .vpn-alert {
      background: linear-gradient(135deg, rgba(201,176,159,0.08), rgba(201,176,159,0.04));
      border: 1px solid rgba(201,176,159,0.2);
    }

    .vpn-alert .icon {
      font-size: 1.6rem;
      flex-shrink: 0;
      animation: bounce 1s ease-in-out infinite;
    }

    .vpn-alert strong {
      color: var(--accent);
    }

    @keyframes glow {
      0%, 100% { box-shadow: 0 0 8px rgba(182,139,124,0.08), 0 0 16px rgba(182,139,124,0.04); }
      50% { box-shadow: 0 0 16px rgba(182,139,124,0.15), 0 0 28px rgba(182,139,124,0.08); }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .bank-box {
      background: var(--soft);
      padding: 1.2rem;
      border-radius: 20px;
      text-align: center;
      margin-bottom: 1.5rem;
      border: 1px solid var(--border);
    }

    .bank-box .label {
      font-size: 0.75rem;
      color: var(--light);
      margin-bottom: 0.3rem;
    }

    .bank-box .card-no {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text);
      letter-spacing: 0.1em;
      direction: ltr;
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      background: var(--card);
      padding: 0.5rem 1.2rem;
      border-radius: 12px;
      margin: 0.5rem 0;
      border: 1px solid var(--border-dark);
    }

    .bank-box .owner {
      font-size: 0.85rem;
      color: var(--muted);
    }

    .upload-zone {
      border: 2px dashed var(--border-dark);
      border-radius: 20px;
      padding: 1.5rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s;
      background: var(--card);
      margin-bottom: 0.8rem;
    }

    .upload-zone:hover {
      border-color: var(--accent);
      background: var(--hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow);
    }

    .upload-zone.done {
      border-color: var(--success);
      border-style: solid;
      background: rgba(90,158,150,0.04);
    }

    .upload-zone .upload-icon {
      font-size: 2.2rem;
      margin-bottom: 0.3rem;
      transition: transform 0.3s;
    }

    .upload-zone:hover .upload-icon {
      transform: translateY(-3px);
    }

    .upload-zone .upload-hint {
      font-size: 0.85rem;
      color: var(--light);
    }

    .upload-zone .file-info {
      font-size: 0.75rem;
      color: var(--accent);
      margin-top: 0.2rem;
      font-weight: 600;
      word-break: break-all;
    }

    .upload-zone .file-size {
      font-size: 0.7rem;
      color: var(--light);
    }

    .upload-zone input {
      display: none;
    }

    .input-group {
      margin-bottom: 0.7rem;
    }

    .input-group input,
    .input-group textarea {
      width: 100%;
      padding: 0.9rem 1.1rem;
      border-radius: 16px;
      border: 1.5px solid var(--border-dark);
      font-family: 'Vazirmatn', sans-serif;
      font-size: 0.9rem;
      background: var(--card);
      color: var(--text);
      transition: all 0.2s;
    }

    .input-group input:focus,
    .input-group textarea:focus {
      border-color: var(--accent);
      background: var(--hover);
      box-shadow: 0 0 0 3px rgba(182,139,124,0.08);
    }

    .input-group input::placeholder,
    .input-group textarea::placeholder {
      color: var(--light);
    }

    .input-group textarea {
      resize: none;
      height: 75px;
    }

    .btn-submit {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 60px;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      background: var(--btn-bg);
      color: var(--btn-text);
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 0.5rem;
    }

    .btn-submit:hover:not(:disabled) {
      opacity: 0.85;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--border-dark);
      color: var(--light);
    }

    .progress-wrap {
      margin-top: 1rem;
      display: none;
      background: var(--soft);
      border-radius: 18px;
      padding: 1.2rem;
      border: 1px solid var(--border);
    }

    .progress-wrap.active {
      display: block;
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .progress-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.6rem;
      font-size: 0.85rem;
    }

    .progress-percent {
      font-weight: 700;
      font-size: 1.3rem;
      color: var(--accent);
      font-family: 'JetBrains Mono', monospace;
    }

    .progress-detail {
      color: var(--muted);
      font-size: 0.8rem;
    }

    .progress-track {
      height: 8px;
      background: var(--card);
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 0.6rem;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), var(--accent-light));
      border-radius: 20px;
      width: 0%;
      transition: width 0.4s ease;
      position: relative;
    }

    .progress-fill::after {
      content: '';
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 20px;
      background: rgba(255,255,255,0.25);
      border-radius: 50%;
      filter: blur(4px);
    }

    .progress-sizes {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
      color: var(--light);
    }

    .status-msg {
      text-align: center;
      margin-top: 0.8rem;
      font-size: 0.82rem;
      min-height: 1.5rem;
      color: var(--muted);
    }

    .status-msg.error { color: var(--error); }
    .status-msg.warning { color: var(--warning); }
    .status-msg.success { color: var(--success); }

    .retry-box {
      background: rgba(192,57,43,0.06);
      border: 1px solid rgba(192,57,43,0.2);
      border-radius: 14px;
      padding: 0.7rem 1rem;
      margin-top: 0.8rem;
      font-size: 0.78rem;
      color: var(--error);
      text-align: center;
      display: none;
      animation: slideDown 0.3s ease;
    }

    .retry-box.show { display: block; }

    /* Success Page */
    .success-wrapper {
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

    .success-particles {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .particle {
      position: absolute;
      border-radius: 50%;
      background: var(--accent);
      opacity: 0.4;
    }

    .success-card {
      position: relative;
      z-index: 1;
      background: var(--card);
      width: 100%;
      max-width: 440px;
      padding: 40px 30px;
      border-radius: 32px;
      text-align: center;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
      animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes popIn {
      from { opacity: 0; transform: scale(0.85) translateY(30px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .success-icon-wrap {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
    }

    .success-ripple {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: rgba(90,158,150,0.1);
      animation: ripple 2s ease-out infinite;
    }

    .success-ripple:nth-child(1) { width: 80px; height: 80px; }
    .success-ripple:nth-child(2) { width: 60px; height: 60px; animation-delay: 0.5s; }

    @keyframes ripple {
      0% { transform: translate(-50%, -50%) scale(0.6); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
    }

    .success-icon-inner {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      background: rgba(90,158,150,0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      animation: scaleIn 0.5s ease 0.2s both;
    }

    @keyframes scaleIn {
      from { transform: translate(-50%, -50%) scale(0); }
      to { transform: translate(-50%, -50%) scale(1); }
    }

    @keyframes drawCircle {
      to { stroke-dashoffset: 0; }
    }
    @keyframes drawCheck {
      to { stroke-dashoffset: 0; }
    }

    .success-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.3rem;
      animation: fadeUp 0.5s ease 0.3s both;
    }

    .success-sub {
      color: var(--muted);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      animation: fadeUp 0.5s ease 0.35s both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .tracking-box {
      background: var(--soft);
      padding: 1rem;
      border-radius: 16px;
      margin-bottom: 1rem;
      border: 1px solid var(--border);
      animation: fadeUp 0.5s ease 0.4s both;
    }

    .tracking-label {
      font-size: 0.7rem;
      color: var(--light);
      letter-spacing: 0.04em;
      margin-bottom: 0.3rem;
    }

    .tracking-code {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.12em;
      font-family: 'JetBrains Mono', monospace;
      direction: ltr;
    }

    .tracking-hint {
      font-size: 0.7rem;
      color: var(--light);
      margin-top: 0.2rem;
    }

    .amount-box {
      background: var(--soft);
      padding: 1rem;
      border-radius: 16px;
      margin-bottom: 1rem;
      border: 1px solid var(--border);
      animation: fadeUp 0.5s ease 0.5s both;
    }

    .amount-label {
      font-size: 0.75rem;
      color: var(--light);
      margin-bottom: 0.2rem;
    }

    .amount-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text);
      font-family: 'JetBrains Mono', monospace;
    }

    .amount-currency {
      font-size: 0.8rem;
      color: var(--muted);
    }

    .support-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      margin-bottom: 1.5rem;
      color: var(--muted);
      font-size: 0.82rem;
      animation: fadeUp 0.5s ease 0.55s both;
    }

    .countdown-wrap {
      animation: fadeUp 0.5s ease 0.6s both;
    }

    .countdown-bar {
      height: 4px;
      background: var(--soft);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 0.6rem;
    }

    .countdown-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), var(--accent-light));
      border-radius: 8px;
      animation: countdownAnim 15s linear forwards;
    }

    @keyframes countdownAnim {
      from { width: 100%; }
      to { width: 0%; }
    }

    .countdown-text {
      font-size: 0.78rem;
      color: var(--light);
    }

    .countdown-num {
      color: var(--accent);
      font-weight: 700;
      font-size: 0.95rem;
    }

    .btn-back {
      margin-top: 1.2rem;
      padding: 0.8rem 2.5rem;
      background: var(--btn-bg);
      color: var(--btn-text);
      border: none;
      border-radius: 60px;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      animation: fadeUp 0.5s ease 0.7s both;
    }

    .btn-back:hover {
      opacity: 0.85;
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }

    /* Animations for particles */
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

    /* Responsive */
    @media (max-width: 500px) {
      .card { padding: 24px 18px; border-radius: 26px; }
      .price-tag { font-size: 2.2rem; }
      .success-card { padding: 28px 18px; }
      .tracking-code { font-size: 1.4rem; }
      .amount-value { font-size: 1.6rem; }
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="eyebrow">تکمیل سفارش</span>
    <div class="product-name">${productName}</div>
    <div class="price-tag">${price.toLocaleString()} <span class="currency">تومان</span></div>

    <div class="vpn-alert">
      <span class="icon">🔐</span>
      <span>روشن بودن <strong>VPN</strong> جهت ارسال رسید <strong>الزامی</strong> می‌باشد</span>
    </div>

    <div class="bank-box">
      <div class="label">📱 شماره کارت جهت واریز</div>
      <div class="card-no">6219 8614 5364 0772</div>
      <div class="owner">به نام: <strong style="color:var(--text);">امیرمحمد یوسفی</strong></div>
    </div>

    <div class="upload-zone" id="uploadZone">
      <div class="upload-icon" id="uploadIcon">📁</div>
      <div class="upload-hint" id="uploadHint">کلیک کنید یا تصویر رسید را اینجا رها کنید</div>
      <div class="file-info" id="fileInfo"></div>
      <div class="file-size" id="fileSize"></div>
      <input type="file" id="fileInput" accept="image/*">
    </div>

    <div class="input-group">
      <input type="text" id="telegramId" placeholder="✈️ آیدی تلگرام (مثال: @username)">
    </div>
    <div class="input-group">
      <input type="tel" id="phoneNumber" placeholder="📞 شماره تماس">
    </div>
    <div class="input-group">
      <textarea id="description" placeholder="📝 توضیحات (اختیاری)"></textarea>
    </div>

    <button class="btn-submit" id="submitBtn">📨 ارسال رسید</button>

    <div class="progress-wrap" id="progressWrap">
      <div class="progress-stats">
        <span class="progress-percent" id="progressPercent">0%</span>
        <span class="progress-detail" id="progressDetail">در حال آماده‌سازی...</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" id="progressFill"></div>
      </div>
      <div class="progress-sizes">
        <span id="progressUploaded">📤 0 KB</span>
        <span id="progressTotal">📥 0 KB</span>
      </div>
    </div>

    <div class="retry-box" id="retryBox">
      🔄 در حال تلاش مجدد... (<span id="retryCount">1</span>/${MAX_RETRIES})
      <br>⚠️ لطفاً <strong>VPN</strong> خود را بررسی کنید
    </div>

    <div class="status-msg" id="statusMsg"></div>
  </div>

  <script>
    var fileInput = document.getElementById("fileInput");
    var uploadZone = document.getElementById("uploadZone");
    var uploadIcon = document.getElementById("uploadIcon");
    var uploadHint = document.getElementById("uploadHint");
    var fileInfo = document.getElementById("fileInfo");
    var fileSize = document.getElementById("fileSize");
    var submitBtn = document.getElementById("submitBtn");
    var statusMsg = document.getElementById("statusMsg");
    var tgInput = document.getElementById("telegramId");
    var phoneInput = document.getElementById("phoneNumber");
    var descInput = document.getElementById("description");
    var progressWrap = document.getElementById("progressWrap");
    var progressPercent = document.getElementById("progressPercent");
    var progressDetail = document.getElementById("progressDetail");
    var progressFill = document.getElementById("progressFill");
    var progressUploaded = document.getElementById("progressUploaded");
    var progressTotal = document.getElementById("progressTotal");
    var retryBox = document.getElementById("retryBox");
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

    uploadZone.onclick = function(e) {
      if (e.target !== fileInput) fileInput.click();
    };

    uploadZone.ondragover = function(e) {
      e.preventDefault();
      uploadZone.style.borderColor = 'var(--accent)';
      uploadZone.style.background = 'var(--hover)';
    };

    uploadZone.ondragleave = function() {
      uploadZone.style.borderColor = selectedFile ? 'var(--success)' : 'var(--border-dark)';
      uploadZone.style.background = selectedFile ? 'rgba(90,158,150,0.04)' : 'var(--card)';
    };

    uploadZone.ondrop = function(e) {
      e.preventDefault();
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        handleFile();
      }
    };

    fileInput.onchange = handleFile;

    function handleFile() {
      if (fileInput.files && fileInput.files[0]) {
        selectedFile = fileInput.files[0];
        fileInfo.textContent = selectedFile.name;
        fileSize.textContent = formatSize(selectedFile.size);
        uploadIcon.textContent = '✅';
        uploadHint.textContent = 'تصویر با موفقیت انتخاب شد';
        uploadZone.classList.add('done');
        statusMsg.textContent = '';
        statusMsg.className = 'status-msg';
      }
    }

    function resetProgress() {
      progressWrap.classList.remove('active');
      progressFill.style.width = '0%';
      progressPercent.textContent = '0%';
      progressDetail.textContent = 'در حال آماده‌سازی...';
      progressUploaded.textContent = '📤 0 KB';
      progressTotal.textContent = '📥 0 KB';
      retryBox.classList.remove('show');
    }

    function updateProgress(loaded, total) {
      var pct = Math.round((loaded / total) * 100);
      progressFill.style.width = pct + '%';
      progressPercent.textContent = pct + '%';
      progressUploaded.textContent = '📤 ' + formatSize(loaded);
      progressTotal.textContent = '📥 ' + formatSize(total);
      if (pct >= 100) progressDetail.textContent = 'ارسال کامل شد! ✅️ درحال تایید ...';
      else if (pct > 0) progressDetail.textContent = '📤 در حال ارسال... ' + pct + '%';
    }

    submitBtn.onclick = function() {
      var now = Date.now();
      var lastSent = parseInt(localStorage.getItem("lastSentTime") || "0");
      var diff = now - lastSent;

      if (diff < ${SPAM_TIME}) {
        var wait = Math.ceil((${SPAM_TIME} - diff) / 1000);
        statusMsg.textContent = "⏳ لطفاً " + wait + " ثانیه دیگر صبر کنید...";
        statusMsg.className = 'status-msg warning';
        return;
      }

      if (!selectedFile) {
        statusMsg.textContent = "❌ لطفاً تصویر رسید را آپلود کنید";
        statusMsg.className = 'status-msg error';
        return;
      }
      if (!tgInput.value.trim()) {
        statusMsg.textContent = "❌ لطفاً آیدی تلگرام خود را وارد کنید";
        statusMsg.className = 'status-msg error';
        return;
      }
      if (!phoneInput.value.trim()) {
        statusMsg.textContent = "❌ لطفاً شماره تماس خود را وارد کنید";
        statusMsg.className = 'status-msg error';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "⏳ در حال ارسال...";
      statusMsg.textContent = '';
      statusMsg.className = 'status-msg';
      resetProgress();
      progressWrap.classList.add('active');
      retryAttempt = 0;
      sendToTelegram(selectedFile);
    };

    function sendToTelegram(file) {
      var caption = "🔢 کد پیگیری: " + trackingCode + "\\n📦 محصول: ${productName}\\n💵 مبلغ: ${price.toLocaleString()} تومان\\n👤 تلگرام: " + tgInput.value.trim() + "\\n📞 شماره: " + phoneInput.value.trim() + "\\n📝 توضیحات: " + (descInput.value.trim() || "ندارد");

      var fd = new FormData();
      fd.append("photo", file);
      fd.append("caption", caption);

      var xhr = new XMLHttpRequest();
      var tid = setTimeout(function() {
        xhr.abort();
        handleRetry('timeout');
      }, ${FETCH_TIMEOUT});

      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) updateProgress(e.loaded, e.total);
      };

      xhr.onload = function() {
        clearTimeout(tid);
        if (xhr.status === 200) {
          try {
            var data = JSON.parse(xhr.responseText);
            if (data.ok) {
              localStorage.setItem("lastSentTime", Date.now().toString());
              showSuccess();
            } else {
              handleRetry(data.description || 'خطای سرور');
            }
          } catch(e) {
            handleRetry('خطا در پردازش پاسخ سرور');
          }
        } else {
          handleRetry('HTTP ' + xhr.status);
        }
      };

      xhr.onerror = function() {
        clearTimeout(tid);
        handleRetry('network');
      };

      xhr.onabort = function() {
        handleRetry('abort');
      };

      xhr.open("POST", "https://api-sidkashop.amirsidka.workers.dev");
      xhr.send(fd);
    }

    function handleRetry(reason) {
      retryAttempt++;
      if (retryAttempt < ${MAX_RETRIES}) {
        retryBox.classList.add('show');
        retryCount.textContent = retryAttempt;
        progressDetail.textContent = '🔄 تلاش ' + retryAttempt + ' از ' + ${MAX_RETRIES};
        setTimeout(function() {
          sendToTelegram(selectedFile);
        }, 2000);
      } else {
        retryBox.classList.remove('show');
        progressWrap.classList.remove('active');
        submitBtn.disabled = false;
        submitBtn.textContent = "📨 ارسال مجدد";
        if (reason === 'timeout' || reason === 'abort') {
          statusMsg.textContent = "⏰ زمان ارسال طولانی شد. لطفاً VPN و اینترنت را بررسی کنید";
        } else if (reason === 'network') {
          statusMsg.textContent = "❌ خطای شبکه. لطفاً VPN را روشن کنید و دوباره تلاش کنید";
        } else {
          statusMsg.textContent = "❌ " + reason + ". لطفاً دوباره تلاش کنید";
        }
        statusMsg.className = 'status-msg error';
      }
    }

    function showSuccess() {
      var countdown = 15;
      document.body.innerHTML = '';

      var wrapper = document.createElement('div');
      wrapper.className = 'success-wrapper';

      var particles = document.createElement('div');
      particles.className = 'success-particles';
      particles.innerHTML = 
        '<div class="particle" style="top:10%;left:10%;width:8px;height:8px;animation:fa 3s ease-in-out infinite;"></div>' +
        '<div class="particle" style="top:20%;right:15%;width:10px;height:10px;animation:fb 4s ease-in-out infinite;opacity:0.3;background:var(--success);"></div>' +
        '<div class="particle" style="bottom:30%;left:20%;width:6px;height:6px;animation:fc 3.5s ease-in-out infinite;opacity:0.5;"></div>' +
        '<div class="particle" style="top:60%;right:10%;width:8px;height:8px;animation:fa 2.8s ease-in-out infinite;opacity:0.35;background:var(--success);"></div>' +
        '<div class="particle" style="bottom:15%;right:25%;width:7px;height:7px;animation:fb 4.2s ease-in-out infinite;opacity:0.45;"></div>' +
        '<div class="particle" style="top:40%;left:5%;width:5px;height:5px;animation:fc 3.2s ease-in-out infinite;opacity:0.25;background:var(--text);"></div>' +
        '<div class="particle" style="top:75%;left:30%;width:9px;height:9px;animation:fa 3.7s ease-in-out infinite;opacity:0.4;"></div>' +
        '<div class="particle" style="bottom:40%;right:5%;width:8px;height:8px;animation:fb 3.1s ease-in-out infinite;opacity:0.35;background:var(--success);"></div>';

      var card = document.createElement('div');
      card.className = 'success-card';
      card.innerHTML = 
        '<div class="success-icon-wrap">' +
          '<div class="success-ripple"></div>' +
          '<div class="success-ripple"></div>' +
          '<div class="success-icon-inner">' +
          '<svg width="28" height="28" viewBox="0 0 52 52">' +
            '<circle cx="26" cy="26" r="24" fill="none" stroke="var(--success)" stroke-width="3" stroke-dasharray="151" stroke-dashoffset="151" style="animation: drawCircle 0.4s ease 0.3s forwards;"/>' +
            '<path d="M15 27 L23 36 L38 17" fill="none" stroke="var(--success)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="35" stroke-dashoffset="35" style="animation: drawCheck 0.3s ease 0.7s forwards;"/>' +
          '</svg>' +
        '</div>' +
        '</div>' +
        '<h2 class="success-title">پرداخت موفقیت‌آمیز</h2>' +
        '<p class="success-sub">رسید شما با موفقیت ثبت شد</p>' +
        '<div class="tracking-box">' +
          '<div class="tracking-label">🔢 کد پیگیری</div>' +
          '<div class="tracking-code">' + trackingCode + '</div>' +
          '<div class="tracking-hint">این کد را نزد خود نگه دارید</div>' +
        '</div>' +
        '<div class="amount-box">' +
          '<div class="amount-label">💰 مبلغ پرداختی</div>' +
          '<div class="amount-value">${price.toLocaleString()}</div>' +
          '<div class="amount-currency">تومان</div>' +
        '</div>' +
        '<div class="support-text"><span>📞</span><span>تیم پشتیبانی به زودی با شما تماس می‌گیرد</span></div>' +
        '<div class="countdown-wrap">' +
          '<div class="countdown-bar"><div class="countdown-fill"></div></div>' +
          '<p class="countdown-text">🔄 بازگشت خودکار در <span class="countdown-num" id="timer">' + countdown + '</span> ثانیه</p>' +
        '</div>' +
        '<button class="btn-back" id="backBtn">🏠 بازگشت به سایت</button>';

      wrapper.appendChild(particles);
      wrapper.appendChild(card);
      document.body.appendChild(wrapper);

      document.getElementById('backBtn').onclick = function() {
        window.opener ? window.close() : window.location.href = '${SITE_URL}';
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
          window.location.href = '${SITE_URL}';
        }
      }, 1000);
    }
  <\/script>
</body>
</html>`);
  w.document.close();
}

function openTicketPage(serviceName) {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  const trackingCode = generateTrackingCode();
  const theme = getCurrentTheme();
  const isRobot = serviceName.includes('ربات');
  const placeholderText = isRobot 
    ? "🤖 رباتت رو چطور می‌خوای؟ چه قابلیت‌هایی نیاز داری؟ از کجا باید اطلاعات بگیره؟ به کجا ارسال کنه؟ هر چی تو ذهنت هست رو کامل توضیح بده..."
    : "🌐 سایتت رو چطور می‌خوای؟ فروشگاهی؟ شرکتی؟ شخصی؟ چه صفحاتی نیاز داری؟ چه امکاناتی؟ رنگ و استایل مورد علاقت چیه؟ کامل برامون بنویس...";

  w.document.open();
  w.document.write(`<!DOCTYPE html>
<html lang="fa" dir="rtl" class="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ثبت تیکت | ${serviceName}</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f7f5f2;
      --card: #ffffff;
      --soft: #f0ebe5;
      --hover: #fcfaf8;
      --text: #1e1a17;
      --muted: #4f4640;
      --light: #7a6e64;
      --border: #e9e3db;
      --border-dark: #d6cdc1;
      --accent: #b68b7c;
      --accent-light: #d4c4b8;
      --btn-bg: #1e1a17;
      --btn-text: #f5f2ed;
      --success: #5a9e96;
      --error: #c0392b;
      --warning: #b68b7c;
      --shadow: 0 4px 24px rgba(0,0,0,0.04);
      --shadow-lg: 0 12px 40px rgba(0,0,0,0.06);
    }
    html.dark {
      --bg: #141210;
      --card: #1f1b18;
      --soft: #26211d;
      --hover: #2c2722;
      --text: #ece6df;
      --muted: #b5a89a;
      --light: #8f8278;
      --border: #2f2924;
      --border-dark: #3b352f;
      --accent: #c9b09f;
      --accent-light: #a89080;
      --btn-bg: #ece6df;
      --btn-text: #1e1a17;
      --success: #6bbcb5;
      --error: #e74c3c;
      --warning: #d4a574;
      --shadow: 0 4px 24px rgba(0,0,0,0.3);
      --shadow-lg: 0 12px 40px rgba(0,0,0,0.5);
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
      max-width: 520px;
      background: var(--card);
      padding: 32px 28px;
      border-radius: 32px;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent), var(--accent-light), var(--accent));
      opacity: 0.5;
    }

    .eyebrow {
      display: inline-block;
      background: var(--soft);
      color: var(--light);
      padding: 0.3rem 1.2rem;
      border-radius: 50px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      margin-bottom: 0.8rem;
    }

    .service-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.3rem;
      color: var(--text);
    }

    .service-desc {
      color: var(--muted);
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }

    .input-group {
      margin-bottom: 0.8rem;
    }

    .input-group label {
      display: block;
      font-size: 0.8rem;
      color: var(--light);
      margin-bottom: 0.4rem;
      font-weight: 500;
    }

    .input-group input,
    .input-group textarea {
      width: 100%;
      padding: 0.9rem 1.1rem;
      border-radius: 16px;
      border: 1.5px solid var(--border-dark);
      font-family: 'Vazirmatn', sans-serif;
      font-size: 0.9rem;
      background: var(--card);
      color: var(--text);
      transition: all 0.2s;
    }

    .input-group input:focus,
    .input-group textarea:focus {
      border-color: var(--accent);
      background: var(--hover);
      box-shadow: 0 0 0 3px rgba(182,139,124,0.08);
    }

    .input-group input::placeholder,
    .input-group textarea::placeholder {
      color: var(--light);
      opacity: 0.7;
    }

    .input-group textarea {
      resize: vertical;
      min-height: 150px;
      line-height: 1.8;
    }

    .btn-submit {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 60px;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      background: var(--btn-bg);
      color: var(--btn-text);
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 0.5rem;
    }

    .btn-submit:hover:not(:disabled) {
      opacity: 0.85;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--border-dark);
      color: var(--light);
    }

    .status-msg {
      text-align: center;
      margin-top: 0.8rem;
      font-size: 0.82rem;
      min-height: 1.5rem;
      color: var(--muted);
    }

    .status-msg.error { color: var(--error); }
    .status-msg.warning { color: var(--warning); }

    /* Success Page */
    .success-wrapper {
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

    .success-particles {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .particle {
      position: absolute;
      border-radius: 50%;
      background: var(--accent);
      opacity: 0.4;
    }

    .success-card {
      position: relative;
      z-index: 1;
      background: var(--card);
      width: 100%;
      max-width: 440px;
      padding: 40px 30px;
      border-radius: 32px;
      text-align: center;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
      animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes popIn {
      from { opacity: 0; transform: scale(0.85) translateY(30px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .success-icon-wrap {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
    }

    .success-ripple {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: rgba(90,158,150,0.1);
      animation: ripple 2s ease-out infinite;
    }

    .success-ripple:nth-child(1) { width: 80px; height: 80px; }
    .success-ripple:nth-child(2) { width: 60px; height: 60px; animation-delay: 0.5s; }

    @keyframes ripple {
      0% { transform: translate(-50%, -50%) scale(0.6); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
    }

    .success-icon-inner {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      background: rgba(90,158,150,0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: scaleIn 0.5s ease 0.2s both;
    }

    @keyframes scaleIn {
      from { transform: translate(-50%, -50%) scale(0); }
      to { transform: translate(-50%, -50%) scale(1); }
    }

    .success-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.3rem;
      animation: fadeUp 0.5s ease 0.3s both;
    }

    .success-sub {
      color: var(--muted);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      animation: fadeUp 0.5s ease 0.35s both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .tracking-box {
      background: var(--soft);
      padding: 1rem;
      border-radius: 16px;
      margin-bottom: 1rem;
      border: 1px solid var(--border);
      animation: fadeUp 0.5s ease 0.4s both;
    }

    .tracking-label {
      font-size: 0.7rem;
      color: var(--light);
      letter-spacing: 0.04em;
      margin-bottom: 0.3rem;
    }

    .tracking-code {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.12em;
      font-family: 'JetBrains Mono', monospace;
      direction: ltr;
    }

    .tracking-hint {
      font-size: 0.7rem;
      color: var(--light);
      margin-top: 0.2rem;
    }

    .support-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      margin-bottom: 1.5rem;
      color: var(--muted);
      font-size: 0.82rem;
      animation: fadeUp 0.5s ease 0.55s both;
    }

    .countdown-wrap {
      animation: fadeUp 0.5s ease 0.6s both;
    }

    .countdown-bar {
      height: 4px;
      background: var(--soft);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 0.6rem;
    }

    .countdown-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), var(--accent-light));
      border-radius: 8px;
      animation: countdownAnim 15s linear forwards;
    }

    @keyframes countdownAnim {
      from { width: 100%; }
      to { width: 0%; }
    }

    .countdown-text {
      font-size: 0.78rem;
      color: var(--light);
    }

    .countdown-num {
      color: var(--accent);
      font-weight: 700;
      font-size: 0.95rem;
    }

    .btn-back {
      margin-top: 1.2rem;
      padding: 0.8rem 2.5rem;
      background: var(--btn-bg);
      color: var(--btn-text);
      border: none;
      border-radius: 60px;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      animation: fadeUp 0.5s ease 0.7s both;
    }

    .btn-back:hover {
      opacity: 0.85;
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }

    .btn-back:focus,
    .btn-back:focus-visible,
    .btn-back:active {
      outline: none !important;
      box-shadow: none !important;
      -webkit-tap-highlight-color: transparent !important;
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

    @media (max-width: 500px) {
      .card { padding: 24px 18px; border-radius: 26px; }
      .success-card { padding: 28px 18px; }
      .tracking-code { font-size: 1.4rem; }
    }
  </style>
</head>
<body>
  <div class="card" id="mainCard">
    <span class="eyebrow">ثبت تیکت</span>
    <div class="service-name">${serviceName}</div>
    <p class="service-desc">${isRobot ? 'تمام جزئیات رباتی که می‌خوای رو برامون بنویس. قابلیت‌ها، نحوه کار، و هر چیزی که به ذهنت می‌رسه.' : 'سایتی که تو ذهنت داری رو کامل توصیف کن. نوع سایت، امکانات، رنگ‌ها، و هر جزئیاتی که فکر می‌کنی لازمه بدونیم.'}</p>

    <div class="input-group">
      <label>✈️ آیدی تلگرام</label>
      <input type="text" id="telegramId" placeholder="مثال: @username">
    </div>
    <div class="input-group">
      <label>📞 شماره تماس</label>
      <input type="tel" id="phoneNumber" placeholder="شماره موبایل خود را وارد کنید">
    </div>
    <div class="input-group">
      <label>📝 توضیحات پروژه</label>
      <textarea id="description" placeholder="${placeholderText}"></textarea>
    </div>

    <button class="btn-submit" id="submitBtn">📨 ثبت تیکت</button>
    <div class="status-msg" id="statusMsg"></div>
  </div>

  <script>
    var submitBtn = document.getElementById("submitBtn");
    var statusMsg = document.getElementById("statusMsg");
    var tgInput = document.getElementById("telegramId");
    var phoneInput = document.getElementById("phoneNumber");
    var descInput = document.getElementById("description");
    var trackingCode = "${trackingCode}";

    submitBtn.onclick = function() {
      var now = Date.now();
      var lastSent = parseInt(localStorage.getItem("lastTicketTime") || "0");
      var timeDiff = now - lastSent;

      if (timeDiff < ${SPAM_TIME}) {
        var waitSeconds = Math.ceil((${SPAM_TIME} - timeDiff) / 1000);
        statusMsg.textContent = "⏳ لطفاً " + waitSeconds + " ثانیه دیگر صبر کنید...";
        statusMsg.className = 'status-msg warning';
        return;
      }

      if (!tgInput.value.trim()) {
        statusMsg.textContent = "❌ لطفاً آیدی تلگرام خود را وارد کنید";
        statusMsg.className = 'status-msg error';
        return;
      }
      if (!phoneInput.value.trim()) {
        statusMsg.textContent = "❌ لطفاً شماره تماس خود را وارد کنید";
        statusMsg.className = 'status-msg error';
        return;
      }
      if (!descInput.value.trim()) {
        statusMsg.textContent = "❌ لطفاً توضیحات پروژه را وارد کنید";
        statusMsg.className = 'status-msg error';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "⏳ در حال ثبت...";
      statusMsg.textContent = '';
      statusMsg.className = 'status-msg';

      var caption = "🎫 تیکت جدید: ${serviceName}\\n🔢 کد پیگیری: " + trackingCode + "\\n👤 تلگرام: " + tgInput.value.trim() + "\\n📞 شماره: " + phoneInput.value.trim() + "\\n📝 توضیحات:\\n" + descInput.value.trim();

      var fd = new FormData();
      fd.append("caption", caption);

      fetch("https://api-sidkashop.amirsidka.workers.dev", {
        method: "POST",
        body: fd
      })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.ok) {
          localStorage.setItem("lastTicketTime", Date.now().toString());
          showSuccess();
        } else {
          submitBtn.disabled = false;
          submitBtn.textContent = "📨 ثبت تیکت";
          statusMsg.textContent = "❌ خطا در ثبت تیکت. دوباره تلاش کنید.";
          statusMsg.className = 'status-msg error';
        }
      })
      .catch(function() {
        submitBtn.disabled = false;
        submitBtn.textContent = "📨 ثبت تیکت";
        statusMsg.textContent = "❌ خطای شبکه. لطفاً VPN را روشن کنید.";
        statusMsg.className = 'status-msg error';
      });
    };

    function showSuccess() {
      var countdown = 15;
      document.body.innerHTML = '';
      var wrapper = document.createElement('div');
      wrapper.className = 'success-wrapper';

      var particles = document.createElement('div');
      particles.className = 'success-particles';
      particles.innerHTML = 
        '<div class="particle" style="top:10%;left:10%;width:8px;height:8px;animation:fa 3s ease-in-out infinite;"></div>' +
        '<div class="particle" style="top:20%;right:15%;width:10px;height:10px;animation:fb 4s ease-in-out infinite;opacity:0.3;background:var(--success);"></div>' +
        '<div class="particle" style="bottom:30%;left:20%;width:6px;height:6px;animation:fc 3.5s ease-in-out infinite;opacity:0.5;"></div>' +
        '<div class="particle" style="top:60%;right:10%;width:8px;height:8px;animation:fa 2.8s ease-in-out infinite;opacity:0.35;background:var(--success);"></div>' +
        '<div class="particle" style="bottom:15%;right:25%;width:7px;height:7px;animation:fb 4.2s ease-in-out infinite;opacity:0.45;"></div>' +
        '<div class="particle" style="top:40%;left:5%;width:5px;height:5px;animation:fc 3.2s ease-in-out infinite;opacity:0.25;background:var(--text);"></div>';

      var card = document.createElement('div');
      card.className = 'success-card';
      card.innerHTML = 
        '<div class="success-icon-wrap">' +
          '<div class="success-ripple"></div>' +
          '<div class="success-ripple"></div>' +
          '<div class="success-icon-inner">' +
            '<svg width="28" height="28" viewBox="0 0 52 52">' +
              '<circle cx="26" cy="26" r="24" fill="none" stroke="var(--success)" stroke-width="3" stroke-dasharray="151" stroke-dashoffset="151" style="animation:dc 0.4s ease 0.3s forwards;"/>' +
              '<path d="M15 27 L23 36 L38 17" fill="none" stroke="var(--success)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="35" stroke-dashoffset="35" style="animation:dp 0.3s ease 0.7s forwards;"/>' +
            '</svg>' +
          '</div>' +
        '</div>' +
        '<h2 class="success-title">✅ تیکت شما ثبت شد!</h2>' +
        '<p class="success-sub">کارشناسان ما به زودی بررسی می‌کنن و باهات تماس می‌گیرن</p>' +
        '<div class="tracking-box">' +
          '<div class="tracking-label">🔢 کد پیگیری</div>' +
          '<div class="tracking-code">' + trackingCode + '</div>' +
          '<div class="tracking-hint">این کد را نزد خود نگه دارید</div>' +
        '</div>' +
        '<div class="support-text"><span>📞</span><span>تا ۲۴ ساعت آینده باهات تماس می‌گیریم</span></div>' +
        '<div class="countdown-wrap">' +
          '<div class="countdown-bar"><div class="countdown-fill"></div></div>' +
          '<p class="countdown-text">🔄 بازگشت خودکار در <span class="countdown-num" id="timer">' + countdown + '</span> ثانیه</p>' +
        '</div>' +
        '<button class="btn-back" id="backBtn">🏠 بازگشت به سایت</button>';

      var style = document.createElement('style');
      style.textContent = '@keyframes dc{to{stroke-dashoffset:0}}@keyframes dp{to{stroke-dashoffset:0}}';

      wrapper.appendChild(particles);
      wrapper.appendChild(card);
      wrapper.appendChild(style);
      document.body.appendChild(wrapper);

      document.getElementById('backBtn').onclick = function() {
        window.opener ? window.close() : window.location.href = '${SITE_URL}';
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
          window.location.href = '${SITE_URL}';
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
      --hover: #fcfaf8;
      --text: #1e1a17;
      --muted: #4f4640;
      --light: #7a6e64;
      --border: #e9e3db;
      --border-dark: #d6cdc1;
      --accent: #b68b7c;
      --accent-glow: #c9a063;
      --success: #5a9e96;
      --btn-bg: #1e1a17;
      --btn-text: #f5f2ed;
      --shadow: 0 8px 30px rgba(0,0,0,0.04);
    }
    html.dark {
      --bg: #141210;
      --card: #1f1b18;
      --soft: #26211d;
      --hover: #2c2722;
      --text: #ece6df;
      --muted: #b5a89a;
      --light: #8f8278;
      --border: #2f2924;
      --border-dark: #3b352f;
      --accent: #c9b09f;
      --accent-glow: #c9b09f;
      --success: #6bbcb5;
      --btn-bg: #ece6df;
      --btn-text: #1e1a17;
      --shadow: 0 8px 30px rgba(0,0,0,0.3);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; outline: none !important; }
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
      max-width: 720px;
      background: var(--card);
      border-radius: 32px;
      padding: 2.5rem 2rem;
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
    }
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text);
    }
    .group {
      margin-bottom: 1.2rem;
      background: var(--soft);
      border-radius: 20px;
      padding: 1.2rem 1.5rem;
      border: 1px solid var(--border);
      transition: all 0.2s;
    }
    .back-btn:focus,
    .back-btn:focus-visible,
    .back-btn:active {
      outline: none !important;
      box-shadow: none !important;
      -webkit-tap-highlight-color: transparent !important;
    }
    .group:hover {
      background: var(--hover);
      transform: translateX(-2px);
    }
    .group h3 {
      color: var(--accent);
      margin-bottom: 0.6rem;
      font-size: 1rem;
      font-weight: 700;
    }
    .group ul { list-style: none; padding: 0; }
    .group li {
      margin: 0.4rem 0;
      font-size: 0.85rem;
      padding: 0.4rem 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex-wrap: wrap;
    }
    .group li:last-child { border-bottom: none; }
    .group code {
      background: var(--card);
      color: var(--accent);
      padding: 0.15rem 0.7rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
      border: 1px solid var(--border-dark);
      font-family: 'JetBrains Mono', monospace;
    }
    .back-btn {
      display: block;
      width: fit-content;
      margin: 2rem auto 0;
      padding: 0.9rem 2.8rem;
      background: var(--btn-bg);
      color: var(--btn-text);
      border: none;
      border-radius: 50px;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .back-btn:hover {
      opacity: 0.85;
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }
    @media (max-width: 500px) {
      .container { padding: 1.5rem 1.2rem; }
      .group { padding: 1rem; }
      .group code { font-size: 0.75rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>✨ قابلیت‌های سلف تلگرام ✨</h2>
    
    <div class="group"><h3>🕒 ساعت و بیو</h3><ul><li><code>.تایم روشن</code> فعال کردن نمایش ساعت در اسم</li><li><code>.تایم خاموش</code> غیرفعال کردن ساعت</li><li><code>.بیو روشن</code> قرار دادن ساعت داخل بیو</li><li><code>.بیو خاموش</code> حذف ساعت از بیو</li></ul></div>
    
    <div class="group"><h3>🎨 فونت و زیبایی</h3><ul><li><code>.فونت ها</code> نمایش لیست فونت‌ها</li><li><code>.تنظیم فونت n</code> تنظیم فونت</li><li><code>.لایک اسم مورد نظر</code> ساخت لایک</li><li><code>.بیو رندوم</code> تولید بیوی تصادفی</li></ul></div>
    
    <div class="group"><h3>📢 بنر و گروه‌ها</h3><ul><li><code>.بنر</code> ارسال پیام به گروه‌ها</li><li><code>.بنر غیرفعال</code> توقف ارسال</li><li><code>.حذف بنر</code> حذف گروه از لیست</li><li><code>.حذف بنر غیرفعال</code> بازگرداندن گروه</li></ul></div>
    
    <div class="group"><h3>🧑‍💻 وضعیت آنلاین</h3><ul><li><code>.برجسته فعال</code> / <code>.برجسته غیرفعال</code></li><li><code>.آنلاین فعال</code> / <code>.آنلاین خاموش</code></li><li><code>.کج فعال</code> / <code>.کج غیرفعال</code></li><li><code>.تکی فعال</code> / <code>.تکی غیرفعال</code></li></ul></div>
    
    <div class="group"><h3>🔒 جوین اجباری</h3><ul><li><code>.معاف جوین اجباری [ایدی]</code></li><li><code>.حذف معاف جوین اجباری [ایدی]</code></li><li><code>.پیوی قفل</code> / <code>.پیوی باز</code></li><li><code>.قفل ایدی چنل</code> / <code>.حذف قفل ایدی چنل</code></li></ul></div>
    
    <div class="group"><h3>👥 مدیریت کاربران</h3><ul><li><code>.سکوت</code> / <code>.حذف سکوت</code></li><li><code>.دشمن</code> / <code>.حذف دشمن</code></li><li><code>.آیدی</code> نمایش اطلاعات</li></ul></div>
    
    <div class="group"><h3>📄 ذخیره‌سازی</h3><ul><li><code>.تنظیم ریلم</code> / <code>.حذف ریلم</code></li><li><code>.پشتیبانگیری از چت ها</code></li><li><code>.پشتیبانگیری از چت</code></li></ul></div>
    
    <div class="group"><h3>🚫 فیلتر کلمات</h3><ul><li><code>.فیلتر کلمه کلمه1، کلمه2</code></li><li><code>.حذف کلمه فیلتر کلمه1</code></li><li><code>.لیست کلمات فیلتر شده</code></li></ul></div>
    
    <div class="group"><h3>🛠️ متفرقه</h3><ul><li><code>.ارز</code> <code>.فال</code> <code>.سرعت</code> <code>.بگو text</code> <code>.انقضا</code> <code>.تاریخ</code> <code>.حساب 2+2</code> <code>.ترجمه test</code></li></ul></div>
    
    <div class="group"><h3>🎉 فان</h3><ul><li><code>.دوست دارم</code> <code>.جوک</code> <code>.خنده</code> <code>.قلب</code> <code>.فاک</code> <code>.گل</code> <code>.دختر</code></li></ul></div>

    <button class="back-btn" onclick="window.opener ? window.close() : window.location.href='${SITE_URL}';">🔙 بازگشت به سایت</button>
  </div>
</body>
</html>`);
  w.document.close();
}
