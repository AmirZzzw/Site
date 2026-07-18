/**********************
CONFIG
**********************/
const BOT_TOKEN = "7408423935:AAH9nkoZg7ykqQMGKDeitIiOtu6uYZl0Vxg";
const CHAT_ID = "7549513123";
const SITE_URL = "https://sidkashop.qzz.io";
const SPAM_TIME = 60 * 1000; // محدودیت ارسال (میلی‌ثانیه)

/**********************
PAYMENT PAGE
**********************/
function openPaymentPage(productName, price) {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  w.document.write(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>پرداخت | ${productName}</title>
      <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css" />
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Vazir', sans-serif;
          background: #eef2f7;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .card {
          width: 100%;
          max-width: 440px;
          background: #fff;
          padding: 30px;
          border-radius: 26px;
          box-shadow: 0 20px 60px rgba(0,0,0,.12);
        }
        h3 { text-align: center; margin: 0 0 10px; color: #2c3e50; }
        .price {
          text-align: center;
          margin: 10px 0;
          font-size: 22px;
          color: #27ae60;
          font-weight: bold;
        }
        .bank {
          background: #f6f7f9;
          padding: 16px;
          border-radius: 18px;
          text-align: center;
          margin-bottom: 20px;
          font-size: 14px;
          color: #333;
          line-height: 1.8;
        }
        .upload {
          border: 2px dashed #cfd6e0;
          border-radius: 18px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: .3s;
        }
        .upload:hover { background: #f7f9fc; border-color: #a0b0c0; }
        .upload span { font-size: 13px; color: #666; word-break: break-word; }
        .upload input { display: none; }
        input, textarea {
          width: 100%;
          margin-top: 12px;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid #d0d6df;
          font-family: 'Vazir', sans-serif;
          font-size: 14px;
          transition: border-color .2s;
        }
        input:focus, textarea:focus { outline: none; border-color: #ff9800; }
        textarea { resize: none; height: 80px; }
        button {
          width: 100%;
          margin-top: 16px;
          padding: 14px;
          border: none;
          border-radius: 18px;
          font-family: 'Vazir', sans-serif;
          font-size: 15px;
          font-weight: bold;
          background: linear-gradient(135deg, #ff9800, #ffb347);
          color: #fff;
          cursor: pointer;
          transition: .3s;
        }
        button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4); }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
        #status { text-align: center; margin-top: 12px; font-size: 13px; min-height: 20px; color: #333; }
      </style>
    </head>
    <body>
      <div class="card">
        <h3>${productName}</h3>
        <div class="price">${price.toLocaleString()} تومان</div>
        <div class="bank">
          لطفاً مبلغ را به کارت زیر واریز کنید:<br>
          <b style="font-size: 18px; letter-spacing: 2px;">6037 9982 2227 6759</b><br>
          به نام: <b>امیرمحمد یوسفی</b>
        </div>
        <label class="upload" id="uploadLabel">
          <span style="font-size: 24px;">📤</span>
          <span>آپلود تصویر رسید</span>
          <span id="fileName" style="font-size: 12px; color: #999;">هیچ فایلی انتخاب نشده</span>
          <input type="file" id="receiptImage" accept="image/*">
        </label>
        <input type="text" id="telegramId" placeholder="آیدی تلگرام شما (مثال: @username)">
        <input type="tel" id="phoneNumber" placeholder="شماره تماس">
        <textarea id="description" placeholder="توضیحات (اختیاری)"></textarea>
        <button id="sendBtn">📨 ارسال رسید</button>
        <div id="status"></div>
      </div>

      <script>
        const imgInput = document.getElementById("receiptImage");
        const fileNameSpan = document.getElementById("fileName");
        const sendBtn = document.getElementById("sendBtn");
        const statusDiv = document.getElementById("status");
        const tgInput = document.getElementById("telegramId");
        const phoneInput = document.getElementById("phoneNumber");
        const descInput = document.getElementById("description");

        imgInput.onchange = () => {
          fileNameSpan.innerText = imgInput.files[0]?.name || "هیچ فایلی انتخاب نشده";
          fileNameSpan.style.color = imgInput.files[0] ? "#27ae60" : "#999";
        };

        sendBtn.onclick = () => {
          const now = Date.now();
          const lastSent = parseInt(localStorage.getItem("lastSentTime") || "0");
          const timeDiff = now - lastSent;

          if (timeDiff < ${SPAM_TIME}) {
            const waitSeconds = Math.ceil((${SPAM_TIME} - timeDiff) / 1000);
            statusDiv.innerText = "⏳ لطفاً " + waitSeconds + " ثانیه دیگر صبر کنید...";
            statusDiv.style.color = "#e67e22";
            return;
          }

          if (!imgInput.files[0]) {
            statusDiv.innerText = "❌ لطفاً تصویر رسید را آپلود کنید.";
            statusDiv.style.color = "#e74c3c";
            return;
          }
          if (!tgInput.value.trim()) {
            statusDiv.innerText = "❌ لطفاً آیدی تلگرام خود را وارد کنید.";
            statusDiv.style.color = "#e74c3c";
            return;
          }
          if (!phoneInput.value.trim()) {
            statusDiv.innerText = "❌ لطفاً شماره تماس خود را وارد کنید.";
            statusDiv.style.color = "#e74c3c";
            return;
          }

          sendBtn.disabled = true;
          sendBtn.innerText = "⏳ در حال ارسال...";
          statusDiv.innerText = "";
          statusDiv.style.color = "#333";

          const caption = \`📦 محصول: ${productName.replace(/`/g, '\\`')}
💵 مبلغ: ${price.toLocaleString()} تومان
👤 تلگرام: ${tgInput.value.trim()}
📞 شماره: ${phoneInput.value.trim()}
📝 توضیحات: ${descInput.value.trim() || "ندارد"}\`;

          const formData = new FormData();
          formData.append("chat_id", "${CHAT_ID}");
          formData.append("photo", imgInput.files[0]);
          formData.append("caption", caption);

          fetch("https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto", {
            method: "POST",
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            if (data.ok) {
              localStorage.setItem("lastSentTime", Date.now().toString());
              showSuccessPage(${price});
            } else {
              throw new Error(data.description || "خطای نامشخص");
            }
          })
          .catch(error => {
            console.error("Error:", error);
            statusDiv.innerText = "❌ خطا در ارسال. لطفاً دوباره تلاش کنید یا از راه دیگر با ما تماس بگیرید.";
            statusDiv.style.color = "#e74c3c";
            sendBtn.disabled = false;
            sendBtn.innerText = "📨 ارسال مجدد";
          });
        };

        function showSuccessPage(price) {
          let countdown = 5;
          document.body.innerHTML = \`
            <!DOCTYPE html>
            <html lang="fa" dir="rtl">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>پرداخت موفق</title>
              <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css" />
              <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                  font-family: 'Vazir', sans-serif;
                  background: linear-gradient(135deg, #2ecc71, #27ae60);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                  padding: 20px;
                }
                .success-box {
                  background: #fff;
                  width: 100%;
                  max-width: 460px;
                  padding: 45px 30px;
                  border-radius: 30px;
                  text-align: center;
                  box-shadow: 0 35px 80px rgba(0,0,0,.3);
                  animation: popIn .6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes popIn {
                  from { opacity: 0; transform: scale(.8); }
                  to { opacity: 1; transform: scale(1); }
                }
                .checkmark {
                  width: 100px;
                  height: 100px;
                  margin: 0 auto 25px;
                  background: #ecf9f2;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .checkmark svg { width: 60px; height: 60px; }
                .checkmark svg circle { fill: none; stroke: #27ae60; stroke-width: 3; stroke-dasharray: 166; stroke-dashoffset: 166; animation: strokeCircle .6s forwards; }
                .checkmark svg path { fill: none; stroke: #27ae60; stroke-width: 3; stroke-dasharray: 48; stroke-dashoffset: 48; animation: strokeCheck .4s .4s forwards; }
                @keyframes strokeCircle { to { stroke-dashoffset: 0; } }
                @keyframes strokeCheck { to { stroke-dashoffset: 0; } }
                h2 { margin: 0 0 10px; font-size: 24px; color: #2c3e50; }
                .info {
                  margin: 20px 0;
                  background: #f4f6f8;
                  padding: 16px;
                  border-radius: 18px;
                  font-size: 14px;
                  color: #555;
                }
                .progress-bar {
                  height: 6px;
                  background: #e0e0e0;
                  border-radius: 10px;
                  overflow: hidden;
                  margin: 15px 0;
                }
                .progress-fill {
                  height: 100%;
                  width: 0;
                  background: linear-gradient(90deg, #27ae60, #2ecc71);
                  animation: fillProgress ${countdown}s linear forwards;
                }
                @keyframes fillProgress { to { width: 100%; } }
                .countdown-text {
                  font-size: 13px;
                  color: #777;
                  margin-top: 10px;
                }
              </style>
            </head>
            <body>
              <div class="success-box">
                <div class="checkmark">
                  <svg viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25"/>
                    <path d="M14 27 L23 35 L38 18"/>
                  </svg>
                </div>
                <h2>✅ پرداخت با موفقیت ثبت شد!</h2>
                <div class="info">مبلغ پرداختی: <b>${price.toLocaleString()} تومان</b></div>
                <p style="font-size: 14px; color: #555;">تیم پشتیبانی به زودی با شما تماس خواهد گرفت.</p>
                <div class="progress-bar"><div class="progress-fill"></div></div>
                <p class="countdown-text">بازگشت خودکار به سایت در <span id="timer">${countdown}</span> ثانیه...</p>
              </div>
              <script>
                let timeLeft = ${countdown};
                const timerSpan = document.getElementById("timer");
                const interval = setInterval(() => {
                  timeLeft--;
                  if (timerSpan) timerSpan.innerText = timeLeft;
                  if (timeLeft <= 0) {
                    clearInterval(interval);
                    window.location.href = "${SITE_URL}";
                  }
                }, 1000);
              <\\/script>
            </body>
            </html>
          \`;
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

  w.document.write(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>قابلیت‌های سلف تلگرام</title>
      <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css" />
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
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

        <button class="back-btn" onclick="window.close(); window.opener ? null : location.href='${SITE_URL}';">🔙 بازگشت به سایت</button>
      </div>
    </body>
    </html>
  `);

  w.document.close();
}
