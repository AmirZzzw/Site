let lastSentTime = localStorage.getItem("lastSentTime") || 0;

// باز کردن فرم پرداخت به صورت مودال
function openPaymentPage(productName, price) {
    // چک اگر مودال قبلی هست، حذفش کن
    const existingModal = document.getElementById('paymentModal');
    if (existingModal) existingModal.remove();

    // ساخت مودال
    const modal = document.createElement('div');
    modal.id = 'paymentModal';
    modal.style = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    modal.innerHTML = `
        <div style="
            background: #fff;
            color: black;
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            font-family: 'Vazir', sans-serif;
            text-align: center;
            position: relative;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
        ">
            <h2>پرداخت ${productName}</h2>
            <h3>مبلغ: <strong>${price.toLocaleString()} تومان</strong></h3>
            <p>به شماره کارت زیر واریز کنید:</p>
            <p style="font-weight:bold; font-size:20px; margin: 10px 0;">6037 9982 2227 6759</p>
            <p>به نام: امیرمحمد یوسفی</p>

            <hr style="margin: 20px 0;"/>

            <h3>ارسال فیش پرداخت</h3>
            <input type="file" id="receiptImage" accept="image/*" style="width: 90%; margin: 10px 0;" />
            <input type="text" id="telegramID" placeholder="آیدی تلگرام شما" style="width: 90%; margin: 10px 0; padding:10px; border-radius:50px; border:1px solid #ccc;" />
            <input type="text" id="phoneNumber" placeholder="شماره شما" style="width: 90%; margin: 10px 0; padding:10px; border-radius:50px; border:1px solid #ccc;" />
            <textarea id="optionalText" placeholder="توضیحات بیشتر (اختیاری)" style="width: 90%; margin: 10px 0; padding:10px; border-radius:20px; border:1px solid #ccc;" rows="3"></textarea>

            <button id="sendButton" style="
                background: linear-gradient(to right, #ff5722, #ff9800);
                color: black;
                padding: 15px 50px;
                font-size: 20px;
                font-weight: bold;
                border-radius: 50px;
                border: none;
                cursor: pointer;
                margin-top: 10px;
                transition: 0.3s;
            ">ارسال فیش</button>

            <p id="timer" style="margin-top: 15px; color: green;">✅ ارسال فیش امکان‌پذیر است</p>
            <p id="statusMessage" style="font-weight: bold; min-height: 24px;"></p>

            <button id="closeModal" style="
                background: #888;
                color: white;
                padding: 10px 30px;
                border-radius: 50px;
                border: none;
                cursor: pointer;
                margin-top: 20px;
            ">بازگشت به سایت</button>
        </div>
    `;

    document.body.appendChild(modal);

    // افکت برق روی دکمه ارسال
    const sendBtn = modal.querySelector("#sendButton");
    sendBtn.addEventListener("click", () => {
        flashEffect(sendBtn);
        sendReceipt(productName, price);
    });

    modal.querySelector("#closeModal").addEventListener("click", () => {
        clearInterval(timerInterval);
        modal.remove();
    });

    restoreTimer();
}

function flashEffect(button) {
    button.style.position = 'relative';
    const flash = document.createElement('span');
    flash.style = `
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, rgba(255,255,255,0.6) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.6) 75%, transparent 75%, transparent);
        background-size: 50% 50%;
        animation: flashMove 0.6s linear forwards;
        pointer-events: none;
        border-radius: 50px;
        z-index: 10;
    `;
    button.appendChild(flash);

    flash.addEventListener('animationend', () => {
        flash.remove();
    });
}

// ارسال فیش
function sendReceipt(productName, price) {
    const now = Date.now();
    const timePassed = now - lastSentTime;

    const statusMessage = document.getElementById('statusMessage');

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
    formData.append('receipt', file);
    formData.append('telegramID', telegramID);
    formData.append('phoneNumber', phoneNumber);
    formData.append('optionalText', optionalText);
    formData.append('productName', productName);
    formData.append('price', price);

    statusMessage.textContent = "⏳ در حال ارسال فیش...";
    statusMessage.style.color = "blue";

    // به جای آدرس زیر آدرس API خودتو بگذار
    fetch('https://your-server.com/api/sendReceipt', {
        method: 'POST',
        body: formData
    })
    .then(res => {
        if (res.ok) return res.json();
        else throw new Error('خطا در ارسال');
    })
    .then(data => {
        statusMessage.textContent = "✅ فیش با موفقیت ارسال شد!";
        statusMessage.style.color = "green";
        lastSentTime = Date.now();
        localStorage.setItem("lastSentTime", lastSentTime);
        startTimer();

        // پاک کردن فرم
        document.getElementById('receiptImage').value = "";
        document.getElementById('telegramID').value = "";
        document.getElementById('phoneNumber').value = "";
        document.getElementById('optionalText').value = "";
    })
    .catch(() => {
        statusMessage.textContent = "❌ ارسال فیش ناموفق بود!";
        statusMessage.style.color = "red";
    });
}

let timerInterval = null;

function startTimer() {
    const timer = document.getElementById('timer');
    if (!timer) return;

    let secondsLeft = 60;
    timer.textContent = `⏳ لطفا ${secondsLeft} ثانیه صبر کنید تا دوباره ارسال کنید`;
    timer.style.color = "orange";

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft > 0) {
            timer.textContent = `⏳ لطفا ${secondsLeft} ثانیه صبر کنید تا دوباره ارسال کنید`;
        } else {
            clearInterval(timerInterval);
            timer.textContent = "✅ ارسال فیش امکان‌پذیر است";
            timer.style.color = "green";
        }
    }, 1000);
}

function restoreTimer() {
    const timer = document.getElementById('timer');
    if (!timer) return;

    const now = Date.now();
    const timePassed = now - lastSentTime;

    if (timePassed < 60000) {
        let secondsLeft = Math.ceil((60000 - timePassed) / 1000);
        timer.textContent = `⏳ لطفا ${secondsLeft} ثانیه صبر کنید تا دوباره ارسال کنید`;
        timer.style.color = "orange";

        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            secondsLeft--;
            if (secondsLeft > 0) {
                timer.textContent = `⏳ لطفا ${secondsLeft} ثانیه صبر کنید تا دوباره ارسال کنید`;
            } else {
                clearInterval(timerInterval);
                timer.textContent = "✅ ارسال فیش امکان‌پذیر است";
                timer.style.color = "green";
            }
        }, 1000);
    } else {
        timer.textContent = "✅ ارسال فیش امکان‌پذیر است";
        timer.style.color = "green";
    }
}

/* افکت برق (انیمیشن) */
const style = document.createElement('style');
style.innerHTML = `
@keyframes flashMove {
  0% { background-position: 0 0; }
  100% { background-position: 100% 100%; }
}
`;
document.head.appendChild(style);
