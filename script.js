let lastSentTime = localStorage.getItem("lastSentTime") || 0;
let timerInterval;

function openPaymentPage(productName, price) {
    const paymentPage = window.open("", "_blank");
    paymentPage.document.write(`
        <html>
        <head>
            <title>پرداخت ${productName}</title>
            <style>
                body { font-family: 'Vazirmatn', sans-serif; text-align: center; background: #000000; padding: 50px; }
                .container { background: white; padding: 40px; border-radius: 50px; box-shadow: 0 12px 24px rgba(0,0,0,0.3); }
                button { background: linear-gradient(to right, #ff5722, #ff9800); color: black; padding: 18px 55px; border: none; font-size: 22px; cursor: pointer; border-radius: 50px; transition: 0.3s; }
                button:hover { transform: scale(1.1); background: linear-gradient(to right, #e64a19, #f57c00); }
                input, textarea { width: 90%; padding: 10px; font-size: 16px; border-radius: 50px; margin-top: 10px; }
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
                <input type="file" id="receiptImage" accept="image/*">
                <input type="text" id="telegramID" placeholder="آیدی تلگرام شما">
                <input type="text" id="phoneNumber" placeholder="شماره شما">
                <textarea id="optionalText" placeholder="توضیحات بیشتر (اختیاری)"></textarea>
                <h1></h1>
                <button id="sendButton">ارسال فیش</button>
                <h1 id="statusMessage"></h1>
                <h3 id="timer">✅ ارسال فیش امکان‌پذیر است</h3>

                <button onclick="window.open('https://t.me/AmirSidka', '_blank')">Telegram Pv</button>
                <h1></h1>
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

                    fetch("https://api.telegram.org/bot7638518449:AAG8f1e0qkeJ4QJHx1nSPXnnOdDWGCukDeM/sendPhoto", {
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
        </html>
    `);
}