// Shared: i18n and language dropdown for the tester page. Closed testing is over: the page
// thanks the testers and sends people to Google Play. It no longer talks to Supabase.
const T={
en:{/* owner will proofread */home:'About the app',contact:'Contact',title:'Testing is over',body:'Thank you to everyone who helped. SayMyFood is now available on Google Play.',play:'Open on Google Play'},
ru:{/* the owner's text */home:'О приложении',contact:'Связаться',title:'Тестирование завершено',body:'Спасибо всем, кто помогал. SayMyFood теперь доступен в Google Play.',play:'Открыть в Google Play'},
pt:{/* owner will proofread */home:'Sobre o app',contact:'Contato',title:'O teste terminou',body:'Obrigado a todos que ajudaram. O SayMyFood agora está disponível no Google Play.',play:'Abrir no Google Play'},
es:{/* owner will proofread */home:'Sobre la app',contact:'Contacto',title:'Las pruebas han terminado',body:'Gracias a todos los que ayudaron. SayMyFood ya está disponible en Google Play.',play:'Abrir en Google Play'}};
const $=id=>document.getElementById(id);
let lang='en';
function pickLang(){let s=null;try{s=localStorage.getItem('smf_lang')}catch(e){}if(s&&T[s])return s;const n=(navigator.language||'en').slice(0,2).toLowerCase();return T[n]?n:'en'}
// A missing key shows its own name, so a gap in a translation is visible, never blank.
function paint(){const d=T[lang],s=k=>d[k]!=null?d[k]:k;document.documentElement.lang=lang;$('lcur').textContent=lang.toUpperCase();
document.querySelectorAll('#lmenu button').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));
$('nav-home').textContent=s('home');$('nav-contact').textContent=s('contact');
$('t-title').textContent=s('title');$('t-body').textContent=s('body');$('t-play').textContent=s('play')}
const lbtn=$('lbtn'),lmenu=$('lmenu');
lbtn.addEventListener('click',()=>{const o=lmenu.classList.toggle('open');lbtn.setAttribute('aria-expanded',o)});
document.addEventListener('click',e=>{if(!e.target.closest('.lswitch')){lmenu.classList.remove('open');lbtn.setAttribute('aria-expanded','false')}});
lmenu.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;try{localStorage.setItem('smf_lang',lang)}catch(e){}paint();lmenu.classList.remove('open');lbtn.setAttribute('aria-expanded','false')}));
lang=pickLang();paint();
