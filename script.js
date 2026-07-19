window.onerror = function(message, source, line, col, error) {
  alert(
    "ERROR:\n" +
    message +
    "\nLine: " + line
  );
};
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
      <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css" />
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; outline: none !important; -webkit-tap-highlight-color: transparent !important; }
        
        body {
          font-family: 'Vazir', sans-serif;
          background: #1a1d23;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #e1e3e8;
        }
        
        .card {
          width: 100%;
          max-width: 460px;
          background: #21242b;
          padding: 30px 25px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,.4), 0 0 0 1px #363a43;
        }
        
        h3 { text-align: center; margin: 0 0 5px; color: #e1e3e8; font-size: 18px; }
        
        .price {
          text-align: center;
          margin: 8px 0 20px;
          font-size: 26px;
          color: #ff9800;
          font-weight: bold;
        }
        
        .price span { font-size: 13px; color: #9ca0ab; font-weight: normal; }
        
        .vpn-notice {
          background: linear-gradient(135deg, rgba(255,152,0,.15), rgba(255,87,34,.1));
          border: 1px solid rgba(255,152,0,.3);
          border-radius: 12px;
          padding: 12px 16px;
          text-align: center;
          margin-bottom: 20px;
          font-size: 12px;
          color: #ffb347;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          animation: glow 2s ease-in-out infinite;
        }
        
        .vpn-notice .icon {
          font-size: 20px;
          animation: bounce 1s ease-in-out infinite;
        }
        
        .vpn-notice .text {
          line-height: 1.6;
        }
        
        .vpn-notice .highlight {
          color: #ff9800;
          font-weight: bold;
          background: rgba(255,152,0,.2);
          padding: 2px 8px;
          border-radius: 6px;
          white-space: nowrap;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255,152,0,.2), 0 0 10px rgba(255,152,0,.1); }
          50% { box-shadow: 0 0 15px rgba(255,152,0,.4), 0 0 25px rgba(255,152,0,.2); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .bank {
          background: #2a2d35;
          padding: 15px;
          border-radius: 14px;
          text-align: center;
          margin-bottom: 20px;
          font-size: 12px;
          color: #9ca0ab;
          line-height: 2;
          border: 1px solid #363a43;
          border-right: 3px solid #ff9800;
        }
        
        .card-number {
          font-size: 18px;
          color: #e1e3e8;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
          direction: ltr;
          display: inline-block;
          background: #1a1d23;
          padding: 6px 14px;
          border-radius: 8px;
          margin: 6px 0;
        }
        
        .upload-area {
          border: 2px dashed #363a43;
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 15px;
          transition: all .3s;
          background: #2a2d35;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        
        .upload-area:hover { border-color: #ff9800; }
        
        .upload-area.has-file {
          border-color: #2ecc71;
          border-style: solid;
          background: rgba(46, 204, 113, 0.05);
        }
        
        .upload-icon { font-size: 32px; }
        .upload-text { font-size: 13px; color: #9ca0ab; }
        .file-name { font-size: 11px; color: #ff9800; word-break: break-all; }
        .file-size { font-size: 10px; color: #9ca0ab; }
        
        .upload-area input { display: none; }
        
        input, textarea {
          width: 100%;
          margin-top: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #363a43;
          font-family: 'Vazir', sans-serif;
          font-size: 13px;
          background: #2a2d35;
          color: #e1e3e8;
        }
        
        input::placeholder, textarea::placeholder { color: #5a5e6a; }
        input:focus, textarea:focus { border-color: #ff9800; }
        textarea { resize: none; height: 70px; }
        
        .send-btn {
          width: 100%;
          margin-top: 18px;
          padding: 14px;
          border: none;
          border-radius: 14px;
          font-family: 'Vazir', sans-serif;
          font-size: 15px;
          font-weight: bold;
          background: linear-gradient(135deg, #ff9800, #ffb347);
          color: #1a1d23;
          cursor: pointer;
          transition: all .3s;
        }
        
        .send-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 152, 0, 0.3); }
        .send-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        
        .progress-container {
          margin-top: 15px;
          display: none;
          background: #2a2d35;
          padding: 15px;
          border-radius: 12px;
          border: 1px solid #363a43;
        }
        
        .progress-container.active { display: block; }
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 11px;
        }
        
        .progress-percent { color: #ff9800; font-weight: bold; font-size: 16px; }
        .progress-info { color: #9ca0ab; font-size: 12px; }
        
        .progress-bar-outer {
          height: 6px;
          background: #1a1d23;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        
        .progress-bar-inner {
          height: 100%;
          background: linear-gradient(90deg, #ff9800, #ffb347);
          border-radius: 10px;
          width: 0%;
          transition: width 0.3s;
        }
        
        .progress-details {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #9ca0ab;
          flex-wrap: wrap;
          gap: 4px;
        }
        
        #status {
          text-align: center;
          margin-top: 12px;
          font-size: 12px;
          min-height: 18px;
          color: #9ca0ab;
        }
        
        #status.error { color: #e74c3c; }
        #status.warning { color: #f39c12; }
        #status.success { color: #2ecc71; }
        
        .retry-info {
          background: rgba(231, 76, 60, 0.1);
          border: 1px solid rgba(231, 76, 60, 0.3);
          border-radius: 10px;
          padding: 10px 14px;
          margin-top: 10px;
          font-size: 11px;
          color: #e74c3c;
          text-align: center;
          line-height: 1.8;
          display: none;
        }
        
        .retry-info.show { display: block; }
        .retry-info b { color: #ff9800; }
      </style>
    </head>
    <body>
      <div class="card">
        <h3>${productName}</h3>
        <div class="price">${price.toLocaleString()} <span>تومان</span></div>
        
        <div class="vpn-notice">
          <span class="icon">🔐</span>
          <span class="text">⚠️ روشن بودن <span class="highlight">VPN</span> جهت ارسال رسید <b>الزامی</b> میباشد</span>
        </div>
        
        <div class="bank">
          <div>📱 شماره کارت جهت واریز</div>
          <div class="card-number">6219 8614 5364 0772</div>
          <div>به نام: <b style="color:#e1e3e8;">امیرمحمد یوسفی</b></div>
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
        
        uploadArea.onclick = function() {
          imgInput.click();
        };
        
        uploadArea.ondragover = function(e) {
          e.preventDefault();
          uploadArea.style.borderColor = '#ff9800';
        };
        
        uploadArea.ondragleave = function(e) {
          e.preventDefault();
          uploadArea.style.borderColor = selectedFile ? '#2ecc71' : '#363a43';
        };
        
        uploadArea.ondrop = function(e) {
          e.preventDefault();
          uploadArea.style.borderColor = selectedFile ? '#2ecc71' : '#363a43';
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
        
                  // سریعتر بره به صفحه موفقیت - 200 میلی‌ثانیه
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
          
          alert("قبل از send");
          try {
            xhr.open("POST", "https://api-sidkashop.amirsidka.workers.dev");
            alert("open ok");
          } catch (e) {
            alert(e.name + "\n" + e.message);
          }
          alert("بعد از open");
          xhr.send(formData);
          alert("بعد از send");
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
  
          // پاک کردن کامل body و تنظیم margin و padding
          document.body.innerHTML = '';
          document.body.style.margin = '0';
          document.body.style.padding = '0';
          document.body.style.overflow = 'hidden';
  
          // wrapper که کل صفحه رو میپوشونه
          var wrapper = document.createElement('div');
          wrapper.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;font-family:Vazir,sans-serif;background:linear-gradient(135deg,#1a1d23 0%,#21242b 50%,#1a1d23 100%);display:flex;justify-content:center;align-items:center;padding:20px;overflow:hidden;z-index:9999;';
  
          // ذرات پس‌زمینه
          var particles = document.createElement('div');
          particles.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
          particles.innerHTML = 
            '<div style="position:absolute;top:10%;left:10%;width:8px;height:8px;background:#ff9800;border-radius:50%;animation:fa 3s ease-in-out infinite;opacity:0.6;"></div>' +
            '<div style="position:absolute;top:20%;right:15%;width:12px;height:12px;background:#2ecc71;border-radius:50%;animation:fb 4s ease-in-out infinite;opacity:0.4;"></div>' +
            '<div style="position:absolute;bottom:30%;left:20%;width:6px;height:6px;background:#ffb347;border-radius:50%;animation:fc 3.5s ease-in-out infinite;opacity:0.7;"></div>' +
            '<div style="position:absolute;top:60%;right:10%;width:10px;height:10px;background:#27ae60;border-radius:50%;animation:fa 2.8s ease-in-out infinite;opacity:0.5;"></div>' +
            '<div style="position:absolute;bottom:15%;right:25%;width:7px;height:7px;background:#ffcc80;border-radius:50%;animation:fb 4.2s ease-in-out infinite;opacity:0.6;"></div>' +
            '<div style="position:absolute;top:40%;left:5%;width:5px;height:5px;background:#fff;border-radius:50%;animation:fc 3.2s ease-in-out infinite;opacity:0.3;"></div>' +
            '<div style="position:absolute;top:75%;left:30%;width:9px;height:9px;background:#ff9800;border-radius:50%;animation:fa 3.7s ease-in-out infinite;opacity:0.5;"></div>' +
            '<div style="position:absolute;bottom:40%;right:5%;width:11px;height:11px;background:#2ecc71;border-radius:50%;animation:fb 3.1s ease-in-out infinite;opacity:0.4;"></div>';
  
          // کارت اصلی
          var card = document.createElement('div');
          card.style.cssText = 'position:relative;z-index:1;background:linear-gradient(145deg,#25282f,#1f2127);width:100%;max-width:440px;padding:40px 30px;border-radius:24px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 0 1px #363a43;animation:cp 0.8s cubic-bezier(0.175,0.885,0.32,1.275);';
  
          card.innerHTML = 
            '<div style="position:relative;width:90px;height:90px;margin:0 auto 25px;">' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90px;height:90px;background:rgba(46,204,113,.1);border-radius:50%;animation:ri 2s ease-out infinite;"></div>' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:70px;height:70px;background:rgba(46,204,113,.15);border-radius:50%;animation:ri 2s ease-out 0.5s infinite;"></div>' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;background:rgba(46,204,113,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:si 0.6s ease 0.3s both;">' +
                '<svg width="32" height="32" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="#2ecc71" stroke-width="3" stroke-dasharray="151" stroke-dashoffset="151" style="animation:dc 0.4s ease 0.3s forwards;"/><path d="M15 27 L23 36 L38 17" fill="none" stroke="#2ecc71" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="35" stroke-dashoffset="35" style="animation:dp 0.3s ease 0.7s forwards;"/></svg>' +
              '</div>' +
            '</div>' +
            '<h2 style="color:#e1e3e8;margin:0 0 6px;font-size:24px;animation:fu 0.6s ease 0.5s both;">🎉 پرداخت موفق!</h2>' +
            '<p style="color:#9ca0ab;margin:0 0 20px;font-size:13px;animation:fu 0.6s ease 0.6s both;">رسید شما با موفقیت ثبت شد</p>' +
            '<div style="background:linear-gradient(135deg,rgba(255,152,0,.15),rgba(255,152,0,.05));padding:18px;border-radius:14px;margin-bottom:18px;border:1px solid rgba(255,152,0,.3);animation:fu 0.6s ease 0.65s both;">' +
              '<div style="font-size:10px;color:#9ca0ab;margin-bottom:6px;">🔢 کد پیگیری</div>' +
              '<div style="font-size:32px;color:#ff9800;font-weight:bold;letter-spacing:6px;font-family:Courier New,monospace;direction:ltr;">' + code + '</div>' +
              '<div style="font-size:10px;color:#9ca0ab;margin-top:4px;">این کد را نزد خود نگه دارید</div>' +
            '</div>' +
            '<div style="background:#2a2d35;padding:16px;border-radius:14px;margin-bottom:18px;border:1px solid #363a43;animation:fu 0.6s ease 0.7s both;">' +
              '<div style="font-size:11px;color:#9ca0ab;margin-bottom:4px;">💰 مبلغ پرداختی</div>' +
              '<div style="font-size:28px;color:#ff9800;font-weight:bold;">' + price.toLocaleString() + '</div>' +
              '<div style="font-size:12px;color:#9ca0ab;">تومان</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:18px;color:#9ca0ab;font-size:12px;animation:fu 0.6s ease 0.8s both;"><span>📞</span><span>تیم پشتیبانی به زودی با شما تماس میگیرد</span></div>' +
            '<div style="animation:fu 0.6s ease 0.9s both;">' +
              '<div style="height:5px;background:#2a2d35;border-radius:8px;overflow:hidden;margin-bottom:10px;"><div style="height:100%;background:linear-gradient(90deg,#ff9800,#ffb347);border-radius:8px;animation:cb ' + countdown + 's linear forwards;"></div></div>' +
              '<p style="font-size:12px;color:#5a5e6a;margin:0;">🔄 بازگشت خودکار در <span id="timer" style="color:#ff9800;font-weight:bold;font-size:15px;">' + countdown + '</span> ثانیه</p>' +
            '</div>' +
            '<button id="backBtn" style="margin-top:18px;padding:10px 30px;background:rgba(255,152,0,.1);color:#ff9800;border:1px solid rgba(255,152,0,.3);border-radius:40px;font-family:Vazir,sans-serif;font-size:13px;cursor:pointer;transition:all .3s;animation:fu 0.6s ease 1s both;">🏠 بازگشت به سایت</button>';
  
          // استایل‌های انیمیشن
          var style = document.createElement('style');
          style.textContent = 
            '@keyframes fa{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(180deg)}}' +
            '@keyframes fb{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-15px) scale(1.5)}}' +
            '@keyframes fc{0%,100%{transform:translate(0,0)}33%{transform:translate(10px,-20px)}66%{transform:translate(-10px,-10px)}}' +
            '@keyframes cp{from{opacity:0;transform:scale(.8) translateY(40px)}to{opacity:1;transform:scale(1) translateY(0)}}' +
            '@keyframes ri{0%{transform:translate(-50%,-50%) scale(0.5);opacity:1}100%{transform:translate(-50%,-50%) scale(2);opacity:0}}' +
            '@keyframes si{from{transform:translate(-50%,-50%) scale(0)}to{transform:translate(-50%,-50%) scale(1)}}' +
            '@keyframes dc{to{stroke-dashoffset:0}}' +
            '@keyframes dp{to{stroke-dashoffset:0}}' +
            '@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}' +
            '@keyframes cb{from{width:0}to{width:100%}}';
  
          // اضافه کردن همه به wrapper
          wrapper.appendChild(particles);
          wrapper.appendChild(card);
          wrapper.appendChild(style);
          document.body.appendChild(wrapper);
  
          // دکمه بازگشت
          var backBtn = document.getElementById('backBtn');
          backBtn.onmouseover = function() {
            this.style.background = 'rgba(255,152,0,.2)';
            this.style.borderColor = '#ff9800';
          };
          backBtn.onmouseout = function() {
            this.style.background = 'rgba(255,152,0,.1)';
            this.style.borderColor = 'rgba(255,152,0,.3)';
          };
          backBtn.onclick = function() {
            if (window.opener) {
              window.close();
            } else {
              window.location.href = siteUrl;
            }
          };
  
          // تایمر بازگشت
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
      <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css" />
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; outline: none !important; -webkit-tap-highlight-color: transparent !important; }
        body { font-family: 'Vazir', sans-serif; background: #0d1117; color: #c9d1d9; line-height: 1.8; padding: 30px 20px; display: flex; justify-content: center; }
        .container { width: 100%; max-width: 700px; background: #161b22; border-radius: 24px; padding: 35px 30px; box-shadow: 0 15px 40px rgba(0,0,0,.6); border: 1px solid #30363d; }
        h2 { text-align: center; margin-bottom: 30px; color: #ff9800; font-size: 26px; }
        .command-group { margin-bottom: 25px; background: #21262d; border-radius: 16px; padding: 18px; border: 1px solid #30363d; }
        .command-group h3 { color: #58a6ff; margin-bottom: 10px; font-size: 17px; border-bottom: 1px solid #30363d; padding-bottom: 8px; }
        .command-group ul { list-style: none; padding: 0; }
        .command-group li { margin: 8px 0; font-size: 13px; background: #0d1117; padding: 10px 14px; border-radius: 10px; border-right: 3px solid #ff9800; }
        .command-group li code { background: #30363d; color: #ffb347; padding: 2px 8px; border-radius: 6px; font-family: 'Vazir', monospace; font-size: 12px; }
        .back-btn { display: block; width: fit-content; margin: 30px auto 0; padding: 12px 40px; background: #ff9800; color: #000; border: none; border-radius: 50px; font-family: 'Vazir', sans-serif; font-size: 15px; font-weight: bold; cursor: pointer; transition: .3s; }
        .back-btn:hover { background: #e68900; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,152,0,.5); }
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
