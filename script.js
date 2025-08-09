let lastSentTime = localStorage.getItem("lastSentTime") || 0;

function openPaymentPage(productName, price) {
    const paymentContainer = document.getElementById("paymentContainer");
    const paymentContent = document.getElementById("paymentContent");

    paymentContent.innerHTML = `
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

            <button id="sendButton">ارسال فیش</button>
            <h3 id="timer">✅ ارسال فیش امکان‌پذیر است</h3>
            <h2 id="statusMessage"></h2>
            <button onclick="window.open('https://t.me/AmirSidka', '_blank')">Telegram Pv</button>
            <br /><br />
        </div>
    `;

    paymentContainer.style.display = "block";

    // دکمه بستن پنل پرداخت
    document.getElementById("closePayment").onclick = function() {
        paymentContainer.style.display = "none";
        // پاک کردن محتوای پرداخت
        paymentContent.innerHTML = "";
    };

    document.getElementById("sendButton").onclick = function () {
        sendReceipt(productName, price);
    };

    restoreTimer();
}

function sendReceipt(productName, price) {
    const now = Date.now();
    const timePassed = now - lastSentTime;

    const statusMessage = document.getElementById("statusMessage");

    if (timePassed < 60000) {
        alert(`🚨 لطفاً ${Math.ceil((60000 - timePassed) / 1000)} ثانیه دیگر صبر کنید!`);
        return;
    }

    const imageInput = document.getElementById('receiptImage');
    const telegramID = document.getElementById('telegramID').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const optionalText = document.getElementById('optionalText').value.trim();

    if (imageInput.files.length === 0 || telegramID === "" || phoneNumber === "") {
        statusMessage.textContent = "🚨 لطفاً عکس، آیدی تلگرام، و شماره خود را وارد کنید!";
        statusMessage.style.color = "red";
        return;
    }

    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append("chat_id", "7549513123");
    formData.append("photo", file);
    formData.append("caption", `🔹 محصول: ${productName}\n🔹 مبلغ: ${price.toLocaleString()} تومان\nآیدی تلگرام: ${telegramID}\nشماره: ${phoneNumber}\n${optionalText ? 'توضیحات: ' + optionalText : ''}`);

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
    timerDisplay.textContent = `⏳ انتظار: ${timeLeft} ثانیه`;

    const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `⏳ انتظار: ${timeLeft} ثانیه`;
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
