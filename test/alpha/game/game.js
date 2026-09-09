// Engine. Logical field 960x540. window.GAME exposes start/stop and events via callbacks.
(()=>{
const W=960,H=540,GY=470,FX=480,FH=92;
const RM=(typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion:reduce)'))||{matches:false};
const LV=[{speed:200,err:52,react:.8,gatherT:.62},{speed:300,err:42,react:.6,gatherT:.5},{speed:420,err:32,react:.45,gatherT:.4}];
// range = v^2*sin(2*ANG)/G. Everyone reaches ~740px (own tree edge -> neighbour's tree). Girl walks faster; boy charges a full throw faster.
const ANG=-52*Math.PI/180,G=1050,VMAX=r=>Math.sqrt(r*G/Math.sin(2*Math.abs(ANG)));
const HERO={boy:{speed:270,vmax:VMAX(740),chargeT:.62},girl:{speed:320,vmax:VMAX(740),chargeT:.82},redneck:{vmax:VMAX(740),chargeT:.72}};
const V0=260,MAXA=5,MAXHP=5,GATHER_T=.5,TREE_L=64,TREE_R=896,GZONE=95;
// explicit reward table. clashCap: paid clashes per round - the capping one doubles the round's
// clash points (clashBonus), every clash after it destroys apples but pays nothing.
const AW={hit:200,clash:50,clashCap:20,clashBonus:2,heart:200,round:[500,700,1000],speed:15,speedFrom:120};
// Seeded RNG (mulberry32), held in state and seeded when a game starts. The seed
// is kept so a run could later be sent with its result. `rng` drives the
// simulation; `vrng` drives draw-time-only effects, which tick at the display's
// refresh rate and so must not disturb the simulation's stream.
function mulberry32(a){return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function newSeed(){const c=globalThis.crypto;if(c&&c.getRandomValues){const a=new Uint32Array(1);c.getRandomValues(a);return a[0]>>>0}return(Date.now()^(performance.now()*65536))>>>0}
let cv,x,S=null,cb={},raf=0,last=0;
const input={left:false,right:false,gather:false,throw:false};
function mk(side,kind,hard){return{side,kind,hard:!!hard,x:side<0?200:760,hp:MAXHP,apples:MAXA,face:-side,walk:0,moving:false,gather:0,gathering:false,inZone:false,charge:-1,hurt:0,cool:0,ai:{t:0,target:null,want:0,thinkT:0}}}
function newGame(hero,hard){const seed=newSeed();S={hero,hard:!!hard,seed,rounds:[],rng:mulberry32(seed),vrng:mulberry32((seed^0x9E3779B9)>>>0),level:0,total:0,t:0,lvT:0,p:mk(-1,hero,hard),e:mk(1,'redneck'),apples:[],fx:[],over:false,pause:false,shake:0,msg:null};lvl()}
function lvl(){const s=S;s.p.x=200;s.e.x=760;if(!(s.hard&&s.level>0))s.p.hp=MAXHP;s.e.hp=MAXHP;s.p.apples=MAXA;s.e.apples=MAXA;s.p.charge=-1;s.e.charge=-1;s.apples=[];s.fx=[];s.lvT=0;s.lvEarned=0;s.clashes=0;s.hits=0;s.pause=false;s.over=false;s.e.ai={t:0,target:null,want:0,thinkT:0}}
function throwApple(c,pow){const spd=V0+(HERO[c.kind].vmax-V0)*pow,f=c.face;
S.apples.push({x:c.x+f*14,y:GY-80,y0:GY-80,vx:Math.cos(ANG)*spd*f,vy:Math.sin(ANG)*spd,rot:0,from:c.side,dead:0,age:0});c.apples--;c.cool=.35}
function add(n){S.total+=n;S.lvEarned=(S.lvEarned||0)+n}
function award(n,px,py,col){add(n);S.fx.push({x:px,y:py,t:0,kind:'score',n,col})}
function hit(c){if(c.hurt>0)return;c.hp--;c.hurt=.9;S.shake=.25;cb.hit&&cb.hit(c.side);if(c.side>0){S.hits++;award(AW.hit,c.x,GY-118,ART.mint)}
if(c.hp<=0){S.over=true;S.pause=true;
// One record per finished round, in play order, so the server can recompute the score.
// `clashes` counts only the PAID clashes: the cap-th one pays (doubled), every one after it pays nothing.
// `time` is the same number the speed bonus is computed from, unrounded.
S.rounds.push({hits:S.hits,clashes:Math.min(S.clashes,AW.clashCap),hearts:S.p.hp,cleared:c.side>0,time:S.lvT});
if(c.side>0){const time=S.lvT,left=Math.max(0,AW.speedFrom-time),bonus=Math.round(left*AW.speed),hearts=S.p.hp*AW.heart,round=AW.round[S.level],earned=S.lvEarned||0,end=round+hearts+bonus,lvScore=end+earned;S.total+=end;
const last=S.level>=2,base=S.total;if(last&&S.hard)S.total*=2;
cb.levelClear&&cb.levelClear({level:S.level+1,time,left,bonus,hp:S.p.hp,hearts,round,earned,lvScore,total:S.total,base,hard:S.hard,last,rounds:S.rounds.slice()})}
else cb.gameOver&&cb.gameOver({level:S.level+1,total:S.total,hard:S.hard,rounds:S.rounds.slice()})}}
function stepChar(c,dt,dir,wantGather,wantThrow,speed){
c.moving=false;c.cool=Math.max(0,c.cool-dt);c.hurt=Math.max(0,c.hurt-dt);
const inZone=c.side<0?c.x<TREE_L+GZONE+20:c.x>TREE_R-GZONE-20;
// Read-only, for the UI: whether this character is standing in its own gathering zone.
// The alternative was to repeat the TREE/GZONE arithmetic in ui.js, where it would
// silently go stale the first time the field changes.
c.inZone=inZone;
c.gathering=wantGather&&inZone&&c.apples<MAXA&&c.charge<0;
if(c.gathering){c.gather+=dt;c.walk+=dt*6;const need=c.side<0?GATHER_T:LV[S.level].gatherT;if(c.gather>=need){c.gather=0;c.apples++;S.fx.push({x:c.x+c.face*26,y:GY-104,t:0,kind:'pick'})}return}
c.gather=0;
if(dir&&c.charge<0){c.x+=dir*speed*dt;c.face=dir;c.moving=true;c.walk+=dt*11}
const lim=c.side<0?[TREE_L+40,FX-40]:[FX+40,TREE_R-40];c.x=Math.max(lim[0],Math.min(lim[1],c.x));
if(wantThrow&&c.apples>0&&c.cool<=0){c.face=-c.side;c.charge=c.charge<0?0:Math.min(1,c.charge+dt/(HERO[c.kind].chargeT*(c.side>0?[1,.88,.76][S.level]:1)))}
else if(c.charge>=0){throwApple(c,c.charge);c.charge=-1}}
function ai(dt){const e=S.e,p=S.p,L=LV[S.level],a=e.ai;a.thinkT-=dt;
if(a.thinkT<=0){a.thinkT=L.react;
if(e.apples===0||(e.apples<2&&S.rng()<.5&&e.x>TREE_R-GZONE)) a.want=1; // go gather
else if(e.apples>=MAXA||(a.want===1&&e.apples>=3&&S.rng()<.35)) a.want=2; // fight
if(a.want===0)a.want=2;
// pick a spot: fight spot keeps distance to player ~ what a mid power throw reaches; add jitter
if(a.want===2){const d=380+S.rng()*180;a.target=Math.max(FX+60,Math.min(TREE_R-60,p.x+d))}else a.target=TREE_R-44-S.rng()*30;
// power is chosen when charging starts (see below), not here
// dodge: if an apple is inbound and close, sidestep
a.dodge=0;if(e.charge<0)for(const ap of S.apples)if(ap.from<0&&Math.abs(ap.x-e.x)<180&&S.rng()<(S.level*.28+.18))a.dodge=ap.vx>0?1:-1}
let dir=0;const dx=a.target-e.x;if(Math.abs(dx)>10)dir=Math.sign(dx);if(a.dodge)dir=a.dodge;
const gather=a.want===1&&Math.abs(dx)<=12;
let thr=false;
if(e.charge>=0){thr=e.charge<a.pow;dir=0} // committed: finish the charge regardless of dodge/target changes
else if(a.want===2&&Math.abs(dx)<=14&&e.apples>0&&e.cool<=0){
// aim now, from the real distance. Compensate the 76px drop + spawn offset: solve v for range r with launch height h:
// r = vx*t, h + vy*t - g t^2/2 = 0  ->  iterate on the flat-ground estimate
const h=76,r=Math.abs(e.x-p.x)-36+(S.rng()-.5)*2*L.err;let v=VMAX(Math.max(60,r));
for(let i=0;i<3;i++){const vx=Math.cos(ANG)*v,vy=-Math.sin(ANG)*v,t=(vy+Math.sqrt(vy*vy+2*G*h))/G,rr=vx*t;v*=Math.sqrt(Math.max(.3,r/rr))}
a.pow=Math.max(.02,Math.min(1,(v-V0)/(HERO.redneck.vmax-V0)));thr=true}
stepChar(e,dt,thr?0:dir,gather,thr,L.speed)}
function stepApples(dt){for(const ap of S.apples){if(ap.dead>0){ap.dead+=dt;continue}
ap.age+=dt;ap.vy+=G*dt;ap.x+=ap.vx*dt;ap.y+=ap.vy*dt;ap.rot+=ap.vx*dt*.012;
if(Math.abs(ap.x-FX)<8&&ap.y>GY-FH){ap.vx*=-.15;ap.vy=Math.min(ap.vy,60);ap.x=FX+(ap.vx>0?9:-9);S.fx.push({x:ap.x,y:ap.y,t:0,kind:'thud'})}
if(ap.y>=GY-4){ap.dead=.001;S.fx.push({x:ap.x,y:GY-4,t:0,kind:'splat'});continue}
const tgt=ap.from<0?S.e:S.p;if(Math.abs(ap.x-tgt.x)<16&&ap.y>GY-100&&ap.y<GY){ap.dead=.001;S.fx.push({x:ap.x,y:ap.y,t:0,kind:'splat'});hit(tgt)}}
for(let i=0;i<S.apples.length;i++){const a=S.apples[i];if(a.dead>0)continue;for(let j=i+1;j<S.apples.length;j++){const b=S.apples[j];if(b.dead>0||a.from===b.from)continue;
if(Math.hypot(a.x-b.x,a.y-b.y)<22){a.dead=b.dead=.001;const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;S.fx.push({x:mx,y:my,t:0,kind:'burst'});S.shake=Math.max(S.shake,.18);
// The apples always destroy each other; only the points stop. The capping clash doubles the round's clash points.
S.clashes++;if(S.clashes<AW.clashCap)award(AW.clash,mx,my-14,'#F6E7A0');
else if(S.clashes===AW.clashCap){const cbase=AW.clashCap*AW.clash,ctot=cbase*AW.clashBonus;add(AW.clash+ctot-cbase);S.fx.push({x:mx,y:my,t:0,kind:'clashx',base:cbase,tot:ctot})}
for(let k=0;k<10;k++){const an=S.rng()*6.28,sp=90+S.rng()*160;S.fx.push({x:mx,y:my,vx:Math.cos(an)*sp,vy:Math.sin(an)*sp-80,t:0,kind:'chunk',r:3+S.rng()*4})}}}}
S.apples=S.apples.filter(a=>a.dead<.4);S.fx=S.fx.filter(f=>{f.t+=dt;if(f.kind==='chunk'){f.vy+=G*dt;f.x+=f.vx*dt;f.y+=f.vy*dt}return f.t<(f.kind==='chunk'?.9:f.kind==='score'?1.1:f.kind==='clashx'?1.8:.5)})}
function update(dt){if(!S||S.pause)return;S.t+=dt;S.lvT+=dt;S.shake=Math.max(0,S.shake-dt);
const dir=(input.right?1:0)-(input.left?1:0);stepChar(S.p,dt,dir,input.gather,input.throw,HERO[S.hero].speed);ai(dt);stepApples(dt)}
function draw(){const s=S;x.save();x.clearRect(0,0,W,H);
if(s&&s.shake>0)x.translate((s.vrng()-.5)*s.shake*14,(s.vrng()-.5)*s.shake*10);
ART.sky(x,W,H,GY);ART.ground(x,W,GY);ART.fence(x,FX,GY,FH);
if(!s){x.restore();return}
ART.tree(x,TREE_L,GY,8,s.p.gathering);ART.tree(x,TREE_R,GY,8,s.e.gathering);
ART[s.hero](x,s.p.x,GY,s.p);ART.redneck(x,s.e.x,GY,s.e);
for(const ap of s.apples)if(!ap.dead){const up=Math.max(0,(ap.y0-ap.y))/260;const k=1+Math.min(1.7,up*1.7);
x.save();x.globalAlpha=.18;x.fillStyle='#000';x.beginPath();x.ellipse(ap.x,GY-2,9*k,3*k*.6,0,0,7);x.fill();x.restore();ART.apple(x,ap.x,ap.y,9*k,ap.rot)}
for(const f of s.fx){const k=f.t/.5;x.globalAlpha=1-k;if(f.kind==='splat'){ART.stroke(x,ART.warm,1.6);for(let i=0;i<5;i++){const a=Math.PI+i*Math.PI/4,r=6+k*18;x.beginPath();x.moveTo(f.x+Math.cos(a)*r*.4,f.y+Math.sin(a)*r*.4);x.lineTo(f.x+Math.cos(a)*r,f.y+Math.sin(a)*r);x.stroke()}}
else if(f.kind==='pick'){ART.apple(x,f.x,f.y-k*20,4,0)}
else if(f.kind==='burst'){ART.stroke(x,'#F6E7A0',2.2);x.beginPath();x.arc(f.x,f.y,10+k*60,0,7);x.stroke();ART.stroke(x,ART.mint,1.4);x.beginPath();x.arc(f.x,f.y,4+k*36,0,7);x.stroke()}
else if(f.kind==='chunk'){const kk=f.t/.9;x.globalAlpha=1-kk;ART.chunk(x,f.x,f.y,f.r,f.t*9)}
else if(f.kind==='score'){const kk=f.t/1.1,pop=kk<.18?1+(.18-kk)*2.2:1;x.globalAlpha=Math.min(1,(1-kk)*2.4);x.textAlign='center';x.font='800 '+Math.round(26*pop)+'px Manrope, sans-serif';
x.lineWidth=4;x.strokeStyle='rgba(14,18,16,.85)';x.strokeText('+'+f.n,f.x,f.y-kk*46);x.fillStyle=f.col;x.fillText('+'+f.n,f.x,f.y-kk*46)}
else if(f.kind==='clashx'){const kk=f.t/1.8,rise=RM.matches?0:kk*30,pop=RM.matches?1:(kk<.22?1+(.22-kk)*1.6:1);
const cx2=Math.max(150,Math.min(W-150,f.x)),cy2=Math.max(130,Math.min(GY-30,f.y))-rise;x.globalAlpha=Math.min(1,(1-kk)*3);
ART.apple(x,cx2,cy2-56,26*pop,0);x.textAlign='center';x.font='800 '+Math.round(30*pop)+'px Manrope, sans-serif';
const lbl=f.base+' ×'+AW.clashBonus+' = '+f.tot;x.lineWidth=5;x.strokeStyle='rgba(14,18,16,.85)';x.strokeText(lbl,cx2,cy2+24);x.fillStyle='#F6E7A0';x.fillText(lbl,cx2,cy2+24)}x.globalAlpha=1}
// charge bar
const c=s.p;if(c.charge>=0){x.fillStyle='rgba(255,255,255,.12)';x.fillRect(c.x-26,GY-128,52,6);x.fillStyle=ART.mint;x.fillRect(c.x-26,GY-128,52*c.charge,6)}
// HUD
ART.hearts(x,32,38,s.p.hp,MAXHP,ART.mint,1.3);ART.hearts(x,W-32-(MAXHP-1)*21,38,s.e.hp,MAXHP,ART.warm,1.3);
for(let i=0;i<MAXA;i++){x.globalAlpha=i<s.p.apples?1:.18;ART.apple(x,40+i*22,72,7,0);x.globalAlpha=i<s.e.apples?1:.18;ART.apple(x,W-40-i*22,72,7,0)}x.globalAlpha=1;
if(s.clashes>=AW.clashCap){const ax=W/2,ay=124;x.globalAlpha=.6;ART.apple(x,ax,ay,10,0);x.globalAlpha=1;ART.stroke(x,ART.hot,2.8);x.beginPath();x.moveTo(ax-14,ay+14);x.lineTo(ax+14,ay-14);x.stroke()}
x.fillStyle='rgba(227,234,230,.7)';x.font='600 17px Manrope, sans-serif';x.textAlign='center';x.fillText((cb.t?cb.t('level'):'Level')+' '+(s.level+1)+(s.hard?'  ·  ×2':''),W/2,34);
const left=Math.max(0,AW.speedFrom-s.lvT),mm=Math.floor(left/60),ss=Math.floor(left%60);
x.font='700 20px Manrope, sans-serif';x.fillStyle=left>0?(left<20?'#F2717A':'rgba(143,220,192,.9)'):'rgba(227,234,230,.35)';
x.fillText(mm+':'+String(ss).padStart(2,'0'),W/2,60);
x.font='600 11px Manrope, sans-serif';x.fillStyle='rgba(227,234,230,.4)';x.fillText(cb.t?cb.t('bonusLeft'):'bonus',W/2,76);
x.font='700 15px Manrope, sans-serif';x.fillStyle='rgba(227,234,230,.5)';x.fillText(String(s.total),W/2,98);
x.restore()}
function loop(t){const dt=Math.min(.033,(t-last)/1000||0);last=t;update(dt);draw();raf=requestAnimationFrame(loop)}
window.GAME={AW,
init(canvas,callbacks){cv=canvas;x=cv.getContext('2d');cb=callbacks||{};cv.width=W;cv.height=H;if(!raf)raf=requestAnimationFrame(loop)},
start(hero,hard){newGame(hero,hard)},next(){if(!S)return;S.level++;lvl()},
resume(){if(S)S.pause=false},pauseState(v){if(S)S.pause=v},
reset(){S=null},input,W,H,state(){return S},dbg(side){if(S)hit(side<0?S.p:S.e)},tick(dt){update(dt||.016);draw()}};
})();
