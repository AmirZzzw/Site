/* =========================
   تنظیمات
========================= */
const BOT_TOKEN = "7408423935:AAH9nkoZg7ykqQMGKDeitIiOtu6uYZl0Vxg";
const CHAT_ID  = "7549513123";
const SITE_URL = "https://sidkashop.qzz.io";

const SPAM_TIME = 60 * 1000; // 1 دقیقه

/* =========================
   صفحه پرداخت
========================= */
function openPaymentPage(productName, price) {
  const w = window.open("", "_blank");

  w.document.write(`
<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<title>پرداخت</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Vazir',sans-serif;background:#f1f2f4;display:flex;justify-content:center;align-items:center;min-height:100vh;}
.card{background:#fff;width:100%;max-width:400px;padding:25px;border-radius:16px;box-shadow:0 8px 25px rgba(0,0,0,.1);}
h3{text-align:center;margin:0 0 10px;color:#333;font-size:22px;}
.price{text-align:center;color:#27ae60;margin:5px 0 15px;font-weight:bold;font-size:18px;}
.bank{background:#f7f7f7;border-radius:12px;padding:12px;text-align:center;font-size:14px;margin-bottom:15px;color:#222;}
.upload{border:1.5px dashed #bbb;border-radius:12px;padding:15px;text-align:center;font-size:14px;margin-bottom:10px;color:#222;position:relative;}
.upload input{display:none;}
.upload label{cursor:pointer;}
input,textarea{width:100%;margin-top:8px;padding:10px;border-radius:12px;border:1px solid #ccc;font-family:'Vazir';color:#222;font-size:14px;}
textarea{resize:none;}
button{width:100%;margin-top:15px;padding:12px;border:none;border-radius:14px;background:#ff9800;font-size:15px;font-weight:bold;cursor:pointer;transition:0.3s;}
button:hover{background:#e68900;}
#status{text-align:center;font-size:13px;margin-top:10px;color:#333;}
</style>
</head>
<body>
<div class="card">
  <h3>${productName}</h3>
  <div class="price">${price.toLocaleString()} تومان</div>

  <div class="bank">
    واریز به کارت<br>
    <b>6037 9982 2227 6759</b><br>
    امیرمحمد یوسفی
  </div>

  <div class="upload">
    <label for="img">📤 انتخاب تصویر رسید</label>
    <div id="fileName">هیچ فایلی انتخاب نشده</div>
    <input type="file" id="img" accept="image/*">
  </div>

  <input id="tg" placeholder="آیدی تلگرام">
  <input id="phone" placeholder="شماره تماس">
  <textarea id="txt" placeholder="توضیحات (اختیاری)"></textarea>

  <button id="sendBtn">ارسال رسید</button>
  <div id="status"></div>
</div>

<script>
const img = document.getElementById("img");
const fileName = document.getElementById("fileName");
const status = document.getElementById("status");
const sendBtn = document.getElementById("sendBtn");

img.onchange = () => {
  fileName.innerText = img.files[0] ? img.files[0].name : "هیچ فایلی انتخاب نشده";
};

sendBtn.onclick = () => {
  const now = Date.now();
  const lastTime = localStorage.getItem("lastSentTime") || 0;

  if(now - lastTime < ${SPAM_TIME}){
    status.innerText = "⏳ لطفاً یک دقیقه صبر کنید";
    status.style.color = "orange";
    return;
  }

  const tg = document.getElementById("tg").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const txt = document.getElementById("txt").value.trim();

  if(!img.files[0] || !tg || !phone){
    status.innerText = "❌ اطلاعات کامل نیست";
    status.style.color = "red";
    return;
  }

  const fd = new FormData();
  fd.append("chat_id","${CHAT_ID}");
  fd.append("photo", img.files[0]);
  fd.append("caption", \`${productName}
${price.toLocaleString()} تومان
تلگرام: \${tg}
شماره: \${phone}
\${txt}\`);

  fetch("https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto", {
    method: "POST",
    body: fd
  })
  .then(res => res.json())
  .then(data => {
    if(data.ok){
      localStorage.setItem("lastSentTime", Date.now());
      showSuccessPage();
    } else {
      status.innerText = "❌ ارسال ناموفق، دوباره تلاش کنید";
      status.style.color = "red";
    }
  })
  .catch(err => {
    console.error(err);
    status.innerText = "❌ خطا در ارتباط با سرور";
    status.style.color = "red";
  });
};

function showSuccessPage(){
  document.body.innerHTML = \`
    <div style="font-family:Vazir;text-align:center;padding:40px;background:#f1f2f4;color:#333;min-height:100vh;display:flex;justify-content:center;align-items:center;flex-direction:column">
      <h2 style="color:#2ecc71;font-weight:bold">✅ سفارش ثبت شد</h2>
      <p>تا چند ثانیه دیگر به سایت بازمی‌گردید</p>
      <b id="t">10</b>
    </div>
  \`;
  let t = 10;
  const interval = setInterval(()=>{
    t--;
    document.getElementById("t").innerText = t;
    if(t <= 0){
      clearInterval(interval);
      location.href = "${SITE_URL}";
    }
  }, 1000);
}
</script>
</body>
</html>
`);
}

/* =========================
   صفحه قابلیت‌های سلف
========================= */
function openFeaturesPage() {
  const w = window.open("", "_blank");
  const html = `
<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<title>قابلیت‌های سلف</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">
<style>
body{font-family:'Vazir';margin:0;background:#1c1c1c;color:white;text-align:center;}
.container{max-width:700px;margin:30px auto;padding:25px;background:rgba(255,255,255,0.05);border-radius:20px;backdrop-filter:blur(15px);}
h1{font-size:30px;margin-bottom:20px;color:#ff9800;}
ul{list-style:none;padding:0;text-align:right;}
li{margin:8px 0;font-size:16px;}
button{margin-top:20px;padding:10px 30px;font-size:16px;border:none;border-radius:50px;background:linear-gradient(to right,#ff5722,#ff9800);color:black;cursor:pointer;}
button:hover{transform:scale(1.05);}
</style>
</head>
<body>
<div class="container">
<h1>✨ قابلیت‌های سلف ✨</h1>
<ul>
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
<li>- .ارز: قیمت بعضی از ارز ها رو میاره
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
</div>
</body>
</html>
`;
  w.document.write(html);
  w.document.close();
}
