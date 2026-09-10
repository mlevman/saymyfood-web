// Shared: i18n, language dropdown, request form. The page supplies window.SMF_LAUNCH()
// (runs the stage animation, returns its length in ms) and optionally window.SMF_IDLE().
const SUPABASE_URL='https://dwbytualmguxxtceywtg.supabase.co';
const SUPABASE_KEY='sb_publishable_2hGC7tD47epR2YYFR-HyCg_Bmqyc5F9';
// Real submits only from the live site; anywhere else (preview, file://, localhost) runs
// the animation without touching the network so the page can be reviewed.
const LIVE=/(^|\.)saymyfood\.app$/.test(location.hostname);
const DEMO=/[?&]demo/.test(location.search)||!LIVE;
const T={
en:{/* owner will proofread */home:'About the app',contact:'Contact',title:'Be among the very first users!',what:'SayMyFood — a food diary you’ll actually want to keep',more:'More about the app →',why:'Google has a rule: before an app can go into the store, it needs its first testers. Test pilots — the first people to get to know our app.',need:'We need the email address linked to your Google account',needWhy:'Google Play only shows the app to people on the tester list.',placeholder:'Your Google account email',send:'Send the request',next:'We’ll add you to a special list and send you an email with instructions. Then you install the app and off you go.',thanks:'As a thank-you, every test pilot gets 90 days of the app in its fullest version.',fine:'We use your address for the test and nothing else.',sending:'Sending…',bad:'That does not look like an email address. Have another look.',busy:'Too many requests right now. Try again in a few minutes.',netfail:'The request did not go through — check your connection and try again.',dTitle:'Request received',dBody:'We will write to you within a day. The email will carry the install link and your access code — check the spam folder if it is quiet.',dFine:'Nothing to pay, no card, nothing renews by itself.'},
ru:{/* the owner's text or unchanged */home:'О приложении',contact:'Связаться',title:'Станьте первыми пользователями!',what:'SayMyFood — дневник питания, который хочется вести',more:'Подробнее о приложении →',why:'По условиям компании Google, чтобы добавить приложение в магазин, нам нужны первые тестировщики. Первооткрыватели, которые познакомятся с нашим приложением.',need:'Нам нужен адрес вашей электронной почты, привязанный к аккаунту Google',needWhy:'Google Play показывает приложение только тем, кто есть в списке тестировщиков.',placeholder:'Почта вашего аккаунта Google',send:'Отправить заявку',next:'Мы добавим вас в специальный список и пришлём письмо с инструкцией. После этого вы сможете установить приложение и начать им пользоваться.',thanks:'В благодарность мы подарим каждому первооткрывателю 90 дней использования приложения в максимальной версии.',fine:'Адрес используется для теста и больше ни для чего.',sending:'Отправляем…',bad:'Это не похоже на адрес почты. Посмотрите ещё раз.',busy:'Сейчас слишком много заявок. Попробуйте через несколько минут.',netfail:'Заявка не ушла — проверьте соединение и попробуйте снова.',dTitle:'Заявка принята',dBody:'Мы напишем вам в течение суток. В письме будет ссылка на установку и код доступа — если тихо, загляните в папку «Спам».',dFine:'Платить ничего не нужно, карта не требуется, само ничего не продлевается.'},
pt:{/* owner will proofread */home:'Sobre o app',contact:'Contato',title:'Seja um dos primeiros a usar!',what:'SayMyFood — um diário alimentar que dá vontade de usar',more:'Mais sobre o aplicativo →',why:'Para colocar um app na loja, o Google exige que ele passe antes pelas mãos dos primeiros testadores. Pilotos de teste: os primeiros a conhecer o nosso app.',need:'Precisamos do e-mail vinculado à sua conta Google',needWhy:'O Google Play só mostra o app para quem está na lista de testadores.',placeholder:'E-mail da sua conta Google',send:'Enviar a solicitação',next:'Vamos colocar você numa lista especial e mandar um e-mail com as instruções. Depois é só instalar o app e começar a usar.',thanks:'Como agradecimento, cada piloto de teste ganha 90 dias do app na versão mais completa.',fine:'Seu endereço é usado para o teste e para mais nada.',sending:'Enviando…',bad:'Isso não parece um e-mail. Confira novamente.',busy:'Muitas solicitações agora. Tente de novo em alguns minutos.',netfail:'A solicitação não foi enviada — verifique a conexão e tente de novo.',dTitle:'Solicitação recebida',dBody:'Vamos escrever para você em até um dia. O e-mail traz o link de instalação e o seu código de acesso — se demorar, veja a pasta de spam.',dFine:'Não precisa pagar nada, não pede cartão e nada é renovado automaticamente.'},
es:{/* owner will proofread */home:'Sobre la app',contact:'Contacto',title:'¡Sé de los primeros en usarla!',what:'SayMyFood — un diario de comidas que da gusto llevar',more:'Más sobre la aplicación →',why:'Para publicar una app en su tienda, Google pide que antes la prueben sus primeros testers. Pilotos de prueba: los primeros en conocer nuestra app.',need:'Necesitamos el correo vinculado a tu cuenta de Google',needWhy:'Google Play solo muestra la app a quienes están en la lista de testers.',placeholder:'Correo de tu cuenta de Google',send:'Enviar la solicitud',next:'Te añadiremos a una lista especial y te enviaremos un correo con las instrucciones. Después podrás instalar la app y empezar a usarla.',thanks:'Como agradecimiento, cada piloto de prueba recibe 90 días de la app en su versión más completa.',fine:'Tu dirección se usa para la prueba y para nada más.',sending:'Enviando…',bad:'Eso no parece un correo. Revísalo otra vez.',busy:'Hay demasiadas solicitudes ahora mismo. Inténtalo en unos minutos.',netfail:'La solicitud no se ha enviado: comprueba la conexión e inténtalo de nuevo.',dTitle:'Solicitud recibida',dBody:'Te escribiremos en menos de un día. El correo llevará el enlace de instalación y tu código de acceso; si tarda, mira la carpeta de spam.',dFine:'No hay que pagar nada, no se pide tarjeta y nada se renueva solo.'}};
const $=id=>document.getElementById(id);
let lang='en',sending=false;
function pickLang(){let s=null;try{s=localStorage.getItem('smf_lang')}catch(e){}if(s&&T[s])return s;const n=(navigator.language||'en').slice(0,2).toLowerCase();return T[n]?n:'en'}
// A missing key shows its own name, so a gap in a translation is visible, never blank.
function paint(){const d=T[lang],s=k=>d[k]!=null?d[k]:k;document.documentElement.lang=lang;$('lcur').textContent=lang.toUpperCase();
document.querySelectorAll('#lmenu button').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));
$('nav-home').textContent=s('home');$('nav-contact').textContent=s('contact');
$('t-title').textContent=s('title');$('t-what').textContent=s('what');$('t-more').textContent=s('more');$('t-why').textContent=s('why');
$('t-need').textContent=s('need');$('t-needwhy').textContent=s('needWhy');$('email').placeholder=s('placeholder');
$('send').textContent=sending?s('sending'):s('send');$('t-next').textContent=s('next');$('t-thanks').textContent=s('thanks');$('fine').textContent=s('fine');
$('d-title').textContent=s('dTitle');$('d-body').textContent=s('dBody');$('d-fine').textContent=s('dFine');
const k=$('msg').dataset.key;$('msg').textContent=k?s(k):''}
const lbtn=$('lbtn'),lmenu=$('lmenu');
lbtn.addEventListener('click',()=>{const o=lmenu.classList.toggle('open');lbtn.setAttribute('aria-expanded',o)});
document.addEventListener('click',e=>{if(!e.target.closest('.lswitch')){lmenu.classList.remove('open');lbtn.setAttribute('aria-expanded','false')}});
lmenu.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;try{localStorage.setItem('smf_lang',lang)}catch(e){}paint();lmenu.classList.remove('open');lbtn.setAttribute('aria-expanded','false')}));
lang=pickLang();paint();
let supabase=null;
async function rpc(email,website){
if(DEMO){await new Promise(r=>setTimeout(r,500));return{data:{ok:true}}}
if(!supabase){const{createClient}=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');supabase=createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{detectSessionInUrl:false,persistSession:false,autoRefreshToken:false}})}
return supabase.rpc('request_tester_access',{p_email:email,p_lang:lang,p_website:website})}
function fail(key){const m=$('msg');m.dataset.key=key;m.classList.add('err');paint()}
function accepted(){
const ms=(window.SMF_LAUNCH&&window.SMF_LAUNCH())||0;
$('formwrap').classList.add('away');
// The apple block folds away so it cannot compete with the confirmation; the apple stays.
setTimeout(()=>{$('formwrap').hidden=true;$('done').hidden=false;if(window.SMF_APPLE)window.SMF_APPLE(false);if(DEMO&&!$('done').querySelector('.replay')){const a=document.createElement('a');a.className='replay';a.href=location.href;a.textContent='↺ replay';$('done').appendChild(a)}},ms)}
async function submit(){
if(sending)return;const email=$('email').value.trim(),website=$('website').value;
$('msg').dataset.key='';$('msg').classList.remove('err');
if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||email.length>254){fail('bad');return}
sending=true;$('send').disabled=true;paint();$('email').blur();
try{const{data,error}=await rpc(email,website);sending=false;$('send').disabled=false;
if(error){console.error('request_tester_access',error);fail('netfail');return}
if(data&&data.ok===false){fail(data.reason==='busy'?'busy':'bad');return}
paint();accepted()}
catch(e){console.error('request_tester_access',e);sending=false;$('send').disabled=false;fail('netfail')}}
$('send').addEventListener('click',submit);
$('email').addEventListener('keydown',e=>{if(e.key==='Enter')submit()});
if(window.SMF_IDLE)window.SMF_IDLE();
