(()=>{
const T={
en:{earned:'Earned during the round',allT:'Overall total',round:'Round cleared',heartsL:'Hearts kept',bonusLeft:'bonus window',rwRows:["Hit on the neighbour","+200","Apples colliding mid-air","+50","Each heart kept at round end","+200","Round cleared","+500 / 700 / 1000","Speed bonus: seconds left of 2:00","× 15","Hardcore: total after round 3","× 2"],rwH:'How points work',rwOpen:'How points work',anon:'Unknown',you:'You',hard:'Hardcore',hardS:'Hearts do not refill between rounds. Finish all three and the score doubles.',x2:'Hardcore: {b} × 2 = {t}',back:'← Back to the request',board:'Leaderboard',introH:'Apple fight',introP:'We have not made the iPhone version yet, so here are the only apples we can offer. Knock the neighbour off his feet with five of them — three rounds, he gets quicker each time.',boy:'Boy',boyS:'Charges a throw faster',girl:'Girl',girlS:'Runs faster',play:'Start',how:'Apples run out. Stand by your tree and hold Pick to gather more — but you cannot dodge while picking.',keys:'← → move · hold Space and release to throw · hold E by the tree to pick apples',pick:'Pick',thr:'Throw',level:'Round',clearH:'Round {n} won',time:'Time',hp:'Hearts left',bonus:'Speed bonus',lv:'Round total',next:'Next round',final:'See the result',winH:'All three rounds',winP:'The neighbour has run out of apples and arguments.',loseH:'Knocked out',loseP:'Got you in round {n}. The neighbour is still standing.',save:'Save',saved:'Saved. Your place: #{r} of {n}',again:'Play again',rank:'Place #{r} of {n} — enter a name to save it',name:'Your name',empty:'Nobody yet — be the first.',local:'Scores are kept in this browser only (leaderboard is not connected yet).',close:'Close',rot:'Turn your phone sideways — the orchard is wide.'},
// SITE-01 - owner will proofread: the new `you` key in ru/es/pt below.
ru:{earned:'Набрано в ходе раунда',allT:'Всего очков',round:'Раунд пройден',heartsL:'Сохранённые сердца',bonusLeft:'бонус за скорость',rwRows:["Попадание в соседа","+200","Столкновение яблок в воздухе","+50","Каждое сохранённое сердце в конце раунда","+200","Пройденный раунд","+500 / 700 / 1000","Бонус за скорость: остаток от 2:00","× 15","Хардкор: итог после 3-го раунда","× 2"],rwH:'Как считаются очки',rwOpen:'Как считаются очки',anon:'Неизвестный',you:'Вы',hard:'Хардкор',hardS:'Сердца не восстанавливаются между раундами. Пройдёте все три — очки удвоятся.',x2:'Хардкор: {b} × 2 = {t}',back:'← Назад к заявке',board:'Таблица лидеров',introH:'Яблочная дуэль',introP:'Версию для iPhone мы пока не сделали, так что вот единственные яблоки, которые можем предложить. Сбейте соседа пятью яблоками — три раунда, каждый раз он быстрее.',boy:'Мальчик',boyS:'Быстрее замахивается',girl:'Девочка',girlS:'Бегает быстрее',play:'Начать',how:'Яблоки кончаются. Стойте у своего дерева и держите «Собрать», чтобы набрать ещё — но пока собираете, уклоняться нельзя.',keys:'← → идти · зажать Пробел и отпустить — бросок · зажать E у дерева — собрать яблоки',pick:'Собрать',thr:'Бросок',level:'Раунд',clearH:'Раунд {n} выигран',time:'Время',hp:'Осталось сердец',bonus:'Бонус за скорость',lv:'Итог за раунд',next:'Следующий раунд',final:'К результату',winH:'Все три раунда',winP:'У соседа кончились яблоки и аргументы.',loseH:'Нокаут',loseP:'Попали в раунде {n}. Сосед ещё стоит.',save:'Сохранить',saved:'Сохранено. Ваше место: {r} из {n}',again:'Ещё раз',rank:'Место {r} из {n} — введите имя, чтобы сохранить',name:'Ваше имя',empty:'Пока никого — будьте первым.',local:'Очки хранятся только в этом браузере (таблица ещё не подключена).',close:'Закрыть',rot:'Поверните телефон горизонтально — сад широкий.'},
es:{earned:'Ganado durante la ronda',allT:'Puntos totales',round:'Ronda superada',heartsL:'Corazones conservados',bonusLeft:'bono de velocidad',rwRows:["Acierto al vecino","+200","Manzanas que chocan en el aire","+50","Cada corazón conservado al final","+200","Ronda superada","+500 / 700 / 1000","Bono de velocidad: lo que sobre de 2:00","× 15","Hardcore: total tras la ronda 3","× 2"],rwH:'Cómo se cuentan los puntos',rwOpen:'Cómo se cuentan los puntos',anon:'Desconocido',you:'Tú',hard:'Hardcore',hardS:'Los corazones no se recuperan entre rondas. Completa las tres y los puntos se duplican.',x2:'Hardcore: {b} × 2 = {t}',back:'← Volver a la solicitud',board:'Clasificación',introH:'Duelo de manzanas',introP:'Todavía no hemos hecho la versión para iPhone, así que estas son las únicas manzanas que podemos ofrecer. Derriba al vecino con cinco de ellas: tres rondas, cada vez más rápido.',boy:'Chico',boyS:'Carga el tiro más rápido',girl:'Chica',girlS:'Corre más rápido',play:'Empezar',how:'Las manzanas se acaban. Quédate junto a tu árbol y mantén «Recoger» para conseguir más, pero mientras recoges no puedes esquivar.',keys:'← → moverse · mantén Espacio y suelta para lanzar · mantén E junto al árbol para recoger',pick:'Recoger',thr:'Lanzar',level:'Ronda',clearH:'Ronda {n} ganada',time:'Tiempo',hp:'Corazones restantes',bonus:'Bono de velocidad',lv:'Total de la ronda',next:'Siguiente ronda',final:'Ver resultado',winH:'Las tres rondas',winP:'Al vecino se le acabaron las manzanas y los argumentos.',loseH:'Fuera de combate',loseP:'Te dieron en la ronda {n}. El vecino sigue en pie.',save:'Guardar',saved:'Guardado. Tu puesto: {r} de {n}',again:'Otra vez',rank:'Puesto {r} de {n}: escribe un nombre para guardarlo',name:'Tu nombre',empty:'Nadie todavía: sé el primero.',local:'Los puntos se guardan solo en este navegador (la tabla aún no está conectada).',close:'Cerrar',rot:'Gira el teléfono: el huerto es ancho.'},
pt:{earned:'Ganho durante a rodada',allT:'Pontuação total',round:'Rodada concluída',heartsL:'Corações mantidos',bonusLeft:'bônus de velocidade',rwRows:["Acerto no vizinho","+200","Maçãs colidindo no ar","+50","Cada coração mantido no fim","+200","Rodada concluída","+500 / 700 / 1000","Bônus de velocidade: o que sobrar de 2:00","× 15","Hardcore: total após a rodada 3","× 2"],rwH:'Como os pontos funcionam',rwOpen:'Como os pontos funcionam',anon:'Desconhecido',you:'Você',hard:'Hardcore',hardS:'Os corações não se recuperam entre as rodadas. Complete as três e a pontuação dobra.',x2:'Hardcore: {b} × 2 = {t}',back:'← Voltar à solicitação',board:'Ranking',introH:'Duelo de maçãs',introP:'Ainda não fizemos a versão para iPhone, então estas são as únicas maçãs que podemos oferecer. Derrube o vizinho com cinco delas: três rodadas, cada vez mais rápido.',boy:'Menino',boyS:'Carrega o arremesso mais rápido',girl:'Menina',girlS:'Corre mais rápido',play:'Começar',how:'As maçãs acabam. Fique junto à sua árvore e segure «Colher» para pegar mais — mas enquanto colhe não dá para esquivar.',keys:'← → mover · segure Espaço e solte para arremessar · segure E junto à árvore para colher',pick:'Colher',thr:'Arremessar',level:'Rodada',clearH:'Rodada {n} vencida',time:'Tempo',hp:'Corações restantes',bonus:'Bônus de velocidade',lv:'Total da rodada',next:'Próxima rodada',final:'Ver resultado',winH:'As três rodadas',winP:'O vizinho ficou sem maçãs e sem argumentos.',loseH:'Nocaute',loseP:'Te acertaram na rodada {n}. O vizinho continua de pé.',save:'Salvar',saved:'Salvo. Sua posição: {r} de {n}',again:'Jogar de novo',rank:'Posição {r} de {n} — digite um nome para salvar',name:'Seu nome',empty:'Ninguém ainda — seja o primeiro.',local:'Os pontos ficam só neste navegador (o ranking ainda não está conectado).',close:'Fechar',rot:'Vire o celular de lado — o pomar é largo.'}};
let lang='en';try{lang=localStorage.getItem('smf_lang')||''}catch(e){}if(!T[lang]){const n=(navigator.language||'en').slice(0,2);lang=T[n]?n:'en'}
document.documentElement.lang=lang;
const t=(k,v)=>{let s=T[lang][k]||k;if(v)for(const q in v)s=s.split('{'+q+'}').join(v[q]);return s};
const $=id=>document.getElementById(id);
const txt={'t-back':'back',brd:'board','t-intro-h':'introH','t-intro-p':'introP','t-boy':'boy','t-boy-s':'boyS','t-girl':'girl','t-girl-s':'girlS',play:'play','t-how':'how','t-keys':'keys','p-gather':'pick','p-throw':'thr','t-time':'time','t-bonus':'bonus','t-lv':'lv',save:'save',again:'again','e-brd':'board','t-board':'board','b-close':'close','t-rot':'rot','t-hard':'hard','t-hard-s':'hardS','t-round':'round','t-hearts':'heartsL','t-earned':'earned','t-all':'allT','rw-open':'rwOpen','t-rw-h':'rwH','rw-close':'close'};
for(const id in txt){const el=$(id);if(el)el.textContent=t(txt[id])}$('nm').placeholder=t('name');
(()=>{const rr=T[lang].rwRows,el=$('t-rewards');let html='';for(let i=0;i<rr.length;i+=2)html+='<div'+(i===rr.length-2?' class="x2"':'')+'><span>'+rr[i]+'</span><b>'+rr[i+1]+'</b></div>';el.innerHTML=html})();
// hero previews
function drawHeroes(){document.querySelectorAll('.hero').forEach(b=>{const c=b.querySelector('canvas'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);
ART[b.dataset.h](x,60,112,{face:1,walk:0,moving:false,gather:false,hurt:0,charge:-1,hard:$('hard').checked&&b.classList.contains('on')})})}
document.querySelectorAll('.hero').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.hero').forEach(h=>h.classList.remove('on'));b.classList.add('on');hero=b.dataset.h;drawHeroes()}));
$('hard').addEventListener('change',drawHeroes);drawHeroes();
let hero='boy',final=null,pendingSave=false;
let savedName=null; // the name actually written to the board, once Save has succeeded
// Leaderboard rows, shared by the final screen and the board screen.
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const WIN=5; // rows drawn above and below the player's own line
// `list` is board rows in score order; the entry carrying me:true is the player's own line.
function rowsHTML(list,from){return list.map((r,i)=>{const hard=/-hard$/.test(r.hero||'');const cls=[r.me?'me':'',hard?'hard':''].filter(Boolean).join(' ');
return `<div${cls?' class="'+cls+'"':''}><span>${from+i+1}</span><span>${esc(r.name||t('anon'))}</span><span>${r.score}</span></div>`}).join('')}
// The list is not a positioned ancestor, so both offsets are measured from the same box.
function scrollToMe(el){const m=el.querySelector('.me');if(m)el.scrollTop=Math.max(0,m.offsetTop-el.offsetTop-(el.clientHeight-m.offsetHeight)/2)}
// The player's own line as it would read in the table. Nothing about it is stored anywhere.
function meRow(){return{me:true,name:savedName||$('nm').value.trim()||t('you'),score:final.total,hero:(final.hero||hero)+(final.hard?'-hard':'')}}
// The row Save has just written, located in a freshly fetched board.
function findMine(list){if(savedName==null||!final)return -1;const sc=Math.round(final.total);
for(let i=0;i<list.length;i++)if(list[i].score===sc&&(list[i].name||'')===savedName)return i;return -1}
// A window of the board around index `at`, drawn on the final screen.
function endWindow(list,at){const el=$('e-list'),a=Math.max(0,at-WIN),b=Math.min(list.length,at+WIN+1);
el.innerHTML=rowsHTML(list.slice(a,b),a);el.hidden=false;scrollToMe(el)}
const ovs=['ov-intro','ov-clear','ov-end','ov-board','ov-rw'];function show(id){ovs.forEach(o=>$(o).hidden=o!==id);if(!id)ovs.forEach(o=>$(o).hidden=true)}
GAME.init($('cv'),{t,
levelClear(r){$('c-h').textContent=t('clearH',{n:r.level});$('c-time').textContent=r.time.toFixed(1)+' s';$('c-round').textContent='+'+r.round;$('c-hearts').textContent=r.hp+' × '+GAME.AW.heart+' = +'+r.hearts;$('c-bonus').textContent='('+GAME.AW.speedFrom+' − '+r.time.toFixed(1)+') × '+GAME.AW.speed+' = +'+r.bonus;
$('c-earned').textContent='+'+r.earned;$('c-lv').textContent=r.lvScore;$('c-all').textContent=r.total;
$('next').textContent=t(r.last?'final':'next');$('next').dataset.last=r.last?1:'';final=r;
const x2=$('c-x2');x2.hidden=!(r.last&&r.hard);if(!x2.hidden)x2.textContent=t('x2',{b:r.base,t:r.total});show('ov-clear')},
gameOver(r){end(false,r)},
hit(side){if(side<0&&navigator.vibrate)try{navigator.vibrate(25)}catch(e){}}});
function end(win,r){const f=final={...r,win};savedName=null;$('e-h').textContent=t(win?'winH':'loseH');$('e-p').textContent=win?t('winP'):t('loseP',{n:r.level});
$('e-score').textContent=r.total;$('nm').value='';$('nm').disabled=false;$('save').disabled=false;$('e-rank').textContent='';$('e-list').hidden=true;$('e-list').innerHTML='';show('ov-end');
BOARD.list().then(({rows,remote})=>{if(final!==f)return;const pos=BOARD.rank(rows,r.total);
$('e-rank').textContent=t('rank',{r:pos,n:rows.length+1})+(remote?'':' · '+t('local'));
// Board unreachable: the plain rank line only, no empty window. Nothing is written here either way.
if(!remote)return;const list=rows.slice();list.splice(pos-1,0,meRow());endWindow(list,pos-1)})}
$('play').addEventListener('click',()=>{show(null);GAME.start(hero,$('hard').checked)});
$('next').addEventListener('click',()=>{if($('next').dataset.last){end(true,final)}else{show(null);GAME.next()}});
$('again').addEventListener('click',()=>{GAME.reset();show('ov-intro')});
// Save is the only thing that writes anything. An empty name still does nothing.
$('save').addEventListener('click',async()=>{const n=$('nm').value.trim();if(!n||!final)return;$('save').disabled=true;$('nm').disabled=true;
const f=final,remote=await BOARD.save(n,final.total,(final.hero||hero)+(final.hard?'-hard':''));savedName=n.slice(0,24);
const lb=await BOARD.list();if(final!==f)return;const rows=lb.rows;
$('e-rank').textContent=t('saved',{r:BOARD.rank(rows,final.total+.5),n:rows.length})+(remote?'':' · '+t('local'));
// The same window again, now around the row that was really written.
const at=findMine(rows);if(lb.remote&&at>=0){const list=rows.slice();list[at]={...list[at],me:true};endWindow(list,at)}else $('e-list').hidden=true});
$('nm').addEventListener('keydown',e=>{if(e.key==='Enter')$('save').click()});
$('nm').addEventListener('input',()=>{const n=$('e-list').querySelector('.me span:nth-child(2)');if(n)n.textContent=$('nm').value.trim()||t('you')});
// With a score in this session the list carries the player's line and opens on it;
// with none - the intro screen - it renders from the top, as before.
async function board(){show('ov-board');const el=$('list');el.innerHTML='';const {rows,remote}=await BOARD.list();$('b-note').textContent=remote?'':t('local');
const mine=!!(final&&final.total!=null);
if(!rows.length&&!mine){el.innerHTML='<div><span></span><span>'+t('empty')+'</span><span></span></div>';return}
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
// keyboard
const K={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',' ':'throw',e:'gather',E:'gather',ArrowDown:'gather',s:'gather',S:'gather'};
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;const k=K[e.key];if(k){GAME.input[k]=true;e.preventDefault()}});
addEventListener('keyup',e=>{const k=K[e.key];if(k){GAME.input[k]=false}});
addEventListener('blur',()=>{for(const k in GAME.input)GAME.input[k]=false});
// touch pad
document.querySelectorAll('#pad button').forEach(b=>{const k=b.dataset.k;const on=e=>{e.preventDefault();GAME.input[k]=true;b.classList.add('act')},off=e=>{e.preventDefault();GAME.input[k]=false;b.classList.remove('act')};
b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointercancel',off);b.addEventListener('pointerleave',off);b.addEventListener('contextmenu',e=>e.preventDefault())});
})();
