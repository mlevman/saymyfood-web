// Shared: i18n, language dropdown, request form. The page supplies window.SMF_LAUNCH()
// (runs the stage animation, returns its length in ms) and optionally window.SMF_IDLE().
const SUPABASE_URL='https://dwbytualmguxxtceywtg.supabase.co';
const SUPABASE_KEY='sb_publishable_2hGC7tD47epR2YYFR-HyCg_Bmqyc5F9';
// Real submits only from the live site; anywhere else (preview, file://, localhost) runs
// the animation without touching the network so the page can be reviewed.
const LIVE=/(^|\.)saymyfood\.app$/.test(location.hostname);
const DEMO=/[?&]demo/.test(location.search)||!LIVE;
const T={
en:{home:'About the app',contact:'Contact',title:'Become a closed tester',what:'SayMyFood is a food diary that counts calories and macros from a photo, your voice or one line of text.',more:'More about the app →',placeholder:'Your Google account email',send:'Send the request',gets:['A link to install the app from Google Play','A code for full access to every feature, 90 days, free','A direct line to us — you write, a person answers'],fine:'We need the email of your GOOGLE account: Google Play only shows the app to accounts on the tester list. Android only for now. The address is used for the test and for nothing else.',sending:'Sending…',bad:'That does not look like an email address. Have another look.',busy:'Too many requests right now. Try again in a few minutes.',netfail:'The request did not go through — check your connection and try again.',dTitle:'Request received',dBody:'We will write to you within a day. The email will carry the install link and your access code — check the spam folder if it is quiet.',dFine:'Nothing to pay, no card, nothing renews by itself.',ios:'On an iPhone? Sorry — the closed test is Android-only for now. While we work on it, you can pass the time the only way we can offer apples today:',iosA:'a quick apple fight →'},
ru:{home:'О приложении',contact:'Связаться',title:'Стать закрытым тестировщиком',what:'SayMyFood — дневник питания: считает калории и БЖУ по фотографии, голосу или одной строке текста.',more:'Подробнее о приложении →',placeholder:'Почта вашего аккаунта Google',send:'Отправить заявку',gets:['Ссылку на установку приложения из Google Play','Код полного доступа ко всем функциям на 90 дней, бесплатно','Прямую связь с нами — вы пишете, отвечает человек'],fine:'Нужна почта именно вашего аккаунта GOOGLE: Google Play показывает приложение только тем, кто есть в списке тестировщиков. Пока только Android. Адрес используется для теста и больше ни для чего.',sending:'Отправляем…',bad:'Это не похоже на адрес почты. Посмотрите ещё раз.',busy:'Сейчас слишком много заявок. Попробуйте через несколько минут.',netfail:'Заявка не ушла — проверьте соединение и попробуйте снова.',dTitle:'Заявка принята',dBody:'Мы напишем вам в течение суток. В письме будет ссылка на установку и код доступа — если тихо, загляните в папку «Спам».',dFine:'Платить ничего не нужно, карта не требуется, само ничего не продлевается.',ios:'У вас iPhone? Извините — закрытый тест пока только для Android. Пока мы работаем, можно скоротать время единственными яблоками, которые у нас сегодня есть:',iosA:'яблочная дуэль →'},
pt:{home:'Sobre o app',contact:'Contato',title:'Seja um testador do teste fechado',what:'O SayMyFood é um diário alimentar: calcula calorias e macros a partir de uma foto, da sua voz ou de uma linha de texto.',more:'Mais sobre o aplicativo →',placeholder:'E-mail da sua conta Google',send:'Enviar a solicitação',gets:['Um link para instalar o app pelo Google Play','Um código de acesso completo a todos os recursos, 90 dias, grátis','Contato direto com a gente — você escreve, uma pessoa responde'],fine:'Precisamos do e-mail da sua conta GOOGLE: o Google Play só mostra o app para as contas da lista de testadores. Por enquanto só Android. O endereço é usado para o teste e para mais nada.',sending:'Enviando…',bad:'Isso não parece um e-mail. Confira novamente.',busy:'Muitas solicitações agora. Tente de novo em alguns minutos.',netfail:'A solicitação não foi enviada — verifique a conexão e tente de novo.',dTitle:'Solicitação recebida',dBody:'Vamos escrever para você em até um dia. O e-mail traz o link de instalação e o seu código de acesso — se demorar, veja a pasta de spam.',dFine:'Não precisa pagar nada, não pede cartão e nada é renovado automaticamente.',ios:'Tem iPhone? Desculpe — por enquanto o teste fechado é só para Android. Enquanto trabalhamos nisso, dá para passar o tempo com as únicas maçãs que temos hoje:',iosA:'um duelo de maçãs →'},
es:{home:'Sobre la app',contact:'Contacto',title:'Hazte tester de la prueba cerrada',what:'SayMyFood es un diario de comidas: calcula calorías y macros a partir de una foto, de tu voz o de una línea de texto.',more:'Más sobre la aplicación →',placeholder:'Correo de tu cuenta de Google',send:'Enviar la solicitud',gets:['Un enlace para instalar la app desde Google Play','Un código de acceso completo a todas las funciones, 90 días, gratis','Contacto directo con nosotros: tú escribes, responde una persona'],fine:'Necesitamos el correo de tu cuenta de GOOGLE: Google Play solo muestra la app a las cuentas de la lista de testers. De momento solo Android. La dirección se usa para la prueba y para nada más.',sending:'Enviando…',bad:'Eso no parece un correo. Revísalo otra vez.',busy:'Hay demasiadas solicitudes ahora mismo. Inténtalo en unos minutos.',netfail:'La solicitud no se ha enviado: comprueba la conexión e inténtalo de nuevo.',dTitle:'Solicitud recibida',dBody:'Te escribiremos en menos de un día. El correo llevará el enlace de instalación y tu código de acceso; si tarda, mira la carpeta de spam.',dFine:'No hay que pagar nada, no se pide tarjeta y nada se renueva solo.',ios:'¿Tienes iPhone? Lo sentimos: por ahora la prueba cerrada es solo para Android. Mientras trabajamos en ello, puedes pasar el rato con las únicas manzanas que tenemos hoy:',iosA:'un duelo de manzanas →'}};
const $=id=>document.getElementById(id);
let lang='en',sending=false;
function pickLang(){let s=null;try{s=localStorage.getItem('smf_lang')}catch(e){}if(s&&T[s])return s;const n=(navigator.language||'en').slice(0,2).toLowerCase();return T[n]?n:'en'}
function paint(){const d=T[lang];document.documentElement.lang=lang;$('lcur').textContent=lang.toUpperCase();
document.querySelectorAll('#lmenu button').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));
$('nav-home').textContent=d.home;$('nav-contact').textContent=d.contact;
$('t-title').textContent=d.title;$('t-what').textContent=d.what;$('t-more').textContent=d.more;$('email').placeholder=d.placeholder;
$('send').textContent=sending?d.sending:d.send;$('gets').innerHTML=d.gets.map(g=>`<li>${g}</li>`).join('');$('fine').textContent=d.fine;
$('d-title').textContent=d.dTitle;$('d-body').textContent=d.dBody;$('d-fine').textContent=d.dFine;
if($('t-ios')){$('t-ios').textContent=d.ios;$('t-ios-a').textContent=d.iosA}
const k=$('msg').dataset.key;$('msg').textContent=k?d[k]:''}
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
setTimeout(()=>{$('formwrap').hidden=true;$('done').hidden=false;if(DEMO&&!$('done').querySelector('.replay')){const a=document.createElement('a');a.className='replay';a.href=location.href;a.textContent='↺ replay';$('done').appendChild(a)}},ms)}
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
