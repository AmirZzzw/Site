/**********************
 CONFIG
**********************/
const BOT_TOKEN = "7408423935:AAH9nkoZg7ykqQMGKDeitIiOtu6uYZl0Vxg";
const CHAT_ID  = "7549513123";
const SITE_URL = "https://sidkashop.qzz.io";
const SPAM_TIME = 60 * 1000;

/**********************
 PAYMENT PAGE
**********************/
function openPaymentPage(productName, price) {
  const w = window.open("", "_blank");
  if (!w) return alert("Popup Blocked");

  w.document.open();
  w.document.write(`<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<title>پرداخت</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">
<style>
body{
  margin:0;font-family:Vazir;background:linear-gradient(135deg,#f2f4f8,#e9ecf2);
  display:flex;justify-content:center;align-items:center;min-height:100vh
}
.card{
  background:#fff;max-width:430px;width:100%;
  padding:30px;border-radius:22px;
  box-shadow:0 20px 50px rgba(0,0,0,.15)
}
h3{text-align:center;margin:0}
.price{text-align:center;color:#27ae60;font-weight:bold;margin:12px 0;font-size:18px}
.bank{
  background:#f7f7f7;padding:16px;border-radius:16px;
  text-align:center;margin-bottom:15px;font-size:14px
}
.upload{
  border:2px dashed #ccc;padding:16px;border-radius:16px;
  text-align:center;cursor:pointer;margin-bottom:10px
}
.upload input{display:none}
input,textarea,button{
  width:100%;margin-top:10px;padding:12px;
  border-radius:14px;border:1px solid #ccc;font-family:Vazir
}
button{
  background:linear-gradient(135deg,#ff9800,#ffb347);
  border:none;font-weight:bold;cursor:pointer;color:#000
}
button:disabled{opacity:.6}
#status{text-align:center;font-size:13px;margin-top:12px}
</style>
</head>
<body>

<div class="card" id="app"></div>

<script>
const app = document.getElementById("app");

app.innerHTML = \`
<h3>${productName}</h3>
<div class="price">${price.toLocaleString()} تومان</div>

<div class="bank">
6037 9982 2227 6759<br>امیرمحمد یوسفی
</div>

<label class="upload">
📤 انتخاب تصویر رسید
<input type="file" id="img" accept="image/*">
<div id="fileName">فایلی انتخاب نشده</div>
</label>

<input id="tg" placeholder="آیدی تلگرام">
<input id="phone" placeholder="شماره تماس">
<textarea id="txt" placeholder="توضیحات (اختیاری)"></textarea>

<button id="sendBtn">ارسال رسید</button>
<div id="status"></div>
\`;

const img = app.querySelector("#img");
const fileName = app.querySelector("#fileName");
const sendBtn = app.querySelector("#sendBtn");
const status = app.querySelector("#status");

img.onchange = () => fileName.innerText = img.files[0]?.name || "فایلی انتخاب نشده";

sendBtn.onclick = () => {
  const now = Date.now();
  const last = +localStorage.getItem("lastSentTime") || 0;
  if (now - last < ${SPAM_TIME}) return status.innerText="⏳ کمی صبر کنید";

  if (!img.files[0] || !tg.value || !phone.value)
    return status.innerText="❌ اطلاعات ناقص";

  sendBtn.disabled = true;
  status.innerText="⏳ در حال ارسال";

  const fd = new FormData();
  fd.append("chat_id","${CHAT_ID}");
  fd.append("photo",img.files[0]);
  fd.append("caption",
\`${productName}
${price} تومان
تلگرام: \${tg.value}
شماره: \${phone.value}
\${txt.value}\`
  );

  fetch("https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto",{method:"POST",body:fd})
  .then(r=>r.json())
  .then(d=>{
    if(!d.ok) throw 0;
    localStorage.setItem("lastSentTime",Date.now());
    showSuccess();
  })
  .catch(()=>{status.innerText="❌ خطا";sendBtn.disabled=false});
};

/**********************
 SUCCESS PAGE (PRO)
**********************/
function showSuccess(){
document.body.innerHTML=\`
<style>
body{
  margin:0;font-family:Vazir;
  background:radial-gradient(circle at top,#2ecc71,#27ae60);
  min-height:100vh;display:flex;justify-content:center;align-items:center;
  color:#2c3e50
}
.wrap{
  background:#fff;
  width:100%;max-width:460px;
  padding:45px 30px;border-radius:28px;
  box-shadow:0 30px 70px rgba(0,0,0,.25);
  text-align:center;
  animation:pop .7s ease
}
@keyframes pop{from{opacity:0;transform:scale(.9)}}
.check{
  width:120px;height:120px;margin:0 auto 25px;
}
h2{margin:0 0 10px}
.info{
  background:#f4f6f8;
  border-radius:18px;
  padding:15px;
  margin:20px 0;
  font-size:14px;
}
.progress{
  height:6px;
  background:#e0e0e0;
  border-radius:10px;
  overflow:hidden;
  margin-top:20px
}
.bar{
  height:100%;
  width:0%;
  background:linear-gradient(90deg,#27ae60,#2ecc71);
  animation:load 5s linear forwards
}
@keyframes load{to{width:100%}}
.timer{
  margin-top:15px;
  font-size:15px;
  color:#555
}
</style>

<div class="wrap">
  <svg class="check" viewBox="0 0 52 52">
    <circle cx="26" cy="26" r="25" fill="none" stroke="#27ae60" stroke-width="3"/>
    <path fill="none" stroke="#27ae60" stroke-width="4"
      stroke-dasharray="100" stroke-dashoffset="100"
      d="M14 27 L23 35 L38 18"
      style="animation:draw .6s ease forwards .3s"/>
  </svg>

  <h2>پرداخت شما ثبت شد</h2>
  <p>با موفقیت دریافت شد ✅</p>

  <div class="info">
    مبلغ: <b>${price.toLocaleString()} تومان</b><br>
    وضعیت: در انتظار بررسی
  </div>

  <div class="progress"><div class="bar"></div></div>
  <div class="timer">بازگشت به سایت تا <span id="t">5</span> ثانیه</div>
</div>

<style>
@keyframes draw{to{stroke-dashoffset:0}}
</style>
\`;

let t=5;
const i=setInterval(()=>{
  t--;
  document.getElementById("t").innerText=t;
  if(t<=0){clearInterval(i);location.href="${SITE_URL}"}
},1000);
}
</script>
</body>
</html>`);
  w.document.close();
}

/**********************
 FEATURES PAGE (LIGHT)
**********************/
function openFeaturesPage(){
  const w = window.open("", "_blank");
  if(!w) return alert("Popup Blocked");

  w.document.open();
  w.document.write(`<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<title>قابلیت‌های سلف</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">
<style>
body{margin:0;font-family:Vazir;background:#111;color:#fff}
.box{max-width:600px;margin:30px auto;padding:25px;
background:#1c1c1c;border-radius:20px}
li{margin:8px 0}
button{margin-top:20px;padding:10px 30px;
border-radius:50px;border:none;background:#ff9800}
</style>
</head>
<body>
<div class="box">
<h2>✨ قابلیت‌های سلف</h2>
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
<button onclick="safeClose()">بازگشت</button>
</div>

<script>
function safeClose(){
  if(window.opener) window.close();
  else location.href="${SITE_URL}";
}
</script>
</body>
</html>`);
  w.document.close();
}
