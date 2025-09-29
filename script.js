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

  max-width: 500px;
  margin: 40px auto;
  padding: 25px;
  min-height: 250px;
}

/* نوار برق */
.container::after {
  content: "";
  position: absolute;
  top: 0;          /* هم‌سطح بالا */
  left: -100%;     /* شروع از بیرون سمت چپ */
  width: 30%;      /* پهنای برق */
  height: 100%;    /* هم‌قد container */
  background: linear-gradient(
    90deg,         /* افقی باشه */
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  border-radius: inherit;
  animation: shine 8s infinite;
}

@keyframes shine {
  0%   { left: -100%; }
  100% { left: 120%; }
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
<li>با ارسال کلمه ی راهنما 2 صفحه ی 2 راهنما براتون ارسال میشه</li>
<li>🕒 دستورات مربوط به ساعت و بیو</li>
<li>- .تایم روشن: فعال کردن نمایش ساعت در اسم.</li>
<li>- .تایم خاموش: غیرفعال کردن ساعت.</li>
<li>- .بیو روشن: اگه بیو داشته باشین بیو کامل حذف میشه و ساعت قرار میگیره به جاش</li>
<li>- .بیو خاموش: ساعت از بیو تون حذف میشه</li>
<li>🎨 دستورات مربوط به فونت و زیبایی</li>
<li>- .فونت ها: توضیحی ثبت نشده!</li>
<li>- .تنظیم فونت n: به جای n باید عدد اون فونت مورد نظر رو بزارید.</li>
<li>- .لایک اسم مورد نظر: براتون لایک میسازه باید بزنید نمیتونم توضیح بدم چجوریه دقیق.</li>
<li>- .بیو رندوم: از اسمش مشخصه چی تولید میکنه.</li>
<li>📢 دستورات مربوط به بنر و پیام گروه‌ها</li>
<li>- .بنر: ارسال پیام به گروه‌ها.</li>
<li>- .بنر غیرفعال: توقف ارسال بنر.</li>
<li>- .حذف بنر: وقتی این دستور رو داخل گروه ارسال کنید دیگه بنر داخل اون گروه ارسال نمیشه</li>
<li>- .حذف بنر غیرفعال: با ارسال این دستور داخل همون گروهی که دستور بالا رو ارسال کردید دوباره به حالت عادی برمیگرده اون گروه و پیام بنر اونجا دوباره ارسال میشه</li>
<li>🧑‍💻 وضعیت آنلاین و برجسته سازی</li>
<li>- .برجسته فعال: برجسته کردن پیام‌ها.</li>
<li>- .برجسته غیرفعال: غیرفعال کردن برجسته سازی.</li>
<li>- .آنلاین فعال: حفظ وضعیت آنلاین.</li>
<li>- .کج فعال: هر پیامی بدین با حالت کج ارسال میشه</li>
<li>- .کج غیرفعال: قابلیت بالا رو غیرفعال میکنه</li>
<li>- .تکی فعال: هر پیامی بفرستید با حالت تکی ارسال میشه</li>
<li>- تکی غیرفعال: قابلین بالا رو غیرفعال میکنه- .آنلاین خاموش: غیرفعال کردن وضعیت آنلاین.</li>
<li>🔒 دستورات مربوط به جوین اجباری و قفل‌ها</li>
<li>- .معاف جوین اجباری 123456: از دستور مشخصه چیکار میکنه فقط باید به جای 123456 بیاید و ایدی عددی کاربر مورد نظر رو وارد کنید.</li>
<li>- .حذف معاف جوین اجباری 123456: اینم از دستور مشخصه چیکار میکنه .</li>
<li>- .پیوی قفل: هیچ‌کس اجازه ارسال پیام در پیوی ندارد و پیام کاربران حذف می‌شود.</li>
<li>- .پیوی باز: قفل پیوی غیرفعال می‌شود و کاربران می‌توانند پیام دهند.</li>
<li>- .قفل ایدی چنل: با ارسال این دستور هر کاربری که بخواد به شما پیام بده باید داخل چنلی که قفل کردین جوین بده وگرنه پیامش پاک میشه</li>
<li>- .حذف قفل ایدی چنل: کاری میکنه دیگه نیازی به جوین داخل کانال نباشه برای ارسال پیام</li>
<li>👥 مدیریت کاربران</li>
<li>- .سکوت: حذف پیام های کاربر خاص.</li>
<li>- .حذف سکوت: کاربر از لیست دشمنان حذف خواهد شد.</li>
<li>- .آیدی: با ریپلای کردن روی پیام کاربر میتونی اطلاعاتش رو دریافت بکنی.</li>
<li>- .دشمن: با ریپلای کردن روی پیام کاربر و ارسال این دستور کاربر خودکار فهش میخوره.</li><li>- .حذف دشمن: با ریپلای کردن روی پیام کاربر و ارسال این دستور دیگه فهش نمیخوره.</li>
<li>📄 تنظیمات پیام‌ها و ذخیره‌سازی</li>
<li>- .تنظیم ریلم: با ارسال این دستور در گروه هرکی هر پیامی بهت فرستاد داخل اون گروه تنظیم شده میره.</li>
<li>- .حذف ریلم: این دستور رو داخل جایی که ریلم رو فعال کردید میزنید و قابلیت ریلم کامل غیرفعال میشه</li>
<li>- .پشتیبانگیری از چت ها: این دستور رو اگه داخل پیوی بفرستید کل چت رو براتون داخل فایل txt میفرسته اما فقط پیام هایی که اون شخص داده بود داخل فایل txt قرار میده و پیام های شما رو قرار نمیده</li>
<li>- .پشتیبانگیری از چت: دقیق کار دستور بالا رو انجام میده اما ایندفعه پیام های شما هم قرار میده داخل فایل txt.</li>
<li>- ذخیره ی پیام های تایم دار: نیازی به ارسال این دستور به جایی نیست. هرکسی که عکس یا فیلم زمان دار بفرسته داخل پیام های شخصی خودت ذخیره میشه</li>
<li>🚫 فیلتر کلمات</li>
<li>- .فیلتر کلمه کلمه1، کلمه2، ...: افزودن چند کلمه به لیست فیلتر. اگر کاربر در پیوی این کلمات را بنویسد، پیامش حذف می‌شود.</li>
<li>- .حذف کلمه فیلتر کلمه1، کلمه2، ...: حذف چند کلمه از لیست فیلتر شده.</li>
<li>- .لیست کلمات فیلتر شده: نمایش لیست همه کلمات فیلتر شده فعلی.</li>
<li>🛠️ دستورات متفرقه و کاربردی</li>
<li>- .فال: با ارسال این دستور یدونه فال رندوم براتون میفرسته سلف.</li>
<li>- .سرعت: با ارسال این دستور سرعت سلف رو مشاهده میکنید</li>
<li>- .بگو test: یک ویس میسازه و متنی که بعد بگو مینویسین رو ویس میگیره و میگه، از کلمات انگلیسی استفاده کنید.</li>
<li>- .انقضا: دیگه از اسمش مشخصه چی رو نشون میده</li>
<li>- .دوست دارم: بنویس تا متوجه بشی ☺️</li>
<li>- .جق زدن: یه کیر میاد داره باهاش جق میزنه</li>
<li>- .قلب: وقتی این دستور رو ارسال کنی همه نوع قلب ویرایش میشه جالبه</li>
<li>- .اسپم پیام مورد نظر 100: 100 تا پیام به کاربر مورد نظر ارسال میکنه با سرعت</li>
<li>- .حذف 10: اون عدد 10 متغیر هست و میتونه هرچیزی باشه. خب کارایی این چیه؟ وقتی این دستور رو بزنی 10 تا پیامت که داخل هرجایی دادی حذف میشه</li>
<li>🔞 دستورات فان و شوخی 18+</li>
<li>- .کیر: این یه کیر رو مینویسه و میگه تو کونت</li>
<li>- .بیگ: کیر میاد</li>
<li>📆 تاریخ و محاسبات</li>
<li>- .تاریخ: تاریخ رو به شمسی و میلادی میگه</li>
<li>- .حساب 2+2: اون اعداد و ضرب تقسیم دست خودتونه سلف خودش حساب میکنه و براتون مینویسه</li>
<li>😂 شوخی و واکنش‌ها</li>
<li>- .خنده: با ارسال این دستور ایموجی خنده همش تغییر میکنه</li>
<li>- .فاک: با ارسال این دستور پیام ویرایش میشه و فاک میاد</li>
<li>- .بیوتیفول: کهکشان میاد</li>
<li>- .دختر: دختر کشیده میشه</li>
<li>- .گل: گل کشیده میشه</li>
<li>- .دوست دارم: بنویس تا متوجه بشی ☺️</li>
<li>- .جوک: با ارسال این دستور یه جوک میگه بهت</li>
<li>🌍 ترجمه و محتوای چنل‌ها</li>
<li>- .ترجمه test: به جای test هرچیزی بنویسی به فارسی ترجمه میشه</li>
<li>- .دریافت : با ارسال دستور دریافت لینک پیام چنل پابلیک، میتونید اون رو دریافت کنید حالا چه عکس باشه یا هرچی اما روی چنل هایی مثل https://t.me/c/99999999/99 جواب نیست اما چنل های پابلیک که پابلیک ان جوابه حالا چه محدود به فوروارد یا هرچی باشه بعضی چنل ها یا گروه هم کلا نمیشه</li>
<li>- .چک اسپم: چک میکنه اکانتتون ریپورت هست یا نه باید ریپلای کنید روی پیام خودتون این دستور رو</li>
<li>🧹 مدیریت و حذف پیام</li>
<li>- .بستن: ریپلای کنید روی همین پیام و بنویسید بستن تا این پیام پاک بشه.</li>
            </ul>
            <button onclick="window.close()">بازگشت</button>
            <h1></h1
          </div>
        </body>
        </html>
    `);
}
