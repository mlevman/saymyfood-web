/* The apple block: the game's own apple, as a button that opens and closes the
   iPhone-and-game section in place. The page sets the starting state by giving .apz
   the class "open" or not; window.SMF_APPLE(open) lets it change that later - the
   tester page closes the block once a request has been sent.
   The block's words live here, once, for both pages that show it: the landing's table
   is in i18n.js and the tester page's in shared.js, and a copy in each would drift.
   The language is read from <html lang>, which both pages set on every switch. */
(function(){
var T={
en:{/* owner will proofread */ios:'Got an iPhone? Then, sadly, you can’t be a test pilot just yet. Our corporation is toiling day and night to let Apple owners in as soon as possible. Meanwhile, how about killing some time with a game we made for you? These are the only apples our project has to offer so far — but we’ll fix that very soon.',iosA:'Play Apple Fight',iosQ:'For iPhone owners'},
ru:{/* iosA, iosQ: owner will proofread; ios is the owner's text */ios:'Если у вас iPhone, то, к сожалению, стать первооткрывателем пока не получится. Наша корпорация в поте лица работает над тем, чтобы скорее дать доступ и обладателям устройств Apple. А пока предлагаем скоротать время в игре, которую мы для вас сделали. Это единственные яблоки, доступные в нашем проекте, но очень скоро мы это исправим.',iosA:'Сыграть в яблочную дуэль',iosQ:'Владельцам iPhone'},
es:{/* owner will proofread */ios:'Si tienes iPhone, por desgracia todavía no puedes ser piloto de prueba. Nuestra corporación trabaja sin descanso para abrir cuanto antes el acceso también a quienes usan Apple. Mientras tanto, te proponemos matar el rato con un juego que hicimos para ti. Por ahora son las únicas manzanas de nuestro proyecto, pero muy pronto lo arreglaremos.',iosA:'Jugar al duelo de manzanas',iosQ:'Si usas iPhone'},
pt:{/* owner will proofread */ios:'Se você tem iPhone, infelizmente ainda não dá para ser piloto de teste. Nossa corporação está suando a camisa para liberar o acesso também para quem usa Apple o quanto antes. Enquanto isso, que tal passar o tempo com um jogo que fizemos para você? Por enquanto, são as únicas maçãs do nosso projeto — mas isso vai mudar muito em breve.',iosA:'Jogar o duelo de maçãs',iosQ:'Para quem tem iPhone'}};
var box=document.querySelector('.apz');if(!box)return;
var btn=box.querySelector('.apz-btn'),body=box.querySelector('.apz-body');
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// A missing key shows its own name, so a gap in a translation is visible, never blank.
function paint(){var d=T[document.documentElement.lang]||T.en;box.querySelectorAll('[data-apz]').forEach(function(el){var k=el.getAttribute('data-apz');el.textContent=d[k]!=null?d[k]:k})}
function set(open){box.classList.toggle('open',open);btn.setAttribute('aria-expanded',open?'true':'false');body.inert=!open}
btn.addEventListener('click',function(){
  var open=!box.classList.contains('open');set(open);
  // Low on the page, the opened section can end below the fold. Bring it up once it
  // has finished growing, and only as far as it needs.
  if(open)setTimeout(function(){body.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'})},RM?0:430);
});
paint();new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
set(box.classList.contains('open'));
window.SMF_APPLE=set;
})();
