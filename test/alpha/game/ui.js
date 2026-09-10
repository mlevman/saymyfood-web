(()=>{
const T={
en:{earned:'Earned during the round',allT:'Overall total',round:'Round cleared',heartsL:'Hearts kept',bonusLeft:'bonus window',rwRows:["Hit on the neighbour","+200","Apples colliding mid-air: {cap} a round, the last one doubles them; after that, nothing","+50","Each heart kept at round end","+200","Round cleared","+500 / 700 / 1000","Speed bonus: seconds left of 2:00","× 15","Hardcore: total after round 3","× 2"],rwH:'How points work',rwOpen:'How points work',anon:'Unknown',you:'You',hard:'Hardcore',hardS:'Hearts do not refill between rounds. Finish all three and the score doubles.',x2:'Hardcore: {b} × 2 = {t}',back:'← Back to the request',board:'Leaderboard',introH:'Apple fight',introP:'The iPhone version is still in the works. Until then, we can offer you a slightly different kind of apple.\n\nKnock the neighbour down with five apples. Three rounds. Every round, the grumpy neighbour gets quicker and more accurate.',boy:'Boy',boyS:'Charges a throw faster',girl:'Girl',girlS:'Moves faster',play:'Start',how:'Apples run out. Stand by your tree and press down to pick more.',keys:'← → move · hold Space and release to throw · hold E by the tree to pick apples',keysTouch:'◀ ▶ move · hold ▼ by the tree to gather · hold the button on the right and release to throw',pick:'Pick',thr:'Throw',level:'Round',clearH:'Round {n} won',time:'Time',hp:'Hearts left',bonus:'Speed bonus',lv:'Round total',next:'Next round',final:'See the result',winH:'All three rounds',winP:'The neighbour has run out of apples and arguments.',loseH:'Knocked out',loseP:'Got you in round {n}. The neighbour is still standing.',save:'Save',saved:'Saved. Your place: #{r} of {n}',again:'Play again',rank:'Place #{r} of {n} — enter a name to save it',name:'Your name',empty:'Nobody yet — be the first.',local:'Scores are kept in this browser only (leaderboard is not connected yet).',notSaved:'Not saved — the server did not accept this result.',close:'Close',rot:'Turn your phone sideways — the orchard is wide.',rotTap:'Tap to fill the screen.',paused:'Paused',resume:'Resume'},
// SITE-01 - owner will proofread: the new `you` key and the reworded clash row of rwRows, in ru/es/pt below.
// SITE-02 - owner will proofread: the new `notSaved`, `rotTap`, `paused`, `resume` and `keysTouch` keys in ru/es/pt below.
// SITE-03 - owner will proofread: `keysTouch` and `how` in ru/es/pt below. The throw control is a
// rounded square now, not a circle, so it is named by its side of the screen; and `how` names the
// action rather than a control, because touch has no Pick button and `keys`/`keysTouch` already
// name the control for the input method the player is actually using.
// SITE-06 - owner will proofread: `introP`, `girlS` and `how` in en/es/pt (ru is the owner's text).
// `introP` is one string with a blank line in it; index.html gives #t-intro-p white-space:pre-line.
ru:{earned:'Набрано в ходе раунда',allT:'Всего очков',round:'Раунд пройден',heartsL:'Сохранённые сердца',bonusLeft:'бонус за скорость',rwRows:["Попадание в соседа","+200","Столкновение яблок в воздухе: {cap} за раунд, последнее их удваивает; дальше — ничего","+50","Каждое сохранённое сердце в конце раунда","+200","Пройденный раунд","+500 / 700 / 1000","Бонус за скорость: остаток от 2:00","× 15","Хардкор: итог после 3-го раунда","× 2"],rwH:'Как считаются очки',rwOpen:'Как считаются очки',anon:'Неизвестный',you:'Вы',hard:'Хардкор',hardS:'Сердца не восстанавливаются между раундами. Пройдёте все три — очки удвоятся.',x2:'Хардкор: {b} × 2 = {t}',back:'← Назад к заявке',board:'Таблица лидеров',introH:'Яблочная дуэль',introP:'Версия для iPhone в процессе реализации. Пока мы вам можем предложить несколько другие яблоки.\n\nСбейте соседа пятью яблоками. Три раунда. С каждым раундом злой сосед быстрее и точнее.',boy:'Мальчик',boyS:'Быстрее замахивается',girl:'Девочка',girlS:'Быстрее перемещается',play:'Начать',how:'Яблоки заканчиваются. Встаньте у дерева и нажмите вниз, чтобы набрать ещё.',keys:'← → идти · зажать Пробел и отпустить — бросок · зажать E у дерева — собрать яблоки',keysTouch:'◀ ▶ идти · зажать ▼ у дерева — собрать · зажать кнопку справа и отпустить — бросок',pick:'Собрать',thr:'Бросок',level:'Раунд',clearH:'Раунд {n} выигран',time:'Время',hp:'Осталось сердец',bonus:'Бонус за скорость',lv:'Итог за раунд',next:'Следующий раунд',final:'К результату',winH:'Все три раунда',winP:'У соседа кончились яблоки и аргументы.',loseH:'Нокаут',loseP:'Попали в раунде {n}. Сосед ещё стоит.',save:'Сохранить',saved:'Сохранено. Ваше место: {r} из {n}',again:'Ещё раз',rank:'Место {r} из {n} — введите имя, чтобы сохранить',name:'Ваше имя',empty:'Пока никого — будьте первым.',local:'Очки хранятся только в этом браузере (таблица ещё не подключена).',notSaved:'Не сохранено — сервер не принял этот результат.',close:'Закрыть',rot:'Поверните телефон горизонтально — сад широкий.',rotTap:'Нажмите, чтобы развернуть на весь экран.',paused:'Пауза',resume:'Продолжить'},
es:{earned:'Ganado durante la ronda',allT:'Puntos totales',round:'Ronda superada',heartsL:'Corazones conservados',bonusLeft:'bono de velocidad',rwRows:["Acierto al vecino","+200","Manzanas que chocan en el aire: {cap} por ronda, la última las duplica; después, nada","+50","Cada corazón conservado al final","+200","Ronda superada","+500 / 700 / 1000","Bono de velocidad: lo que sobre de 2:00","× 15","Hardcore: total tras la ronda 3","× 2"],rwH:'Cómo se cuentan los puntos',rwOpen:'Cómo se cuentan los puntos',anon:'Desconocido',you:'Tú',hard:'Hardcore',hardS:'Los corazones no se recuperan entre rondas. Completa las tres y los puntos se duplican.',x2:'Hardcore: {b} × 2 = {t}',back:'← Volver a la solicitud',board:'Clasificación',introH:'Duelo de manzanas',introP:'La versión para iPhone está en camino. Mientras tanto, podemos ofrecerte unas manzanas algo distintas.\n\nDerriba al vecino con cinco manzanas. Tres rondas. En cada ronda, el vecino gruñón es más rápido y más certero.',boy:'Chico',boyS:'Carga el tiro más rápido',girl:'Chica',girlS:'Se mueve más rápido',play:'Empezar',how:'Las manzanas se acaban. Ponte junto al árbol y pulsa abajo para recoger más.',keys:'← → moverse · mantén Espacio y suelta para lanzar · mantén E junto al árbol para recoger',keysTouch:'◀ ▶ moverse · mantén ▼ junto al árbol para recoger · mantén el botón de la derecha y suelta para lanzar',pick:'Recoger',thr:'Lanzar',level:'Ronda',clearH:'Ronda {n} ganada',time:'Tiempo',hp:'Corazones restantes',bonus:'Bono de velocidad',lv:'Total de la ronda',next:'Siguiente ronda',final:'Ver resultado',winH:'Las tres rondas',winP:'Al vecino se le acabaron las manzanas y los argumentos.',loseH:'Fuera de combate',loseP:'Te dieron en la ronda {n}. El vecino sigue en pie.',save:'Guardar',saved:'Guardado. Tu puesto: {r} de {n}',again:'Otra vez',rank:'Puesto {r} de {n}: escribe un nombre para guardarlo',name:'Tu nombre',empty:'Nadie todavía: sé el primero.',local:'Los puntos se guardan solo en este navegador (la tabla aún no está conectada).',notSaved:'No se ha guardado: el servidor no aceptó este resultado.',close:'Cerrar',rot:'Gira el teléfono: el huerto es ancho.',rotTap:'Toca para ocupar toda la pantalla.',paused:'En pausa',resume:'Continuar'},
pt:{earned:'Ganho durante a rodada',allT:'Pontuação total',round:'Rodada concluída',heartsL:'Corações mantidos',bonusLeft:'bônus de velocidade',rwRows:["Acerto no vizinho","+200","Maçãs colidindo no ar: {cap} por rodada, a última dobra tudo; depois, nada","+50","Cada coração mantido no fim","+200","Rodada concluída","+500 / 700 / 1000","Bônus de velocidade: o que sobrar de 2:00","× 15","Hardcore: total após a rodada 3","× 2"],rwH:'Como os pontos funcionam',rwOpen:'Como os pontos funcionam',anon:'Desconhecido',you:'Você',hard:'Hardcore',hardS:'Os corações não se recuperam entre as rodadas. Complete as três e a pontuação dobra.',x2:'Hardcore: {b} × 2 = {t}',back:'← Voltar à solicitação',board:'Ranking',introH:'Duelo de maçãs',introP:'A versão para iPhone está a caminho. Por enquanto, podemos oferecer umas maçãs um pouco diferentes.\n\nDerrube o vizinho com cinco maçãs. Três rodadas. A cada rodada, o vizinho ranzinza fica mais rápido e mais certeiro.',boy:'Menino',boyS:'Carrega o arremesso mais rápido',girl:'Menina',girlS:'Se move mais rápido',play:'Começar',how:'As maçãs acabam. Fique junto à árvore e aperte para baixo para pegar mais.',keys:'← → mover · segure Espaço e solte para arremessar · segure E junto à árvore para colher',keysTouch:'◀ ▶ mover · segure ▼ junto à árvore para colher · segure o botão da direita e solte para arremessar',pick:'Colher',thr:'Arremessar',level:'Rodada',clearH:'Rodada {n} vencida',time:'Tempo',hp:'Corações restantes',bonus:'Bônus de velocidade',lv:'Total da rodada',next:'Próxima rodada',final:'Ver resultado',winH:'As três rodadas',winP:'O vizinho ficou sem maçãs e sem argumentos.',loseH:'Nocaute',loseP:'Te acertaram na rodada {n}. O vizinho continua de pé.',save:'Salvar',saved:'Salvo. Sua posição: {r} de {n}',again:'Jogar de novo',rank:'Posição {r} de {n} — digite um nome para salvar',name:'Seu nome',empty:'Ninguém ainda — seja o primeiro.',local:'Os pontos ficam só neste navegador (o ranking ainda não está conectado).',notSaved:'Não foi salvo — o servidor não aceitou este resultado.',close:'Fechar',rot:'Vire o celular de lado — o pomar é largo.',rotTap:'Toque para ocupar a tela inteira.',paused:'Pausado',resume:'Continuar'}};
let lang='en';try{lang=localStorage.getItem('smf_lang')||''}catch(e){}if(!T[lang]){const n=(navigator.language||'en').slice(0,2);lang=T[n]?n:'en'}
document.documentElement.lang=lang;
const t=(k,v)=>{let s=T[lang][k]||k;if(v)for(const q in v)s=s.split('{'+q+'}').join(v[q]);return s};
const $=id=>document.getElementById(id);
const txt={'t-back':'back',brd:'board','t-intro-h':'introH','t-intro-p':'introP','t-boy':'boy','t-boy-s':'boyS','t-girl':'girl','t-girl-s':'girlS',play:'play','t-how':'how','t-keys':'keys','t-keys-touch':'keysTouch','t-time':'time','t-bonus':'bonus','t-lv':'lv',save:'save',again:'again','e-brd':'board','t-board':'board','b-close':'close','t-rot':'rot','t-rot-tap':'rotTap','t-pause-h':'paused','pz-resume':'resume','t-hard':'hard','t-hard-s':'hardS','t-round':'round','t-hearts':'heartsL','t-earned':'earned','t-all':'allT','rw-open':'rwOpen','t-rw-h':'rwH','rw-close':'close'};
for(const id in txt){const el=$(id);if(el)el.textContent=t(txt[id])}$('nm').placeholder=t('name');
// The two control buttons carry a glyph, not a word, so the old labels become their names.
$('p-gather').setAttribute('aria-label',t('pick'));$('p-throw').setAttribute('aria-label',t('thr'));
(()=>{const rr=T[lang].rwRows,el=$('t-rewards');let html='';for(let i=0;i<rr.length;i+=2)html+='<div'+(i===rr.length-2?' class="x2"':'')+'><span>'+rr[i].split('{cap}').join(GAME.AW.clashCap)+'</span><b>'+rr[i+1]+'</b></div>';el.innerHTML=html})();
// hero previews
function drawHeroes(){document.querySelectorAll('.hero').forEach(b=>{const c=b.querySelector('canvas'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);
ART[b.dataset.h](x,60,112,{face:1,walk:0,moving:false,gather:false,hurt:0,charge:-1,hard:$('hard').checked&&b.classList.contains('on')})})}
document.querySelectorAll('.hero').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.hero').forEach(h=>h.classList.remove('on'));b.classList.add('on');hero=b.dataset.h;drawHeroes()}));
$('hard').addEventListener('change',drawHeroes);drawHeroes();
let hero='boy',final=null,pendingSave=false;
// Platform is decided by whether the player actually touched the on-screen controls
// during the game, never by sniffing the user-agent string. Reset when a game starts.
let touched=false;
function markTouch(){touched=true}
const platform=()=>touched?'mobile':'desktop';
let savedName=null; // the name actually written to the board, once Save has succeeded
let savedScore=null; // the total the SERVER computed for that row - not the engine's
// Leaderboard rows, shared by the final screen and the board screen.
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const WIN=5; // rows drawn above and below the player's own line
// Platform icons: inline SVG, no image files and no icon library. A row whose platform
// is null has no data, so it gets an empty cell - never a guessed icon.
const PF={mobile:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="4.4" y="1.4" width="7.2" height="13.2" rx="1.7"/><path d="M6.5 12.4h3"/></svg>',
desktop:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.4" y="2.6" width="11.2" height="7.9" rx="1.3"/><path d="M1 13.4h14"/></svg>'};
const pfCell=v=>'<span class="pf">'+(PF[v]||'')+'</span>';
// `list` is board rows in score order; the entry carrying me:true is the player's own line.
function rowsHTML(list,from){return list.map((r,i)=>{const hard=/-hard$/.test(r.hero||'');const cls=[r.me?'me':'',hard?'hard':''].filter(Boolean).join(' ');
return `<div${cls?' class="'+cls+'"':''}><span>${from+i+1}</span>${pfCell(r.platform)}<span>${esc(r.name||t('anon'))}</span><span>${r.score}</span></div>`}).join('')}
function scrollToMe(el){const m=el.querySelector('.me');if(!m)return;
// Measured rectangles, so nothing depends on which element happens to be the row's
// offsetParent: the row's distance from the top of the scroller's content is the
// gap between the two boxes on screen, plus however far the box is already scrolled.
const r=m.getBoundingClientRect(),b=el.getBoundingClientRect();
const top=r.top-b.top-el.clientTop+el.scrollTop,max=Math.max(0,el.scrollHeight-el.clientHeight);
el.scrollTop=Math.max(0,Math.min(max,top-(el.clientHeight-r.height)/2))}
// The player's own line as it would read in the table. Nothing about it is stored anywhere.
function meRow(){return{me:true,name:savedName||$('nm').value.trim()||t('you'),score:final.total,hero:(final.hero||hero)+(final.hard?'-hard':''),platform:platform()}}
// The row Save has just written, located in a freshly fetched board.
function findMine(list){if(savedName==null||savedScore==null)return -1;const sc=Math.round(savedScore);
for(let i=0;i<list.length;i++)if(list[i].score===sc&&(list[i].name||'')===savedName)return i;return -1}
// A window of the board around index `at`, drawn on the final screen.
function endWindow(list,at){const el=$('e-list'),a=Math.max(0,at-WIN),b=Math.min(list.length,at+WIN+1);
el.innerHTML=rowsHTML(list.slice(a,b),a);el.hidden=false;scrollToMe(el)}
const ovs=['ov-intro','ov-clear','ov-end','ov-board','ov-rw','ov-pause'];function show(id){ovs.forEach(o=>$(o).hidden=o!==id);if(!id)ovs.forEach(o=>$(o).hidden=true)}
GAME.init($('cv'),{t,
levelClear(r){$('c-h').textContent=t('clearH',{n:r.level});$('c-time').textContent=r.time.toFixed(1)+' s';$('c-round').textContent='+'+r.round;$('c-hearts').textContent=r.hp+' × '+GAME.AW.heart+' = +'+r.hearts;$('c-bonus').textContent='('+GAME.AW.speedFrom+' − '+r.time.toFixed(1)+') × '+GAME.AW.speed+' = +'+r.bonus;
$('c-earned').textContent='+'+r.earned;$('c-lv').textContent=r.lvScore;$('c-all').textContent=r.total;
$('next').textContent=t(r.last?'final':'next');$('next').dataset.last=r.last?1:'';final=r;
const x2=$('c-x2');x2.hidden=!(r.last&&r.hard);if(!x2.hidden)x2.textContent=t('x2',{b:r.base,t:r.total});show('ov-clear')},
gameOver(r){end(false,r)},
hit(side){if(side<0&&navigator.vibrate)try{navigator.vibrate(25)}catch(e){}}});
function end(win,r){const f=final={...r,win};savedName=savedScore=null;$('e-h').textContent=t(win?'winH':'loseH');$('e-p').textContent=win?t('winP'):t('loseP',{n:r.level});
$('e-score').textContent=r.total;$('nm').value='';$('nm').disabled=false;$('save').disabled=false;$('e-rank').textContent='';$('e-list').hidden=true;$('e-list').innerHTML='';show('ov-end');
BOARD.list().then(({rows,remote})=>{if(final!==f)return;const pos=BOARD.rank(rows,r.total);
$('e-rank').textContent=t('rank',{r:pos,n:rows.length+1})+(remote?'':' · '+t('local'));
// Board unreachable: the plain rank line only, no empty window. Nothing is written here either way.
if(!remote)return;const list=rows.slice();list.splice(pos-1,0,meRow());endWindow(list,pos-1)})}
$('play').addEventListener('click',()=>{goFullscreen();touched=false;show(null);GAME.start(hero,$('hard').checked)});
$('next').addEventListener('click',()=>{if($('next').dataset.last){end(true,final)}else{show(null);GAME.next()}});
$('again').addEventListener('click',()=>{GAME.reset();show('ov-intro')});
// Save is the only thing that writes anything. An empty name still does nothing.
$('save').addEventListener('click',async()=>{const n=$('nm').value.trim();if(!n||!final)return;$('save').disabled=true;$('nm').disabled=true;
const f=final,res=await BOARD.save(n,final.hero||hero,final.hard,platform(),final.rounds||[],final.total);
if(final!==f)return;
// A reachable server that refused: nothing was written. Say so, and let the player try again.
if(!res.ok){$('save').disabled=false;$('nm').disabled=false;$('e-rank').textContent=t('notSaved')+' ('+res.reason+')';$('e-list').hidden=true;return}
// From here on the server's total is the one that counts, even if it differs from the engine's.
savedName=n.slice(0,24);savedScore=res.score;
const lb=await BOARD.list();if(final!==f)return;const rows=lb.rows;
$('e-rank').textContent=t('saved',{r:BOARD.rank(rows,savedScore+.5),n:rows.length})+(res.remote?'':' · '+t('local'));
// The same window again, now around the row that was really written.
const at=findMine(rows);if(lb.remote&&at>=0){const list=rows.slice();list[at]={...list[at],me:true};endWindow(list,at)}else $('e-list').hidden=true});
$('nm').addEventListener('keydown',e=>{if(e.key==='Enter')$('save').click()});
// The board refuses any name containing < > " or ' (bad_name), and a refused Save loses
// the run. So those four never stay in the field: stripped the moment they arrive -
// typed, pasted or autofilled - with the caret kept where it was. No message: there is
// nothing to explain about four characters nobody puts in a nickname. The value is only
// rewritten when one of them is actually there, so IME composition is left alone.
const BAD=/[<>"']/g;
$('nm').addEventListener('input',()=>{const f=$('nm'),v=f.value,c=v.replace(BAD,'');
if(c!==v){const at=f.selectionStart;f.value=c;
if(at!=null){const p=v.slice(0,at).replace(BAD,'').length;try{f.setSelectionRange(p,p)}catch(_){}}}
const n=$('e-list').querySelector('.me span:nth-child(3)');if(n)n.textContent=f.value.trim()||t('you')});
// With a score in this session the list carries the player's line and opens on it;
// with none - the intro screen - it renders from the top, as before.
async function board(){show('ov-board');const el=$('list');el.innerHTML='';const {rows,remote}=await BOARD.list();$('b-note').textContent=remote?'':t('local');
const mine=!!(final&&final.total!=null);
if(!rows.length&&!mine){el.innerHTML='<div><span></span><span></span><span>'+t('empty')+'</span><span></span></div>';return}
let list=rows.slice(),at=-1;
if(mine){at=findMine(list);
if(at>=0)list[at]={...list[at],me:true};              // saved: the real row
else if(savedName==null){at=BOARD.rank(rows,final.total)-1;list.splice(at,0,meRow())}} // not saved: the same unwritten line as on the final screen
el.innerHTML=rowsHTML(list.slice(0,Math.max(200,at+WIN+1)),0);
if(at>=0)scrollToMe(el)}
let before=null;$('brd').addEventListener('click',()=>{before=ovs.find(o=>!$(o).hidden)||null;GAME.pauseState(true);board()});
$('e-brd').addEventListener('click',()=>{before='ov-end';board()});
$('rw-open').addEventListener('click',()=>{show('ov-rw')});
$('rw-close').addEventListener('click',()=>{show('ov-intro')});
$('b-close').addEventListener('click',()=>{if(before)show(before);else{show(null);const s=GAME.state();if(s&&!s.over)GAME.resume()}});
// Fullscreen and orientation. Both are best-effort and every rejection is
// swallowed: Safari on iPhone has no Fullscreen API at all, and some browsers
// refuse an orientation lock even when fullscreen succeeds. Where either is
// refused the page behaves exactly as it did before - including the existing
// rotate-prompt screen - with no error and no button that does nothing.
// The target is the whole page: nothing else is on it, and taking the document
// keeps the top bar's Leaderboard button reachable while fullscreen.
const FSEL=document.documentElement;
const fsRequest=FSEL.requestFullscreen||FSEL.webkitRequestFullscreen||null;
const fsOn=()=>!!(document.fullscreenElement||document.webkitFullscreenElement);
function lockLandscape(){try{const o=screen&&screen.orientation;if(o&&typeof o.lock==='function'){const p=o.lock('landscape');if(p&&p.catch)p.catch(()=>{})}}catch(e){}}
// Called from a tap, so the user activation the Fullscreen API needs is still live.
function goFullscreen(){
if(!fsRequest||fsOn()){lockLandscape();return}
try{const p=fsRequest.call(FSEL);if(p&&p.then)p.then(lockLandscape,lockLandscape);else lockLandscape()}catch(e){lockLandscape()}}
// The hint is shown only where the API exists, so it never invites a tap that does nothing.
if(fsRequest)$('t-rot-tap').hidden=false;
$('rot').addEventListener('click',goFullscreen);
// Leaving fullscreen rearranges the screen. Pause rather than let the player be
// hit while that happens - but only mid-round, never over a screen that is already up.
function onFsChange(){if(fsOn())return;const s=GAME.state();
if(s&&!s.over&&!s.pause&&ovs.every(o=>$(o).hidden)){GAME.pauseState(true);show('ov-pause')}}
addEventListener('fullscreenchange',onFsChange);
addEventListener('webkitfullscreenchange',onFsChange);
$('pz-resume').addEventListener('click',()=>{show(null);GAME.resume()});
// Input. Two sources, one truth: `held` is what fingers are holding, keyed by
// pointer id, and `keyHeld` is what the keyboard is holding. apply() recomputes
// every engine input from both, so neither source can clear the other's key, and
// two fingers on one control do not cancel each other on the first release.
const held=new Map();   // pointerId -> control key, or null while that finger is on no control
const keyHeld=new Set();
const CTL=[...document.querySelectorAll('[data-k]')];
function apply(){const on={left:false,right:false,gather:false,throw:false};
for(const k of keyHeld)on[k]=true;
for(const k of held.values())if(k)on[k]=true;
for(const k in on)GAME.input[k]=on[k];
const live=new Set(held.values());CTL.forEach(el=>el.classList.toggle('act',live.has(el.dataset.k)))}
// keyboard - same keys, same meaning as before
const K={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',' ':'throw',e:'gather',E:'gather',ArrowDown:'gather',s:'gather',S:'gather'};
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;const k=K[e.key];if(k){keyHeld.add(k);apply();e.preventDefault()}});
addEventListener('keyup',e=>{const k=K[e.key];if(k){keyHeld.delete(k);apply()}});
addEventListener('blur',()=>{keyHeld.clear();held.clear();apply()});
// On-screen controls: press and hold, never click, and they behave like physical
// buttons - a control is held while a finger is ON it. A finger that slides off
// releases it, a finger that slides onto another control presses that one, and the
// gap between left and right holds nothing.
// Receiving and deciding are separate. Receiving: each zone captures every pointer
// that lands anywhere in it, so every move, and the pointerup even far outside the
// zone, still arrives here - without that a control could stay held forever.
// Deciding: on every down and move the finger's coordinates are hit-tested against
// the controls, so what is held is where the finger IS, not where it started.
// Each finger is its own entry, so walking while charging works and one finger's
// lift or slide never touches another's.
const ZONES=[...document.querySelectorAll('.zone')];
function under(x,y){for(const el of CTL){const r=el.getBoundingClientRect();
if(r.width>0&&r.height>0&&x>=r.left&&x<r.right&&y>=r.top&&y<r.bottom)return el.dataset.k}return null}
function track(e){const k=under(e.clientX,e.clientY);if(k&&e.pointerType!=='mouse')markTouch();
if(held.get(e.pointerId)!==k){held.set(e.pointerId,k);apply()}}
ZONES.forEach(z=>{
z.addEventListener('pointerdown',e=>{e.preventDefault();
try{z.setPointerCapture(e.pointerId)}catch(_){}
held.set(e.pointerId,null);track(e)});
// Only fingers that went down in a zone are followed; a hovering mouse is not.
z.addEventListener('pointermove',e=>{if(held.has(e.pointerId))track(e)});
const release=e=>{if(held.delete(e.pointerId))apply()};
z.addEventListener('pointerup',release);
z.addEventListener('pointercancel',release);
// The browser can take the capture away - for instance when a screen comes up and
// the zone stops being displayed - and then the pointerup would land elsewhere. The
// check on target ignores the same event bubbling up from a control inside the zone.
z.addEventListener('lostpointercapture',e=>{if(e.target===z)release(e)});
z.addEventListener('contextmenu',e=>e.preventDefault());
z.addEventListener('dragstart',e=>e.preventDefault())});
// The gather control teaches itself. With no apples left AND standing in the gathering
// zone by their own tree, `down` is the only move worth making, so it gets a quiet
// highlight - and loses it the moment either condition ends (gathering one apple ends
// the first). It is a class on the existing button: no new element, no new line of
// text anywhere. Both conditions come from the engine's own state - `apples` was
// already there, and stepChar now records `inZone` on the character - so the
// gathering-zone arithmetic is not duplicated here.
const gEl=$('p-gather');
setInterval(()=>{const s=GAME.state();
gEl.classList.toggle('need',!!(s&&!s.over&&!s.pause&&s.p.apples===0&&s.p.inZone))},140);
})();
