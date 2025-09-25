let lastSentTime = localStorage.getItem("lastSentTime") || 0;

function openPaymentPage(productName, price) {
    const paymentPage = window.open("", "_blank");
    paymentPage.document.write(`
        <html lang="fa">
        <head>
            <meta charset="UTF-8" />
            <title>پرداخت ${productName}</title>
            <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css" />
            <style>
                body { font-family: 'Vazir', sans-serif; text-align: center; background: #000000; padding: 50px; color: white; }
                .container { background: white; padding: 50px; border-radius: 25px; box-shadow: 0 12px 24px rgba(0,0,0,0.3); color: black; max-width: 500px; margin: auto; }
                button { background: linear-gradient(to right, #ff5722, #ff9800); color: black; padding: 18px 55px; border: none; font-size: 22px; cursor: pointer; border-radius: 50px; transition: 0.3s; }
                button:hover { transform: scale(1.1); background: linear-gradient(to right, #e64a19, #f57c00); }
                input, textarea { width: 90%; padding: 10px; font-size: 16px; border-radius: 50px; margin-top: 10px; border: 1px solid #ccc; }
                #timer { margin-top: 15px; color: green; }
            </style>
        </head>
        <body onload="restoreTimer()">
            <div class="container">
                <h2>پرداخت ${productName}</h2>
                <h2>مبلغ: <strong>${price.toLocaleString()} تومان</strong></h2>
                <h2>به شماره کارت زیر واریز کنید:</h2>
                <h2>6037998222276759</h2>
                <h2>به نام: امیرمحمد یوسفی</h2>

                <h2>📤 ارسال فیش پرداخت</h2>
                <input type="file" id="receiptImage" accept="image/*" />
                <input type="text" id="telegramID" placeholder="آیدی تلگرام شما" />
                <input type="text" id="phoneNumber" placeholder="شماره شما" />
                <textarea id="optionalText" placeholder="توضیحات بیشتر (اختیاری)"></textarea>

                <h1></h1>
                <button id="sendButton">ارسال فیش</button>
                <h1></h1>
                <h3 id="timer">✅ ارسال فیش امکان‌پذیر است</h3>
                <h1></h1>
                <h2 id="statusMessage"></h2>
                <h1></h1>
                <button onclick="window.open('https://t.me/AqooAmir', '_blank')">Telegram Pv</button>
                <br /><br />
                <button onclick="window.close()">بازگشت به سایت</button>
            </div>

            <script>
                let lastSentTime = localStorage.getItem("lastSentTime") || 0;

                document.getElementById("sendButton").addEventListener("click", function () {
                    sendReceipt("${productName}", ${price});
                });

                function sendReceipt(productName, price) {
                    const now = Date.now();
                    const timePassed = now - lastSentTime;

                    if (timePassed < 60000) {
                        alert(\`🚨 لطفاً \${Math.ceil((60000 - timePassed) / 1000)} ثانیه دیگر صبر کنید!\`);
                        return;
                    }

                    const imageInput = document.getElementById('receiptImage');
                    const telegramID = document.getElementById('telegramID').value.trim();
                    const phoneNumber = document.getElementById('phoneNumber').value.trim();
                    const optionalText = document.getElementById('optionalText').value.trim();
                    const statusMessage = document.getElementById('statusMessage');

                    if (imageInput.files.length === 0 || telegramID === "" || phoneNumber === "") {
                        statusMessage.textContent = "🚨 لطفاً عکس، آیدی تلگرام، و شماره خود را وارد کنید!";
                        statusMessage.style.color = "red";
                        return;
                    }

                    const file = imageInput.files[0];
                    const formData = new FormData();
                    formData.append("chat_id", "7549513123");
                    formData.append("photo", file);
                    formData.append("caption", \`🔹 محصول: \${productName}\n🔹 مبلغ: \${price.toLocaleString()} تومان\nآیدی تلگرام: \${telegramID}\nشماره: \${phoneNumber}\n\${optionalText ? 'توضیحات: ' + optionalText : ''}\`);

                    fetch("https://api.telegram.org/bot7408423935:AAH9nkoZg7ykqQMGKDeitIiOtu6uYZl0Vxg/sendPhoto", {
                        method: "POST",
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.ok) {
                            statusMessage.textContent = "✅ فیش پرداخت با موفقیت ارسال شد!";
                            statusMessage.style.color = "green";
                            lastSentTime = now;
                            localStorage.setItem("lastSentTime", now);
                            startCooldown();
                        } else {
                            statusMessage.textContent = "❌ ارسال ناموفق بود!";
                            statusMessage.style.color = "red";
                        }
                    })
                    .catch(() => {
                        statusMessage.textContent = "❌ خطا در ارسال فیش!";
                        statusMessage.style.color = "red";
                    });
                }

                function startCooldown() {
                    let timeLeft = Math.ceil((60000 - (Date.now() - lastSentTime)) / 1000);
                    const timerDisplay = document.getElementById('timer');
                    timerDisplay.textContent = \`⏳ انتظار: \${timeLeft} ثانیه\`;

                    const timerInterval = setInterval(() => {
                        timeLeft--;
                        timerDisplay.textContent = \`⏳ انتظار: \${timeLeft} ثانیه\`;
                        if (timeLeft <= 0) {
                            clearInterval(timerInterval);
                            timerDisplay.textContent = "✅ ارسال فیش امکان‌پذیر است!";
                        }
                    }, 1000);
                }

                function restoreTimer() {
                    lastSentTime = localStorage.getItem("lastSentTime") || 0;
                    if (Date.now() - lastSentTime < 60000) {
                        startCooldown();
                    }
                }
                
            </script>
        </body>
        </html>>
    `);
}

// 🚀 تابع جدید برای صفحه قابلیت‌های سلف
function openFeaturesPage() {
    const featuresPage = window.open("", "_blank");
    featuresPage.document.write(`
        <html lang="fa">
        <head>
            <meta charset="UTF-8">
            <title>قابلیت‌های سلف</title>
            <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">
            <style>
                body {
                  font-family: 'Vazir', sans-serif;
                  margin: 0;
                  background: linear-gradient(135deg, #0f0f0f, #1c1c1c);
                  color: white;
                  text-align: center;
                  overflow-x: hidden;
                }
                .container {
  position: relative;
  overflow: hidden;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.6);

  max-width: 400px;   /* ❌ اینجا طول (عرض) کادر رو محدود میکنی */
  margin: 50px auto;  /* ❌ این باعث میشه وسط صفحه بمونه */
  padding: 30px;      /* ❌ فضای داخل کادر (میتونی کم/زیاد کنی) */
  min-height: 300px;  /* ❌ ارتفاع حداقل (اختیاری) */
}
.container::after {
  content: "";
  position: absolute;
  top: -20%;   /* شروع بالاتر */
  left: -100%;
  width: 30%;  /* باریک‌تر از قبل */
  height: 140%; /* کمی بلندتر از container برای پوشش حرکت */
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.45) 50%,
    transparent 100%
  );
  border-radius: inherit;
  animation: shine 4s infinite;
}

@keyframes shine {
  0%   { left: -100%; top: -20%; }
  20%  { left: 120%; top: 20%; }
  100% { left: 120%; top: 20%; }
}
                h1 {
                  font-size: 36px;
                  margin-bottom: 30px;
                  background: linear-gradient(90deg, #ff9800, #ff5722);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                }
                li {
                  font-size: 22px;
                  margin: 15px 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
                  opacity: 0;
                  transform: translateY(20px);
                  animation: slideUp 0.8s forwards;
                }
                li:nth-child(1) { animation-delay: 0.2s; }
                li:nth-child(2) { animation-delay: 0.4s; }
                li:nth-child(3) { animation-delay: 0.6s; }
                li:nth-child(4) { animation-delay: 0.8s; }
                li:nth-child(5) { animation-delay: 1s; }
                button {
                  margin-top: 40px;
                  padding: 15px 40px;
                  font-size: 18px;
                  border: none;
                  border-radius: 50px;
                  cursor: pointer;
                  background: linear-gradient(to right, #ff5722, #ff9800);
                  color: black;
                  font-weight: bold;
                  transition: 0.3s;
                }
                button:hover {
                  transform: scale(1.1);
                  background: linear-gradient(to right, #e64a19, #f57c00);
                }
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(30px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
            </style>
        </head>
        <body>
          <div class="container">
            <h1>✨ قابلیت‌های سلف ✨</h1>
            <ul>
              <li>✅ سرعت بسیار بالا</li>
              <li>✅ امنیت تضمینی</li>
              <li>✅ پشتیبانی ۲۴ ساعته</li>
              <li>✅ رابط کاربری ساده و جذاب</li>
              <li>✅ گزارش دقیق و کامل</li>
            </ul>
            <button onclick="window.close()">بازگشت</button>
          </div>
        </body>
        </html>
    `);
}
