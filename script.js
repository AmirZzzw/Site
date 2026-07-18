/**********************
CONFIG
**********************/
const BOT_TOKEN = "7408423935:AAH9nkoZg7ykqQMGKDeitIiOtu6uYZl0Vxg";
const CHAT_ID = "7549513123";
const SITE_URL = "https://sidkashop.qzz.io";
const SPAM_TIME = 60 * 1000;
const FETCH_TIMEOUT = 120000;

/**********************
PAYMENT PAGE
**********************/
function openPaymentPage(productName, price) {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

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
        
        :root {
          --bg-primary: #1a1d23;
          --bg-card: #21242b;
          --bg-input: #2a2d35;
          --text-primary: #e1e3e8;
          --text-secondary: #9ca0ab;
          --border: #363a43;
          --accent: #ff9800;
          --accent-hover: #ffb347;
          --success: #2ecc71;
          --danger: #e74c3c;
          --warning: #f39c12;
        }
        
        body {
          font-family: 'Vazir', sans-serif;
          background: var(--bg-primary);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: var(--text-primary);
        }
        
        .card {
          width: 100%;
          max-width: 460px;
          background: var(--bg-card);
          padding: 35px 30px;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,.4), 0 0 0 1px var(--border);
          animation: slideUp 0.5s ease;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .header-icon {
          text-align: center;
          font-size: 48px;
          margin-bottom: 10px;
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        h3 { 
          text-align: center; 
          margin: 0 0 5px; 
          color: var(--text-primary);
          font-size: 20px;
          font-weight: bold;
        }
        
        .price {
          text-align: center;
          margin: 8px 0 20px;
          font-size: 28px;
          color: var(--accent);
          font-weight: bold;
          letter-spacing: 1px;
        }
        
        .price span {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: normal;
        }
        
        .bank {
          background: linear-gradient(135deg, #2a2d35, #25282f);
          padding: 18px;
          border-radius: 16px;
          text-align: center;
          margin-bottom: 24px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 2;
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        
        .bank::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 4px;
          height: 100%;
          background: var(--accent);
          border-radius: 0 4px 4px 0;
        }
        
        .bank .card-number {
          font-size: 20px;
          color: var(--text-primary);
          letter-spacing: 3px;
          font-family: 'Courier New', monospace;
          direction: ltr;
          display: inline-block;
          background: var(--bg-input);
          padding: 8px 16px;
          border-radius: 10px;
          margin: 8px 0;
        }
        
        .upload-area {
          border: 2px dashed var(--border);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 18px;
          transition: all .3s;
          background: var(--bg-input);
          position: relative;
        }
        
        .upload-area:hover { 
          border-color: var(--accent);
          background: #2a2d35;
        }
        
        .upload-area.has-file {
          border-color: var(--success);
          border-style: solid;
          background: rgba(46, 204, 113, 0.05);
        }
        
        .upload-icon {
          font-size: 36px;
          margin-bottom: 8px;
          transition: .3s;
        }
        
        .upload-text {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        
        .file-name {
          font-size: 12px;
          color: var(--accent);
          margin-top: 6px;
          word-break: break-all;
        }
        
        .file-size {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        
        .upload-area input { display: none; }
        
        input, textarea {
          width: 100%;
          margin-top: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid var(--border);
          font-family: 'Vazir', sans-serif;
          font-size: 14px;
          transition: all .3s;
          background: var(--bg-input);
          color: var(--text-primary);
        }
        
        input::placeholder, textarea::placeholder {
          color: #5a5e6a;
        }
        
        input:focus, textarea:focus { 
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
        }
        
        textarea { resize: none; height: 80px; }
        
        .send-btn {
          width: 100%;
          margin-top: 20px;
          padding: 16px;
          border: none;
          border-radius: 16px;
          font-family: 'Vazir', sans-serif;
          font-size: 16px;
          font-weight: bold;
          background: linear-gradient(135deg, #ff9800, #ffb347);
          color: #1a1d23;
          cursor: pointer;
          transition: all .3s;
          position: relative;
          overflow: hidden;
        }
        
        .send-btn:hover:not(:disabled) { 
          transform: translateY(-2px); 
          box-shadow: 0 8px 25px rgba(255, 152, 0, 0.3);
        }
        
        .send-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        
        .send-btn:disabled { 
          opacity: 0.7; 
          cursor: not-allowed; 
        }
        
        .progress-container {
          margin-top: 18px;
          display: none;
          animation: fadeIn 0.4s ease;
        }
        
        .progress-container.active {
          display: block;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 12px;
        }
        
        .progress-percent {
          color: var(--accent);
          font-weight: bold;
          font-size: 18px;
        }
        
        .progress-info {
          color: var(--text-secondary);
        }
        
        .progress-bar-outer {
          height: 8px;
          background: var(--bg-input);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-bar-inner {
          height: 100%;
          background: linear-gradient(90deg, #ff9800, #ffb347, #ffcc80);
          border-radius: 20px;
          transition: width 0.3s ease;
          width: 0%;
          position: relative;
        }
        
        .progress-bar-inner::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .progress-details {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          font-size: 11px;
          color: var(--text-secondary);
          flex-wrap: wrap;
          gap: 4px;
        }
        
        .progress-details span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .progress-details .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }
        
        .dot.uploading { background: var(--accent); animation: pulse 1s infinite; }
        .dot.done { background: var(--success); }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        #status { 
          text-align: center; 
          margin-top: 14px; 
          font-size: 13px; 
          min-height: 20px; 
          color: var(--text-secondary);
        }
        
        #status.error { color: var(--danger); }
        #status.success { color: var(--success); }
        #status.warning { color: var(--warning); }
        
        .input-icon {
          position: relative;
        }
        
        .input-icon .icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: var(--text-secondary);
          pointer-events: none;
        }
        
        .input-icon input {
          padding-right: 42px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header-icon">💳</div>
        <h3>${productName}</h3>
        <div class="price">
          ${price.toLocaleString()} <span>تومان</span>
        </div>
        
        <div class="bank">
          <div style="font-size:12px;margin-bottom:4px;">📱 شماره کارت جهت واریز</div>
          <div class="card-number">6037 9982 2227 6759</div>
          <div style="margin-top:4px;">به نام: <b style="color:#e1e3e8;">امیرمحمد یوسفی</b></div>
        </div>
        
        <label class="upload-area" id="uploadArea">
          <div class="upload-icon" id="uploadIcon">📤</div>
          <div class="upload-text">برای آپلود تصویر رسید کلیک کنید</div>
          <div class="file-name" id="fileName"></div>
          <div class="file-size" id="fileSize"></div>
          <input type="file" id="receiptImage" accept="image/*">
        </label>
        
        <div class="input-icon">
          <span class="icon">✈️</span>
          <input type="text" id="telegramId" placeholder="آیدی تلگرام (مثال: @username)">
        </div>
        
        <div class="input-icon">
          <span class="icon">📞</span>
          <input type="tel" id="phoneNumber" placeholder="شماره تماس">
        </div>
        
        <textarea id="description" placeholder="📝 توضیحات (اختیاری)"></textarea>
        
        <button class="send-btn" id="sendBtn">
          <span id="sendBtnText">📨 ارسال رسید</span>
        </button>
        
        <div class="progress-container" id="progressContainer">
          <div class="progress-header">
            <span class="progress-percent" id="progressPercent">0%</span>
            <span class="progress-info" id="progressInfo">در حال آماده‌سازی...</span>
          </div>
          <div class="progress-bar-outer">
            <div class="progress-bar-inner" id="progressBar"></div>
          </div>
          <div class="progress-details">
            <span id="progressUploaded"><span class="dot uploading"></span> ارسال شده: 0 KB</span>
            <span id="progressTotal">کل: 0 KB</span>
            <span id="progressSpeed">سرعت: --</span>
            <span id="progressETA">زمان باقی‌مانده: --</span>
          </div>
        </div>
        
        <div id="status"></div>
      </div>
      
      <script>
        (function() {
          var imgInput = document.getElementById("receiptImage");
          var uploadArea = document.getElementById("uploadArea");
          var uploadIcon = document.getElementById("uploadIcon");
          var fileNameEl = document.getElementById("fileName");
          var fileSizeEl = document.getElementById("fileSize");
          var sendBtn = document.getElementById("sendBtn");
          var sendBtnText = document.getElementById("sendBtnText");
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
          var progressSpeed = document.getElementById("progressSpeed");
          var progressETA = document.getElementById("progressETA");
          
          var selectedFile = null;
          var lastLoaded = 0;
          var lastTime = 0;
          
          function formatSize(bytes) {
            if (bytes === 0) return '0 B';
            var k = 1024;
            var sizes = ['B', 'KB', 'MB', 'GB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
          }
          
          function formatTime(seconds) {
            if (seconds < 1) return 'چند لحظه';
            if (seconds < 60) return Math.round(seconds) + ' ثانیه';
            var m = Math.floor(seconds / 60);
            var s = Math.round(seconds % 60);
            return m + ':' + (s < 10 ? '0' : '') + s + ' دقیقه';
          }
          
          uploadArea.onclick = function() {
            imgInput.click();
          };
          
          imgInput.onchange = function() {
            if (imgInput.files[0]) {
              selectedFile = imgInput.files[0];
              fileNameEl.innerText = '📎 ' + selectedFile.name;
              fileSizeEl.innerText = 'حجم: ' + formatSize(selectedFile.size);
              uploadIcon.innerText = '✅';
              uploadArea.classList.add('has-file');
            } else {
              selectedFile = null;
              fileNameEl.innerText = '';
              fileSizeEl.innerText = '';
              uploadIcon.innerText = '📤';
              uploadArea.classList.remove('has-file');
            }
          };
          
          uploadArea.ondragover = function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = '#ff9800';
            uploadArea.style.background = '#2a2d35';
          };
          
          uploadArea.ondragleave = function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = selectedFile ? '#2ecc71' : '#363a43';
            uploadArea.style.background = selectedFile ? 'rgba(46, 204, 113, 0.05)' : '#2a2d35';
          };
          
          uploadArea.ondrop = function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = selectedFile ? '#2ecc71' : '#363a43';
            uploadArea.style.background = selectedFile ? 'rgba(46, 204, 113, 0.05)' : '#2a2d35';
            
            if (e.dataTransfer.files.length > 0) {
              imgInput.files = e.dataTransfer.files;
              imgInput.onchange();
            }
          };
          
          function resetProgress() {
            progressContainer.classList.remove('active');
            progressBar.style.width = '0%';
            progressPercent.innerText = '0%';
            progressInfo.innerText = 'در حال آماده‌سازی...';
            progressUploaded.innerHTML = '<span class="dot uploading"></span> ارسال شده: 0 KB';
            progressTotal.innerText = 'کل: 0 KB';
            progressSpeed.innerText = 'سرعت: --';
            progressETA.innerText = 'زمان باقی‌مانده: --';
          }
          
          function updateProgress(loaded, total) {
            var now = Date.now();
            var percent = Math.round((loaded / total) * 100);
            
            progressBar.style.width = percent + '%';
            progressPercent.innerText = percent + '%';
            progressUploaded.innerHTML = '<span class="dot uploading"></span> ارسال شده: ' + formatSize(loaded);
            progressTotal.innerText = 'کل: ' + formatSize(total);
            
            if (lastTime > 0 && lastLoaded > 0) {
              var timeDiff = (now - lastTime) / 1000;
              var bytesDiff = loaded - lastLoaded;
              
              if (timeDiff > 0.5) {
                var speed = bytesDiff / timeDiff;
                progressSpeed.innerText = 'سرعت: ' + formatSize(speed) + '/s';
                
                var remaining = total - loaded;
                if (speed > 0) {
                  var eta = remaining / speed;
                  progressETA.innerText = 'زمان باقی‌مانده: ' + formatTime(eta);
                  progressInfo.innerText = 'در حال ارسال...';
                }
                
                lastLoaded = loaded;
                lastTime = now;
              }
            } else {
              lastLoaded = loaded;
              lastTime = now;
            }
            
            if (percent >= 100) {
              progressInfo.innerText = '✅ ارسال کامل شد! در انتظار تأیید...';
              progressUploaded.innerHTML = '<span class="dot done"></span> ارسال شده: ' + formatSize(loaded);
              progressSpeed.innerText = 'سرعت: --';
              progressETA.innerText = 'زمان باقی‌مانده: --';
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
            sendBtnText.innerText = "⏳ در حال ارسال...";
            statusDiv.innerText = "";
            statusDiv.className = '';
            
            resetProgress();
            progressContainer.classList.add('active');
            
            progressInfo.innerText = '🔄 در حال فشرده‌سازی تصویر...';
            
            compressThenSend(selectedFile);
          };
          
          function compressThenSend(file) {
            var img = new Image();
            var reader = new FileReader();
            
            reader.onload = function(e) {
              img.src = e.target.result;
            };
            
            img.onload = function() {
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              var maxWidth = 1200;
              var width = img.width;
              var height = img.height;
              
              if (width > maxWidth) {
                height = (maxWidth / width) * height;
                width = maxWidth;
              }
              
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
              
              canvas.toBlob(function(blob) {
                var compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                
                progressInfo.innerText = '📤 در حال ارسال به سرور...';
                sendToTelegram(compressedFile);
              }, 'image/jpeg', 0.75);
            };
            
            reader.readAsDataURL(file);
          }
          
          function sendToTelegram(file) {
            var captionText = "📦 محصول: ${productName}\\n💵 مبلغ: ${price.toLocaleString()} تومان\\n👤 تلگرام: " + tgInput.value.trim() + "\\n📞 شماره: " + phoneInput.value.trim() + "\\n📝 توضیحات: " + (descInput.value.trim() || "ندارد");
            
            var formData = new FormData();
            formData.append("chat_id", "${CHAT_ID}");
            formData.append("photo", file);
            formData.append("caption", captionText);
            
            var xhr = new XMLHttpRequest();
            
            var timeoutId = setTimeout(function() {
              xhr.abort();
              handleError(new Error('timeout'));
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
                    progressUploaded.innerHTML = '<span class="dot done"></span> ارسال کامل';
                    
                    setTimeout(function() {
                      showSuccess(${price});
                    }, 600);
                  } else {
                    handleError(new Error(data.description || 'خطای سرور'));
                  }
                } catch(e) {
                  handleError(e);
                }
              } else {
                handleError(new Error('خطای HTTP: ' + xhr.status));
              }
            };
            
            xhr.onerror = function() {
              clearTimeout(timeoutId);
              handleError(new Error('network'));
            };
            
            xhr.onabort = function() {
              handleError(new Error('abort'));
            };
            
            xhr.open("POST", "https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto");
            xhr.send(formData);
            
            lastLoaded = 0;
            lastTime = 0;
          }
          
          function handleError(error) {
            progressContainer.classList.remove('active');
            sendBtn.disabled = false;
            sendBtnText.innerText = "📨 ارسال مجدد";
            
            if (error.message === 'timeout' || error.message === 'abort') {
              statusDiv.innerText = "⏰ زمان ارسال طولانی شد. لطفاً اینترنت خود را بررسی و دوباره تلاش کنید.";
            } else {
              statusDiv.innerText = "❌ خطا در ارسال. لطفاً دوباره تلاش کنید.";
            }
            statusDiv.className = 'error';
          }
          
          function showSuccess(price) {
            var countdown = 8;
            document.body.innerHTML = 
              '<div style="font-family:Vazir,sans-serif;background:linear-gradient(135deg,#1a1d23 0%,#21242b 50%,#1a1d23 100%);display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;overflow:hidden;position:relative;">' +
                
                // ذرات پس‌زمینه
                '<div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;">' +
                  '<div style="position:absolute;top:10%;left:10%;width:8px;height:8px;background:#ff9800;border-radius:50%;animation:floatA 3s ease-in-out infinite;opacity:0.6;"></div>' +
                  '<div style="position:absolute;top:20%;right:15%;width:12px;height:12px;background:#2ecc71;border-radius:50%;animation:floatB 4s ease-in-out infinite;opacity:0.4;"></div>' +
                  '<div style="position:absolute;bottom:30%;left:20%;width:6px;height:6px;background:#ffb347;border-radius:50%;animation:floatC 3.5s ease-in-out infinite;opacity:0.7;"></div>' +
                  '<div style="position:absolute;top:60%;right:10%;width:10px;height:10px;background:#27ae60;border-radius:50%;animation:floatA 2.8s ease-in-out infinite;opacity:0.5;"></div>' +
                  '<div style="position:absolute;bottom:15%;right:25%;width:7px;height:7px;background:#ffcc80;border-radius:50%;animation:floatB 4.2s ease-in-out infinite;opacity:0.6;"></div>' +
                  '<div style="position:absolute;top:40%;left:5%;width:5px;height:5px;background:#fff;border-radius:50%;animation:floatC 3.2s ease-in-out infinite;opacity:0.3;"></div>' +
                  '<div style="position:absolute;top:75%;left:30%;width:9px;height:9px;background:#ff9800;border-radius:50%;animation:floatA 3.7s ease-in-out infinite;opacity:0.5;"></div>' +
                  '<div style="position:absolute;bottom:40%;right:5%;width:11px;height:11px;background:#2ecc71;border-radius:50%;animation:floatB 3.1s ease-in-out infinite;opacity:0.4;"></div>' +
                '</div>' +
                
                // کارت اصلی
                '<div style="position:relative;z-index:1;background:linear-gradient(145deg,#25282f,#1f2127);width:100%;max-width:480px;padding:50px 35px;border-radius:30px;text-align:center;box-shadow:0 25px 70px rgba(0,0,0,.5),0 0 0 1px #363a43,inset 0 1px 0 rgba(255,255,255,.05);animation:cardPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);">' +
                  
                  // آیکون تیک متحرک
                  '<div style="position:relative;width:100px;height:100px;margin:0 auto 30px;">' +
                    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100px;height:100px;background:rgba(46,204,113,.1);border-radius:50%;animation:ripple 2s ease-out infinite;"></div>' +
                    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:rgba(46,204,113,.15);border-radius:50%;animation:ripple 2s ease-out 0.5s infinite;"></div>' +
                    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:70px;height:70px;background:rgba(46,204,113,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:scaleIn 0.6s ease 0.3s both;">' +
                      '<svg width="36" height="36" viewBox="0 0 52 52" style="animation:drawCheck 0.5s ease 0.6s both;">' +
                        '<circle cx="26" cy="26" r="24" fill="none" stroke="#2ecc71" stroke-width="3" stroke-dasharray="151" stroke-dashoffset="151" style="animation:drawCircle 0.4s ease 0.3s forwards;"/>' +
                        '<path d="M15 27 L23 36 L38 17" fill="none" stroke="#2ecc71" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="35" stroke-dashoffset="35" style="animation:drawPath 0.3s ease 0.7s forwards;"/>' +
                      '</svg>' +
                    '</div>' +
                  '</div>' +
                  
                  // متن موفقیت
                  '<h2 style="color:#e1e3e8;margin:0 0 8px;font-size:26px;animation:fadeUp 0.6s ease 0.5s both;">🎉 پرداخت موفق!</h2>' +
                  '<p style="color:#9ca0ab;margin:0 0 25px;font-size:14px;animation:fadeUp 0.6s ease 0.6s both;">رسید شما با موفقیت ثبت شد</p>' +
                  
                  // باکس مبلغ
                  '<div style="background:linear-gradient(135deg,#2a2d35,#25282f);padding:20px;border-radius:18px;margin-bottom:20px;border:1px solid #363a43;animation:fadeUp 0.6s ease 0.7s both;">' +
                    '<div style="font-size:12px;color:#9ca0ab;margin-bottom:6px;">💰 مبلغ پرداختی</div>' +
                    '<div style="font-size:32px;color:#ff9800;font-weight:bold;letter-spacing:1px;">' + price.toLocaleString() + '</div>' +
                    '<div style="font-size:13px;color:#9ca0ab;margin-top:4px;">تومان</div>' +
                  '</div>' +
                  
                  // پیام پشتیبانی
                  '<div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:20px;color:#9ca0ab;font-size:13px;animation:fadeUp 0.6s ease 0.8s both;">' +
                    '<span style="font-size:18px;">📞</span>' +
                    '<span>تیم پشتیبانی به زودی با شما تماس میگیرد</span>' +
                  '</div>' +
                  
                  // نوار پیشرفت بازگشت
                  '<div style="animation:fadeUp 0.6s ease 0.9s both;">' +
                    '<div style="height:6px;background:#2a2d35;border-radius:10px;overflow:hidden;margin-bottom:12px;">' +
                      '<div style="height:100%;background:linear-gradient(90deg,#ff9800,#ffb347,#ffcc80);border-radius:10px;animation:countdownBar ' + countdown + 's linear forwards;"></div>' +
                    '</div>' +
                    '<p style="font-size:13px;color:#5a5e6a;margin:0;">' +
                      '🔄 بازگشت خودکار به سایت در <span id="timer" style="color:#ff9800;font-weight:bold;font-size:16px;">' + countdown + '</span> ثانیه دیگر' +
                    '</p>' +
                  '</div>' +
                  
                  // دکمه بازگشت دستی
                  '<button onclick="window.location.href=\'' + SITE_URL + '\'" style="margin-top:20px;padding:12px 35px;background:rgba(255,152,0,.1);color:#ff9800;border:1px solid rgba(255,152,0,.3);border-radius:50px;font-family:Vazir,sans-serif;font-size:14px;cursor:pointer;transition:all .3s;animation:fadeUp 0.6s ease 1s both;" onmouseover="this.style.background=\'rgba(255,152,0,.2)\';this.style.borderColor=\'#ff9800\';" onmouseout="this.style.background=\'rgba(255,152,0,.1)\';this.style.borderColor=\'rgba(255,152,0,.3)\';">🏠 بازگشت به سایت</button>' +
                  
                '</div>' +
                
                // انیمیشن‌های CSS
                '<style>' +
                  '@keyframes floatA {' +
                    '0%, 100% { transform: translateY(0) rotate(0deg); }' +
                    '50% { transform: translateY(-20px) rotate(180deg); }' +
                  '}' +
                  '@keyframes floatB {' +
                    '0%, 100% { transform: translateY(0) scale(1); }' +
                    '50% { transform: translateY(-15px) scale(1.5); }' +
                  '}' +
                  '@keyframes floatC {' +
                    '0%, 100% { transform: translate(0, 0); }' +
                    '33% { transform: translate(10px, -20px); }' +
                    '66% { transform: translate(-10px, -10px); }' +
                  '}' +
                  '@keyframes cardPop {' +
                    'from { opacity: 0; transform: scale(.8) translateY(40px); }' +
                    'to { opacity: 1; transform: scale(1) translateY(0); }' +
                  '}' +
                  '@keyframes ripple {' +
                    '0% { transform: translate(-50%,-50%) scale(0.5); opacity: 1; }' +
                    '100% { transform: translate(-50%,-50%) scale(2); opacity: 0; }' +
                  '}' +
                  '@keyframes scaleIn {' +
                    'from { transform: translate(-50%,-50%) scale(0); }' +
                    'to { transform: translate(-50%,-50%) scale(1); }' +
                  '}' +
                  '@keyframes drawCircle {' +
                    'to { stroke-dashoffset: 0; }' +
                  '}' +
                  '@keyframes drawPath {' +
                    'to { stroke-dashoffset: 0; }' +
                  '}' +
                  '@keyframes drawCheck {' +
                    'from { opacity: 0; }' +
                    'to { opacity: 1; }' +
                  '}' +
                  '@keyframes fadeUp {' +
                    'from { opacity: 0; transform: translateY(20px); }' +
                    'to { opacity: 1; transform: translateY(0); }' +
                  '}' +
                  '@keyframes countdownBar {' +
                    'from { width: 0; }' +
                    'to { width: 100%; }' +
                  '}' +
                '</style>' +
              '</div>';
            
            var timeLeft = countdown;
            var timerInterval = setInterval(function() {
              timeLeft--;
              var timerEl = document.getElementById("timer");
              if (timerEl) {
                timerEl.innerText = timeLeft;
                if (timeLeft <= 3) {
                  timerEl.style.color = '#e74c3c';
                }
              }
              if (timeLeft <= 0) {
                clearInterval(timerInterval);
                window.location.href = "${SITE_URL}";
              }
            }, 1000);
          }
        })();
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
        body {
          font-family: 'Vazir', sans-serif;
          background: #0d1117;
          color: #c9d1d9;
          line-height: 1.8;
          padding: 30px 20px;
          display: flex;
          justify-content: center;
        }
        .container {
          width: 100%;
          max-width: 700px;
          background: #161b22;
          border-radius: 24px;
          padding: 35px 30px;
          box-shadow: 0 15px 40px rgba(0,0,0,.6);
          border: 1px solid #30363d;
        }
        h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #ff9800;
          font-size: 26px;
        }
        .command-group {
          margin-bottom: 30px;
          background: #21262d;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid #30363d;
        }
        .command-group h3 {
          color: #58a6ff;
          margin-bottom: 12px;
          font-size: 18px;
          border-bottom: 1px solid #30363d;
          padding-bottom: 8px;
        }
        .command-group ul {
          list-style: none;
          padding: 0;
        }
        .command-group li {
          margin: 10px 0;
          font-size: 14px;
          background: #0d1117;
          padding: 10px 14px;
          border-radius: 10px;
          border-right: 3px solid #ff9800;
        }
        .command-group li code {
          background: #30363d;
          color: #ffb347;
          padding: 2px 8px;
          border-radius: 6px;
          font-family: 'Vazir', monospace;
          font-size: 13px;
          margin: 0 2px;
        }
        .back-btn {
          display: block;
          width: fit-content;
          margin: 30px auto 0;
          padding: 12px 40px;
          background: #ff9800;
          color: #000;
          border: none;
          border-radius: 50px;
          font-family: 'Vazir', sans-serif;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
          transition: .3s;
        }
        .back-btn:hover {
          background: #e68900;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 152, 0, 0.5);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>✨ قابلیت‌های سلف تلگرام ✨</h2>

        <div class="command-group">
          <h3>🕒 ساعت و بیو</h3>
          <ul>
            <li><code>.تایم روشن</code> : فعال کردن نمایش ساعت در اسم.</li>
            <li><code>.تایم خاموش</code> : غیرفعال کردن ساعت.</li>
            <li><code>.بیو روشن</code> : قرار دادن ساعت داخل بیو.</li>
            <li><code>.بیو خاموش</code> : حذف ساعت از بیو.</li>
          </ul>
        </div>

        <div class="command-group">
          <h3>🎨 فونت و زیبایی</h3>
          <ul>
            <li><code>.فونت ها</code> : نمایش لیست فونت‌ها.</li>
            <li><code>.تنظیم فونت n</code> : تنظیم فونت (عدد فونت).</li>
            <li><code>.لایک اسم مورد نظر</code> : ساخت لایک برای اسم.</li>
            <li><code>.بیو رندوم</code> : تولید بیوی تصادفی.</li>
          </ul>
        </div>

        <div class="command-group">
          <h3>📢 بنر و گروه‌ها</h3>
          <ul>
            <li><code>.بنر</code> : ارسال پیام به گروه‌ها.</li>
            <li><code>.بنر غیرفعال</code> : توقف ارسال بنر.</li>
            <li><code>.حذف بنر</code> : حذف گروه از لیست بنر.</li>
            <li><code>.حذف بنر غیرفعال</code> : بازگرداندن گروه.</li>
          </ul>
        </div>

        <div class="command-group">
          <h3>🧑‍💻 وضعیت آنلاین و استایل پیام</h3>
          <ul>
            <li><code>.برجسته فعال</code> / <code>غیرفعال</code></li>
            <li><code>.آنلاین فعال</code> / <code>خاموش</code></li>
            <li><code>.کج فعال</code> / <code>غیرفعال</code></li>
            <li><code>.تکی فعال</code> / <code>غیرفعال</code></li>
          </ul>
        </div>

        <div class="command-group">
          <h3>🔒 جوین اجباری و قفل‌ها</h3>
          <ul>
            <li><code>.معاف جوین اجباری [ایدی]</code></li>
            <li><code>.حذف معاف جوین اجباری [ایدی]</code></li>
            <li><code>.پیوی قفل</code> / <code>.پیوی باز</code></li>
            <li><code>.قفل ایدی چنل</code> / <code>.حذف قفل ایدی چنل</code></li>
          </ul>
        </div>

        <div class="command-group">
          <h3>👥 مدیریت کاربران</h3>
          <ul>
            <li><code>.سکوت</code> / <code>.حذف سکوت</code> (با ریپلای)</li>
            <li><code>.دشمن</code> / <code>.حذف دشمن</code> (با ریپلای)</li>
            <li><code>.آیدی</code> : نمایش اطلاعات کاربر.</li>
          </ul>
        </div>

        <div class="command-group">
          <h3>📄 ذخیره‌سازی و پشتیبان</h3>
          <ul>
            <li><code>.تنظیم ریلم</code> / <code>.حذف ریلم</code></li>
            <li><code>.پشتیبانگیری از چت ها</code></li>
            <li><code>.پشتیبانگیری از چت</code></li>
            <li>ذخیره خودکار مدیاهای تایم‌دار.</li>
          </ul>
        </div>

        <div class="command-group">
          <h3>🚫 فیلتر کلمات</h3>
          <ul>
            <li><code>.فیلتر کلمه کلمه1، کلمه2</code></li>
            <li><code>.حذف کلمه فیلتر کلمه1</code></li>
            <li><code>.لیست کلمات فیلتر شده</code></li>
          </ul>
        </div>

        <div class="command-group">
          <h3>🛠️ متفرقه و کاربردی</h3>
          <ul>
            <li><code>.ارز</code> : قیمت ارزهای دیجیتال.</li>
            <li><code>.فال</code> : فال حافظ.</li>
            <li><code>.سرعت</code> : تست سرعت سلف.</li>
            <li><code>.بگو text</code> : تبدیل متن به ویس (انگلیسی).</li>
            <li><code>.انقضا</code> : زمان باقی‌مانده اشتراک.</li>
            <li><code>.اسپم متن 10</code> : اسپم کردن.</li>
            <li><code>.حذف 10</code> : حذف پیام‌ها.</li>
            <li><code>.تاریخ</code> : تاریخ شمسی و میلادی.</li>
            <li><code>.حساب 2+2</code> : ماشین حساب.</li>
            <li><code>.ترجمه test</code> : ترجمه به فارسی.</li>
            <li><code>.دریافت لینک</code> : دانلود از چنل پابلیک.</li>
            <li><code>.چک اسپم</code> : بررسی ریپورت.</li>
          </ul>
        </div>

        <div class="command-group">
          <h3>🎉 فان و شوخی</h3>
          <ul>
            <li><code>.دوست دارم</code></li>
            <li><code>.جوک</code></li>
            <li><code>.خنده</code></li>
            <li><code>.قلب</code></li>
            <li><code>.فاک</code></li>
            <li><code>.بیوتیفول</code></li>
            <li><code>.گل</code></li>
            <li><code>.دختر</code></li>
            <li><code>.کیر</code> / <code>.بیگ</code></li>
            <li><code>.جق زدن</code></li>
          </ul>
        </div>

        <button class="back-btn" onclick="if(window.opener) window.close(); else location.href='${SITE_URL}';">🔙 بازگشت به سایت</button>
      </div>
    </body>
    </html>
  `);
  w.document.close();
}
