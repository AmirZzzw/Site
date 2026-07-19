/**********************
CONFIG
**********************/
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
PAYMENT PAGE
**********************/
function openPaymentPage(productName, price) {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  const trackingCode = generateTrackingCode();

  w.document.open();
  w.document.write(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>پرداخت | ${productName}</title>
      <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; outline: none !important; -webkit-tap-highlight-color: transparent !important; }
        
        body {
          font-family: 'Vazirmatn', 'Inter', sans-serif;
          background: #f7f5f2;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #1e1a17;
          transition: background 0.3s, color 0.3s;
        }
        
        body.dark {
          background: #141210;
          color: #ece6df;
        }
        
        .card {
          width: 100%;
          max-width: 460px;
          background: #ffffff;
          padding: 30px 25px;
          border-radius: 40px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.02);
          border: 1px solid #e9e3db;
          transition: background 0.3s, border 0.3s, box-shadow 0.3s;
        }
        
        body.dark .card {
          background: #1f1b18;
          border: 1px solid #2f2924;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        
        h3 { 
          text-align: center; 
          margin: 0 0 5px; 
          color: #1e1a17; 
          font-size: 20px;
          font-weight: 600;
          transition: color 0.3s;
        }
        
        body.dark h3 { color: #ece6df; }
        
        .price {
          text-align: center;
          margin: 8px 0 20px;
          font-size: 28px;
          color: #b68b7c;
          font-weight: 700;
        }
        
        .price span { 
          font-size: 13px; 
          color: #7a6e64; 
          font-weight: 400; 
          font-family: 'Vazirmatn', sans-serif;
        }
        
        body.dark .price span { color: #8f8278; }
        
        .vpn-notice {
          background: #f0ebe5;
          border: 1px solid #d6cdc1;
          border-radius: 16px;
          padding: 12px 16px;
          text-align: center;
          margin-bottom: 20px;
          font-size: 12px;
          color: #4f4640;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.3s, border 0.3s, color 0.3s;
        }
        
        body.dark .vpn-notice {
          background: #26211d;
          border: 1px solid #3b352f;
          color: #b5a89a;
        }
        
        .vpn-notice .highlight {
          color: #b68b7c;
          font-weight: bold;
          background: rgba(182, 139, 124, 0.1);
          padding: 2px 8px;
          border-radius: 6px;
          white-space: nowrap;
        }
        
        body.dark .vpn-notice .highlight { color: #c9b09f; }
        
        .bank {
          background: #f7f5f2;
          padding: 15px;
          border-radius: 16px;
          text-align: center;
          margin-bottom: 20px;
          font-size: 12px;
          color: #7a6e64;
          line-height: 2;
          border: 1px solid #e9e3db;
          border-right: 3px solid #b68b7c;
          transition: background 0.3s, border 0.3s, color 0.3s;
        }
        
        body.dark .bank {
          background: #26211d;
          border: 1px solid #2f2924;
          color: #8f8278;
        }
        
        .card-number {
          font-size: 18px;
          color: #1e1a17;
          letter-spacing: 2px;
          font-family: 'Inter', monospace;
          direction: ltr;
          display: inline-block;
          background: #ffffff;
          padding: 6px 14px;
          border-radius: 8px;
          margin: 6px 0;
          transition: background 0.3s, color 0.3s;
        }
        
        body.dark .card-number {
          background: #1f1b18;
          color: #ece6df;
        }
        
        .upload-area {
          border: 2px dashed #d6cdc1;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 15px;
          transition: all .3s;
          background: #f7f5f2;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        
        body.dark .upload-area {
          background: #26211d;
          border-color: #3b352f;
        }
        
        .upload-area:hover { border-color: #b68b7c; }
        body.dark .upload-area:hover { border-color: #c9b09f; }
        
        .upload-area.has-file {
          border-color: #b68b7c;
          border-style: solid;
          background: rgba(182, 139, 124, 0.05);
        }
        
        body.dark .upload-area.has-file {
          border-color: #c9b09f;
          background: rgba(201, 176, 159, 0.05);
        }
        
        .upload-icon { font-size: 32px; }
        .upload-text { font-size: 13px; color: #7a6e64; }
        body.dark .upload-text { color: #8f8278; }
        
        .file-name { font-size: 11px; color: #b68b7c; word-break: break-all; }
        body.dark .file-name { color: #c9b09f; }
        
        .file-size { font-size: 10px; color: #7a6e64; }
        body.dark .file-size { color: #8f8278; }
        
        .upload-area input { display: none; }
        
        input, textarea {
          width: 100%;
          margin-top: 10px;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid #d6cdc1;
          font-family: 'Vazirmatn', sans-serif;
          font-size: 13px;
          background: #f7f5f2;
          color: #1e1a17;
          transition: background 0.3s, border 0.3s, color 0.3s;
        }
        
        body.dark input, body.dark textarea {
          background: #26211d;
          border: 1px solid #3b352f;
          color: #ece6df;
        }
        
        input::placeholder, textarea::placeholder { color: #7a6e64; }
        body.dark input::placeholder, body.dark textarea::placeholder { color: #8f8278; }
        
        input:focus, textarea:focus { border-color: #b68b7c; }
        body.dark input:focus, body.dark textarea:focus { border-color: #c9b09f; }
        
        textarea { resize: none; height: 70px; }
        
        .send-btn {
          width: 100%;
          margin-top: 18px;
          padding: 14px;
          border: none;
          border-radius: 60px;
          font-family: 'Vazirmatn', sans-serif;
          font-size: 15px;
          font-weight: 600;
          background: #1e1a17;
          color: #f5f2ed;
          cursor: pointer;
          transition: all .3s;
        }
        
        body.dark .send-btn {
          background: #ece6df;
          color: #1e1a17;
        }
        
        .send-btn:hover:not(:disabled) { opacity: 0.8; transform: translateY(-2px); }
        .send-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .progress-container {
          margin-top: 15px;
          display: none;
          background: #f7f5f2;
          padding: 15px;
          border-radius: 16px;
          border: 1px solid #e9e3db;
        }
        
        body.dark .progress-container {
          background: #26211d;
          border: 1px solid #2f2924;
        }
        
        .progress-container.active { display: block; }
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 11px;
        }
        
        .progress-percent { 
          color: #b68b7c; 
          font-weight: bold; 
          font-size: 16px; 
          font-family: 'Inter', monospace;
        }
        
        body.dark .progress-percent { color: #c9b09f; }
        
        .progress-info { color: #7a6e64; font-size: 12px; }
        body.dark .progress-info { color: #8f8278; }
        
        .progress-bar-outer {
          height: 6px;
          background: #e9e3db;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        body.dark .progress-bar-outer { background: #2f2924; }
        
        .progress-bar-inner {
          height: 100%;
          background: #b68b7c;
          border-radius: 10px;
          width: 0%;
          transition: width 0.3s;
        }
        
        body.dark .progress-bar-inner { background: #c9b09f; }
        
        .progress-details {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #7a6e64;
          flex-wrap: wrap;
          gap: 4px;
        }
        
        body.dark .progress-details { color: #8f8278; }
        
        #status {
          text-align: center;
          margin-top: 12px;
          font-size: 12px;
          min-height: 18px;
          color: #7a6e64;
        }
        
        body.dark #status { color: #8f8278; }
        
        #status.error { color: #c0392b; }
        body.dark #status.error { color: #e74c3c; }
        
        #status.warning { color: #b68b7c; }
        body.dark #status.warning { color: #c9b09f; }
        
        #status.success { color: #b68b7c; }
        body.dark #status.success { color: #c9b09f; }
        
        .retry-info {
          background: rgba(192, 57, 43, 0.05);
          border: 1px solid rgba(192, 57, 43, 0.2);
          border-radius: 12px;
          padding: 10px 14px;
          margin-top: 10px;
          font-size: 11px;
          color: #c0392b;
          text-align: center;
          line-height: 1.8;
          display: none;
        }
        
        body.dark .retry-info {
          background: rgba(231, 76, 60, 0.05);
          border-color: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
        }
        
        .retry-info.show { display: block; }
        .retry-info b { color: #b68b7c; }
        body.dark .retry-info b { color: #c9b09f; }
      </style>
    </head>
    <body>
      <div class="card">
        <h3>${productName}</h3>
        <div class="price">${price.toLocaleString()} <span>تومان</span></div>

        <div class="vpn-notice">
          <span>🔐</span>
          <span>⚠️ روشن بودن <span class="highlight">VPN</span> جهت ارسال رسید <b>الزامی</b> میباشد</span>
        </div>

        <div class="bank">
          <div>📱 شماره کارت جهت واریز</div>
          <div class="card-number">6219 8614 5364 0772</div>
          <div>به نام: <b style="color:#b68b7c;">امیرمحمد یوسفی</b></div>
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
          🔄 در حال تلاش مجدد... (<span id="retryCount">1</span>/3)
          <br>⚠️ لطفاً <b>VPN</b> خود را بررسی کنید
        </div>

        <div id="status"></div>
      </div>

      <script>
        // تشخیص دارک مود از صفحه اصلی
        var isDarkMode = window.opener && window.opener.document.body.classList.contains('dark');
        if (isDarkMode) {
          document.body.classList.add('dark');
        }
        
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

        uploadArea.onclick = function() {
          imgInput.click();
        };

        uploadArea.ondragover = function(e) {
          e.preventDefault();
          uploadArea.style.borderColor = '#b68b7c';
        };

        uploadArea.ondragleave = function(e) {
          e.preventDefault();
          uploadArea.style.borderColor = selectedFile ? '#b68b7c' : '#d6cdc1';
        };

        uploadArea.ondrop = function(e) {
          e.preventDefault();
          uploadArea.style.borderColor = selectedFile ? '#b68b7c' : '#d6cdc1';
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

            if (percent >= 100) {
              progressInfo.innerText = '✅ ارسال شد! در حال تأیید...';
                      } else if (percent > 0) {
              progressInfo.innerText = '📤 در حال ارسال... ' + percent + '%';
            }
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

          var timeoutId = setTimeout(function() {
            xhr.abort();
            retryOrFail('timeout');
          }, ${FETCH_TIMEOUT});

          xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
              updateProgress(e.loaded, e.total);
            }
          };

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

                  setTimeout(function() {
                    showSuccessPage(${price}, trackingCode);
                  }, 200);
                } else {
                  retryOrFail(data.description || 'خطای سرور');
                }
              } catch(e) {
                retryOrFail('خطا در پردازش پاسخ');
              }
            } else {
              retryOrFail('خطای HTTP: ' + xhr.status);
            }
          };

          xhr.onerror = function() {
            clearTimeout(timeoutId);
            retryOrFail('network');
          };

          xhr.onabort = function() {
            retryOrFail('abort');
          };

          xhr.open("POST", "https://api-sidkashop.amirsidka.workers.dev");
          xhr.send(formData);
        }

        function retryOrFail(errorType) {
          retryAttempt++;

          if (retryAttempt < ${MAX_RETRIES}) {
            retryInfo.classList.add('show');
            retryCount.innerText = retryAttempt;
            progressInfo.innerText = '🔄 تلاش مجدد ' + retryAttempt + ' از ' + ${MAX_RETRIES} + '...';

            setTimeout(function() {
              sendToTelegram(selectedFile);
            }, 2000);
          } else {
            retryInfo.classList.remove('show');
            progressContainer.classList.remove('active');
            sendBtn.disabled = false;
            sendBtn.innerText = "📨 ارسال مجدد";

            if (errorType === 'timeout' || errorType === 'abort') {
              statusDiv.innerText = "⏰ زمان ارسال طولانی شد. VPN و اینترنت خود را بررسی کنید.";
            } else if (errorType === 'network') {
              statusDiv.innerText = "❌ خطای شبکه. لطفاً VPN را روشن کنید و دوباره تلاش کنید.";
            } else {
              statusDiv.innerText = "❌ خطا در ارسال. لطفاً دوباره تلاش کنید.";
            }
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

          var wrapper = document.createElement('div');
          wrapper.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;font-family:Vazirmatn,sans-serif;background:#f7f5f2;display:flex;justify-content:center;align-items:center;padding:20px;overflow:hidden;z-index:9999;transition:background 0.3s;';
          
          if (isDarkMode) {
            wrapper.style.background = '#141210';
          }

          var card = document.createElement('div');
          card.style.cssText = 'position:relative;z-index:1;background:#ffffff;width:100%;max-width:440px;padding:40px 30px;border-radius:40px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,0.02);border:1px solid #e9e3db;animation:cp 0.8s cubic-bezier(0.175,0.885,0.32,1.275);transition:background 0.3s,border 0.3s,box-shadow 0.3s;';
          
          if (isDarkMode) {
            card.style.background = '#1f1b18';
            card.style.border = '1px solid #2f2924';
            card.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)';
          }

          card.innerHTML =
            '<div style="position:relative;width:80px;height:80px;margin:0 auto 25px;">' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:rgba(182,139,124,.1);border-radius:50%;animation:ri 2s ease-out infinite;"></div>' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;background:rgba(182,139,124,.15);border-radius:50%;animation:ri 2s ease-out 0.5s infinite;"></div>' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;background:rgba(182,139,124,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:si 0.6s ease 0.3s both;">' +
                '<svg width="28" height="28" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="#b68b7c" stroke-width="3" stroke-dasharray="151" stroke-dashoffset="151" style="animation:dc 0.4s ease 0.3s forwards;"/><path d="M15 27 L23 36 L38 17" fill="none" stroke="#b68b7c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="35" stroke-dashoffset="35" style="animation:dp 0.3s ease 0.7s forwards;"/></svg>' +
              '</div>' +
            '</div>' +
            '<h2 style="color:#1e1a17;margin:0 0 6px;font-size:24px;animation:fu 0.6s ease 0.5s both;transition:color 0.3s;">🎉 پرداخت موفق!</h2>' +
            '<p style="color:#4f4640;margin:0 0 20px;font-size:13px;animation:fu 0.6s ease 0.6s both;transition:color 0.3s;">رسید شما با موفقیت ثبت شد</p>' +
            '<div style="background:#f0ebe5;padding:18px;border-radius:16px;margin-bottom:18px;border:1px solid #d6cdc1;animation:fu 0.6s ease 0.65s both;transition:background 0.3s,border 0.3s;">' +
              '<div style="font-size:10px;color:#7a6e64;margin-bottom:6px;">🔢 کد پیگیری</div>' +
              '<div style="font-size:32px;color:#b68b7c;font-weight:bold;letter-spacing:6px;font-family:\'Inter\',monospace;direction:ltr;">' + code + '</div>' +
              '<div style="font-size:10px;color:#7a6e64;margin-top:4px;">این کد را نزد خود نگه دارید</div>' +
            '</div>' +
            '<div style="background:#f7f5f2;padding:16px;border-radius:16px;margin-bottom:18px;border:1px solid #e9e3db;animation:fu 0.6s ease 0.7s both;transition:background 0.3s,border 0.3s;">' +
              '<div style="font-size:11px;color:#7a6e64;margin-bottom:4px;">💰 مبلغ پرداختی</div>' +
              '<div style="font-size:28px;color:#b68b7c;font-weight:bold;font-family:\'Inter\',monospace;">' + price.toLocaleString() + '</div>' +
              '<div style="font-size:12px;color:#7a6e64;">تومان</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:18px;color:#4f4640;font-size:12px;animation:fu 0.6s ease 0.8s both;transition:color 0.3s;"><span>📞</span><span>تیم پشتیبانی به زودی با شما تماس میگیرد</span></div>' +
            '<div style="animation:fu 0.6s ease 0.9s both;">' +
              '<div style="height:5px;background:#e9e3db;border-radius:8px;overflow:hidden;margin-bottom:10px;transition:background 0.3s;"><div style="height:100%;background:#b68b7c;border-radius:8px;animation:cb ' + countdown + 's linear forwards;transition:background 0.3s;"></div></div>' +
              '<p style="font-size:12px;color:#7a6e64;margin:0;">🔄 بازگشت خودکار در <span id="timer" style="color:#b68b7c;font-weight:bold;font-size:15px;">' + countdown + '</span> ثانیه</p>' +
            '</div>' +
            '<button id="backBtn" style="margin-top:18px;padding:10px 30px;background:#1e1a17;color:#f5f2ed;border:none;border-radius:60px;font-family:Vazirmatn,sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .3s;animation:fu 0.6s ease 1s both;">🏠 بازگشت به سایت</button>';

          // اعمال دارک مود برای المان‌های داخل کارت
          if (isDarkMode) {
            var elements = card.querySelectorAll('h2, p, div, span');
            elements.forEach(function(el) {
              if (el.style.color === '#1e1a17') el.style.color = '#ece6df';
              if (el.style.color === '#4f4640') el.style.color = '#b5a89a';
              if (el.style.color === '#7a6e64') el.style.color = '#8f8278';
              if (el.style.background === '#f0ebe5') {
                el.style.background = '#26211d';
                el.style.border = '1px solid #2f2924';
              }
              if (el.style.background === '#f7f5f2') {
                el.style.background = '#26211d';
                el.style.border = '1px solid #2f2924';
              }
              if (el.style.background === '#e9e3db') {
                el.style.background = '#2f2924';
              }
              if (el.style.color === '#b68b7c') el.style.color = '#c9b09f';
            });
            
            var backBtn = card.querySelector('#backBtn');
            if (backBtn) {
              backBtn.style.background = '#ece6df';
              backBtn.style.color = '#1e1a17';
            }
            
            var progressDiv = card.querySelector('div[style*="height:5px;background:#e9e3db"]');
            if (progressDiv) {
              progressDiv.style.background = '#2f2924';
              var innerDiv = progressDiv.querySelector('div');
              if (innerDiv) innerDiv.style.background = '#c9b09f';
            }
          }

          var style = document.createElement('style');
          style.textContent =
            '@keyframes cp{from{opacity:0;transform:scale(.8) translateY(40px)}to{opacity:1;transform:scale(1) translateY(0)}}' +
            '@keyframes ri{0%{transform:translate(-50%,-50%) scale(0.5);opacity:1}100%{transform:translate(-50%,-50%) scale(2);opacity:0}}' +
            '@keyframes si{from{transform:translate(-50%,-50%) scale(0)}to{transform:translate(-50%,-50%) scale(1)}}' +
            '@keyframes dc{to{stroke-dashoffset:0}}' +
            '@keyframes dp{to{stroke-dashoffset:0}}' +
            '@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}' +
            '@keyframes cb{from{width:0}to{width:100%}}';

          wrapper.appendChild(card);
          wrapper.appendChild(style);
          document.body.appendChild(wrapper);

          var backBtn = document.getElementById('backBtn');
          backBtn.onmouseover = function() {
            this.style.opacity = '0.8';
          };
          backBtn.onmouseout = function() {
            this.style.opacity = '1';
          };
          backBtn.onclick = function() {
            if (window.opener) {
              window.close();
            } else {
              window.location.href = siteUrl;
            }
          };

          var timeLeft = countdown;
          var timerInterval = setInterval(function() {
            timeLeft--;
            var timerEl = document.getElementById("timer");
            if (timerEl) {
              timerEl.innerText = timeLeft;
              if (timeLeft <= 5) {
                timerEl.style.color = '#c0392b';
                if (isDarkMode) timerEl.style.color = '#e74c3c';
              }
            }
            if (timeLeft <= 0) {
              clearInterval(timerInterval);
              window.location.href = siteUrl;
            }
          }, 1000);
        }
      <\/script>
    </body>
    </html>
  `);
  w.document.close();
}

/**********************
FEATURES PAGE
**********************/
function openFeaturesPage() {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  w.document.open();
  w.document.write(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>قابلیت‌های سلف تلگرام</title>
      <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; outline: none !important; -webkit-tap-highlight-color: transparent !important; }
        
        body {
          font-family: 'Vazirmatn', 'Inter', sans-serif;
          background: #f7f5f2;
          color: #1e1a17;
          line-height: 1.8;
          padding: 30px 20px;
          display: flex;
          justify-content: center;
          transition: background 0.3s, color 0.3s;
        }
        
        body.dark {
          background: #141210;
          color: #ece6df;
        }
        
        .container {
          width: 100%;
          max-width: 700px;
          background: #ffffff;
          border-radius: 40px;
          padding: 35px 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.02);
          border: 1px solid #e9e3db;
          transition: background 0.3s, border 0.3s, box-shadow 0.3s;
        }
        
        body.dark .container {
          background: #1f1b18;
          border: 1px solid #2f2924;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        
        h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #b68b7c;
          font-size: 26px;
          font-weight: 600;
          transition: color 0.3s;
        }
        
        body.dark h2 { color: #c9b09f; }
        
        .command-group {
          margin-bottom: 25px;
          background: #f7f5f2;
          border-radius: 20px;
          padding: 18px;
          border: 1px solid #e9e3db;
          transition: background 0.3s, border 0.3s;
        }
        
        body.dark .command-group {
          background: #26211d;
          border: 1px solid #2f2924;
        }
        
        .command-group h3 {
          color: #b68b7c;
          margin-bottom: 10px;
          font-size: 17px;
          border-bottom: 1px solid #e9e3db;
          padding-bottom: 8px;
          transition: color 0.3s, border 0.3s;
        }
        
        body.dark .command-group h3 {
          color: #c9b09f;
          border-bottom: 1px solid #2f2924;
        }
        
        .command-group ul {
          list-style: none;
          padding: 0;
        }
        
        .command-group li {
          margin: 8px 0;
          font-size: 13px;
          background: #ffffff;
          padding: 10px 14px;
          border-radius: 14px;
          border-right: 3px solid #b68b7c;
          transition: background 0.3s, border 0.3s, color 0.3s;
        }
        
        body.dark .command-group li {
          background: #1f1b18;
          border-right-color: #c9b09f;
          color: #ece6df;
        }
        
        .command-group li code {
          background: #f0ebe5;
          color: #b68b7c;
          padding: 2px 8px;
          border-radius: 6px;
          font-family: 'Inter', monospace;
          font-size: 12px;
          transition: background 0.3s, color 0.3s;
        }
        
        body.dark .command-group li code {
          background: #26211d;
          color: #c9b09f;
        }
        
        .back-btn {
          display: block;
          width: fit-content;
          margin: 30px auto 0;
          padding: 12px 40px;
          background: #1e1a17;
          color: #f5f2ed;
          border: none;
          border-radius: 60px;
          font-family: 'Vazirmatn', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all .3s;
        }
        
        body.dark .back-btn {
          background: #ece6df;
          color: #1e1a17;
        }
        
        .back-btn:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }
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
      <script>
        // تشخیص دارک مود از صفحه اصلی
        if (window.opener && window.opener.document.body.classList.contains('dark')) {
          document.body.classList.add('dark');
        }
      <\/script>
    </body>
    </html>
  `);
  w.document.close();
}
