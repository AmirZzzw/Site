/**********************
CONFIG
**********************/
const BOT_TOKEN = "7408423935:AAH9nkoZg7ykqQMGKDeitIiOtu6uYZl0Vxg";
const CHAT_ID = "7549513123";
const SITE_URL = "https://sidkashop.qzz.io";
const SPAM_TIME = 60 * 1000;
const FETCH_TIMEOUT = 120000;

/**********************
PAYMENT PAGE
**********************/
function openPaymentPage(productName, price) {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>پرداخت | ${productName}</title>
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css" />
<style>
* { box-sizing: border-box; margin: 0; padding: 0; outline: none !important; -webkit-tap-highlight-color: transparent !important; }
body { font-family: 'Vazir', sans-serif; background: #1a1d23; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; color: #e1e3e8; }
.card { width: 100%; max-width: 460px; background: #21242b; padding: 35px 30px; border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,.4), 0 0 0 1px #363a43; animation: slideUp 0.5s ease; }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
h3 { text-align: center; margin: 0 0 5px; color: #e1e3e8; font-size: 20px; }
.price { text-align: center; margin: 8px 0 20px; font-size: 28px; color: #ff9800; font-weight: bold; }
.price span { font-size: 14px; color: #9ca0ab; font-weight: normal; }
.bank { background: #2a2d35; padding: 18px; border-radius: 16px; text-align: center; margin-bottom: 24px; font-size: 13px; color: #9ca0ab; line-height: 2; border: 1px solid #363a43; position: relative; overflow: hidden; }
.bank::before { content: ''; position: absolute; top: 0; right: 0; width: 4px; height: 100%; background: #ff9800; border-radius: 0 4px 4px 0; }
.bank .cn { font-size: 20px; color: #e1e3e8; letter-spacing: 3px; font-family: 'Courier New', monospace; direction: ltr; display: inline-block; background: #1a1d23; padding: 8px 16px; border-radius: 10px; margin: 8px 0; }
.upload-area { border: 2px dashed #363a43; border-radius: 16px; padding: 24px 20px; text-align: center; cursor: pointer; margin-bottom: 18px; transition: all .3s; background: #2a2d35; }
.upload-area:hover { border-color: #ff9800; }
.upload-area.has-file { border-color: #2ecc71; border-style: solid; background: rgba(46,204,113,.05); }
.upload-icon { font-size: 36px; margin-bottom: 8px; }
.upload-text { font-size: 14px; color: #9ca0ab; }
.file-name { font-size: 12px; color: #ff9800; margin-top: 6px; word-break: break-all; }
.file-size { font-size: 11px; color: #9ca0ab; margin-top: 2px; }
.upload-area input { display: none; }
input, textarea { width: 100%; margin-top: 12px; padding: 14px 16px; border-radius: 14px; border: 1px solid #363a43; font-family: 'Vazir', sans-serif; font-size: 14px; background: #2a2d35; color: #e1e3e8; }
input:focus, textarea:focus { border-color: #ff9800; }
textarea { resize: none; height: 80px; }
.send-btn { width: 100%; margin-top: 20px; padding: 16px; border: none; border-radius: 16px; font-family: 'Vazir', sans-serif; font-size: 16px; font-weight: bold; background: linear-gradient(135deg, #ff9800, #ffb347); color: #1a1d23; cursor: pointer; transition: all .3s; }
.send-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,152,0,.3); }
.send-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.progress-container { margin-top: 18px; display: none; }
.progress-container.active { display: block; }
.progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 12px; }
.progress-percent { color: #ff9800; font-weight: bold; font-size: 18px; }
.progress-info { color: #9ca0ab; }
.progress-bar-outer { height: 8px; background: #2a2d35; border-radius: 20px; overflow: hidden; }
.progress-bar-inner { height: 100%; background: linear-gradient(90deg, #ff9800, #ffb347); border-radius: 20px; width: 0%; transition: width 0.3s; }
.progress-details { display: flex; justify-content: space-between; margin-top: 6px; font-size: 11px; color: #9ca0ab; flex-wrap: wrap; gap: 4px; }
#status { text-align: center; margin-top: 14px; font-size: 13px; min-height: 20px; color: #9ca0ab; }
#status.error { color: #e74c3c; }
#status.warning { color: #f39c12; }
</style>
</head>
<body>
<div class="card">
<h3>${productName}</h3>
<div class="price">${price.toLocaleString()} <span>تومان</span></div>
<div class="bank">
<div style="font-size:12px;margin-bottom:4px;">📱 شماره کارت جهت واریز</div>
<div class="cn">6037 9982 2227 6759</div>
<div style="margin-top:4px;">به نام: <b style="color:#e1e3e8;">امیرمحمد یوسفی</b></div>
</div>
<label class="upload-area" id="ua">
<div class="upload-icon" id="uicon">📤</div>
<div class="upload-text">برای آپلود تصویر رسید کلیک کنید</div>
<div class="file-name" id="fn"></div>
<div class="file-size" id="fs"></div>
<input type="file" id="fi" accept="image/*">
</label>
<input type="text" id="tg" placeholder="آیدی تلگرام (مثال: @username)">
<input type="tel" id="ph" placeholder="شماره تماس">
<textarea id="desc" placeholder="📝 توضیحات (اختیاری)"></textarea>
<button class="send-btn" id="sb"><span id="sbt">📨 ارسال رسید</span></button>
<div class="progress-container" id="pc">
<div class="progress-header"><span class="progress-percent" id="pp">0%</span><span class="progress-info" id="pi">در حال آماده‌سازی...</span></div>
<div class="progress-bar-outer"><div class="progress-bar-inner" id="pb"></div></div>
<div class="progress-details">
<span id="pu">📤 0 KB</span>
<span id="pt">کل: 0 KB</span>
<span id="ps">سرعت: --</span>
<span id="pe">زمان: --</span>
</div>
</div>
<div id="status"></div>
</div>
<script>
(function(){
var fi=document.getElementById('fi');
var ua=document.getElementById('ua');
var uicon=document.getElementById('uicon');
var fn=document.getElementById('fn');
var fs=document.getElementById('fs');
var sb=document.getElementById('sb');
var sbt=document.getElementById('sbt');
var status=document.getElementById('status');
var tg=document.getElementById('tg');
var ph=document.getElementById('ph');
var desc=document.getElementById('desc');
var pc=document.getElementById('pc');
var pp=document.getElementById('pp');
var pi=document.getElementById('pi');
var pb=document.getElementById('pb');
var pu=document.getElementById('pu');
var pt=document.getElementById('pt');
var ps=document.getElementById('ps');
var pe=document.getElementById('pe');
var sf=null;
var ll=0,lt=0;

function fs2(b){if(b===0)return'0 B';var k=1024,s=['B','KB','MB','GB'];var i=Math.floor(Math.log(b)/Math.log(k));return parseFloat((b/Math.pow(k,i)).toFixed(2))+' '+s[i];}
function ft(s){if(s<1)return 'چند لحظه';if(s<60)return Math.round(s)+' ثانیه';var m=Math.floor(s/60);var se=Math.round(s%60);return m+':'+(se<10?'0':'')+se+' دقیقه';}

ua.onclick=function(){fi.click();};
fi.onchange=function(){
if(fi.files[0]){sf=fi.files[0];fn.innerText='📎 '+sf.name;fs.innerText='حجم: '+fs2(sf.size);uicon.innerText='✅';ua.classList.add('has-file');}
else{sf=null;fn.innerText='';fs.innerText='';uicon.innerText='📤';ua.classList.remove('has-file');}
};

function rp(){pc.classList.remove('active');pb.style.width='0%';pp.innerText='0%';pi.innerText='در حال آماده‌سازی...';pu.innerText='📤 0 KB';pt.innerText='کل: 0 KB';ps.innerText='سرعت: --';pe.innerText='زمان: --';}

function up(l,t){
var n=Date.now();
var pct=Math.round((l/t)*100);
pb.style.width=pct+'%';
pp.innerText=pct+'%';
pu.innerText='📤 '+fs2(l);
pt.innerText='کل: '+fs2(t);
if(lt>0&&ll>0){
var td=(n-lt)/1000;
var bd=l-ll;
if(td>0.5){
var sp=bd/td;
ps.innerText='سرعت: '+fs2(sp)+'/s';
var rm=t-l;
if(sp>0){var eta=rm/sp;pe.innerText='زمان: '+ft(eta);pi.innerText='در حال ارسال...';}
ll=l;lt=n;
}
}else{ll=l;lt=n;}
if(pct>=100){pi.innerText='✅ ارسال کامل شد!';ps.innerText='سرعت: --';pe.innerText='زمان: --';}
}

sb.onclick=function(){
var now=Date.now();
var ls=parseInt(localStorage.getItem('lst')||'0');
var td=now-ls;
if(td<${SPAM_TIME}){var w=Math.ceil((${SPAM_TIME}-td)/1000);status.innerText='⏳ '+w+' ثانیه صبر کنید...';status.className='warning';return;}
if(!sf){status.innerText='❌ تصویر رسید را آپلود کنید.';status.className='error';return;}
if(!tg.value.trim()){status.innerText='❌ آیدی تلگرام را وارد کنید.';status.className='error';return;}
if(!ph.value.trim()){status.innerText='❌ شماره تماس را وارد کنید.';status.className='error';return;}
sb.disabled=true;sbt.innerText='⏳ در حال ارسال...';status.innerText='';status.className='';
rp();pc.classList.add('active');pi.innerText='🔄 در حال فشرده‌سازی...';
var img=new Image();var rd=new FileReader();
rd.onload=function(e){img.src=e.target.result;};
img.onload=function(){
var cv=document.createElement('canvas');var cx=cv.getContext('2d');
var mw=1200,w=img.width,h=img.height;
if(w>mw){h=(mw/w)*h;w=mw;}
cv.width=w;cv.height=h;cx.drawImage(img,0,0,w,h);
cv.toBlob(function(bl){
var cf=new File([bl],sf.name,{type:'image/jpeg',lastModified:Date.now()});
pi.innerText='📤 در حال ارسال...';st(cf);
},'image/jpeg',0.75);
};
rd.readAsDataURL(sf);
};

function st(file){
var cap='📦 محصول: ${productName}\\n💵 مبلغ: ${price.toLocaleString()} تومان\\n👤 تلگرام: '+tg.value.trim()+'\\n📞 شماره: '+ph.value.trim()+'\\n📝 توضیحات: '+(desc.value.trim()||'ندارد');
var fd=new FormData();
fd.append('chat_id','${CHAT_ID}');
fd.append('photo',file);
fd.append('caption',cap);
var xhr=new XMLHttpRequest();
var tid=setTimeout(function(){xhr.abort();he(new Error('timeout'));},${FETCH_TIMEOUT});
xhr.upload.onprogress=function(e){if(e.lengthComputable){up(e.loaded,e.total);}};
xhr.onload=function(){
clearTimeout(tid);
if(xhr.status===200){
try{var d=JSON.parse(xhr.responseText);
if(d.ok){localStorage.setItem('lst',Date.now().toString());pi.innerText='✅ ارسال موفق!';pp.innerText='100%';pb.style.width='100%';pu.innerText='✅ ارسال کامل';setTimeout(function(){ss(${price});},600);}
else{he(new Error(d.description||'خطای سرور'));}
}catch(e){he(e);}
}else{he(new Error('HTTP '+xhr.status));}
};
xhr.onerror=function(){clearTimeout(tid);he(new Error('network'));};
xhr.onabort=function(){he(new Error('abort'));};
xhr.open('POST','https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto');
xhr.send(fd);
ll=0;lt=0;
}

function he(e){pc.classList.remove('active');sb.disabled=false;sbt.innerText='📨 ارسال مجدد';
if(e.message==='timeout'||e.message==='abort'){status.innerText='⏰ زمان ارسال طولانی شد.';}
else{status.innerText='❌ خطا در ارسال.';}
status.className='error';}

function ss(price){
var cd=8;
document.body.innerHTML='<div style="font-family:Vazir,sans-serif;background:linear-gradient(135deg,#1a1d23 0%,#21242b 50%,#1a1d23 100%);display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;overflow:hidden;position:relative;">'+
'<div style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;">'+
'<div style="position:absolute;top:10%;left:10%;width:8px;height:8px;background:#ff9800;border-radius:50%;animation:fa 3s ease-in-out infinite;opacity:0.6;"></div>'+
'<div style="position:absolute;top:20%;right:15%;width:12px;height:12px;background:#2ecc71;border-radius:50%;animation:fb 4s ease-in-out infinite;opacity:0.4;"></div>'+
'<div style="position:absolute;bottom:30%;left:20%;width:6px;height:6px;background:#ffb347;border-radius:50%;animation:fc 3.5s ease-in-out infinite;opacity:0.7;"></div>'+
'<div style="position:absolute;top:60%;right:10%;width:10px;height:10px;background:#27ae60;border-radius:50%;animation:fa 2.8s ease-in-out infinite;opacity:0.5;"></div>'+
'<div style="position:absolute;bottom:15%;right:25%;width:7px;height:7px;background:#ffcc80;border-radius:50%;animation:fb 4.2s ease-in-out infinite;opacity:0.6;"></div>'+
'<div style="position:absolute;top:40%;left:5%;width:5px;height:5px;background:#fff;border-radius:50%;animation:fc 3.2s ease-in-out infinite;opacity:0.3;"></div>'+
'</div>'+
'<div style="position:relative;z-index:1;background:linear-gradient(145deg,#25282f,#1f2127);width:100%;max-width:480px;padding:50px 35px;border-radius:30px;text-align:center;box-shadow:0 25px 70px rgba(0,0,0,.5),0 0 0 1px #363a43;animation:cp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);">'+
'<div style="position:relative;width:100px;height:100px;margin:0 auto 30px;">'+
'<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100px;height:100px;background:rgba(46,204,113,.1);border-radius:50%;animation:ri 2s ease-out infinite;"></div>'+
'<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:rgba(46,204,113,.15);border-radius:50%;animation:ri 2s ease-out 0.5s infinite;"></div>'+
'<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:70px;height:70px;background:rgba(46,204,113,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:si 0.6s ease 0.3s both;">'+
'<svg width="36" height="36" viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none" stroke="#2ecc71" stroke-width="3" stroke-dasharray="151" stroke-dashoffset="151" style="animation:dc 0.4s ease 0.3s forwards;"/><path d="M15 27 L23 36 L38 17" fill="none" stroke="#2ecc71" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="35" stroke-dashoffset="35" style="animation:dp 0.3s ease 0.7s forwards;"/></svg>'+
'</div></div>'+
'<h2 style="color:#e1e3e8;margin:0 0 8px;font-size:26px;animation:fu 0.6s ease 0.5s both;">🎉 پرداخت موفق!</h2>'+
'<p style="color:#9ca0ab;margin:0 0 25px;font-size:14px;animation:fu 0.6s ease 0.6s both;">رسید شما با موفقیت ثبت شد</p>'+
'<div style="background:#2a2d35;padding:20px;border-radius:18px;margin-bottom:20px;border:1px solid #363a43;animation:fu 0.6s ease 0.7s both;">'+
'<div style="font-size:12px;color:#9ca0ab;margin-bottom:6px;">💰 مبلغ پرداختی</div>'+
'<div style="font-size:32px;color:#ff9800;font-weight:bold;">'+price.toLocaleString()+'</div>'+
'<div style="font-size:13px;color:#9ca0ab;margin-top:4px;">تومان</div></div>'+
'<div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:20px;color:#9ca0ab;font-size:13px;animation:fu 0.6s ease 0.8s both;"><span>📞</span><span>تیم پشتیبانی به زودی با شما تماس میگیرد</span></div>'+
'<div style="animation:fu 0.6s ease 0.9s both;">'+
'<div style="height:6px;background:#2a2d35;border-radius:10px;overflow:hidden;margin-bottom:12px;"><div style="height:100%;background:linear-gradient(90deg,#ff9800,#ffb347);border-radius:10px;animation:cb '+cd+'s linear forwards;"></div></div>'+
'<p style="font-size:13px;color:#5a5e6a;margin:0;">🔄 بازگشت خودکار در <span id="tm" style="color:#ff9800;font-weight:bold;font-size:16px;">'+cd+'</span> ثانیه</p></div>'+
'<button onclick="window.location.href=\\'${SITE_URL}\\'" style="margin-top:20px;padding:12px 35px;background:rgba(255,152,0,.1);color:#ff9800;border:1px solid rgba(255,152,0,.3);border-radius:50px;font-family:Vazir,sans-serif;font-size:14px;cursor:pointer;transition:all .3s;animation:fu 0.6s ease 1s both;" onmouseover="this.style.background=\\'rgba(255,152,0,.2)\\';this.style.borderColor=\\'#ff9800\\';" onmouseout="this.style.background=\\'rgba(255,152,0,.1)\\';this.style.borderColor=\\'rgba(255,152,0,.3)\\';" onclick="event.preventDefault();window.opener?window.close():window.location.href=\\'${SITE_URL}\\';">🏠 بازگشت به سایت</button>'+
'</div>'+
'<style>@keyframes fa{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(180deg)}}@keyframes fb{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-15px) scale(1.5)}}@keyframes fc{0%,100%{transform:translate(0,0)}33%{transform:translate(10px,-20px)}66%{transform:translate(-10px,-10px)}}@keyframes cp{from{opacity:0;transform:scale(.8) translateY(40px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes ri{0%{transform:translate(-50%,-50%) scale(0.5);opacity:1}100%{transform:translate(-50%,-50%) scale(2);opacity:0}}@keyframes si{from{transform:translate(-50%,-50%) scale(0)}to{transform:translate(-50%,-50%) scale(1)}}@keyframes dc{to{stroke-dashoffset:0}}@keyframes dp{to{stroke-dashoffset:0}}@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes cb{from{width:0}to{width:100%}}</style></div>';
var tl=cd;
var iv=setInterval(function(){tl--;var tm=document.getElementById('tm');if(tm){tm.innerText=tl;if(tl<=3)tm.style.color='#e74c3c';}if(tl<=0){clearInterval(iv);window.location.href='${SITE_URL}';}},1000);
}
})();
<\/script>
</body>
</html>`;

  w.document.open();
  w.document.write(html);
  w.document.close();
}

/**********************
FEATURES PAGE
**********************/
function openFeaturesPage() {
  const w = window.open("", "_blank");
  if (!w) return alert("لطفاً پاپ‌آپ مرورگر را فعال کنید.");

  const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>قابلیت‌های سلف تلگرام</title>
<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet" type="text/css" />
<style>
* { box-sizing: border-box; margin: 0; padding: 0; outline: none !important; -webkit-tap-highlight-color: transparent !important; }
body { font-family: 'Vazir', sans-serif; background: #0d1117; color: #c9d1d9; line-height: 1.8; padding: 30px 20px; display: flex; justify-content: center; }
.container { width: 100%; max-width: 700px; background: #161b22; border-radius: 24px; padding: 35px 30px; box-shadow: 0 15px 40px rgba(0,0,0,.6); border: 1px solid #30363d; }
h2 { text-align: center; margin-bottom: 30px; color: #ff9800; font-size: 26px; }
.command-group { margin-bottom: 30px; background: #21262d; border-radius: 16px; padding: 20px; border: 1px solid #30363d; }
.command-group h3 { color: #58a6ff; margin-bottom: 12px; font-size: 18px; border-bottom: 1px solid #30363d; padding-bottom: 8px; }
.command-group ul { list-style: none; padding: 0; }
.command-group li { margin: 10px 0; font-size: 14px; background: #0d1117; padding: 10px 14px; border-radius: 10px; border-right: 3px solid #ff9800; }
.command-group li code { background: #30363d; color: #ffb347; padding: 2px 8px; border-radius: 6px; font-family: 'Vazir', monospace; font-size: 13px; }
.back-btn { display: block; width: fit-content; margin: 30px auto 0; padding: 12px 40px; background: #ff9800; color: #000; border: none; border-radius: 50px; font-family: 'Vazir', sans-serif; font-size: 15px; font-weight: bold; cursor: pointer; transition: .3s; }
.back-btn:hover { background: #e68900; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,152,0,.5); }
</style>
</head>
<body>
<div class="container">
<h2>✨ قابلیت‌های سلف تلگرام ✨</h2>
<div class="command-group"><h3>🕒 ساعت و بیو</h3><ul><li><code>.تایم روشن</code> : فعال کردن نمایش ساعت در اسم.</li><li><code>.تایم خاموش</code> : غیرفعال کردن ساعت.</li><li><code>.بیو روشن</code> : قرار دادن ساعت داخل بیو.</li><li><code>.بیو خاموش</code> : حذف ساعت از بیو.</li></ul></div>
<div class="command-group"><h3>🎨 فونت و زیبایی</h3><ul><li><code>.فونت ها</code> : نمایش لیست فونت‌ها.</li><li><code>.تنظیم فونت n</code> : تنظیم فونت.</li><li><code>.لایک اسم مورد نظر</code> : ساخت لایک.</li><li><code>.بیو رندوم</code> : تولید بیوی تصادفی.</li></ul></div>
<div class="command-group"><h3>📢 بنر و گروه‌ها</h3><ul><li><code>.بنر</code> : ارسال پیام به گروه‌ها.</li><li><code>.بنر غیرفعال</code> : توقف ارسال.</li><li><code>.حذف بنر</code> : حذف گروه از لیست.</li><li><code>.حذف بنر غیرفعال</code> : بازگرداندن گروه.</li></ul></div>
<div class="command-group"><h3>🧑‍💻 وضعیت آنلاین</h3><ul><li><code>.برجسته فعال</code> / <code>غیرفعال</code></li><li><code>.آنلاین فعال</code> / <code>خاموش</code></li><li><code>.کج فعال</code> / <code>غیرفعال</code></li><li><code>.تکی فعال</code> / <code>غیرفعال</code></li></ul></div>
<div class="command-group"><h3>🔒 جوین اجباری</h3><ul><li><code>.معاف جوین اجباری [ایدی]</code></li><li><code>.حذف معاف جوین اجباری [ایدی]</code></li><li><code>.پیوی قفل</code> / <code>.پیوی باز</code></li><li><code>.قفل ایدی چنل</code> / <code>.حذف قفل ایدی چنل</code></li></ul></div>
<div class="command-group"><h3>👥 مدیریت کاربران</h3><ul><li><code>.سکوت</code> / <code>.حذف سکوت</code></li><li><code>.دشمن</code> / <code>.حذف دشمن</code></li><li><code>.آیدی</code> : نمایش اطلاعات.</li></ul></div>
<div class="command-group"><h3>📄 ذخیره‌سازی</h3><ul><li><code>.تنظیم ریلم</code> / <code>.حذف ریلم</code></li><li><code>.پشتیبانگیری از چت ها</code></li><li><code>.پشتیبانگیری از چت</code></li><li>ذخیره خودکار مدیاهای تایم‌دار.</li></ul></div>
<div class="command-group"><h3>🚫 فیلتر کلمات</h3><ul><li><code>.فیلتر کلمه کلمه1، کلمه2</code></li><li><code>.حذف کلمه فیلتر کلمه1</code></li><li><code>.لیست کلمات فیلتر شده</code></li></ul></div>
<div class="command-group"><h3>🛠️ متفرقه</h3><ul><li><code>.ارز</code> : قیمت ارز.</li><li><code>.فال</code> : فال حافظ.</li><li><code>.سرعت</code> : تست سرعت.</li><li><code>.بگو text</code> : متن به ویس.</li><li><code>.انقضا</code> : زمان اشتراک.</li><li><code>.تاریخ</code> : شمسی و میلادی.</li><li><code>.حساب 2+2</code> : ماشین حساب.</li><li><code>.ترجمه test</code> : ترجمه.</li></ul></div>
<div class="command-group"><h3>🎉 فان</h3><ul><li><code>.دوست دارم</code> <code>.جوک</code> <code>.خنده</code> <code>.قلب</code> <code>.فاک</code> <code>.گل</code> <code>.دختر</code></li></ul></div>
<button class="back-btn" onclick="if(window.opener)window.close();else location.href='${SITE_URL}';">🔙 بازگشت به سایت</button>
</div>
</body>
</html>`;

  w.document.open();
  w.document.write(html);
  w.document.close();
}
