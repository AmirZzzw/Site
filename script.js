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
          background: #141210;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #ece6df;
        }
        
        .card {
          width: 100%;
          max-width: 460px;
          background: #1f1b18;
          padding: 30px 25px;
          border-radius: 40px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
          border: 1px solid #2f2924;
        }
        
        h3 { 
          text-align: center; 
          margin: 0 0 5px; 
          color: #ece6df; 
          font-size: 20px;
          font-weight: 600;
        }
        
        .price {
          text-align: center;
          margin: 8px 0 20px;
          font-size: 28px;
          color: #c9b09f;
          font-weight: 700;
        }
        
        .price span { 
          font-size: 13px; 
          color: #8f8278; 
          font-weight: 400; 
          font-family: 'Vazirmatn', sans-serif;
        }
        
        .vpn-notice {
          background: #26211d;
          border: 1px solid #3b352f;
          border-radius: 16px;
          padding: 12px 16px;
          text-align: center;
          margin-bottom: 20px;
          font-size: 12px;
          color: #b5a89a;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .vpn-notice .highlight {
          color: #c9b09f;
          font-weight: bold;
          background: rgba(201, 176, 159, 0.1);
          padding: 2px 8px;
          border-radius: 6px;
          white-space: nowrap;
        }
        
        .bank {
          background: #26211d;
          padding: 15px;
          border-radius: 16px;
          text-align: center;
          margin-bottom: 20px;
          font-size: 12px;
          color: #8f8278;
          line-height: 2;
          border: 1px solid #2f2924;
          border-right: 3px solid #c9b09f;
        }
        
        .card-number {
          font-size: 18px;
          color: #ece6df;
          letter-spacing: 2px;
          font-family: 'Inter', monospace;
          direction: ltr;
          display: inline-block;
          background: #1f1b18;
          padding: 6px 14px;
          border-radius: 8px;
          margin: 6px 0;
        }
        
        .upload-area {
          border: 2px dashed #3b352f;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 15px;
          transition: all .3s;
          background: #26211d;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        
        .upload-area:hover { border-color: #c9b09f; }
        
        .upload-area.has-file {
          border-color: #c9b09f;
          border-style: solid;
          background: rgba(201, 176, 159, 0.05);
        }
        
        .upload-icon { font-size: 32px; }
        .upload-text { font-size: 13px; color: #8f8278; }
        .file-name { font-size: 11px; color: #c9b09f; word-break: break-all; }
        .file-size { font-size: 10px; color: #8f8278; }
        .upload-area input { display: none; }
        
        input, textarea {
          width: 100%;
          margin-top: 10px;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid #3b352f;
          font-family: 'Vazirmatn', sans-serif;
          font-size: 13px;
          background: #26211d;
          color: #ece6df;
          transition: border 0.3s;
        }
        
        input::placeholder, textarea::placeholder { color: #8f8278; }
        input:focus, textarea:focus { border-color: #c9b09f; }
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
          background: #ece6df;
          color: #1e1a17;
          cursor: pointer;
          transition: all .3s;
        }
        
        .send-btn:hover:not(:disabled) { opacity: 0.8; transform: translateY(-2px); }
        .send-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .progress-container {
          margin-top: 15px;
          display: none;
          background: #26211d;
          padding: 15px;
          border-radius: 16px;
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
          color: #c9b09f; 
          font-weight: bold; 
          font-size: 16px; 
          font-family: 'Inter', monospace;
        }
        
        .progress-info { color: #8f8278; font-size: 12px; }
        
        .progress-bar-outer {
          height: 6px;
          background: #2f2924;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        .progress-bar-inner {
          height: 100%;
          background: #c9b09f;
          border-radius: 10px;
          width: 0%;
          transition: width 0.3s;
        }
        
        .progress-details {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #8f8278;
          flex-wrap: wrap;
          gap: 4px;
        }
        
        #status {
          text-align: center;
          margin-top: 12px;
          font-size: 12px;
          min-height: 18px;
          color: #8f8278;
        }
        
        #status.error { color: #e74c3c; }
        #status.warning { color: #c9b09f; }
        #status.success { color: #c9b09f; }
        
        .retry-info {
          background: rgba(231, 76, 60, 0.05);
          border: 1px solid rgba(231, 76, 60, 0.2);
          border-radius: 12px;
          padding: 10px 14px;
          margin-top: 10px;
          font-size: 11px;
          color: #e74c3c;
          text-align: center;
          line-height: 1.8;
          display: none;
        }
        
        .retry-info.show { display: block; }
        .retry-info b { color: #c9b09f; }
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
          <div>به نام: <b style="color:#c9b09f;">امیرمحمد یوسفی</b></div>
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

        // ===== فیکس آپلود فایل =====
        uploadArea.addEventListener('click', function(e) {
          e.stopPropagation();
          imgInput.click();
        });

        uploadArea.addEventListener('dragover', function(e) {
          e.preventDefault();
          uploadArea.style.borderColor = '#c9b09f';
        });

        uploadArea.addEventListener('dragleave', function(e) {
          e.preventDefault();
          uploadArea.style.borderColor = selectedFile ? '#c9b09f' : '#3b352f';
        });

        uploadArea.addEventListener('drop', function(e) {
          e.preventDefault();
          uploadArea.style.borderColor = selectedFile ? '#c9b09f' : '#3b352f';
          if (e.dataTransfer.files.length > 0) {
            imgInput.files = e.dataTransfer.files;
            handleFileSelect();
          }
        });

        imgInput.addEventListener('change', handleFileSelect);

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

        sendBtn.addEventListener('click', function() {
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
        });

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
          wrapper.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;font-family:Vazirmatn,sans-serif;background:#141210;display:flex;justify-content:center;align-items:center;padding:20px;overflow:hidden;z-index:9999;';

          var card = document.createElement('div');
          card.style.cssText = 'position:relative;z-index:1;background:#1f1b18;width:100%;max-width:440px;padding:40px 30px;border-radius:40px;text-align:center;border:1px solid #2f2924;box-shadow:0 8px 30px rgba(0,0,0,0.4);animation:cp 0.8s cubic-bezier(0.175,0.885,0.32,1.275);';

          card.innerHTML =
            '<div style="position:relative;width:80px;height:80px;margin:0 auto 25px;">' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:rgba(201,176,159,.1);border-radius:50%;animation:ri 2s ease-out infinite;"></div>' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;background:rgba(201,176,159,.15);border-radius:50%;animation:ri 2s ease-out 0.5s infinite;"></div>' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;background:rgba(201,176,159,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:si 0.6s ease 0.3s both;">' +
                '<svg width="28" height="28" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="#c9b09f" stroke-width="3" stroke-dasharray="151" stroke-dashoffset="151" style="animation:dc 0.4s ease 0.3s forwards;"/><path d="M15 27 L23 36 L38 17" fill="none" stroke="#c9b09f" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="35" stroke-dashoffset="35" style="animation:dp 0.3s ease 0.7s forwards;"/></svg>' +
              '</div>' +
            '</div>' +
            '<h2 style="color:#ece6df;margin:0 0 6px;font-size:24px;animation:fu 0.6s ease 0.5s both;">🎉 پرداخت موفق!</h2>' +
            '<p style="color:#b5a89a;margin:0 0 20px;font-size:13px;animation:fu 0.6s ease 0.6s both;">رسید شما با موفقیت ثبت شد</p>' +
            '<div style="background:#26211d;padding:18px;border-radius:16px;margin-bottom:18px;border:1px solid #2f2924;animation:fu 0.6s ease 0.65s both;">' +
              '<div style="font-size:10px;color:#8f8278;margin-bottom:6px;">🔢 کد پیگیری</div>' +
              '<div style="font-size:32px;color:#c9b09f;font-weight:bold;letter-spacing:6px;font-family:\'Inter\',monospace;direction:ltr;">' + code + '</div>' +
              '<div style="font-size:10px;color:#8f8278;margin-top:4px;">این کد را نزد خود نگه دارید</div>' +
            '</div>' +
            '<div style="background:#26211d;padding:16px;border-radius:16px;margin-bottom:18px;border:1px solid #2f2924;animation:fu 0.6s ease 0.7s both;">' +
              '<div style="font-size:11px;color:#8f8278;margin-bottom:4px;">💰 مبلغ پرداختی</div>' +
              '<div style="font-size:28px;color:#c9b09f;font-weight:bold;font-family:\'Inter\',monospace;">' + price.toLocaleString() + '</div>' +
              '<div style="font-size:12px;color:#8f8278;">تومان</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:18px;color:#b5a89a;font-size:12px;animation:fu 0.6s ease 0.8s both;"><span>📞</span><span>تیم پشتیبانی به زودی با شما تماس میگیرد</span></div>' +
            '<div style="animation:fu 0.6s ease 0.9s both;">' +
              '<div style="height:5px;background:#2f2924;border-radius:8px;overflow:hidden;margin-bottom:10px;"><div style="height:100%;background:#c9b09f;border-radius:8px;animation:cb ' + countdown + 's linear forwards;"></div></div>' +
              '<p style="font-size:12px;color:#8f8278;margin:0;">🔄 بازگشت خودکار در <span id="timer" style="color:#c9b09f;font-weight:bold;font-size:15px;">' + countdown + '</span> ثانیه</p>' +
            '</div>' +
            '<button id="backBtn" style="margin-top:18px;padding:10px 30px;background:#ece6df;color:#1e1a17;border:none;border-radius:60px;font-family:Vazirmatn,sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .3s;animation:fu 0.6s ease 1s both;">🏠 بازگشت به سایت</button>';

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
          backBtn.addEventListener('mouseover', function() {
            this.style.opacity = '0.8';
          });
          backBtn.addEventListener('mouseout', function() {
            this.style.opacity = '1';
          });
          backBtn.addEventListener('click', function() {
            if (window.opener) {
              window.close();
            } else {
              window.location.href = siteUrl;
            }
          });

          var timeLeft = countdown;
          var timerInterval = setInterval(function() {
            timeLeft--;
            var timerEl = document.getElementById("timer");
            if (timerEl) {
              timerEl.innerText = timeLeft;
              if (timeLeft <= 5) {
                timerEl.style.color = '#e74c3c';
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
          background: #141210;
          color: #ece6df;
          line-height: 1.8;
          padding: 30px 20px;
          display: flex;
          justify-content: center;
        }
        
        .container {
          width: 100%;
          max-width: 700px;
          background: #1f1b18;
          border-radius: 40px;
          padding: 35px 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
          border: 1px solid #2f2924;
        }
        
        h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #c9b09f;
          font-size: 26px;
          font-weight: 600;
        }
        
        .command-group {
          margin-bottom: 25px;
          background: #26211d;
          border-radius: 20px;
          padding: 18px;
          border: 1px solid #2f2924;
        }
        
        .command-group h3 {
          color: #c9b09f;
          margin-bottom: 10px;
          font-size: 17px;
          border-bottom: 1px solid #2f2924;
          padding-bottom: 8px;
        }
        
        .command-group ul {
          list-style: none;
          padding: 0;
        }
        
        .command-group li {
          margin: 8px 0;
          font-size: 13px;
          background: #1f1b18;
          padding: 10px 14px;
          border-radius: 14px;
          border-right: 3px solid #c9b09f;
          color: #ece6df;
        }
        
        .command-group li code {
          background: #26211d;
          color: #c9b09f;
          padding: 2px 8px;
          border-radius: 6px;
          font-family: 'Inter', monospace;
          font-size: 12px;
        }
        
        .back-btn {
          display: block;
          width: fit-content;
          margin: 30px auto 0;
          padding: 12px 40px;
          background: #ece6df;
          color: #1e1a17;
          border: none;
          border-radius: 60px;
          font-family: 'Vazirmatn', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all .3s;
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
    </body>
    </html>
  `);
  w.document.close();
}
