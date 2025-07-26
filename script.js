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
                html, body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    background: black;
                    overflow: hidden;
                    font-family: 'Vazir', sans-serif;
                    color: white;
                }
                #tsparticles {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }
                .container {
                    position: relative;
                    z-index: 1;
                    background: white;
                    padding: 40px;
                    border-radius: 50px;
                    box-shadow: 0 12px 24px rgba(0,0,0,0.3);
                    color: black;
                    max-width: 500px;
                    margin: auto;
                    margin-top: 50px;
                    text-align: center;
                }
                button {
                    background: linear-gradient(to right, #ff5722, #ff9800);
                    color: black;
                    padding: 18px 55px;
                    border: none;
                    font-size: 22px;
                    cursor: pointer;
                    border-radius: 50px;
                    transition: 0.3s;
                }
                button:hover {
                    transform: scale(1.1);
                    background: linear-gradient(to right, #e64a19, #f57c00);
                }
                input, textarea {
                    width: 90%;
                    padding: 10px;
                    font-size: 16px;
                    border-radius: 50px;
                    margin-top: 10px;
                    border: 1px solid #ccc;
                }
                #timer {
                    margin-top: 15px;
                    color: green;
                }
            </style>
        </head>
        <body onload="restoreTimer()">
            <div id="tsparticles"></div>

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
                <h3 id="timer">✅ ارسال فیش امکان‌پذیر است</h3>
                <h2 id="statusMessage"></h2>

                <button onclick="window.open('https://t.me/AmirSidka', '_blank')">Telegram Pv</button>
                <br /><br />
                <button onclick="window.close()">بازگشت به سایت</button>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/tsparticles@3/tsparticles.bundle.min.js"></script>
            <script>
                tsParticles.load("tsparticles", {
                    fullScreen: { enable: false },
                    background: {
                        color: { value: "transparent" }
                    },
                    particles: {
                        number: { value: 60 },
                        color: { value: "#ff0000" },
                        shape: { type: "triangle" },
                        opacity: {
                            value: 0.7,
                            random: true
                        },
                        size: {
                            value: 10,
                            random: true
                        },
                        move: {
                            enable: true,
                            speed: 5,
                            direction: "bottom-right",
                            outModes: {
                                default: "out"
                            }
                        },
                        shadow: {
                            enable: true,
                            color: "#ff0000",
                            blur: 5
                        },
                        stroke: {
                            width: 0
                        }
                    },
                    detectRetina: true
                });

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
