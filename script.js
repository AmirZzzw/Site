/* ===== script.js ===== */
/* طراحی کامل و حرفه‌ای - سیدکا شاپ */

const SITE_URL = "https://sidkashop.qzz.io";
const SPAM_TIME = 60 * 1000;
const FETCH_TIMEOUT = 120000;
const MAX_RETRIES = 3;

/**********************
GENERATE TRACKING CODE
**********************/
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

/**********************
PAYMENT PAGE
**********************/
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
      --warning: #c2956a;
      --shadow: 0 4px 24px rgba(0,0,0,0.06);
      --shadow-lg: 0 12px 40px rgba(0,0,0,0.1);
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

    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family: 'Vazirmatn', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      line-height: 1.7;
      transition: background 0.3s, color 0.3s;
    }

    .card {
      background: var(--card);
      width: 100%;
      max-width: 480px;
      border-radius: 32px;
      padding: 2.5rem 2rem;
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
      height: 4px;
      background: linear-gradient(90deg, var(--accent), var(--accent-light), var(--accent));
      opacity: 0.6;
    }

    /* Header */
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
    }

    .price-tag .currency {
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--muted);
      margin-right: 0.3rem;
    }

    /* VPN Notice */
    .vpn-alert {
      background: linear-gradient(135deg, rgba(182,139,124,0.1), rgba(182,139,124,0.05));
      border: 1px solid var(--accent-light);
      border-radius: 16px;
      padding: 1rem 1.2rem;
      margin: 1.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 0.82rem;
      color: var(--muted);
      transition: all 0.3s;
    }

    .vpn-alert .icon {
      font-size: 1.6rem;
      flex-shrink: 0;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.1); opacity: 1; }
    }

    .vpn-alert strong {
      color: var(--accent);
    }

    /* Bank Info */
    .bank-box {
      background: var(--soft);
      border-radius: 20px;
      padding: 1.2rem;
      text-align: center;
      margin-bottom: 1.5rem;
      border: 1px solid var(--border);
      transition: all 0.3s;
    }

    .bank-box .label {
      font-size: 0.75rem;
      color: var(--light);
      margin-bottom: 0.3rem;
      letter-spacing: 0.03em;
    }

    .bank-box .card-no {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text);
      letter-spacing: 0.1em;
      direction: ltr;
      display: inline-block;
      font-family: monospace;
      background: var(--card);
      padding: 0.5rem 1.2rem;
      border-radius: 12px;
      margin: 0.5rem 0;
      border: 1px solid var(--border-dark);
    }

    .bank-box .owner {
      font-size: 0.85rem;
      color: var(--muted);
      font-weight: 500;
    }

    /* Upload */
    .upload-zone {
      border: 2px dashed var(--border-dark);
      border-radius: 20px;
      padding: 1.5rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s;
      background: var(--card);
      margin-bottom: 0.8rem;
      position: relative;
      overflow: hidden;
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
      background: rgba(90,158,150,0.05);
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
      font-weight: 500;
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

    /* Inputs */
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
      outline: none;
    }

    .input-group input:focus,
    .input-group textarea:focus {
      border-color: var(--accent);
      background: var(--hover);
      box-shadow: 0 0 0 3px rgba(182,139,124,0.1);
    }

    .input-group input::placeholder,
    .input-group textarea::placeholder {
      color: var(--light);
      opacity: 0.7;
    }

    .input-group textarea {
      resize: none;
      height: 75px;
    }

    /* Button */
    .btn-submit {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 16px;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      background: var(--btn-bg);
      color: var(--btn-text);
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 0.5rem;
      letter-spacing: 0.02em;
    }

    .btn-submit:hover:not(:disabled) {
      opacity: 0.88;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    .btn-submit:active:not(:disabled) {
      transform: scale(0.98);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--border-dark);
      color: var(--light);
    }

    /* Progress */
    .progress-wrap {
      margin-top: 1rem;
      display: none;
      background: var(--soft);
      border-radius: 18px;
      padding: 1.2rem;
      border: 1px solid var(--border);
      transition: all 0.3s;
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
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      filter: blur(4px);
    }

    .progress-sizes {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
      color: var(--light);
    }

    /* Status */
    .status-msg {
      text-align: center;
      margin-top: 0.8rem;
      font-size: 0.82rem;
      min-height: 1.5rem;
      font-weight: 500;
      transition: all 0.2s;
    }

    .status-msg.error { color: var(--error); }
    .status-msg.warning { color: var(--warning); }
    .status-msg.success { color: var(--success); }

    /* Retry */
    .retry-box {
      background: rgba(192,57,43,0.08);
      border: 1px solid rgba(192,57,43,0.25);
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

    /* Success Overlay */
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
    }

    .success-card {
      background: var(--card);
      border-radius: 36px;
      padding: 3rem 2rem;
      text-align: center;
      max-width: 440px;
      width: 100%;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
      animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes popIn {
      from { opacity: 0; transform: scale(0.8) translateY(30px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .success-icon {
      width: 80px;
      height: 80px;
      background: rgba(90,158,150,0.12);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 2.5rem;
      animation: popIn 0.6s ease 0.2s both;
    }

    .success-title {
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 0.3rem;
      animation: popIn 0.6s ease 0.3s both;
    }

    .success-sub {
      color: var(--muted);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      animation: popIn 0.6s ease 0.35s both;
    }

    .tracking-badge {
      background: var(--soft);
      border-radius: 16px;
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid var(--border);
      animation: popIn 0.6s ease 0.4s both;
    }

    .tracking-badge .track-label {
      font-size: 0.7rem;
      color: var(--light);
      letter-spacing: 0.06em;
      margin-bottom: 0.3rem;
    }

    .tracking-badge .track-code {
      font-size: 2rem;
      font-weight: 800;
      color: var(--accent);
      letter-spacing: 0.15em;
      direction: ltr;
      font-family: monospace;
    }

    .success-price {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 1rem 0 0.5rem;
      animation: popIn 0.6s ease 0.5s both;
    }

    .success-price .currency {
      font-size: 0.8rem;
      color: var(--muted);
      font-weight: 400;
    }

    .success-note {
      color: var(--light);
      font-size: 0.82rem;
      margin-bottom: 1.8rem;
      animation: popIn 0.6s ease 0.55s both;
    }

    .btn-back {
      display: inline-block;
      background: var(--btn-bg);
      color: var(--btn-text);
      padding: 0.9rem 2.5rem;
      border-radius: 50px;
      border: none;
      font-family: 'Vazirmatn', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      animation: popIn 0.6s ease 0.6s both;
    }

    .btn-back:hover {
      opacity: 0.85;
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }

    /* Mobile */
    @media (max-width: 500px) {
      .card { padding: 1.8rem 1.3rem; border-radius: 26px; }
      .price-tag { font-size: 2.2rem; }
      .bank-box .card-no { font-size: 1.2rem; letter-spacing: 0.05em; }
      .success-card { padding: 2rem 1.5rem; }
    }
  </style>
</head>
<body>
  <div class="card" id="mainCard">
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
        <span class="progress-detail" id="progressInfo">در حال آماده‌سازی...</span>
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
      🔄 در حال تلاش مجدد... (<span id="retryCount">1</span>/${MAX_RETRIES})<br>
      ⚠️ لطفاً <strong>VPN</strong> خود را بررسی کنید
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
    var progressInfo = document.getElementById("progressInfo");
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
      uploadZone.style.background = selectedFile ? 'rgba(90,158,150,0.05)' : 'var(--card)';
    };

    uploadZone.ondrop = function(e) {
      e.preventDefault();
      uploadZone.style.borderColor = 'var(--border-dark)';
      uploadZone.style.background = 'var(--card)';
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
      progressInfo.textContent = 'در حال آماده‌سازی...';
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
      if (pct >= 100) progressInfo.textContent = '✅ ارسال کامل شد!';
      else if (pct > 0) progressInfo.textContent = '📤 در حال ارسال... ' + pct + '%';
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
        uploadZone.style.borderColor = 'var(--error)';
        setTimeout(function() { uploadZone.style.borderColor = 'var(--border-dark)'; }, 1500);
        return;
      }

      if (!tgInput.value.trim()) {
        statusMsg.textContent = "❌ لطفاً آیدی تلگرام خود را وارد کنید";
        statusMsg.className = 'status-msg error';
        tgInput.focus();
        return;
      }

      if (!phoneInput.value.trim()) {
        statusMsg.textContent = "❌ لطفاً شماره تماس خود را وارد کنید";
        statusMsg.className = 'status-msg error';
        phoneInput.focus();
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
        progressInfo.textContent = '🔄 تلاش ' + retryAttempt + ' از ' + ${MAX_RETRIES};
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
      document.body.innerHTML = '';
      document.body.style.margin = '0';
      document.body.style.padding = '20px';
      document.body.style.display = 'flex';
      document.body.style.alignItems = 'center';
      document.body.style.justifyContent = 'center';
      document.body.style.minHeight = '100vh';
      document.body.style.background = 'var(--bg)';

      var sc = document.createElement('div');
      sc.className = 'success-card';
      sc.innerHTML =
        '<div class="success-icon">✅</div>' +
        '<h2 class="success-title">پرداخت موفقیت‌آمیز</h2>' +
        '<p class="success-sub">رسید شما با موفقیت ثبت شد</p>' +
        '<div class="tracking-badge">' +
          '<div class="track-label">🔢 کد پیگیری</div>' +
          '<div class="track-code">' + trackingCode + '</div>' +
        '</div>' +
        '<div class="success-price">${price.toLocaleString()} <span class="currency">تومان</span></div>' +
        '<p class="success-note">📞 تیم پشتیبانی به زودی با شما تماس می‌گیرد</p>' +
        '<button class="btn-back" onclick="window.opener ? window.close() : window.location.href=\\'${SITE_URL}\\'">🏠 بازگشت به سایت</button>';

      document.body.appendChild(sc);
    }
  <\/script>
</body>
</html>`);
  w.document.close();
}

/**********************
FEATURES PAGE
**********************/
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
      --btn-bg: #ece6df;
      --btn-text: #1e1a17;
      --shadow: 0 8px 30px rgba(0,0,0,0.3);
    }
    * { margin:0; padding:0; box-sizing:border-box; }
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
      transition: all 0.3s;
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
    .group ul {
      list-style: none;
      padding: 0;
    }
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
