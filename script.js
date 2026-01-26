/**********************
 CONFIG
**********************/
const BOT_TOKEN = "7408423935:AAH9nkoZg7ykqQMGKDeitIiOtu6uYZl0Vxg";
const CHAT_ID  = "7549513123";
const SITE_URL = "https://sidkashop.qzz.io";
const SPAM_TIME = 60 * 1000; // محدودیت ارسال

/**********************
 PAYMENT PAGE
**********************/
function openPaymentPage(productName, price) {
  const w = window.open("", "_blank");
  if(!w) return alert("لطفا پاپ‌آپ را فعال کنید");

  w.document.open();
  w.document.write(`<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<title>پرداخت</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">
<style>
*{box-sizing:border-box}
body{
  margin:0;
  font-family:Vazir;
  background:linear-gradient(135deg,#eef2f7,#e3e8ef);
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center
}
.card{
  width:100%;
  max-width:440px;
  background:#fff;
  padding:28px;
  border-radius:26px;
  box-shadow:0 25px 60px rgba(0,0,0,.18)
}
h3{text-align:center;margin:0 0 10px}
.price{text-align:center;margin:12px 0;font-size:20px;color:#27ae60;font-weight:bold}
.bank{
  background:#f6f7f9;
  padding:16px;
  border-radius:18px;
  text-align:center;
  font-size:14px;
  margin-bottom:16px
}
.upload{
  border:2px dashed #cfd6e0;
  border-radius:18px;
  padding:18px;
  text-align:center;
  cursor:pointer;
  transition:.3s;
  margin-bottom:10px
}
.upload:hover{background:#f7f9fc}
.upload span{display:block;font-size:14px;color:#666;margin-top:6px}
.upload input{display:none}
input,textarea{
  width:100%;
  margin-top:10px;
  padding:12px 14px;
  border-radius:14px;
  border:1px solid #d0d6df;
  font-family:Vazir;
  font-size:14px
}
textarea{resize:none;height:80px}
button{
  width:100%;
  margin-top:14px;
  padding:14px;
  border:none;
  border-radius:18px;
  font-family:Vazir;
  font-size:15px;
  font-weight:bold;
  background:linear-gradient(135deg,#ff9800,#ffb347);
  cursor:pointer
}
button:disabled{opacity:.6}
#status{text-align:center;margin-top:10px;font-size:13px;color:#333}
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
واریز به کارت<br>
<b>6037 9982 2227 6759</b><br>
امیرمحمد یوسفی
</div>
<label class="upload">
📤 آپلود تصویر رسید
<span id="fileName">هیچ فایلی انتخاب نشده</span>
<input type="file" id="img" accept="image/*">
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
const tg = app.querySelector("#tg");
const phone = app.querySelector("#phone");
const txt = app.querySelector("#txt");

img.onchange = () => { fileName.innerText = img.files[0]?.name || "هیچ فایلی انتخاب نشده"; }

sendBtn.onclick = () => {
  const now = Date.now();
  const last = +localStorage.getItem("lastSentTime") || 0;
  if(now - last < ${SPAM_TIME}) {
    const wait = Math.ceil((${SPAM_TIME}-(now-last))/1000);
    status.innerText = "⏳ لطفا " + wait + " ثانیه صبر کنید";
    return;
  }

  if(!img.files[0] || !tg.value || !phone.value){
    status.innerText = "❌ اطلاعات ناقص است"; return;
  }

  sendBtn.disabled=true;
  status.innerText="⏳ در حال ارسال...";

  const fd = new FormData();
  fd.append("chat_id","${CHAT_ID}");
  fd.append("photo",img.files[0]);
  fd.append("caption",\`${productName}
${price.toLocaleString()} تومان
تلگرام: \${tg.value}
شماره: \${phone.value}
\${txt.value ? "توضیحات: "+txt.value : ""}\`);

  fetch("https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto",{method:"POST",body:fd})
  .then(r=>r.json())
  .then(d=>{
    if(!d.ok) throw 0;
    localStorage.setItem("lastSentTime",Date.now());
    showSuccess();
  })
  .catch(()=>{status.innerText="❌ خطا در ارسال"; sendBtn.disabled=false;});
};

/**********************
 SUCCESS PAGE
**********************/
function showSuccess(){
const n=5;
document.body.innerHTML=\`
<style>
body{margin:0;font-family:Vazir;background:radial-gradient(circle,#2ecc71,#27ae60);display:flex;justify-content:center;align-items:center;min-height:100vh;}
.box{background:#fff;width:100%;max-width:460px;padding:45px 30px;border-radius:30px;text-align:center;box-shadow:0 35px 80px rgba(0,0,0,.3);animation:scale .6s ease;}
@keyframes scale{from{opacity:0;transform:scale(.9)}}
.check{width:120px;height:120px;margin:0 auto 20px}
h2{margin:0}
.info{margin:20px 0;background:#f4f6f8;padding:16px;border-radius:18px;font-size:14px}
.progress{height:6px;background:#e0e0e0;border-radius:10px;overflow:hidden}
.bar{height:100%;width:0;background:linear-gradient(90deg,#27ae60,#2ecc71);animation:load ${n}s linear forwards}
@keyframes load{to{width:100%}}
</style>

<div class="box">
<svg class="check" viewBox="0 0 52 52">
<circle cx="26" cy="26" r="25" fill="none" stroke="#27ae60" stroke-width="3"/>
<path fill="none" stroke="#27ae60" stroke-width="4"
stroke-dasharray="100" stroke-dashoffset="100"
d="M14 27 L23 35 L38 18"
style="animation:draw .6s ease forwards .3s"/>
</svg>
<h2>پرداخت ثبت شد</h2>
<p>در انتظار بررسی</p>
<div class="info">مبلغ: <b>${price.toLocaleString()} تومان</b></div>
<div class="progress"><div class="bar"></div></div>
<p style="margin-top:15px;font-size:13px">بازگشت خودکار در <span id="t">${n}</span> ثانیه...</p>
<style>@keyframes draw{to{stroke-dashoffset:0}}</style>
</div>
\`;

let t=n;
const interval = setInterval(()=>{
  t--; document.getElementById("t").innerText=t;
  if(t<=0){clearInterval(interval);location.href="${SITE_URL}";}
},1000);
}
</script>
</body>
</html>`);
w.document.close();
}

/**********************
 FEATURES PAGE
**********************/
function openFeaturesPage(){
  const w = window.open("", "_blank");
  if(!w) return alert("لطفا پاپ‌آپ را فعال کنید");

  w.document.open();
  w.document.write(`<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8">
<title>قابلیت‌های سلف</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">
<style>
body{margin:0;font-family:Vazir;background:#0f0f0f;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh}
.card{width:100%;max-width:600px;background:#1c1c1c;padding:30px;border-radius:26px;box-shadow:0 10px 30px rgba(0,0,0,.5)}
h2{text-align:center;margin-top:0;color:#ff9800}
ul{padding:0;list-style:none}
li{margin:10px 0;font-size:15px;line-height:1.5}
.btn{display:block;margin:30px auto 0;padding:12px 36px;border:none;border-radius:50px;font-family:Vazir;font-size:15px;background:#ff9800;color:#fff;cursor:pointer;transition:.3s}
.btn:hover{transform:scale(1.05);box-shadow:0 4px 20px rgba(255,152,0,.6)}
</style>
</head>
<body>
<div class="card">
<h2>✨ قابلیت‌های سلف ✨️</h2>
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
<button class="btn" onclick="safeClose()">بازگشت</button>
<script>
function safeClose(){if(window.opener) window.close(); else location.href="${SITE_URL}";}
</script>
</div>
</body>
</html>`);
w.document.close();
}
