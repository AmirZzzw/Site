/* ===== script.js ===== */
/* هماهنگ‌سازی کامل دیزاین صفحات پرداخت و قابلیت‌ها با تم اصلی سایت */

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

/**********************
دریافت تم فعلی از صفحه اصلی
**********************/
function getCurrentTheme() {
    return document.body.classList.contains('dark') ? 'dark' : 'light';
}

/**********************
PAYMENT PAGE (بازطراحی‌شده با تم اصلی)
**********************/
function openPaymentPage(productName, price) {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  const trackingCode = generateTrackingCode();
  const currentTheme = getCurrentTheme();

  w.document.open();
  w.document.write(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl" class="${currentTheme}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>پرداخت | ${productName}</title>
      <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
      <style>
        :root {
          --bg: #f7f5f2;
          --bg-card: #ffffff;
          --bg-soft: #f0ebe5;
          --text: #1e1a17;
          --text-muted: #4f4640;
          --text-light: #7a6e64;
          --border: #e9e3db;
          --border-dark: #d6cdc1;
          --accent: #b68b7c;
          --btn-bg: #1e1a17;
          --btn-text: #f5f2ed;
          --success: #3FA9A0;
          --warning: #b68b7c;
          --error: #c0392b;
        }

        html.dark {
          --bg: #141210;
          --bg-card: #1f1b18;
          --bg-soft: #26211d;
          --text: #ece6df;
          --text-muted: #b5a89a;
          --text-light: #8f8278;
          --border: #2f2924;
          --border-dark: #3b352f;
          --accent: #c9b09f;
          --btn-bg: #ece6df;
          --btn-text: #1e1a17;
          --success: #6bbcb5;
          --warning: #c9b09f;
          --error: #e74c3c;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          outline: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        body {
          font-family: 'Vazirmatn', sans-serif;
          background-color: var(--bg);
          color: var(--text);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          transition: background-color 0.3s, color 0.3s;
          line-height: 1.6;
        }

        .card {
          width: 100%;
          max-width: 480px;
          background: var(--bg-card);
          padding: 2rem 1.8rem;
          border-radius: 40px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
          border: 1px solid var(--border);
          transition: background 0.3s, border 0.3s;
        }

        h3 {
          text-align: center;
          margin-bottom: 0.3rem;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text);
        }

        .price {
          text-align: center;
          margin-bottom: 1.8rem;
          font-size: 2rem;
          font-weight: 700;
          color: var(--text);
        }

        .price span {
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--text-light);
        }

        .vpn-notice {
          background: var(--bg-soft);
          border: 1px solid var(--border-dark);
          border-radius: 20px;
          padding: 0.8rem 1.2rem;
          text-align: center;
          margin-bottom: 1.8rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.3s, border 0.3s;
        }

        .vpn-notice .icon {
          font-size: 1.3rem;
        }

        .bank {
          background: var(--bg-card);
          padding: 1.2rem;
          border-radius: 24px;
          text-align: center;
          margin-bottom: 1.8rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 2;
          border: 1px solid var(--border);
          transition: background 0.3s, border 0.3s;
        }

        .card-number {
          font-size: 1.3rem;
          color: var(--text);
          letter-spacing: 2px;
          direction: ltr;
          display: inline-block;
          background: var(--bg-soft);
          padding: 0.4rem 1.2rem;
          border-radius: 14px;
          margin: 0.4rem 0;
          font-weight: 600;
          transition: background 0.3s;
        }

        .upload-area {
          border: 2px dashed var(--border-dark);
          border-radius: 20px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          margin-bottom: 1rem;
          transition: all 0.2s;
          background: var(--bg-card);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
        }

        .upload-area:hover {
          border-color: var(--accent);
          background: var(--bg-soft);
        }

        .upload-area.has-file {
          border-color: var(--success);
          border-style: solid;
          background: var(--bg-soft);
        }

        .upload-icon { font-size: 2rem; }
        .upload-text { font-size: 0.85rem; color: var(--text-light); }
        .file-name { font-size: 0.8rem; color: var(--accent); word-break: break-all; font-weight: 500; }
        .file-size { font-size: 0.7rem; color: var(--text-light); }

        input, textarea {
          width: 100%;
          margin-top: 0.8rem;
          padding: 0.9rem 1rem;
          border-radius: 18px;
          border: 1.5px solid var(--border-dark);
          font-family: 'Vazirmatn', sans-serif;
          font-size: 0.9rem;
          background: var(--bg-card);
          color: var(--text);
          transition: 0.2s;
        }

        input:focus, textarea:focus {
          border-color: var(--accent);
          background: var(--bg-soft);
        }

        textarea {
          resize: none;
          height: 80px;
        }

        .btn {
          display: block;
          width: 100%;
          margin-top: 1.2rem;
          padding: 0.9rem;
          border: none;
          border-radius: 60px;
          font-family: 'Vazirmatn', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          background: var(--btn-bg);
          color: var(--btn-text);
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }

        .btn:hover:not(:disabled) {
          opacity: 0.85;
          transform: scale(0.99);
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          background: var(--border-dark);
          color: var(--text-light);
        }

        .progress-container {
          margin-top: 1rem;
          display: none;
          background: var(--bg-soft);
          padding: 1rem;
          border-radius: 18px;
          border: 1px solid var(--border);
          transition: background 0.3s;
        }

        .progress-container.active { display: block; }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .progress-bar-outer {
          height: 6px;
          background: var(--bg-card);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-bar-inner {
          height: 100%;
          background: var(--accent);
          border-radius: 10px;
          width: 0%;
          transition: width 0.3s;
        }

        #status {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.85rem;
          min-height: 1.5rem;
          color: var(--text-muted);
        }

        #status.error { color: var(--error); }
        #status.warning { color: var(--warning); }

        .retry-info {
          background: var(--bg-soft);
          border: 1px solid var(--border-dark);
          border-radius: 14px;
          padding: 0.6rem 1rem;
          margin-top: 0.8rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
          display: none;
        }
        .retry-info.show { display: block; }

        /* Success page animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h3>${productName}</h3>
        <div class="price">${price.toLocaleString()} <span>تومان</span></div>

        <div class="vpn-notice">
          <span class="icon">🔐</span>
          <span>⚠️ برای ارسال رسید، <b>VPN</b> باید روشن باشد</span>
        </div>

        <div class="bank">
          <div>📱 شماره کارت جهت واریز</div>
          <div class="card-number">6219 8614 5364 0772</div>
          <div>به نام: <b style="color: var(--text);">امیرمحمد یوسفی</b></div>
        </div>

        <div class="upload-area" id="uploadArea">
          <div class="upload-icon" id="uploadIcon">📁</div>
          <div class="upload-text" id="uploadText">برای آپلود تصویر رسید کلیک کنید</div>
          <div class="file-name" id="fileName"></div>
          <div class="file-size" id="fileSize"></div>
          <input type="file" id="receiptImage" accept="image/*" style="display:none;">
        </div>

        <input type="text" id="telegramId" placeholder="✈️ آیدی تلگرام (مثال: @username)">
        <input type="tel" id="phoneNumber" placeholder="📞 شماره تماس">
        <textarea id="description" placeholder="📝 توضیحات (اختیاری)"></textarea>

        <button class="btn" id="sendBtn">📨 ارسال رسید</button>

        <div class="progress-container" id="progressContainer">
          <div class="progress-header">
            <span id="progressPercent">0%</span>
            <span id="progressInfo">در حال آماده‌سازی...</span>
          </div>
          <div class="progress-bar-outer">
            <div class="progress-bar-inner" id="progressBar"></div>
          </div>
        </div>

        <div class="retry-info" id="retryInfo">
          🔄 در حال تلاش مجدد... (<span id="retryCount">1</span>/${MAX_RETRIES})
        </div>

        <div id="status"></div>
      </div>

      <script>
        /* اسکریپت داخلی صفحه پرداخت (بدون تغییر در منطق اصلی) */
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
          if (e.dataTransfer.files.length > 0) {
            imgInput.files = e.dataTransfer.files;
            handleFileSelect();
          }
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
          retryInfo.classList.remove('show');
        }

        function updateProgress(loaded, total) {
            var percent = Math.round((loaded / total) * 100);
            progressBar.style.width = percent + '%';
            progressPercent.innerText = percent + '%';
            if (percent >= 100) progressInfo.innerText = '✅ ارسال شد!';
            else if (percent > 0) progressInfo.innerText = '📤 در حال ارسال... ' + percent + '%';
        }

        sendBtn.onclick = function() {
          var now = Date.now();
          var lastSent = parseInt(localStorage.getItem("lastSentTime") || "0");
          if (now - lastSent < ${SPAM_TIME}) {
            var wait = Math.ceil((${SPAM_TIME} - (now - lastSent)) / 1000);
            statusDiv.innerText = "⏳ لطفاً " + wait + " ثانیه دیگر صبر کنید...";
            statusDiv.className = 'warning';
            return;
          }
          if (!selectedFile) {
            statusDiv.innerText = "❌ لطفاً تصویر رسید را آپلود کنید.";
            statusDiv.className = 'error';
            return;
          }
          if (!tgInput.value.trim()) {
            statusDiv.innerText = "❌ لطفاً آیدی تلگرام خود را وارد کنید.";
            statusDiv.className = 'error';
            return;
          }
          if (!phoneInput.value.trim()) {
            statusDiv.innerText = "❌ لطفاً شماره تماس خود را وارد کنید.";
            statusDiv.className = 'error';
            return;
          }

          sendBtn.disabled = true;
          sendBtn.innerText = "⏳ در حال ارسال...";
          statusDiv.innerText = "";
          statusDiv.className = '';
          resetProgress();
          progressContainer.classList.add('active');
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
                  showSuccessPage(${price}, trackingCode);
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
            setTimeout(function() { sendToTelegram(selectedFile); }, 2000);
          } else {
            retryInfo.classList.remove('show');
            progressContainer.classList.remove('active');
            sendBtn.disabled = false;
            sendBtn.innerText = "📨 ارسال مجدد";
            statusDiv.innerText = errorType === 'timeout' || errorType === 'abort' ? "⏰ زمان ارسال طولانی شد. VPN را بررسی کنید." : "❌ خطا در ارسال. لطفاً دوباره تلاش کنید.";
            statusDiv.className = 'error';
          }
        }

        function showSuccessPage(price, code) {
          document.body.innerHTML = '';
          document.body.style.margin = '0';
          var wrapper = document.createElement('div');
          wrapper.style.cssText = 'min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;';
          wrapper.innerHTML =
            '<div style="background:var(--bg-card);padding:2.5rem 2rem;border-radius:40px;max-width:440px;width:100%;text-align:center;border:1px solid var(--border);animation: fadeInUp 0.6s ease;">' +
              '<div style="font-size:3rem;margin-bottom:1rem;">✅</div>' +
              '<h2 style="margin-bottom:0.5rem;">پرداخت موفق!</h2>' +
              '<p style="color:var(--text-muted);margin-bottom:1.5rem;">رسید شما با موفقیت ثبت شد</p>' +
              '<div style="background:var(--bg-soft);padding:1rem;border-radius:20px;margin-bottom:1.2rem;">کد پیگیری: <b style="letter-spacing:4px;direction:ltr;display:inline-block;">' + code + '</b></div>' +
              '<div style="font-size:1.4rem;font-weight:700;">' + price.toLocaleString() + ' تومان</div>' +
              '<p style="color:var(--text-light);font-size:0.85rem;margin-top:1rem;">تیم پشتیبانی به زودی با شما تماس می‌گیرد</p>' +
              '<button onclick="window.close();" style="margin-top:1.5rem;background:var(--btn-bg);color:var(--btn-text);border:none;padding:0.8rem 2rem;border-radius:60px;cursor:pointer;font-family:inherit;">🏠 بازگشت</button>' +
            '</div>';
          document.body.appendChild(wrapper);
        }
      <\/script>
    </body>
    </html>
  `);
  w.document.close();
}

/**********************
FEATURES PAGE (بازطراحی‌شده با تم اصلی)
**********************/
function openFeaturesPage() {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  const currentTheme = getCurrentTheme();

  w.document.open();
  w.document.write(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl" class="${currentTheme}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>قابلیت‌های سلف تلگرام</title>
      <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
      <style>
        :root {
          --bg: #f7f5f2;
          --bg-card: #ffffff;
          --bg-soft: #f0ebe5;
          --text: #1e1a17;
          --text-muted: #4f4640;
          --text-light: #7a6e64;
          --border: #e9e3db;
          --border-dark: #d6cdc1;
          --accent: #b68b7c;
          --btn-bg: #1e1a17;
          --btn-text: #f5f2ed;
        }
        html.dark {
          --bg: #141210;
          --bg-card: #1f1b18;
          --bg-soft: #26211d;
          --text: #ece6df;
          --text-muted: #b5a89a;
          --text-light: #8f8278;
          --border: #2f2924;
          --border-dark: #3b352f;
          --accent: #c9b09f;
          --btn-bg: #ece6df;
          --btn-text: #1e1a17;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
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
          background: var(--bg-card);
          border-radius: 40px;
          padding: 2.5rem 2rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
          border: 1px solid var(--border);
        }
        h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--text);
          font-size: 1.8rem;
          font-weight: 700;
        }
        .command-group {
          margin-bottom: 1.5rem;
          background: var(--bg-soft);
          border-radius: 20px;
          padding: 1.2rem;
          border: 1px solid var(--border);
          transition: background 0.3s;
        }
        .command-group h3 {
          color: var(--accent);
          margin-bottom: 0.8rem;
          font-size: 1rem;
          font-weight: 600;
        }
        .command-group ul { list-style: none; padding: 0; }
        .command-group li {
          margin: 0.4rem 0;
          font-size: 0.85rem;
          padding: 0.3rem 0;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .command-group li:last-child { border-bottom: none; }
        .command-group code {
          background: var(--bg-card);
          color: var(--accent);
          padding: 0.1rem 0.6rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          white-space: nowrap;
        }
        .back-btn {
          display: block;
          width: fit-content;
          margin: 2rem auto 0;
          padding: 0.8rem 2.5rem;
          background: var(--btn-bg);
          color: var(--btn-text);
          border: none;
          border-radius: 60px;
          font-family: 'Vazirmatn', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .back-btn:hover { opacity: 0.85; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>✨ قابلیت‌های سلف تلگرام ✨</h2>
        <div class="command-group"><h3>🕒 ساعت و بیو</h3><ul><li><code>.تایم روشن</code> فعال کردن نمایش ساعت در اسم.</li><li><code>.تایم خاموش</code> غیرفعال کردن ساعت.</li><li><code>.بیو روشن</code> قرار دادن ساعت داخل بیو.</li><li><code>.بیو خاموش</code> حذف ساعت از بیو.</li></ul></div>
        <div class="command-group"><h3>🎨 فونت و زیبایی</h3><ul><li><code>.فونت ها</code> نمایش لیست فونت‌ها.</li><li><code>.تنظیم فونت n</code> تنظیم فونت.</li><li><code>.لایک اسم مورد نظر</code> ساخت لایک.</li><li><code>.بیو رندوم</code> تولید بیوی تصادفی.</li></ul></div>
        <div class="command-group"><h3>📢 بنر و گروه‌ها</h3><ul><li><code>.بنر</code> ارسال پیام به گروه‌ها.</li><li><code>.بنر غیرفعال</code> توقف ارسال.</li><li><code>.حذف بنر</code> حذف گروه از لیست.</li></ul></div>
        <div class="command-group"><h3>🧑‍💻 وضعیت آنلاین</h3><ul><li><code>.برجسته فعال/غیرفعال</code></li><li><code>.آنلاین فعال/خاموش</code></li><li><code>.کج فعال/غیرفعال</code></li></ul></div>
        <div class="command-group"><h3>🔒 جوین اجباری</h3><ul><li><code>.معاف جوین اجباری [ایدی]</code></li><li><code>.پیوی قفل / پیوی باز</code></li><li><code>.قفل ایدی چنل</code></li></ul></div>
        <div class="command-group"><h3>👥 مدیریت کاربران</h3><ul><li><code>.سکوت / حذف سکوت</code></li><li><code>.دشمن / حذف دشمن</code></li><li><code>.آیدی</code> نمایش اطلاعات.</li></ul></div>
        <div class="command-group"><h3>📄 ذخیره‌سازی</h3><ul><li><code>.تنظیم ریلم / حذف ریلم</code></li><li><code>.پشتیبانگیری از چت ها</code></li></ul></div>
        <div class="command-group"><h3>🚫 فیلتر کلمات</h3><ul><li><code>.فیلتر کلمه کلمه1، کلمه2</code></li><li><code>.حذف کلمه فیلتر</code></li><li><code>.لیست کلمات فیلتر شده</code></li></ul></div>
        <div class="command-group"><h3>🛠️ متفرقه</h3><ul><li><code>.ارز</code> <code>.فال</code> <code>.سرعت</code> <code>.بگو text</code> <code>.انقضا</code> <code>.تاریخ</code> <code>.ترجمه test</code></li></ul></div>
        <div class="command-group"><h3>🎉 فان</h3><ul><li><code>.دوست دارم</code> <code>.جوک</code> <code>.خنده</code> <code>.قلب</code> <code>.فاک</code> <code>.گل</code> <code>.دختر</code></li></ul></div>
        <button class="back-btn" onclick="if(window.opener)window.close();else location.href='${SITE_URL}';">🔙 بازگشت به سایت</button>
      </div>
    </body>
    </html>
  `);
  w.document.close();
}
